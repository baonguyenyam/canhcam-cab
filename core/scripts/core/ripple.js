// Ripple
function ccCreateRipple() {
	$('[ripple]').on('click', function (e) {
		var rippleDiv = $('<div class="ripple" />'),
			rippleOffset = $(this).offset(),
			rippleY = e.pageY - rippleOffset.top,
			rippleX = e.pageX - rippleOffset.left,
			ripple = $('.ripple');

		rippleDiv.css({
			top: rippleY - (ripple.height() / 2),
			left: rippleX - (ripple.width() / 2),
			background: $(this).attr("ripple-color")
		}).appendTo($(this));
		window.setTimeout(function () {
			rippleDiv.remove();
		}, 1500);
	});
}

$(document).ready(function () {
	ccCreateRipple()
});
