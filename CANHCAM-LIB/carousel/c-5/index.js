$(function() {
    if ($('.canhcam-carousel-5 .owl-carousel').length) {
        $('.canhcam-carousel-5 .owl-carousel').owlCarousel({
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            items: 1,
            loop: true,
            center: false,
            padding: 0,
            margin: 0,
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: false,
            callbacks: true,
            responsive: {
                480: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
					items: 4,
					nav: false
                },
                1140: {
					items: 6,
					nav: false
                }
            }
        });
    }

});
