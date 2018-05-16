function initStickyNav1() {

	$('[data-fix]').each(function () {
		$(this).css({
			"position": 'absolute',
			"z-index": '500'
		})
		if ($(this).attr('data-top') && $(this).attr('data-top').length) {
			$(this).css({
				"top": $(this).attr('data-top')
			})
		}
		if ($(this).attr('data-left') && $(this).attr('data-left').length) {
			$(this).css({
				"left": $(this).attr('data-left')
			})
		}
		if ($(this).attr('data-bottom') && $(this).attr('data-bottom').length) {
			$(this).css({
				"bottom": $(this).attr('data-bottom')
			})
		}
		if ($(this).attr('data-right') && $(this).attr('data-right').length) {
			$(this).css({
				"right": $(this).attr('data-right')
			})
		}
		var toFix = 0
		if ($(this).attr('data-fix') && $(this).attr('data-fix').length) {
			var toFix = parseInt($(this).attr('data-fix'))
		}
		var scrollTop = $(window).scrollTop();
		var elementOffset = $(this).offset().top;
		var currentElementOffset = (elementOffset - scrollTop);
		if (currentElementOffset <= toFix){
			$(this).css({
				"position": 'fixed',
				"top": toFix + 'px'
			})
		}

	});
}


$(document).ready(function () {
	initStickyNav1()
});

$(window).scroll(function () {
	initStickyNav1()
});

$(window).resize(function () {
	initStickyNav1()
})
