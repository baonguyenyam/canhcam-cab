function CCHeader6() {
	$('.canhcam-header-6 .navbar-toggler').on("click", function () {
		$('.canhcam-header-6').toggleClass('expand')
	});
	$('.canhcam-header-6 .btnsearch .btn').on("click", function () {
		$('.canhcam-header-6 .search').toggleClass('active')
		$('.canhcam-header-6 .btnsearch').toggleClass('active')
	});
	$('.canhcam-header-6 .closebnt').on("click", function () {
		$('.canhcam-header-6').toggleClass('expand')
	});
};

$(function() {
    CCHeader6();
})

$(window).resize(function() {
	$('.canhcam-header-6').removeClass('expand')
	$('.canhcam-header-6 .search').removeClass('active')
	$('.canhcam-header-6 .btnsearch').removeClass('active')
})
