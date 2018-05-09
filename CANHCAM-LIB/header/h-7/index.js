function CCHeader7() {
	$('.canhcam-header-7 .navbar-toggler').on("click", function () {
		$('.canhcam-header-7').toggleClass('expand')
	});
	$('.canhcam-header-7 .btnsearch .btn').on("click", function () {
		$('.canhcam-header-7 .search').toggleClass('active')
		$('.canhcam-header-7 .btnsearch').toggleClass('active')
	});
	$('.canhcam-header-7 .closebnt').on("click", function () {
		$('.canhcam-header-7').toggleClass('expand')
	});
};

$(function() {
    CCHeader7();
})

$(window).resize(function() {
	$('.canhcam-header-7').removeClass('expand')
	$('.canhcam-header-7 .search').removeClass('active')
	$('.canhcam-header-7 .btnsearch').removeClass('active')
})
