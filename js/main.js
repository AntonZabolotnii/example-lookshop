$(function() {
	
	// jQuery EXPANSION fn
	$.fn.disableSelection = function() {
        return this
        .attr('unselectable', 'on')
        .css('user-select', 'none')
        .css('-moz-user-select', 'none')
        .css('-khtml-user-select', 'none')
        .css('-webkit-user-select', 'none')
        .on('selectstart', false)
        .on('contextmenu', false)
        .on('keydown', false)
        .on('mousedown', false);
    };

	// ###################################
	// SEARCH
	$(".glyphicon-search").click(function() {
		
		var $search = $(".search-input");
		var animDuration = 300;
		var searchWidth = 300;

		console.log(parseInt($search.css("width")));

		if (parseInt($search.css("width"))>searchWidth/10) {
			$search.css({width: 0});
			$search.hide();
		} else {
			// search.toggle();
			$search.show();
			$search.animate({width: searchWidth}, animDuration);
			$search.focus();
		};

	});

	// ###################################
	// CART
	var $cartTop = $(".cart-top");
	var $cartItems = $(".cart-items");

	//show or hide container with cart items
	$cartTop.click(function() {$cartItems.toggle()});
	$cartTop.disableSelection();

});