function CCFooter10() {
	$('.canhcam-footer-10 .validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			alert($(this).find('input').attr('data-error'))
		} else {
			$(this)[0].reset();
		}
		return false
	})
};

$(function() {
    CCFooter10();
})

$(window).resize(function() {})
