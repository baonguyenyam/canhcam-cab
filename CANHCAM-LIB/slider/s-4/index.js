$(function() {
	$('.canhcam-slider-4 .list-thumb').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: false,
		infinite: false,
		autoplay: false,
		asNavFor: '.slider-nav'
	});
	$('.canhcam-slider-4 .slider-nav').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.list-thumb',
		dots: false,
		arrows: false,
		infinite: false,
		// centerMode: true,
		focusOnSelect: true,
		// prevArrow: $('.top-arrow'),
		// nextArrow: $('.bottom-arrow'),
	});

});
