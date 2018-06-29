function getBG16(time) {
	$('.canhcam-boxes-16 .item').each(function () {
		var newgt = $(this).find('figcaption p').innerHeight()
		$(this).find('figcaption p').css({
			"height": "0px",
			"overflow": "hidden"
		})
		var em = $(this).find('figure').innerHeight()
		var newg = $(this).find('figcaption').innerHeight()
		$(this).hover(function () {
			$(this).find('figcaption').animate({
				height: em + "px"
			}, {
				duration: time,
				complete: function () {}
			})
			$(this).find('figcaption p').animate({
				height : newgt + "px"
			}, {
				duration: time,
				complete: function () {}
			})
		  }, function () {
			$(this).find('figcaption').animate({
				height : newg + "px"
			}, {
				duration: time,
				complete: function () {}
			})
			$(this).find('figcaption p').animate({
				height : "0px"
			}, {
				duration: time,
				complete: function () {}
			})
		  });
	})
}

$(document).ready(function () {
	if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
		getBG16(1000)
	}
});
