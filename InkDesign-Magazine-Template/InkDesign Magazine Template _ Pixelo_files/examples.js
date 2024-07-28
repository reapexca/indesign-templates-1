jQuery(function() {
    function ratingEnable() {

        jQuery('#example-css').barrating({
            theme: 'css-stars',
            showSelectedRating: false,
			onSelect: function(value, text) {
                console.log(value);
				jQuery('#review_rating').val(value);
            }
        });
		
		jQuery('.list_start').barrating({
            theme: 'css-stars',
            showSelectedRating: false,
			readonly : true,
        });
		
		var currentRating = jQuery('#example-fontawesome-o').data('current-rating');
		console.log(currentRating);
		
		jQuery('#example-fontawesome-o').barrating({
            theme: 'fontawesome-stars-o',
            showSelectedRating: false,
			readonly : true,
            initialRating: currentRating,
            onSelect: function(value, text) {
			console.log(value);
                if (!value) {
                    jQuery('#example-fontawesome-o')
                        .barrating('clear');
                } else {
                    jQuery('.stars-example-fontawesome-o .current-rating')
                        .addClass('hidden');

                    jQuery('.stars-example-fontawesome-o .your-rating')
                        .removeClass('hidden')
                        .find('span')
                        .html(value);
                }
            },
            onClear: function(value, text) {
                jQuery('.stars-example-fontawesome-o')
                    .find('.current-rating')
                    .removeClass('hidden')
                    .end()
                    .find('.your-rating')
                    .addClass('hidden');
            }
        });
    }

    

    ratingEnable();
});


  
