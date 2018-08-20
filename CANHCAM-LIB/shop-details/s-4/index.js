$('.canhcam-shop-details-4 .product-slide').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: false,
    fade: true,
    asNavFor: '.product-nav',
    responsive: [{
        breakpoint: 1199,
        settings: {}
    }, {
        breakpoint: 991,
        settings: {}
    }, {
        breakpoint: 767,
        settings: {}
    }, {
        breakpoint: 576,
        settings: {
            arrows: true
        }
    }]
});
$('.product-nav').slick({
    slidesToShow: 5,
    asNavFor: '.product-slide',
    dots: false,
    focusOnSelect: true,
    infinite: false,
    swipe: true,
    swipeToSlide: true,
    vertical: true,
    verticalSwiping: true,
    responsive: [{
        breakpoint: 1199,
        settings: {}
    }, {
        breakpoint: 991,
        settings: {}
    }, {
        breakpoint: 767,
        settings: {}
    }, {
        breakpoint: 576,
        settings: {
            vertical: false,
            verticalSwiping: false
        }
    }]
});
$(".canhcam-shop-details-4 .product-slide").lightGallery({ 
    thumbnail: true,
     animateThumb: false,
     showThumbByDefault: false,
     selector: '.item a'
});
$(document).ready(function() {

    $('.canhcam-shop-details-4 .input-number input').TouchSpin({
        min: 0,
        max: 100,
        buttondown_class: "btn btn-default",
        buttonup_class: "btn btn-default"
    });

});