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
