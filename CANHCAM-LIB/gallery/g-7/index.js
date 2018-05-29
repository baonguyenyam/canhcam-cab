function galleryMasory7() {
	var wall = new Freewall(".canhcam-gallery-7 .gallery-details .gallery-lists");

	wall.reset({
		selector: '.item',
		animate: true,
		cellW: 200,
		cellH: 'auto',
		onResize: function () {
			wall.fitWidth();
		}
	});
	wall.fitWidth();
	$(window).trigger("resize");
}

$(document).ready(function () {

	galleryMasory7()

});
