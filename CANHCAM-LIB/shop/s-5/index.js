function zoomIMG5() {
	$(".canhcam-shop-5 #zoomimg").elevateZoom({
		responsive: true,
		gallery: "product-control",
		galleryActiveClass: "active"
	});
	$(".canhcam-shop-5 .product-control .item").each(function () {
		$(this).click(function (e) {
			var currentValue = $(this).find('img').attr('data-preview-image')
			var currentValueZoom = $(this).find('img').attr('data-zoom-image')
			$('.canhcam-shop-5 .product-control .item').removeClass('active')
			$(this).addClass('active')
			var gallery_zoomimg = $('#zoomimg').data('elevateZoom');
			gallery_zoomimg.swaptheimage(currentValue, currentValueZoom);
		});
	});
}


$(document).ready(function() {
	if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
		zoomIMG5()
	}
	$('.canhcam-shop-5 #quantity input').TouchSpin({
		min: 0,
		max: 100,
		buttondown_class: "btn btn-default",
		buttonup_class: "btn btn-default"
	});
});

$(window).resize(function () {
	if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
		zoomIMG5()
	}
})
