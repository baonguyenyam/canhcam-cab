$('.canhcam-carousel-9 .slide-1').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	asNavFor: '.slide',
	draggable: false
});
$('.canhcam-carousel-9 .slide-2').slick({
	loop: false,
	slidesToShow: 5,
	slidesToScroll: 1,
	asNavFor: '.slide',
	dots: false,
	focusOnSelect: true,
	variableWidth: true
});
$('.canhcam-carousel-9 .slide-3').slick({
	loop: false,
	slidesToShow: 1,
	asNavFor: '.slide',
	arrows: false,
	draggable: false,
	responsive: [

		{
			breakpoint: 992,
			settings: {
				arrows: true
			}
		},

	]
});
