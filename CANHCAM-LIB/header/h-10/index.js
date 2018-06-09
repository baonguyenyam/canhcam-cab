function CCHeader10() {
	$('#demoResAllInOneMenu').kResponsiveMenu({
		animationSpeed: 'fast', // slow, fast, 200
		resizeWidth: 'md', // 'xs', 'sm', 'md', 'lg', 'xl', 480,
		menuType: 'horizontal', // right, left
		menuPush: 'right', // right, left
		menuPushPosition: 'fixed', // absolute
		menuPushWidth: '300px', // px, %, rem
		menuBackDrop: true, // px, %, rem
	})
};


$(document).ready(function () {
	CCHeader10()
});
// Fixed Header
$(window).scroll(function () {
});

$(window).resize(function () {
})
