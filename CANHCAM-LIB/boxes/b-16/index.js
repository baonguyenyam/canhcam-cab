function changeItemBoxes16() {
	if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
		var geth = $('.canhcam-boxes-16 .top-project ').outerHeight();
		$('.canhcam-boxes-16 .part-list').each(function () {
			var countitem = $(this).find('.item').length
			$(this).find('.item figure').each(function () {
				$(this).css({
					'height': 'calc(' + (geth / countitem) + 'px - 1rem)'
				})
			});
		})
	} else {
		$('.canhcam-boxes-16 .part-list .item figure').each(function () {
			$(this).css({
				'height': 'initial'
			})
		});
	}
}

$(document).ready(function() {
	changeItemBoxes16()
});

$(window).resize(function () {
	changeItemBoxes16()
})
