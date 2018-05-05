function listToSelect() {
	$('[data-select]').each(function () {
		var list = $(this), select = $(document.createElement('select')).insertBefore($(this).hide());
		select.addClass('custom-select').attr('data-select-show', '');
		$('>li a', this).each(function () {
			var option = $(document.createElement('option'))
				.appendTo(select)
				.val(this.href)
				.html($(this).html())
		});
		list.hide().removeAttr('data-select').attr('data-select-changed', '');
		select.on('change', function () {
			var url = $(this).val();
			if (url) {
				window.location = url;
			}
			return false;
		});
	});
}

function selectChangeToList() {
	if (CANHCAM_APP.ACTIVE_LIST_TO_SELECT) {
		if ($(window).width() > CANHCAM_APP.CHANGE_GRID_SM) {
			$('[data-select-changed]').each(function () {
				$(this).show().removeAttr('data-select-changed').attr('data-select', '');
			})
			$('[data-select-show]').remove()
		} else {
			listToSelect()
		}
	}
}

$(document).ready(function () {
	if (CANHCAM_APP.ACTIVE_LIST_TO_SELECT) {
		if ($(window).width() <= CANHCAM_APP.CHANGE_GRID_SM) {
			listToSelect()
		}
	}
});

$(window).resize(function () {
	if (CANHCAM_APP.ACTIVE_LIST_TO_SELECT) {
		selectChangeToList()
	}
});

