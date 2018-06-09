
function checkTab4() {
	$('.canhcam-tabs-4 #cct-01-tab').tab('show').parents('li').addClass('active')
	$('.canhcam-tabs-4 a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		$(this).parents('ul').find('li').removeClass('active')
		$(this).parents('li').addClass('active')
	})
}

$(document).ready(function () {
	checkTab4()
});
