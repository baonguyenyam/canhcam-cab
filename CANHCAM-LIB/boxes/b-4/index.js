function changeItemBoxes4() {
	if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
		var geth = $('.canhcam-boxes-4 .top-project .item:first-child figure').outerHeight();
		$('.canhcam-boxes-4 .part-list').each(function () {
			var countitem = $(this).find('.item').length
			$(this).find('.item figure').each(function () {
				$(this).css({
					'height': 'calc(' + (geth / countitem) + 'px - 1rem)'
				})
			});
		})
	} else {
		$('.canhcam-boxes-4 .part-list .item figure').each(function () {
			$(this).css({
				'height': 'initial'
			})
		});
	}
}

$(document).ready(function() {
	changeItemBoxes4()
});

$(window).resize(function () {
	changeItemBoxes4()
})
