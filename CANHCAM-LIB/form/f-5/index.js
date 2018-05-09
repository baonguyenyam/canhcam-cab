function CCForm5() {
	$('.canhcam-form-5 .validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			alert($(this).find('input').attr('data-error'))
		} else {
			$(this)[0].reset();
		}
		return false
	})
};

$(function() {
    CCForm5();
})

$(window).resize(function() {})
