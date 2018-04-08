$(function() {
    if ($('.owl-carousel').length) {
        $('.owl-carousel').owlCarousel({
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            items: 1,
            loop: true,
            center: false,
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