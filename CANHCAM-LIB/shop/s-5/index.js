function getHightBox() {
	if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
		var geth = $('.canhcam-shop-5 .product-lists .pl-content .pl-boximg').outerHeight();
		$('.canhcam-shop-5 .product-lists .pl-content ').each(function () {
			$(this).find('.pl-hidden').each(function () {
				$(this).css({
					'height': geth
				})
			});
		})
	} else {
		$('.canhcam-shop-5 .product-lists .pl-content .pl-hidden').each(function () {
			$(this).css({
				'height': 'initial'
			})
		});
	}
}
function triggerFilter($bool) {
	var elementsToTrigger = $([$('.pl-filter-trigger'), $('.pl-filter'), $('.pl-content')]);
	elementsToTrigger.each(function(){
		$(this).toggleClass('active', $bool);
	});
}
$(document).ready(function() {
	getHightBox();
	// add class active
	var onpenBtn = $('.canhcam-shop-5 .product-lists .pl-filter-trigger'),
		closeBtn = $('.canhcam-shop-5 .product-lists .pl-close');
	$(onpenBtn).on('click', function(){
		triggerFilter(true);
	});
	$(closeBtn).on('click', function(){
		triggerFilter(false);
	});
});

$(window).resize(function () {
	getHightBox()
})