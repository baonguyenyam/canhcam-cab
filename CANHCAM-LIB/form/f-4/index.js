function CCForm4() {
	$('.canhcam-form-4 .validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
		} else {
			$(this)[0].reset();
		}
	})
};

$(function() {
    CCForm4();
})

$(window).resize(function() {})
