function CCShopMenu() {
	// Bật tắt Menu
	$('.canhcam-shop-menu .navbar-toggler').on("click", function () {
		$('.canhcam-shop-menu').addClass('expand')
	});
	$('.canhcam-shop-menu .navbar-closed').on("click", function () {
		$('.canhcam-shop-menu').removeClass('expand')
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
	$('.canhcam-shop-menu').removeClass('expand')
})
