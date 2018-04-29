$(document).ready(function() {
	$('.canhcam-gallery-2 .slider-for').owlCarousel({
		items: 1,
		loop: true,
		center: true,
		padding: 10,
		margin: 20,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		nav: false,
		dots: false,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true,
		callbacks: true,
		URLhashListener: true,
		startPosition: 'URLHash'
	});
	$('.canhcam-gallery-2 .slider-nav').owlCarousel({
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		items: 3,
		loop: true,
		center: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		padding: 10,
		margin: 20,
		nav: true,
		dots: false,
		autoplay: false,
		autoplayHoverPause: false,
		callbacks: true,
		responsive: {
			480: {
				items: 3,
				center: true
			},
			768: {
				items: 4
			},
			992: {
				items: 5,
			},
			1140: {
				items: 5,
			}
		}
	});

});
