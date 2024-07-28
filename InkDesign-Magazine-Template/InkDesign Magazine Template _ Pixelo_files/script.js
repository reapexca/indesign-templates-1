var subscribeunlock_suffix = "";
var subscribeunlock_soft_mode = "";
var subscribeunlock_busy = false;
function subscribeunlock_submit(suffix, soft_mode) {
	if (subscribeunlock_busy == true) return;
	subscribeunlock_busy = true;
	subscribeunlock_suffix = suffix;
	subscribeunlock_soft_mode = soft_mode;
	jQuery("#submit"+suffix).attr("disabled","disabled");
	jQuery("#loading"+suffix).fadeIn(300);
	jQuery("#message"+suffix).slideUp("slow");
	var tmp_email = subscribeunlock_encode64(jQuery("#email"+suffix).val());
	var tmp_name = jQuery("#name"+suffix).val();
	if (tmp_name) tmp_name = subscribeunlock_encode64(tmp_name);
	jQuery.ajax({
		url: subscribeunlock_action, 
		data: {
			subscribeunlock_email: tmp_email,
			subscribeunlock_name: tmp_name,
			subscribeunlock_suffix: suffix,
			action: "subscribeunlock_submit"
		},
		dataType: "jsonp",
		success: function(return_data) {
			var data = return_data.html;
			jQuery("#submit"+subscribeunlock_suffix).removeAttr("disabled");
			jQuery("#loading"+subscribeunlock_suffix).fadeOut(300);
			if(data.match("subscribeunlock_confirmation_info") != null) {
				subscribeunlock_ga_track("opt-in-locker", "subscribe");
				subscribeunlock_write_cookie("subscribeunlock", subscribeunlock_cookie_value, 180);
				if (subscribeunlock_soft_mode == "on") {
					jQuery(".subscribeunlock_container").fadeOut(500, function() {
						jQuery(".subscribeunlock_content").removeClass("subscribeunlock_invisible");
					});
				} else {
					jQuery("#subscribeunlock_signup_form"+subscribeunlock_suffix).fadeOut(500, function() {
						jQuery("#subscribeunlock_confirmation_container"+subscribeunlock_suffix).html(data);
						jQuery("#subscribeunlock_confirmation_container"+subscribeunlock_suffix).fadeIn(500, function() {
							location.reload();
						});
					});
				}
			} else {
				jQuery("#message"+subscribeunlock_suffix).html(data);
				jQuery("#message"+subscribeunlock_suffix).slideDown("slow");
			}
			subscribeunlock_busy = false;
		}
	});
}

function subscribeunlock_read_cookie(key) {
	var pairs = document.cookie.split("; ");
	for (var i = 0, pair; pair = pairs[i] && pairs[i].split("="); i++) {
		if (pair[0] === key) return pair[1] || "";
	}
	return null;
}

function subscribeunlock_write_cookie(key, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	} else var expires = "";
	document.cookie = key+"="+value+expires+"; path=/";
}

function subscribeunlock_ga_track(type, action) {
	if (subscribeunlock_ga_tracking != "on") return;
	try {
		var title = document.title;
		if (title.length > 0) {
			if (typeof _gaq == 'object') {
				_gaq.push(['_trackEvent', type, action, title, 1, false]);
			} else if (typeof _trackEvent == 'function') { 
				_trackEvent(type, action, title, 1, false);
			} else if (typeof __gaTracker == 'function') { 
				__gaTracker('send', 'event', type, action, title);
			} else if (typeof ga == 'function') {
				ga('send', 'event', type, action, title);
			}
		}
	} catch(error) {
	
	}
}
function subscribeunlock_utf8encode(string) {
	string = string.replace(/\x0d\x0a/g, "\x0a");
	var output = "";
	for (var n = 0; n < string.length; n++) {
		var c = string.charCodeAt(n);
		if (c < 128) {
			output += String.fromCharCode(c);
		} else if ((c > 127) && (c < 2048)) {
			output += String.fromCharCode((c >> 6) | 192);
			output += String.fromCharCode((c & 63) | 128);
		} else {
			output += String.fromCharCode((c >> 12) | 224);
			output += String.fromCharCode(((c >> 6) & 63) | 128);
			output += String.fromCharCode((c & 63) | 128);
		}
	}
	return output;
}
function subscribeunlock_encode64(input) {
	var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;
	input = subscribeunlock_utf8encode(input);
	while (i < input.length) {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output = output + keyString.charAt(enc1) + keyString.charAt(enc2) + keyString.charAt(enc3) + keyString.charAt(enc4);
	}
	return output;
}
function subscribeunlock_utf8decode(input) {
	var string = "";
	var i = 0;
	var c = c1 = c2 = 0;
	while ( i < input.length ) {
		c = input.charCodeAt(i);
		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		} else if ((c > 191) && (c < 224)) {
			c2 = input.charCodeAt(i+1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = input.charCodeAt(i+1);
			c3 = input.charCodeAt(i+2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return string;
}
function subscribeunlock_decode64(input) {
	var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	while (i < input.length) {
		enc1 = keyString.indexOf(input.charAt(i++));
		enc2 = keyString.indexOf(input.charAt(i++));
		enc3 = keyString.indexOf(input.charAt(i++));
		enc4 = keyString.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output = output + String.fromCharCode(chr1);
		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
	}
	output = subscribeunlock_utf8decode(output);
	return output;
}
var subscribeunlock_cookie = subscribeunlock_read_cookie("subscribeunlock");