
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
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		arrows: true,
		// verticalSwiping: true,
		// centerMode: true,
		// useTransform: false,
		// vertical: true,
		focusOnSelect: true,
		// variableWidth: true,
		prevArrow: $('.top-arrow'),
		nextArrow: $('.bottom-arrow'),
		// responsive: [
		// 	{
		// 		breakpoint: 1140,
		// 		settings: {
		// 			vertical: true,
		// 			// variableWidth: false,
		// 		}
		// 	},
		// 	{
		// 		breakpoint: 768,
		// 		settings: {
		// 			vertical: false,
		// 			// variableWidth: false
		// 		}
		// 	},
		// 	{
		// 		breakpoint: 480,
		// 		settings: {
		// 			vertical: false,
		// 			// variableWidth: false
		// 		}
		// 	}
		// ]
	});
};


$(function () {
	ProductDetail1();
})

$(window).resize(function () { })
