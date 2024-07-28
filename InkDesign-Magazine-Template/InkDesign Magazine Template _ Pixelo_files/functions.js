/* ------------------------------------------------------------------------ */
/* Javascripts
/* ------------------------------------------------------------------------ */

(function($) {

    $(document).ready(function() {
        "use strict";

        new WOW().init();

        var options = {};
        options.ui = {
            container: "#pwd-container",
            showVerdictsInsideProgressBar: true,
            viewports: {
                progress: ".pwstrength_viewport_progress"
            }
        };
        $(':password').pwstrength(options);

        // Sticky Widget
        jQuery('.sidebar').theiaStickySidebar({
          // Settings
          additionalMarginTop: 30
        });

        // Floating Social Share
        $("body.single-product, body.single-post .site-main").floatingSocialShare({
            place: "content-left",
            buttons: ["facebook", "twitter", "google-plus", "pinterest"],
            twitter_counter: false,
            counter: false,
            title: document.title,
            url: window.location.href,
            text: "Share with: ",
            description: $('meta[name="description"]').attr("content"),
            media: $('meta[property="og:image"]').attr("content") || "",
            popup_width: 600,
            popup_height: 455
        });

        $(window).scroll(function(){
          var threshold = 500; // number of pixels before bottom of page that you want to start fading
          var op = (($(document).height() - $(window).height()) - $(window).scrollTop()) / threshold;
            if( op <= 0 ){
                $("#floatingSocialShare .content-left").hide();
            } else {
                $("#floatingSocialShare .content-left").show();
            }
            $("#floatingSocialShare .content-left").css("opacity", op ); 
        });

        /* Toggle */
        
        if( $(".toggle .toggle-title").hasClass('active') ){
            $(".toggle .toggle-title.active").closest('.toggle').find('.toggle-inner').show();
        }
        
        $(".toggle .toggle-title").click(function(){
            if( $(this).hasClass('active') ){
                $(this).removeClass("active").closest('.toggle').find('.toggle-inner').slideUp(200);
            }
            else{
                $(this).addClass("active").closest('.toggle').find('.toggle-inner').slideDown(200);
            }
        });

        $(".widget img").attr("data-pin-no-hover", false);
        $('.detail-product .wc-tabs-wrapper .testimonial').wrap('<div class="row-full"></div>');
        $('.detail-product p').has('img').addClass('image');
        $('.single .blog.hentry .entry-content p').has('img').addClass('image');

        // Isotope
        if ( $().isotope ) {
            var $container = $( '#product-grid' );

            if ( $container.length ) {
                $container.imagesLoaded( function() {
                    $container.isotope( {
                        itemSelector: '.type-product-grid',
                        layoutMode: 'fitRows'
                    } );
                } );
            }
        }

        // Carousel

        $("#owl-testimonial").owlCarousel({
            autoPlay : true,
            stopOnHover : true,
            paginationSpeed : 1000,
            goToFirstSpeed : 2000,
            singleItem : true,
            autoHeight : false,
            navigation : true,
            navigationText: [
                "<i class='fa fa-chevron-left'></i>",
                "<i class='fa fa-chevron-right'></i>"
            ],
            pagination : false,
            transitionStyle:"fade"
        });

        // Modal Video
        if($('.video').length){
            $('.video').magnificPopup({
                type:'iframe',iframe:{
                    markup:'<div class="mfp-iframe-scaler">'+'<div class="mfp-close"></div>'+'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+'</div>',
                    patterns:{
                        youtube:{
                            index:'youtube.com/',id:'v=',src:'//www.youtube.com/embed/%id%?autoplay=1&controls=0&disablekb=1&enablejsapi=1&iv_load_policy=3&loop=1&rel=0&showinfo=0&theme=light'
                        },
                        vimeo:{
                            index:'vimeo.com/',id:'/',src:'//player.vimeo.com/video/%id%?autoplay=1'
                        }
                    },
                    srcAction:'iframe_src',
                }
            });
        }

        if($('.enlarge').length){
            $('.enlarge').magnificPopup({
                type:'inline',
                midClick: true
            });
        }

        // navigation
        $('.tw-menu ul.sf-menu').superfish({
            delay: 10,
            animation: {
                opacity: 'show',
                height: 'show'
            },
            speed: 'fast',
            autoArrows: false,
            dropShadows: false
        });

        // Sticky Bar

        $(window).scroll(function(){
            if($(window).scrollTop() > 200){
                $("#sticky-bar, .sticky-bar-inner").fadeIn(200);
            } else{
                $("#sticky-bar, .sticky-bar-inner").fadeOut(200);
            }
        });

        $('#sticky-bar, .sticky-bar').click(function() {
              $('html, body').animate({ scrollTop:0 }, '800');
              return false;
        });

        // Mobile Menu Action
        jQuery('.mobile-menu-icon').click(function () {
            if (jQuery(this).hasClass('active')) {
                jQuery(this).removeClass('active');
                jQuery('body').removeClass('show-mobile-menu');
            } else {
                jQuery(this).addClass('active');
                jQuery('body').addClass('show-mobile-menu');
            }
            return false;
        });

        jQuery('.tw-mobile-menu>i').click(function () {
            jQuery('.mobile-menu-icon.active').click();
        });

        // Mobile Menu - Sub Menu Action
        jQuery('.tw-mobile-menu>nav ul.sub-menu').each(function () {
            var $subMenu = jQuery(this);
            var $parMenuLink = $subMenu.siblings('a');
            $parMenuLink.click(function (e) {
                e.preventDefault();
                var $parMenu = jQuery(this).closest('li');
                $parMenu.siblings('li.menu-open').removeClass('menu-open').children('.sub-menu').slideUp('fast');
                $parMenu.toggleClass('menu-open');
                if ($parMenu.hasClass('menu-open')) {
                    $parMenu.children('.sub-menu').slideDown('fast');
                } else {
                    $parMenu.children('.sub-menu').slideUp('fast');
                }
                return false;
            });
        });

        $("#my-account-nav a").on("click", function() {
            var that = $(this), tabs = $(".tab-pane"), target = $(that.attr("href"));
            return $("#my-account-nav li").removeClass("active"), that.parents("li").addClass("active"), 
            tabs.hide(), target.fadeIn(), !1;
        }), $("#changepassword_btn").on("click", function() {
            return $("#changeit").trigger("click"), !1;
        });

        // Mailchimp Validation

        ajaxMailChimpForm($("#subscribe-form"), $("#subscribe-result"));
        // Turn the given MailChimp form into an ajax version of it.
        // If resultElement is given, the subscribe result is set as html to
        // that element.
        function ajaxMailChimpForm($form, $resultElement){
            // Hijack the submission. We'll submit the form manually.
            $form.submit(function(e) {
                e.preventDefault();
                if (!isValidEmail($form)) {
                    var error =  "A valid email address must be provided.";
                    $resultElement.html(error);
                    $resultElement.css("color", "red");
                } else {
                    $resultElement.css("color", "black");
                    $resultElement.html("Subscribing...");
                    submitSubscribeForm($form, $resultElement);
                }
            });
        }
        // Validate the email address in the form
        function isValidEmail($form) {
            // If email is empty, show error message.
            // contains just one @
            var email = $form.find("input[type='email']").val();
            if (!email || !email.length) {
                return false;
            } else if (email.indexOf("@") == -1) {
                return false;
            }
            return true;
        }
        
        // Submit the form with an ajax/jsonp request.
        // Based on http://stackoverflow.com/a/15120409/215821
        function submitSubscribeForm($form, $resultElement) {
            $.ajax({
                type: "GET",
                url: $form.attr("action"),
                data: $form.serialize(),
                cache: false,
                dataType: "jsonp",
                jsonp: "c", // trigger MailChimp to return a JSONP response
                contentType: "application/json; charset=utf-8",
                error: function(error){
                    // According to jquery docs, this is never called for cross-domain JSONP requests
                },
                success: function(data){
                    if (data.result != "success") {
                        var message = data.msg || "Sorry. Unable to subscribe. Please try again later.";
                        $resultElement.css("color", "red");
                        if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                            message = "You're already subscribed. Thank you.";
                            $resultElement.css("color", "black");
                        }
                        $resultElement.html(message);
                    } else {
                        $resultElement.css("color", "black");
                        $resultElement.html("Thank you! You must confirm the subscription in your inbox.");
                    }
                }
            });
        }

        $("a:contains('Deals Expired')") .closest("a.btn_deal") .css("background", "#ddd");
        jQuery('a:contains("All Files")').closest('.purchase-download').addClass('purchase-help');
        jQuery('a:contains("Helpful Document")').closest('.purchase-download').addClass('purchase-help first');
        $('.edit_billing_ #billing_postcode_field + div').remove();

    });
	
})(jQuery);