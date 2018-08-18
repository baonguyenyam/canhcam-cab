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
// Trigger BTN
function TriggerBtn(){
	function triggerFilter($bool) {
		var elementsToTrigger = $([$('.pl-filter-trigger'), $('.pl-filter'), $('.pl-content')]);
		elementsToTrigger.each(function(){
			$(this).toggleClass('active', $bool);
		});
	}
		var onpenBtn = $('.canhcam-shop-5 .product-lists .pl-filter-trigger'),
			closeBtn = $('.canhcam-shop-5 .product-lists .pl-close');
		$(onpenBtn).on('click', function(){
			triggerFilter(true);
		});
		$(closeBtn).on('click', function(){
			triggerFilter(false);
		});
}
// Toggle .pl-filter-content
function ClickH4(){
	$('.pl-filter-block h4').on('click', function(){
		$(this).toggleClass('closed').siblings('.pl-filter-content').slideToggle(300);
	})
}
// Toggle .sub-filter
function SubFilter(){
	$('.pl-filter-content nav li .sub-filter').slideUp();
	$('.pl-filter-content nav li .dropdown-filter').on('click', function(){
		$(this).toggleClass('closed').siblings('.sub-filter').slideToggle(300);
	})
}
// Top filter-menu
function TopFilterMenu(){
	var geth = $('header').outerHeight();
	$('.canhcam-shop-5 .product-lists .pl-filter').css({
		top: geth
	})
}
$(document).ready(function() {
	getHightBox();
	TriggerBtn();

	ClickH4();
	SubFilter();
	$('#pl-filter-wrapper').scrollbar()
	// TopFilterMenu();

});

$(window).resize(function () {
	getHightBox();
	TriggerBtn();
	ClickH4();
	SubFilter();
	// TopFilterMenu();
})