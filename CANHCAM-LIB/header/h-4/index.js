function CCHeader4() {
	$('.canhcam-header-4 .navbar-toggler').on("click", function () {
		$('.canhcam-header-4').toggleClass('expand')
	});
	$('.canhcam-header-4 .btnsearch').on("click", function () {
		$('.canhcam-header-4 .search').toggleClass('active')
		$(this).toggleClass('active')
	});
	$('.canhcam-header-4 .closebnt').on("click", function () {
		$('.canhcam-header-4 .search').toggleClass('active')
		$('.canhcam-header-4 .btnsearch').toggleClass('active')
	});
};

$(function() {
    CCHeader4();
})

$(window).resize(function() {
	$('.canhcam-header-4 .search').removeClass('active')
	$('.canhcam-header-4 .btnsearch').removeClass('active')
})
