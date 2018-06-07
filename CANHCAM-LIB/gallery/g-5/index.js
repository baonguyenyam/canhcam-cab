function galleryMasory5() {
	var wall = new Freewall(".canhcam-gallery-5 .gallery-details .gallery-lists");
	wall.reset({
		selector: '.item',
		animate: true,
		cellW: $(window).width() <= CANHCAM_APP.CHANGE_GRID_SM ? 200 : 300,
		cellH: 'auto',
		onResize: function () {
			wall.fitWidth();
		}
	});
	wall.fitWidth();
	$(window).trigger("resize");

	$('.canhcam-gallery-5 .gallery-details .gallery-lists [data-fancybox="gallery"]').fancybox({
		buttons: [
			"zoom",
			"share",
			"slideShow",
			"fullScreen",
			"download",
			"thumbs",
			"close"
		],
		youtube: {
			controls: 0,
			showinfo: 0
		},
		afterLoad: function (instance, current) {
			current.width = current.$image[0].naturalWidth;
			current.height = current.$image[0].naturalHeight;
		}
	});
}

$(document).ready(function () {
	galleryMasory5()
});
