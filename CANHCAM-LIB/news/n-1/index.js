function changeNewsItemNews1() {
	if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {

		$('.canhcam-news-1 .part-list .item figure').each(function () {
			var geth = $('.canhcam-news-1 .top-list .item:first-child figure').outerHeight();
			var countitem = $('.canhcam-news-1 .part-list').find('.item').length
			$(this).css({
				'height': 'calc(' + (geth / countitem) + 'px - 1rem)'
			})
		})

	} else {
		$('.canhcam-news-1 .part-list .item figure').each(function () {
			$(this).css({
				'height': 'initial'
			})
		});
	}
}


$(document).ready(function() {
	changeNewsItemNews1()

	$('.canhcam-news-1 .owl-carousel').owlCarousel({
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		items: 1,
		loop: true,
		center: true,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		nav: true,
		dots: false,
		autoHeight: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true
	});

	$('.canhcam-news-1 .news-list #list').click(function (event) {
		event.preventDefault();
		$(this).addClass('active')
		$('.canhcam-news-1 .news-list #grid').removeClass('active')
		$('.canhcam-news-1 #products').addClass('list-group-wrapper').removeClass('grid-group-wrapper');
	});
	$('.canhcam-news-1 .news-list #grid').click(function (event) {
		event.preventDefault();
		$(this).addClass('active')
		$('.canhcam-news-1 .news-list #list').removeClass('active')
		$('.canhcam-news-1 #products').removeClass('list-group-wrapper').addClass('grid-group-wrapper');
	});
});

$(window).resize(function () {
	changeNewsItemNews1()
})
