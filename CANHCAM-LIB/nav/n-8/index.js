function changeTopBoxes() {
	var geth = $('header').outerHeight();
	$('.canhcam-nav-3').css({
		'top': geth + 'px'
	})
}

$(document).ready(function () {
	changeTopBoxes()
});

$(window).resize(function () {
	changeTopBoxes()
})
