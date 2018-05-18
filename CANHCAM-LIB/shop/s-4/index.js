$(document).ready(function() {
	shopCanhCam4()
	toggleViewShop4()
});

function toggleViewShop4() {
	$('.canhcam-shop-4 .product-details #list').click(function (event) {
		event.preventDefault();
		$(this).addClass('active')
		$('.canhcam-shop-4 .product-details #grid').removeClass('active')
		$('.canhcam-shop-4 .boxproducts').addClass('list-group-wrapper').removeClass('grid-group-wrapper');
	});
	$('.canhcam-shop-4 .product-details #grid').click(function (event) {
		event.preventDefault();
		$(this).addClass('active')
		$('.canhcam-shop-4 .product-details #list').removeClass('active')
		$('.canhcam-shop-4 .boxproducts').removeClass('list-group-wrapper').addClass('grid-group-wrapper');
	});
}

function shopCanhCam4() {
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID_SM) {
		$('.canhcam-shop-4 #filterSearch').addClass('collapse')
	} else {
		$('.canhcam-shop-4 #filterSearch').removeClass('collapse')
	}
}

$(window).resize(function() {
	shopCanhCam4()
})
