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
	$('.canhcam-gallery-7 .gallery-details .gallery-lists [data-fancybox="gallery"]').fancybox({
		buttons: [
			"zoom",
			"share",
			"slideShow",
			"fullScreen",
			"download",
			"thumbs",
			"close"
		],
		baseClass: 'fancybox-custom-layout',
		infobar: false,
		thumbs: {
			hideOnClose: false
		},
		touch: {
			vertical: false
		},
		youtube: {
			controls: 0,
			showinfo: 0
		},
		animationEffect: "fade",
		transitionEffect: false,
		idleTime: false,
		gutter: 0,
		afterLoad: function (instance, current) {
			current.width = current.$image[0].naturalWidth;
			current.height = current.$image[0].naturalHeight;
		}
	});

}

$(document).ready(function () {

	galleryMasory7()

});
