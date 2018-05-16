
$(document).ready(function () {

	$(".canhcam-boxes-12 .gallery-lists").lightGallery({
		youtubePlayerParams: {
			modestbranding: 1,
			showinfo: 0,
			rel: 0,
			controls: 0
		},
		width: '700px',
		height: '470px',
		mode: 'lg-fade',
		counter: false,
		share: false,
		zoom: false,
		fullscreen: false,
		download: false,
		startClass: '',
		enableSwipe: false,
		enableDrag: false,
		speed: 500,
		loadYoutubeThumbnail: true,
		youtubeThumbSize: 'default',
		thumbnail: true,
		animateThumb: false,
		showThumbByDefault: false,
		selector: '.item'
	});

});
