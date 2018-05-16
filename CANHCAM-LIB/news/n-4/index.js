
$(document).ready(function() {
	$('.canhcam-news-4 .news-list #list').click(function (event) {
		event.preventDefault();
		$(this).addClass('active')
		$('.canhcam-news-4 .news-list #grid').removeClass('active')
		$('.canhcam-news-4 #products').addClass('list-group-wrapper').removeClass('grid-group-wrapper');
	});
	$('.canhcam-news-4 .news-list #grid').click(function (event) {
		event.preventDefault();
		$(this).addClass('active')
		$('.canhcam-news-4 .news-list #list').removeClass('active')
		$('.canhcam-news-4 #products').removeClass('list-group-wrapper').addClass('grid-group-wrapper');
	});
});

$(window).resize(function () {
})
