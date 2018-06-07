function galleryMasory6() {
	var wall = new Freewall(".canhcam-gallery-6 .gallery-details .gallery-lists");

	wall.reset({
		selector: '.item',
		animate: true,
		cellW: 200,
		cellH: 200,
		onResize: function () {
			wall.fitWidth();
		}
	});
	wall.fitWidth();
	$(window).trigger("resize");
	$('.canhcam-gallery-6 .gallery-details .gallery-lists [data-fancybox="gallery"]').fancybox({
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

	galleryMasory6()

});

