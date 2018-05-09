function CCForm6() {
	$('.canhcam-form-6 .validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			alert($(this).find('input').attr('data-error'))
		} else {
			$(this)[0].reset();
		}
		return false
	})
};

$(function() {
    CCForm6();
})

$(window).resize(function() {})
