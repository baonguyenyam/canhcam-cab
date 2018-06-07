$(document).ready(function () {
	$('.canhcam-testimonials-1 .owl-carousel').owlCarousel({
		items: 1,
		loop: true,
		center: false,
		padding: 10,
		margin: 20,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		nav: false,
		dots: true,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: false,
		callbacks: true
	});

});

$(window).resize(function () {

})
