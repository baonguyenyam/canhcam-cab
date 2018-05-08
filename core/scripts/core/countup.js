function countUpCanhCam() {

	$('[data-count]').each(function () {
		var elm = $(this).offset().top
		var docH = $(window).height()
		var docS = $(window).scrollTop()
		var padingTop = 0
		if ($(this).attr('data-top') && $(this).attr('data-top').length){
			padingTop = parseInt($(this).attr('data-top'));
		}
		var result = (elm + padingTop) - (docH + docS)
		var run = false

		if (result <= 0 && !run) {
			var $this = $(this),
				countTo = $this.attr('data-count'),
				durationTo = parseInt($this.attr('data-duration'));
			$({ countNum: $this.text() }).animate({
				countNum: countTo
			}, {
					duration: durationTo,
					easing: 'linear',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
						run = true
					}
				});
		}

	});
}

$(document).ready(function () {
	countUpCanhCam()

});

$(window).scroll(function () {
	countUpCanhCam()

});

$(window).resize(function () {
	countUpCanhCam()
})
