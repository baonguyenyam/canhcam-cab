// phần của nguyên 
function CCHeader8() {
	// Bật tắt Menu
	$('.canhcam-header-8 .navbar-toggler').on("click", function () {
		$('.canhcam-header-8').addClass('expand')
	});
	$('.canhcam-header-8 .navbar-closed').on("click", function () {
		$('.canhcam-header-8').removeClass('expand')
	});
};


$(document).ready(function () {
	// Fixed Header
	CCHeader8();
});
// Fixed Header
$(window).scroll(function () {
	setHeader($(document).scrollTop());
});
// Fixed Header
$(window).resize(function () {
	$('.canhcam-header-8').removeClass('expand')
})
