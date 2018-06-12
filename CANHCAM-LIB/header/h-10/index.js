function CCHeader10() {
	$('.canhcam-header-10 .navbar-toggler').on("click", function () {
		$('.canhcam-header-10').toggleClass('expand')
	});
	$('.canhcam-header-10 .btnsearch .btn').on("click", function () {
		$('.canhcam-header-10 .search').toggleClass('active')
		$('.canhcam-header-10 .btnsearch').toggleClass('active')
	});
	$('.canhcam-header-10 .closebnt').on("click", function () {
		$('.canhcam-header-10').toggleClass('expand')
	});
};

function getMapto() {
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID_SM) {
		$('[k-menu-map-to]').each(function () {
			var getTo = $(this).attr('k-menu-map-to')
			$(getTo).html($(this).clone().removeAttr('k-menu-map-to').show())
			$(this).hide()
		})
	} else {
		$('[k-menu-map-to]').each(function () {
			var getTo = $(this).attr('k-menu-map-to')
			$(getTo).html('')
			$(this).show()
		})
	}
}

$(function () {
	CCHeader10();
	getMapto()
})


$(window).resize(function () {
	getMapto()
	$('.canhcam-header-10').removeClass('expand')
	$('.canhcam-header-10 .search').removeClass('active')
	$('.canhcam-header-10 .btnsearch').removeClass('active')
})
