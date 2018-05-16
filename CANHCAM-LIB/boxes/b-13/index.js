$(function() {
	$('.canhcam-boxes-13 .list-items').each(function () {
		$('.canhcam-boxes-13 .list-items').owlCarousel({
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            items: 1,
            loop: true,
            center: false,
            padding: 10,
            margin: 20,
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: false,
            callbacks: true
        });
	})
	
	$('.canhcam-boxes-13 .product-items').each(function () {
		$('.canhcam-boxes-13 .product-items').owlCarousel({
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			items: 1,
			loop: false,
			center: false,
			padding: 10,
			margin: 20,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			nav: true,
			dots: false,
			autoplay: false,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			callbacks: true,
			responsive: {
				480: {
					items: 2
				},
				992: {
					items: 3
				},
				1140: {
					items: 4
				}
			}
		});
	})

});
