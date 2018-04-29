
function ProductDetail1() {
	$('.canhcam-gallery-1 .product-details .slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: false,
		autoplay: false,
		asNavFor: '.slider-nav'
	});
	$('.canhcam-gallery-1 .product-details .slider-nav').slick({
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
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					vertical: false,
					verticalSwiping: false,
					centerMode: true,
					variableWidth: false
				}
			}
		]
	});
};

$(document).ready(function () {

	ProductDetail1();
	if (!$('.canhcam-gallery-1 .product-details .slider-nav .top-arrow').is(':visible')) {
		$('.canhcam-gallery-1 .product-details .slider-control').css({
			'padding-top': '0px'
		})
	}

});


$(function () {
})

$(window).resize(function () { })
