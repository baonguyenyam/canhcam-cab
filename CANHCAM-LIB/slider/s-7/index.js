$(function() {
    if ($('.canhcam-slider-7 .slide').length) {
        $('.canhcam-slider-7 .slide').owlCarousel({
            items: 1,
            dots: false,
            nav: true,
            loop: true,
            // autoplay: true,
            navText: ['<i class="lnr lnr-chevron-left"></i>', '<i class="lnr lnr-chevron-right"></i>'],
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            // responsive: {
            //     0: {
            //         dots: false
            //     },
            //     768: {
            //         dots: true
            //     }
            // }
        })
    }
})