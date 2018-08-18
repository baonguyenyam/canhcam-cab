function CheckOut2() {
	$('.canhcam-checkout-2 .validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
		} else {
			$(this)[0].reset();
		}
	})
	$(".canhcam-checkout-2 .form-check-input").on('click', function() {
		if($(this).attr('id') === 'no-reg') {
			$('.box-account').hide()
		} else {
			$('.box-account').show()
		}
	})
};

$(function() {
    CheckOut2();
})

$(window).resize(function() {})
