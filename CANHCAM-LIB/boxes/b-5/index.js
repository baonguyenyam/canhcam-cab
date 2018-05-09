function changeItemBoxes5() {
	if ($(window).width() > CANHCAM_APP.CHANGE_GRID_SM) {
		var geth = $('.canhcam-boxes-5 .top-project .item:first-child figure').outerHeight();
		$('.canhcam-boxes-5 .part-list').each(function () {
			var countitem = $(this).find('.item').length
			$(this).find('.item figure').each(function () {
				$(this).css({
					'height': 'calc(' + (geth / countitem) + 'px - 1rem)'
				})
			});
		})
	} else {
		$('.canhcam-boxes-5 .part-list .item figure').each(function () {
			$(this).css({
				'height': 'initial'
			})
		});
	}
}

$(document).ready(function() {
	changeItemBoxes5()
});

$(window).resize(function () {
	changeItemBoxes5()
})
