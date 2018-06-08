var geActive = '.canhcam-tabs-3 .tabs-header .active',
	activePos = $(geActive).position(),
	tabItems = $('.canhcam-tabs-3 .tabs-header ul li'),
	tabCurrentItem = tabItems.filter('.active'),
	activeTab1 = {
	changePos: function () {
		activePos = $(geActive).position();
		$('.canhcam-tabs-3 .border-tab').stop().css({
			left: activePos.left,
			width: $(geActive).width()
		});
	},
	changeTab: function () {
		var getTabId = $(geActive + ' a').attr('tab-id');
		$('.canhcam-tabs-3 .tab').stop().fadeOut(300, function () {
			$(this).removeClass('active');
		}).hide();
		$('.canhcam-tabs-3 .tab[tab-id=' + getTabId + ']').stop().fadeIn(300, function () {
			$(this).addClass('active');
		});
	},
	doButton: function () {
		$('.canhcam-tabs-3 .tabs-header a').on('click', function (e) {
			e.preventDefault();
			var tabId = $(this).attr('tab-id');
			$('.canhcam-tabs-3 .tabs-header a').stop().parent().removeClass('active');
			$(this).stop().parent().addClass('active');
			activeTab1.changePos();
			tabCurrentItem = tabItems.filter('.active');
			$('.canhcam-tabs-3 .tab').stop().fadeOut(300, function () {
				$(this).removeClass('active');
			}).hide();
			$('.canhcam-tabs-3 .tab[tab-id="' + tabId + '"]').stop().fadeIn(300, function () {
				$(this).addClass('active');
			});
		});

		$('.canhcam-tabs-3 #next').on('click', function (e) {
			e.preventDefault();
			var nextItem = tabCurrentItem.next();
			tabCurrentItem.removeClass('active');
			if (nextItem.length) {
				tabCurrentItem = nextItem.addClass('active');
			} else {
				tabCurrentItem = tabItems.first().addClass('active');
			}
			activeTab1.changePos();
			activeTab1.changeTab();
		});

		$('.canhcam-tabs-3  #prev').on('click', function (e) {
			e.preventDefault();
			var prevItem = tabCurrentItem.prev();
			tabCurrentItem.removeClass('active');
			if (prevItem.length) {
				tabCurrentItem = prevItem.addClass('active');
			} else {
				tabCurrentItem = tabItems.last().addClass('active');
			}
			activeTab1.changePos();
			activeTab1.changeTab();
		});
	}
}


$(document).ready(function () {
	activeTab1.changePos()
	activeTab1.doButton()
});
