function CCHeader5() {
	$('.canhcam-header-5 .navbar-toggler').on("click", function () {
		$('.canhcam-header-5').toggleClass('expand')
	});
	marginHeader()
};

function marginHeader() {
	var headerHeight = $("header").outerHeight();
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
		$('.canhcam-header-5 #CCMenuHeader').css({
			'margin-top': headerHeight + 'px'
		})
	} else {
		$('.canhcam-header-5 #CCMenuHeader').css({
			'margin-top': 'initial'
		})
	}
}

$(function () {
	CCHeader5();
})

$(window).resize(function () {
	$('.canhcam-header-5').removeClass('expand')
	marginHeader()

})
