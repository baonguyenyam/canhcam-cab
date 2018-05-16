function changeNewsDetail1() {
	$(".canhcam-news-details-1 .news-read").lightGallery({
		thumbnail: true,
		animateThumb: false,
		showThumbByDefault: false,
		selector: '.item-news-read'
	});
}
function createNewsSocial1() {
	var newsFullPath = document.URL
	var newsFullPathEncode = encodeURIComponent(document.URL)
	$('.fb-share-button').attr('data-href', newsFullPath)
	$('.fb-share-button .fb-xfbml-parse-ignore').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + newsFullPathEncode + '&src=sdkpreparse')
	$('.twitter-share-button').attr('data-url', newsFullPath)
}

function changeIMGtoDiv1(){
	$('.canhcam-news-details-1 .othernews .item figure').each(function () {
		var tmp = $(this).find('img').attr('src')
		$(this).append('<div class="thumb"></div>')
		$(this).find('.thumb').css({
			"background-image": "url(" + tmp + ")",
			"background-position": "center center",
			"background-size": "cover"
		})
	})
}


$(document).ready(function() {
	changeNewsDetail1()
	createNewsSocial1()
	changeIMGtoDiv1()
});

$(window).resize(function () {
	changeIMGtoDiv1()
})
