function setHeader(elm) {
	if (elm >= CANHCAM_APP.ACTIVE_HEADER_POSITION) {
		$("header").addClass('active');
	} else {
		$("header").removeClass('active');
	}
}

$(document).ready(function () {
	if (CANHCAM_APP.ACTIVE_FIXED_HEADER) {
		$("header").addClass('fixedheader');
		if ($(window).scrollTop() >= CANHCAM_APP.ACTIVE_HEADER_POSITION) {
			setHeader($(window).scrollTop());
		}
	} else {
		if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
			$("header").addClass('fixedheader');
		} else {
			$("header").removeClass('fixedheader');
		}
	}
	if ($("header").hasClass("fixedheader")) {
		$("main").addClass('main-fixedheader');
	}
});

// Fixed Header
$(window).scroll(function () {
	setHeader($(document).scrollTop());
});
// Fixed Header
$(window).resize(function () {
	if (!CANHCAM_APP.ACTIVE_FIXED_HEADER) {
		if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
			$("header").addClass('fixedheader');
		} else {
			$("header").removeClass('fixedheader');
		}
	}
});

