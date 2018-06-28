function CCHeader11() {
	$('.canhcam-header-11 #demoResAllInOneMenu').kResponsiveMenu({
		animationSpeed: 'fast', // slow, fast, 200
		resizeWidth: 'lg', // 'xs', 'sm', 'md', 'lg', 'xl', 480,
		menuType: 'horizontal', // right, left
		menuPush: 'right', // right, left
		menuPushPosition: 'fixed', // absolute
		menuPushWidth: '300px', // px, %, rem
		menuBackDrop: true, // px, %, rem
	})
};


$(document).ready(function () {
	CCHeader11()
});
// Fixed Header
$(window).scroll(function () {
});

$(window).resize(function () {
})
