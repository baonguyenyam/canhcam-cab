$(function () {
	$('.canhcam-banner-1 .list-items').each(function () {
		$('.canhcam-banner-1 .list-items').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			fade: false,
			infinite: false,
			dots: true,
			speed: 300,
			autoplay: false,
			autoplaySpeed: 2000,
			// centerMode: true,
			// variableWidth: true,
			responsive: [
				{
					breakpoint: 992,
					settings: {

					}
				},
				{
					breakpoint: 480,
					settings: {

					}
				}
			]
		})
	});
});
