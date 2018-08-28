$(document).ready(function () {
	$('.canhcam-nav-9 nav li a').on('click', function () {
		$('.canhcam-nav-9 nav li a').removeClass('active')
		$(this).addClass('active')
		$('html, body').animate({
			scrollTop: $('#'+$(this).attr('data-link')).offset().top - $('.canhcam-nav-9').outerHeight() - 20
		}, 500);
		return false;
	})

	setTimeout(() => {
		if($('header').hasClass( "active" ) == true) {
			var m = $('header').outerHeight()
			$('.canhcam-nav-9').addClass('active').css({
				"top": (m - 1) + "px"
			})
		}
	}, 200);

})

function checkMenuScroll9() {
	var e = $(window).scrollTop(),
		m = $('header').outerHeight(),
		n = $('.canhcam-nav-9').offset().top,
		l = $(window).height()
	if (((n - m) - e) <= 0) {
		if($('header').hasClass( "active" ) == true) {
			$('.canhcam-nav-9').addClass('active').css({
				"top": (m - 1) + "px"
			})
		}
	} else {
		$('.canhcam-nav-9').removeClass('active').removeAttr('style')
	}

	$('.canhcam-nav-9 nav li').each(function () {
		var u = $(this).find('a').attr('data-link')
		var s = $('#' + u).offset().top
		if(((l + e) - 400) >= s) {
			$('.canhcam-nav-9 nav li a').removeClass('active')
			$(this).find('a').addClass('active')
		}
	})
}

$(window).on('scroll', function () {
	if($('.canhcam-nav-9').length>0) {
		checkMenuScroll9()
	}
})
