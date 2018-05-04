function CCHeader3() {
	$('.canhcam-header-3 .navbar-toggler').on("click", function () {
		$('.canhcam-header-3').toggleClass('expand')
	});
	$('.canhcam-header-3 .btnsearch .btn').on("click", function () {
		$('.canhcam-header-3 .search').toggleClass('active')
		$('.canhcam-header-3 .btnsearch').toggleClass('active')
	});
};

$(function() {
    CCHeader3();
})

$(window).resize(function() {
	$('.canhcam-header-3').removeClass('expand')
	$('.canhcam-header-3 .search').removeClass('active')
	$('.canhcam-header-3 .btnsearch').removeClass('active')
})
