function galleryMasory5() {
	var wall = new Freewall(".canhcam-gallery-5 .gallery-details .gallery-lists");
	wall.reset({
		selector: '.item',
		animate: true,
		cellW: 300,
		cellH: 'auto',
		onResize: function () {
			wall.fitWidth();
		}
	});
	wall.fitWidth();
	$(window).trigger("resize");
}

$(document).ready(function () {

	galleryMasory5()

});
