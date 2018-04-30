function CCHeader5() {
	$('.canhcam-header-5 .navbar-toggler').on("click", function () {
		$('.canhcam-header-5').toggleClass('expand')
	});
	$('.canhcam-header-5 .btnsearch .btn').on("click", function () {
		$('.canhcam-header-5 .search').toggleClass('active')
		$('.canhcam-header-5 .btnsearch').toggleClass('active')
	});
	$('.canhcam-header-5 .closebnt').on("click", function () {
		$('.canhcam-header-5').toggleClass('expand')
	});
};

$(function() {
    CCHeader5();
})

$(window).resize(function() {
	$('.canhcam-header-5').removeClass('expand')
	$('.canhcam-header-5 .search').removeClass('active')
	$('.canhcam-header-5 .btnsearch').removeClass('active')
})
