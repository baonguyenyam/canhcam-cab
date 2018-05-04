function CCHeader2() {
	$('.canhcam-header-2 .navbar-toggler').on("click", function () {
		$('.canhcam-header-2').toggleClass('expand')
	});
	$('.canhcam-header-2 .search button').on("click", function () {
		if ($('.canhcam-header-2 .search button').attr('type') === 'button') {
			$(this).toggleClass('searchbtn')
			$('.canhcam-header-2 .search').toggleClass('active')
			setTimeout(() => {
				if ($('.canhcam-header-2 .search').hasClass('active')) {
					$('.canhcam-header-2 .search button').attr('type', 'submit')
				}
			}, 200);
		}
	});
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
		$('.canhcam-header-2 .search button').attr('type', 'submit')
	} else {
		$('.canhcam-header-2 .search button').attr('type', 'button')
	}
};

$(function () {
	CCHeader2();
})

$(window).resize(function () {
	$('.canhcam-header-2').removeClass('expand')
	$('.canhcam-header-2 .search').removeClass('active')
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
		$('.canhcam-header-2 .search button').removeClass('searchbtn')
		$('.canhcam-header-2 .search button').attr('type', 'submit')
	} else {
		$('.canhcam-header-2 .search button').addClass('searchbtn')
		$('.canhcam-header-2 .search button').attr('type', 'button')
	}
})
