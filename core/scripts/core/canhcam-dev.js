$(document).ready(function () {
	checkDev()
});

$(window).resize(function () {
	checkDev()
})

function checkDev() {
	if ($('#devtools').length) {
		if ($(window).width() < 576) {
			$('.canhcam-develop #devtools .header-devtools h3').html('Dev - XS')
		} else if ($(window).width() >= 576 && $(window).width() < 768) {
			$('.canhcam-develop #devtools .header-devtools h3').html('Dev - SM')
		} else if ($(window).width() >= 768 && $(window).width() < 992) {
			$('.canhcam-develop #devtools .header-devtools h3').html('Dev - MD')
		} else if ($(window).width() >= 992 && $(window).width() < 1200) {
			$('.canhcam-develop #devtools .header-devtools h3').html('Dev - LG')
		} else {
			$('.canhcam-develop #devtools .header-devtools h3').html('Dev - XL')
		}
	}
}

(function ($) {
	$.fn.drags = function (opt) {

		opt = $.extend({ handle: "", cursor: "move" }, opt);

		if (opt.handle === "") {
			var $el = this;
		} else {
			var $el = this.find(opt.handle);
		}

		return $el.find('.header-devtools').css('cursor', opt.cursor).on("mousedown", function (e) {
			// getSizeDevTo()
			if (opt.handle === "") {
				var $drag = $(this).parent().addClass('draggable');
			} else {
				var $drag = $(this).parent().addClass('active-handle').parent().addClass('draggable');
			}
			var z_idx = $drag.css('z-index'),
				drg_h = $drag.outerHeight(),
				drg_w = $drag.outerWidth(),
				pos_y = $drag.offset().top + drg_h - e.pageY,
				pos_x = $drag.offset().left + drg_w - e.pageX;
			$drag.css('z-index', 99999).parents().on("mousemove", function (e) {
				getSizeDevTo()
				$('.draggable').offset({
					top: e.pageY + pos_y - drg_h,
					left: e.pageX + pos_x - drg_w
				}).on("mouseup", function () {
					// getSizeDevTo()
					$(this).removeClass('draggable').css('z-index', z_idx);
				});
				$('#devtools .inline').offset({
					top: e.pageY + pos_y - drg_h
				})
				$('#devtools .online').offset({
					left: e.pageX + pos_x - drg_w
				})
			});
			e.preventDefault(); // disable selection
		}).on("mouseup", function () {
			// getSizeDevTo()
			if (opt.handle === "") {
				$(this).removeClass('draggable');
			} else {
				$(this).removeClass('active-handle').parent().removeClass('draggable');
			}
		});

	}
})(jQuery);

if (CANHCAM_APP.DEV_MODE) {

	$('body').append('<div id="devtools"> <div class="online"></div><div class="inline"></div><div class="header-devtools"> <h3>Dev - XL</h3> </div><div class="body-devtools"> <button class="btn btn-block btn-secondary btn-sm" type="button">Toogle Grid</button> </div></div>')

	$('#devtools').drags();
	createDevTo()

	$(document).ready(function () {
		if ($('.canhcam-develop #devtools').length) {
			var devtls = $('.canhcam-develop #devtools').find('.body-devtools button')
			devtls.click(function () {
				if ($(this).attr('data-click-state') == 1) {
					$(this).attr('data-click-state', 0)
					$('body').toggleClass('active')
					$('body').find('.devtool-gird').remove()
				} else {
					$(this).attr('data-click-state', 1)
					$('body').toggleClass('active')
					if (CANHCAM_APP.DEV_MODE_GIRD_FULL) {
						$('body').append('<div class="devtool-gird"><div class="container-fluid d-flex"><div class="row d-flex align-items-stretch bd-highlight"><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div></div></div></div>')
					} else {
						$('body').append('<div class="devtool-gird"><div class="container d-flex"><div class="row d-flex align-items-stretch bd-highlight"><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div></div></div></div>')
					}
				}
			});
		}
	});

}

function getSizeDevTo() {
	$('#devtools .body-devtools .size .width').html('W: ' + $(window).width() + '')
	$('#devtools .body-devtools .size .height').html('H: ' + $(window).height() + '')
	$('#devtools .body-devtools .size .top').html('T: ' + $('#devtools').offset().top + '')
	$('#devtools .body-devtools .size .left').html('L: ' + $('#devtools').offset().left + '')
}

$(window).resize(function () {
	if ($('#devtools').length) {
		getSizeDevTo()
	}
});

function createDevTo() {
	$('#devtools .body-devtools').append('<div class="size"><div class="width">W: ' + $(window).width() + '</div><div class="height">H: ' + $(window).height() + '</div><div class="top">T: ' + $('#devtools').offset().top + '</div><div class="left">L: ' + $('#devtools').offset().left + '</div></div>')
}
