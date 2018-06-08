
function checkTab1() {
	$('.canhcam-tabs-1 #cct-01-tab').tab('show').parents('li').addClass('active')
	$('.canhcam-tabs-1 a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		$(this).parents('ul').find('li').removeClass('active')
		$(this).parents('li').addClass('active')
	})
}

$(document).ready(function () {
	checkTab1()
});
