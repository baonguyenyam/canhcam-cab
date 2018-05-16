function navCollapseAllPanels4() {
	var searchTerm, panelContainerId;
	$.expr[':'].containsCaseInsensitive = function (n, i, m) {
		return jQuery(n).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
	};

	$('.canhcam-nav-4 #accordion_search_bar').on('change keyup paste click', function () {
		searchTerm = $(this).val();
		$('.canhcam-nav-4 #accordion > .card').each(function () {
			panelContainerId = '#' + $(this).attr('id');
			$(panelContainerId + ':not(:containsCaseInsensitive(' + searchTerm + '))').hide();
			$(panelContainerId + ':containsCaseInsensitive(' + searchTerm + ')').show();
		});
	});

	var openAllPanels = function (aId) {
		$(aId + ' .collapse:not(".show")').collapse('show');
	}
	var closeAllPanels = function (aId) {
		$(aId + ' .collapse.show').collapse('hide');
	}
	$(".canhcam-nav-4 .toggle-accordion").on("click", function () {
		var accordionId = $(this).attr("accordion-id"),
			numPanelOpen = $(accordionId + ' .collapse.show').length;
		$(this).toggleClass("active");
		if (numPanelOpen == 0) {
			openAllPanels(accordionId);
		} else {
			closeAllPanels(accordionId);
		}
		setTimeout(() => {
			checkOpenPanel4()
		}, 500);
	})
	$(".canhcam-nav-4 #accordion .card").on("click", function () {
		checkClickPanel4($(this))
	})
}

function checkOpenPanel4() {
	$('.canhcam-nav-4 #accordion .card').each(function () {
		var getactive = $(this).find('.collapse.show').length
		if (getactive > 0) {
			$(this).addClass('active')
		} else {
			$(this).removeClass('active')
		}
	})
}
function checkClickPanel4(e) {
	var name = e.find('a').attr('href')
	$(name).on('hidden.bs.collapse', function () {
		e.removeClass('active')
	})
	$(name).on('shown.bs.collapse', function () {
		e.addClass('active')
	})
}

$(document).ready(function () {

	navCollapseAllPanels4()
	checkOpenPanel4()

});
