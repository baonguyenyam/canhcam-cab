function CanhCamChangeDataHoverClick() {
	$('[data-change]').each(function () {
		var newSrc = $(this).attr('data-new')
		var oldSrc = $(this).attr('data-old')
		var typeChange = $(this).attr('data-change')
		if (typeChange && typeChange.length > 0) {
			if (typeChange === 'src') {
				$(this).hover(function () {
					$(this).attr(typeChange, newSrc)
				}, function () {
					$(this).attr(typeChange, oldSrc)
				});
			} else if (typeChange === 'background' || typeChange === 'background-image') {
				$(this).hover(function () {
					$(this).css(typeChange, "url(" + newSrc + ")")
				}, function () {
					$(this).css(typeChange, "url(" + oldSrc + ")")
				});
			} else if (typeChange === 'class') {
				$(this).hover(function () {
					$(this).removeClass(oldSrc).addClass(newSrc)
				}, function () {
					$(this).removeClass(newSrc).addClass(oldSrc)
				});
			}
		}
	});
};

$(function () {
	CanhCamChangeDataHoverClick();
})


