function CCHeader1() {
	$('.canhcam-header-1 .navbar-toggler').on("click", function () {
		$('.canhcam-header-1').toggleClass('expand')
	});
};

$(function () {
	CCHeader1();
})

$(window).resize(function () {
	$('.canhcam-header-1').removeClass('expand')
})
