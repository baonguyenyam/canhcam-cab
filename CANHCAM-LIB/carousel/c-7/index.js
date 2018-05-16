$(function() {
    if ($('.canhcam-carousel-7 .owl-carousel').length) {
        $('.canhcam-carousel-7 .owl-carousel').owlCarousel({
            items: 1,
			loop: false,
            center: false,
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			nav: true,
            dots: false,
            autoplay: false,
            autoplayTimeout: 3000,
            autoplayHoverPause: false,
			callbacks: true,
            responsive: {
                480: {
					items: 1
                },
                768: {
					items: 3,
					nav: false
                },
                992: {
                    items: 3
                }
            }
        });
	}
	
	

});

$(document).ready(function () {

	$(".canhcam-carousel-7 .gallery-lists").lightGallery({
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
