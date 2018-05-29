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
}

$(document).ready(function () {

	galleryMasory6()

});

