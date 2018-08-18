function CheckOut3() {
	$('.canhcam-checkout-3 .validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
		} else {
			$(this)[0].reset();
		}
	})
	$(".canhcam-checkout-3 .form-check-input[expand-to]").on('click', function() {
		var eg = $(this).attr('expand-to')
		if($(this).prop('checked')) {
			$('#'+eg).hide()
		} else {
			$('#'+eg).show()
		}
	})
	$(".canhcam-checkout-3 .form-check-input[expand-to-invert]").on('click', function() {
		var eg = $(this).attr('expand-to-invert')
		if($(this).prop('checked')) {
			$('#'+eg).show()
		} else {
			$('#'+eg).hide()
		}
	})
};

$(function() {
    CheckOut3();
})

$(window).resize(function() {})
