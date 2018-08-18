function CheckOut4() {
	$('.canhcam-checkout-4 .validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
		} else {
			$(this)[0].reset();
		}
	})
	$('.canhcam-checkout-4 .notice').scrollbar();
};

$(function() {
    CheckOut4();
})

$(window).resize(function() {})
