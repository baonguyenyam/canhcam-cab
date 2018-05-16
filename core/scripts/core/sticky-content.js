function canhCamStickyComtent() {

	$('[data-fix]').each(function () {
		$(this).css({
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
		var typeFix = 'fixed'
		var changeFix = 'static'

		if ($(this).attr('data-fix') && $(this).attr('data-fix').length) {
			toFix = parseInt($(this).attr('data-fix'))
		}
		if ($(this).attr('data-fix-type') && $(this).attr('data-fix-type').length) {
			typeFix = $(this).attr('data-fix-type')
		}
		if ($(this).attr('data-fix-change') && $(this).attr('data-fix-change').length) {
			changeFix = $(this).attr('data-fix-change')
		}

		$(this).css({
			"position": typeFix
		})

		var scrollTop = $(window).scrollTop();
		var elementOffset = $(this).offset().top;
		var currentElementOffset = (elementOffset - scrollTop);
		if (currentElementOffset <= toFix) {
			$(this).css({
				"position": changeFix,
				"top": toFix + 'px'
			})
		}

	});
}


$(document).ready(function () {
	canhCamStickyComtent()
});

$(window).scroll(function () {
	canhCamStickyComtent()
});

$(window).resize(function () {
	canhCamStickyComtent()
})
