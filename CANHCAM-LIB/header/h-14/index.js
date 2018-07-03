function CCHeader14() {
	$('.canhcam-header-14 #demoResAllInOneMenu').kResponsiveMenu({
		animationSpeed: 'fast', // slow, fast, 200
		resizeWidth: 'lg', // 'xs', 'sm', 'md', 'lg', 'xl', 480,
		menuType: 'horizontal', // horizontal, vertical
		menuPush: 'right', // right, left
		menuPushPosition: 'fixed', // absolute
		menuPushWidth: '300px', // px, %, rem
		menuBackDrop: true, // px, %, rem
	})
};


$(document).ready(function () {
	CCHeader14()
});
// Fixed Header
$(window).scroll(function () {
});

$(window).resize(function () {
})
