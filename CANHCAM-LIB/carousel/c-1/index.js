$(function() {
    if ($('.canhcam-carousel-1 .owl-carousel').length) {
        $('.canhcam-carousel-1 .owl-carousel').owlCarousel({
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            items: 2,
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
                    nav: false,
                    dots: true
                },
                1140: {
                    items: 6,
                    nav: false,
                    dots: true
                }
            }
        });
    }

});
