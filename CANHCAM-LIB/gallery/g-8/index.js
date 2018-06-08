function galleryMasory8() {
	var wall = new Freewall(".canhcam-gallery-8 .gallery-details .gallery-lists");
	wall.reset({
		selector: '.item',
		animate: true,
		cellW: $(window).width() <= CANHCAM_APP.CHANGE_GRID_SM ? 200 : 300,
		cellH: 'auto',
		onResize: function () {
			wall.fitWidth();
		}
	});
	wall.fitWidth();
	$(window).trigger("resize");
	$(".canhcam-gallery-8 .gallery-details .add-more").click(function () {
		var html = "";
		var temp = '<a class="item" data-fancybox="gallery" href="./img/news/landing-2.jpg" data-caption="TÌm hiểu về HTML"> <figure bg-img="./img/news/landing-2.jpg"> <div class="boxzoom"><img class="img-fluid" src="./img/news/landing-2.jpg" alt="Demo title"></div><figcaption> <div class="text"> <h3>Nhà hàng Lạc Nam</h3> <p>156 Bùi Thị Xuân, Đà Lạt</p></div><span>See more</span> </figcaption> </figure></a>';
		for (var i = 0; i < 5; ++i) {
			html += temp
		}
		wall.appendBlock(html);
		$(window).trigger("resize");
	});


	$('.canhcam-gallery-8 .gallery-details .gallery-lists [data-fancybox="gallery"]').fancybox({
		buttons: [
			"zoom",
			"share",
			"slideShow",
			"fullScreen",
			"download",
			"thumbs",
			"close"
		],
		youtube: {
			controls: 0,
			showinfo: 0
		},
		afterLoad: function (instance, current) {
			current.width = current.$image[0].naturalWidth;
			current.height = current.$image[0].naturalHeight;
		}
	});
}

$(document).ready(function () {
	galleryMasory8()
});
