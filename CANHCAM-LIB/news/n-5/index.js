
$(document).ready(function() {
	$('.canhcam-news-5 .news-list #list').click(function (event) {
		event.preventDefault();
		$(this).addClass('active')
		$('.canhcam-news-5 .news-list #grid').removeClass('active')
		$('.canhcam-news-5 #products').addClass('list-group-wrapper').removeClass('grid-group-wrapper');
	});
	$('.canhcam-news-5 .news-list #grid').click(function (event) {
		event.preventDefault();
		$(this).addClass('active')
		$('.canhcam-news-5 .news-list #list').removeClass('active')
		$('.canhcam-news-5 #products').removeClass('list-group-wrapper').addClass('grid-group-wrapper');
	});
});

$(window).resize(function () {
})
