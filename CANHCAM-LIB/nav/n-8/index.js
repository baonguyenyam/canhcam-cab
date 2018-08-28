function changeTopBoxes8() {
	var geth = $('header').outerHeight();
	$('.canhcam-nav-8').css({
		'top': geth + 'px'
	})
}

$(document).ready(function () {
	changeTopBoxes8()
});

$(window).resize(function () {
	changeTopBoxes8()
})
