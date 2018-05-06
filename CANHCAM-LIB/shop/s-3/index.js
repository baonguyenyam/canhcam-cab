
function ProductDetailShop3() {
	$('.canhcam-shop-3 .product-details .slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: false,
		autoplay: false,
		asNavFor: '.slider-nav'
	});
	$('.canhcam-shop-3 .product-details .slider-nav').slick({
		autoplay: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		arrows: true,
		centerMode: false,
		focusOnSelect: true,
		prevArrow: $('.top-arrow'),
		nextArrow: $('.bottom-arrow'),
		vertical: true,
		variableWidth: false,
		verticalSwiping: false,
		infinite: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					vertical: false,
					verticalSwiping: false,
					variableWidth: false
				}
			}
		]
	}).on('init', function (event, slick, direction) {
		if (!$('.canhcam-shop-3 .product-details .slider-nav .top-arrow').is(':visible')) {
			$('.canhcam-shop-3 .product-details .slider-control').css({
				'padding-top': '0px'
			})
		}
		}).on('afterChange', function (event, slick, currentSlide, nextSlide) {
			var getcs = slick.$slides.length - 1
			if (currentSlide == 0) {
				$('.canhcam-shop-3 .product-details .top-arrow').attr('disabled', 'disabled')
			} else {
				$('.canhcam-shop-3 .product-details .top-arrow').removeAttr('disabled')
			}
			if (getcs == currentSlide) {
				$('.canhcam-shop-3 .product-details .bottom-arrow').attr('disabled', 'disabled')
			} else {
				$('.canhcam-shop-3 .product-details .bottom-arrow').removeAttr('disabled')
			}
		});
};

$(document).ready(function () {

	ProductDetailShop3();

	$('.canhcam-shop-3 #quantity input').TouchSpin({
		min: 0,
		max: 100,
		buttondown_class: "btn btn-default",
		buttonup_class: "btn btn-default"
	});

});


$(function () {

})

$(window).resize(function () { })
