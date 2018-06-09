function CCShopMenu() {
	// Bật tắt Menu
	$('.canhcam-header-9 .navbar-toggler').on("click", function () {
		$('.canhcam-header-9').addClass('expand')
	});
	$('.canhcam-header-9 .navbar-closed').on("click", function () {
		$('.canhcam-header-9').removeClass('expand')
	});
};


$(document).ready(function () {
	// Fixed Header
	CCShopMenu();
});
// Fixed Header
$(window).scroll(function () {
	// setHeader($(document).scrollTop());
});
// Fixed Header
$(window).resize(function () {
	$('.canhcam-header-9').removeClass('expand')
})
