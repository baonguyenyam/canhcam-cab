function changeNewsItemNews2() {
	if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
		$('.canhcam-news-2 .news-hot').each(function () {
			var geth = $(this).find('.top-list .item:first-child figure').outerHeight();
			var countitem = $(this).find('.part-list').find('.item').length
			$(this).find('.part-list .item figure').each(function () {
				$(this).css({
					'height': 'calc(' + (geth / countitem) + 'px - 1rem)'
				})
			});
		})
	} else {
		$('.canhcam-news-2 .part-list .item figure').each(function () {
			$(this).css({
				'height': 'initial'
			})
		});
	}
}


$(document).ready(function() {
	changeNewsItemNews2()
	$('.canhcam-news-2 .news-list #list').click(function (event) {
		event.preventDefault();
		$(this).addClass('active')
		$('.canhcam-news-2 .news-list #grid').removeClass('active')
		$('.canhcam-news-2 #products').addClass('list-group-wrapper').removeClass('grid-group-wrapper');
	});
	$('.canhcam-news-2 .news-list #grid').click(function (event) {
		event.preventDefault();
		$(this).addClass('active')
		$('.canhcam-news-2 .news-list #list').removeClass('active')
		$('.canhcam-news-2 #products').removeClass('list-group-wrapper').addClass('grid-group-wrapper');
	});
});

$(window).resize(function () {
	changeNewsItemNews2()
})
