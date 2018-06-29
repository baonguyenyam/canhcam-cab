$(function() {
	$('.canhcam-carousel-8 .list-content-items').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.list-items',
		autoplay: false
	});
	$('.canhcam-carousel-8 .list-items').slick({
		slidesToShow: 5,
		slidesToScroll: 5,
		asNavFor: '.list-content-items',
		dots: false,
		centerMode: false,
		focusOnSelect: true,
		infinite: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		]
	})
});
$(function(){
	 $('.canhcam-carousel-8 .content').perfectScrollbar();
});
