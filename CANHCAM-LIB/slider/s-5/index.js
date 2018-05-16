$(function () {
	$('.canhcam-slider-5 .list-thumb').slick({
		centerMode: true,
		centerPadding: '30%',
		slidesToShow: 1,
		arrows: true,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					centerPadding: '0',
					slidesToShow: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					centerPadding: '0',
					slidesToShow: 1
				}
			}
		]
	});

	$(".canhcam-slider-5 .list-thumb").lightGallery({
		youtubePlayerParams: {
			modestbranding: 1,
			showinfo: 0,
			rel: 0,
			controls: 0
		},
		// width: '700px',
		// height: '470px',
		mode: 'lg-fade',
		addClass: 'canhcam-slider-5 canhcam-video-fixed-size',
		counter: false,
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
