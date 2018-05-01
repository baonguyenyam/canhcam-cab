"use strict";

var CANHCAM_APP = {
	"ACTIVE_FIXED_HEADER": false,
	"HEADER_TRANPARENT": false,
	"ACTIVE_HEADER_POSITION": 1,
	"ACTIVE_PADDING_MAIN": true,
	"ACTIVE_FIXED_FOOTER": true,
	"DISPLAY_FOOTER": 600,
	"ACTIVE_RESPONSIVE": true,
	"ACTIVE_BACKTOTOP": true,
	"DISPLAY_BACKTOTOP": 100,
	"CHANGE_GRID": 991,
	"CHANGE_GRID_SM": 767,
	"DEV_MODE": false,
	"DEV_MODE_GIRD_FULL": false
};

function backToTop() {
	if ($('#back-to-top').length) {
		var backToTop = function backToTop() {
			var scrollTop = $(window).scrollTop();
			if (scrollTop > CANHCAM_APP.DISPLAY_BACKTOTOP) {
				$('#back-to-top').addClass('show');
			} else {
				$('#back-to-top').removeClass('show');
			}
		};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('#back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
}

$(document).ready(function () {
	if (CANHCAM_APP.ACTIVE_BACKTOTOP) {
		backToTop();
	}
});
function CanhCamResponsive() {
	// Set BG Resposive
	$('[bg-img]').each(function () {
		var bgimg = $(this).attr('bg-img');
		$(this).css({
			"background-image": "url(" + bgimg + ")",
			"background-position": "center center",
			"background-size": "cover"
		});
	});

	$('[bg-img-responsive]').each(function () {
		var bgimg = $(this).attr('bg-img-responsive');
		var bgimgsm = $(this).attr('bg-img-responsive-sm');
		var bgimgxs = $(this).attr('bg-img-responsive-xs');
		if ($(window).width() >= CANHCAM_APP.CHANGE_GRID) {
			$(this).css({
				"background-image": "url(" + bgimg + ")",
				"background-position": "center center",
				"background-size": "cover"
			});
		} else if ($(window).width() < CANHCAM_APP.CHANGE_GRID && $(window).width() > 600) {
			$(this).css({
				"background-image": "url(" + bgimgsm + ")",
				"background-position": "center center",
				"background-size": "cover"
			});
		} else {
			$(this).css({
				"background-image": "url(" + bgimgxs + ")",
				"background-position": "center center",
				"background-size": "cover"
			});
		}
	});

	$('[img-src-responsive]').each(function () {
		var bgimg2 = $(this).attr('img-src-responsive');
		var bgimg2sm = $(this).attr('img-src-responsive-sm');
		var bgimg2xs = $(this).attr('img-src-responsive-xs');
		if ($(window).width() >= CANHCAM_APP.CHANGE_GRID) {
			$(this).attr("src", "" + bgimg2 + "");
		} else if ($(window).width() < CANHCAM_APP.CHANGE_GRID && $(window).width() > 600) {
			$(this).attr("src", "" + bgimg2sm + "");
		} else {
			$(this).attr("src", "" + bgimg2xs + "");
		}
	});
};

$(function () {
	if (CANHCAM_APP.ACTIVE_RESPONSIVE) {
		CanhCamResponsive();
	}
});

$(window).resize(function () {
	if (CANHCAM_APP.ACTIVE_RESPONSIVE) {
		CanhCamResponsive();
	}
});
$(function () {
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover({
		trigger: 'focus'
	});
});
$(document).ready(function () {
	checkDev();
});

$(window).resize(function () {
	checkDev();
});

function checkDev() {
	if ($(window).width() < 576) {
		$('.canhcam-develop .devtools .header-devtools h3').html('Dev - XS');
	} else if ($(window).width() >= 576 && $(window).width() < 768) {
		$('.canhcam-develop .devtools .header-devtools h3').html('Dev - SM');
	} else if ($(window).width() >= 768 && $(window).width() < 992) {
		$('.canhcam-develop .devtools .header-devtools h3').html('Dev - MD');
	} else if ($(window).width() >= 992 && $(window).width() < 1200) {
		$('.canhcam-develop .devtools .header-devtools h3').html('Dev - LG');
	} else {
		$('.canhcam-develop .devtools .header-devtools h3').html('Dev - XL');
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
				$('.draggable').offset({
					top: e.pageY + pos_y - drg_h,
					left: e.pageX + pos_x - drg_w
				}).on("mouseup", function () {
					$(this).removeClass('draggable').css('z-index', z_idx);
				});
			});
			e.preventDefault(); // disable selection
		}).on("mouseup", function () {
			if (opt.handle === "") {
				$(this).removeClass('draggable');
			} else {
				$(this).removeClass('active-handle').parent().removeClass('draggable');
			}
		});
	};
})(jQuery);

if (CANHCAM_APP.DEV_MODE) {

	$('.devtools').drags();

	$(document).ready(function () {
		if ($('.canhcam-develop .devtools').length) {
			var devtls = $('.canhcam-develop .devtools').find('.body-devtools button');
			devtls.click(function () {
				if ($(this).attr('data-click-state') == 1) {
					$(this).attr('data-click-state', 0);
					$('body').toggleClass('active');
					$('body').find('.devtool-gird').remove();
				} else {
					$(this).attr('data-click-state', 1);
					$('body').toggleClass('active');
					if (CANHCAM_APP.DEV_MODE_GIRD_FULL) {
						$('body').append('<div class="devtool-gird"><div class="container-fluid d-flex"><div class="row d-flex align-items-stretch bd-highlight"><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div></div></div></div>');
					} else {
						$('body').append('<div class="devtool-gird"><div class="container d-flex"><div class="row d-flex align-items-stretch bd-highlight"><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div></div></div></div>');
					}
				}
			});
		}
	});
}
function setFooter() {
	var bodyHeight = $("body").outerHeight(),
	    headerHeight = $("header").outerHeight(),
	    footerHeight = $("footer").outerHeight(),
	    mainHeight = $("main").outerHeight(),
	    curentHeight = mainHeight + headerHeight + footerHeight,
	    curentfixedHeight = mainHeight + footerHeight,
	    newHeight = bodyHeight - (headerHeight + footerHeight),
	    newfixedHeight = bodyHeight - footerHeight;
	if ($(window).width() > CANHCAM_APP.DISPLAY_FOOTER) {
		if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
			$("main").css('min-height', newfixedHeight + 'px');
		} else {
			if (!CANHCAM_APP.ACTIVE_FIXED_HEADER) {
				$("main").css('min-height', newHeight + 'px');
			} else {
				$("main").css('min-height', newfixedHeight + 'px');
			}
		}
	} else {
		$("main").css('min-height', 'initial');
	}
}

$(document).ready(function () {
	if (CANHCAM_APP.ACTIVE_FIXED_FOOTER) {
		setFooter();
	}
});

$(window).resize(function () {
	if (CANHCAM_APP.ACTIVE_FIXED_FOOTER) {
		setFooter();
	}
});
function setHeader(elm) {
	if (elm >= CANHCAM_APP.ACTIVE_HEADER_POSITION) {
		$("header").addClass('active');
	} else {
		$("header").removeClass('active');
	}
}

$(document).ready(function () {
	if (CANHCAM_APP.ACTIVE_FIXED_HEADER) {
		$("header").addClass('fixedheader');
		if ($(window).scrollTop() >= CANHCAM_APP.ACTIVE_HEADER_POSITION) {
			setHeader($(window).scrollTop());
		}
	} else {
		if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
			$("header").addClass('fixedheader');
		} else {
			$("header").removeClass('fixedheader');
		}
	}
	if ($("header").hasClass("fixedheader")) {
		$("main").addClass('main-fixedheader');
	}
});

// Fixed Header
$(window).scroll(function () {
	setHeader($(document).scrollTop());
});
// Fixed Header
$(window).resize(function () {
	if (!CANHCAM_APP.ACTIVE_FIXED_HEADER) {
		if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
			$("header").addClass('fixedheader');
		} else {
			$("header").removeClass('fixedheader');
		}
	}
});

function setMain() {
	var headerHeight = $("header").outerHeight();
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
		$("main").css('padding-top', headerHeight + 'px');
	} else {
		if (!CANHCAM_APP.ACTIVE_PADDING_MAIN) {
			$("main").css('padding-top', '0px');
		} else {
			if (!CANHCAM_APP.ACTIVE_FIXED_HEADER) {
				$("main").css('padding-top', 'initial');
			} else {
				$("main").css('padding-top', headerHeight + 'px');
			}
		}
	}
}

$(document).ready(function () {
	setMain();
});

$(window).resize(function () {
	setMain();
});

function setHeaderTranparent(elm) {
	if (elm >= CANHCAM_APP.ACTIVE_HEADER_POSITION) {
		$("header").removeClass('has-tranparent');
	} else {
		$("header").addClass('has-tranparent');
	}
}

$(document).ready(function () {
	if (CANHCAM_APP.HEADER_TRANPARENT) {
		$("header").addClass('has-tranparent');
		if ($(window).scrollTop() >= CANHCAM_APP.ACTIVE_HEADER_POSITION) {
			setHeaderTranparent($(window).scrollTop());
		}
	}
});

// Tranparent Header
$(window).scroll(function () {
	if (CANHCAM_APP.HEADER_TRANPARENT) {
		setHeaderTranparent($(document).scrollTop());
	}
});

// Copyright 2014-2017 The Bootstrap Authors
// Copyright 2014-2017 Twitter, Inc.
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement('style');
	msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
	document.head.appendChild(msViewportStyle);
}

$(function () {
	var nua = navigator.userAgent;
	var isAndroid = nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1;
	if (isAndroid) {
		$('select.form-control').removeClass('form-control').css('width', '100%');
	}
});
function listToSelect() {
	$('[data-select]').each(function () {
		var list = $(this),
		    select = $(document.createElement('select')).insertBefore($(this).hide());
		select.addClass('custom-select').attr('data-select-show', '');
		$('>li a', this).each(function () {
			var option = $(document.createElement('option')).appendTo(select).val(this.href).html($(this).html());
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
	if ($(window).width() > CANHCAM_APP.CHANGE_GRID_SM) {
		$('[data-select-changed]').each(function () {
			$(this).show().removeAttr('data-select-changed').attr('data-select', '');
		});
		$('[data-select-show]').remove();
	} else {
		listToSelect();
	}
}

$(document).ready(function () {
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID_SM) {
		listToSelect();
	}
});

$(window).resize(function () {
	selectChangeToList();
});

console.log('%cCANHCAM', 'font-size:100px;color:#ff451a;text-shadow:0 1px 0 #f73936,0 2px 0 #f73936 ,0 3px 0 #f73936 ,0 4px 0 #f73936 ,0 5px 0 #f73936 ,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');
console.log('%c CANHCAM ' + '%c - The best Web Solutions Provider', 'border-radius: 2px; padding: 3px; background: #ff451a; color: #FFF', 'color: #ff451a');
console.warn("CANHCAM warning: This is a browser feature intended for developers. If someone told you to copy and paste something here to enable a CANHCAM feature or 'hack' someone's account, it is a scam and will give them access to your CANHCAM account.");
document.onkeyup = function (e) {
	var e = e || window.event;
	if (e.altKey && e.ctrlKey && e.shiftKey && e.which == 13) {
		$('body');
		alert('BAO NGUYEN - 0969689893\nEmail: baonguyenyam@gmail.com\nWeb: baonguyenyam.github.io');
		return false;
	}
};

$(document).ready(function () {

	$(".select2").select2({
		placeholder: "Select one"
	});

	$('.select2').on("select2:select", function (e) {
		var valSelect = $(e.currentTarget).val();
	});
	$('.select2').on("select2:unselect", function (e) {
		var valUnselect = $(e.currentTarget).val();
	});
});

function selectResset(e) {
	$(e).val(null).trigger("change", 0);
}
$(document).ready(function () {
	$('[data-toggle="validator"]').validator({
		feedback: {
			success: 'fa fa-check',
			error: 'fa fa-close'
		}
	}).on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			$('[data-toggle="validator"]').find('select').parent('.form-group').addClass('has-danger');
		}
	});
	if ($('[data-toggle="validator"]').find('select').hasClass('has-success')) {
		this.removeClass('has-danger');
	}
});
$(function () {
	if ($('.canhcam-carousel-1 .owl-carousel').length) {
		$('.canhcam-carousel-1 .owl-carousel').owlCarousel({
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			items: 2,
			loop: true,
			center: false,
			padding: 10,
			margin: 20,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			nav: true,
			dots: false,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: false,
			callbacks: true,
			responsive: {
				480: {
					items: 2
				},
				768: {
					items: 3
				},
				992: {
					items: 4,
					nav: false,
					dots: true
				},
				1140: {
					items: 6,
					nav: false,
					dots: true
				}
			}
		});
	}
});

$(function () {
	if ($('.canhcam-carousel-2 .owl-carousel').length) {
		$('.canhcam-carousel-2 .owl-carousel').owlCarousel({
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			items: 1,
			loop: false,
			center: false,
			padding: 10,
			margin: 20,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			nav: true,
			dots: false,
			autoplay: false,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			callbacks: true,
			responsive: {
				480: {
					items: 2
				},
				768: {
					items: 3,
					nav: true,
					dots: false
				},
				992: {
					items: 4
				}
			}
		});
	}
});

$(function () {
	if ($('.canhcam-carousel-3 .owl-carousel').length) {
		$('.canhcam-carousel-3 .owl-carousel').owlCarousel({
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			items: 1,
			false: true,
			loop: false,
			center: false,
			padding: 10,
			margin: 20,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			nav: true,
			dots: false,
			autoplay: false,
			autoplayTimeout: 3000,
			autoplayHoverPause: false,
			callbacks: true,
			responsive: {
				480: {
					items: 1
				},
				768: {
					items: 2
				},
				992: {
					items: 3
				},
				1140: {
					items: 4
				}
			}
		});
	}
});

function CCFooter1() {};

$(function () {
	CCFooter1();
});

$(window).resize(function () {});

function CCForm1() {
	$('.canhcam-form-1 .validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {} else {
			$(this)[0].reset();
		}
	});
};

$(function () {
	CCForm1();
});

$(window).resize(function () {});

function ProductDetail1() {
	$('.canhcam-gallery-1 .product-details .slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: false,
		autoplay: false,
		asNavFor: '.slider-nav'
	});
	$('.canhcam-gallery-1 .product-details .slider-nav').slick({
		autoplay: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		arrows: true,
		centerMode: false,
		focusOnSelect: true,
		prevArrow: $('.top-arrow'),
		nextArrow: $('.bottom-arrow'),
		vertical: true,
		variableWidth: false,
		verticalSwiping: false,
		infinite: false,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
				vertical: false,
				verticalSwiping: false,
				variableWidth: false
			}
		}]
	}).on('init', function (event, slick, direction) {
		if (!$('.canhcam-gallery-1 .product-details .slider-nav .top-arrow').is(':visible')) {
			$('.canhcam-gallery-1 .product-details .slider-control').css({
				'padding-top': '0px'
			});
		}
	}).on('afterChange', function (event, slick, currentSlide, nextSlide) {
		var getcs = slick.$slides.length - 1;
		if (currentSlide == 0) {
			$('.canhcam-gallery-1 .product-details .top-arrow').attr('disabled', 'disabled');
		} else {
			$('.canhcam-gallery-1 .product-details .top-arrow').removeAttr('disabled');
		}
		if (getcs == currentSlide) {
			$('.canhcam-gallery-1 .product-details .bottom-arrow').attr('disabled', 'disabled');
		} else {
			$('.canhcam-gallery-1 .product-details .bottom-arrow').removeAttr('disabled');
		}
	});
};

$(document).ready(function () {

	ProductDetail1();

	$('.canhcam-gallery-1 #quantity input').TouchSpin({
		min: 0,
		max: 100,
		buttondown_class: "btn btn-default",
		buttonup_class: "btn btn-default"
	});
});

$(function () {});

$(window).resize(function () {});

$(document).ready(function () {
	$('.canhcam-gallery-2 .slider-for').owlCarousel({
		items: 1,
		loop: true,
		center: true,
		padding: 10,
		margin: 20,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		nav: false,
		dots: false,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true,
		callbacks: true,
		URLhashListener: true,
		startPosition: 'URLHash'
	});
	$('.canhcam-gallery-2 .slider-nav').owlCarousel({
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		items: 3,
		loop: true,
		center: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		padding: 10,
		margin: 20,
		nav: true,
		dots: false,
		autoplay: false,
		autoplayHoverPause: false,
		callbacks: true,
		responsive: {
			480: {
				items: 3,
				center: true
			},
			768: {
				items: 4
			},
			992: {
				items: 5
			},
			1140: {
				items: 5
			}
		}
	});

	$('.canhcam-gallery-2 #quantity input').TouchSpin({
		min: 0,
		max: 100,
		buttondown_class: "btn btn-default",
		buttonup_class: "btn btn-default"
	});
});

$(document).ready(function () {

	$(".canhcam-gallery-3 .gallery-details .gallery-lists").lightGallery({
		thumbnail: true,
		animateThumb: false,
		showThumbByDefault: false,
		selector: '.item'
	});
});

function CCHeader1() {
	$('.canhcam-header-1 .navbar-toggler').on("click", function () {
		$('.canhcam-header-1').toggleClass('expand');
	});
};

$(function () {
	CCHeader1();
});

$(window).resize(function () {
	$('.canhcam-header-1').removeClass('expand');
});

function CCHeader2() {
	$('.canhcam-header-2 .navbar-toggler').on("click", function () {
		$('.canhcam-header-2').toggleClass('expand');
	});
	$('.canhcam-header-2 .search button').on("click", function () {
		if ($('.canhcam-header-2 .search button').attr('type') === 'button') {
			$(this).toggleClass('searchbtn');
			$('.canhcam-header-2 .search').toggleClass('active');
			setTimeout(function () {
				if ($('.canhcam-header-2 .search').hasClass('active')) {
					$('.canhcam-header-2 .search button').attr('type', 'submit');
				}
			}, 200);
		}
	});
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
		$('.canhcam-header-2 .search button').attr('type', 'submit');
	} else {
		$('.canhcam-header-2 .search button').attr('type', 'button');
	}
};

$(function () {
	CCHeader2();
});

$(window).resize(function () {
	$('.canhcam-header-2').removeClass('expand');
	$('.canhcam-header-2 .search').removeClass('active');
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
		$('.canhcam-header-2 .search button').removeClass('searchbtn');
		$('.canhcam-header-2 .search button').attr('type', 'submit');
	} else {
		$('.canhcam-header-2 .search button').addClass('searchbtn');
		$('.canhcam-header-2 .search button').attr('type', 'button');
	}
});

function CCHeader3() {
	$('.canhcam-header-3 .navbar-toggler').on("click", function () {
		$('.canhcam-header-3').toggleClass('expand');
	});
	$('.canhcam-header-3 .btnsearch .btn').on("click", function () {
		$('.canhcam-header-3 .search').toggleClass('active');
		$('.canhcam-header-3 .btnsearch').toggleClass('active');
	});
};

$(function () {
	CCHeader3();
});

$(window).resize(function () {
	$('.canhcam-header-3').removeClass('expand');
	$('.canhcam-header-3 .search').removeClass('active');
	$('.canhcam-header-3 .btnsearch').removeClass('active');
});

function CCHeader4() {
	$('.canhcam-header-4 .navbar-toggler').on("click", function () {
		$('.canhcam-header-4').toggleClass('expand');
	});
	$('.canhcam-header-4 .btnsearch').on("click", function () {
		$('.canhcam-header-4 .search').toggleClass('active');
		$(this).toggleClass('active');
	});
	$('.canhcam-header-4 .closebnt').on("click", function () {
		$('.canhcam-header-4 .search').toggleClass('active');
		$('.canhcam-header-4 .btnsearch').toggleClass('active');
	});
};

$(function () {
	CCHeader4();
});

$(window).resize(function () {
	$('.canhcam-header-4').removeClass('expand');
	$('.canhcam-header-4 .search').removeClass('active');
	$('.canhcam-header-4 .btnsearch').removeClass('active');
});

function CCHeader5() {
	$('.canhcam-header-5 .navbar-toggler').on("click", function () {
		$('.canhcam-header-5').toggleClass('expand');
	});
	marginHeader();
};

function marginHeader() {
	var headerHeight = $("header").outerHeight();
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID) {
		$('.canhcam-header-5 #CCMenuHeader').css({
			'margin-top': headerHeight + 'px'
		});
	} else {
		$('.canhcam-header-5 #CCMenuHeader').css({
			'margin-top': 'initial'
		});
	}
}

$(function () {
	CCHeader5();
});

$(window).resize(function () {
	$('.canhcam-header-5').removeClass('expand');
	marginHeader();
});

function CCHeader6() {
	$('.canhcam-header-6 .navbar-toggler').on("click", function () {
		$('.canhcam-header-6').toggleClass('expand');
	});
	$('.canhcam-header-6 .btnsearch .btn').on("click", function () {
		$('.canhcam-header-6 .search').toggleClass('active');
		$('.canhcam-header-6 .btnsearch').toggleClass('active');
	});
	$('.canhcam-header-6 .closebnt').on("click", function () {
		$('.canhcam-header-6').toggleClass('expand');
	});
};

$(function () {
	CCHeader6();
});

$(window).resize(function () {
	$('.canhcam-header-6').removeClass('expand');
	$('.canhcam-header-6 .search').removeClass('active');
	$('.canhcam-header-6 .btnsearch').removeClass('active');
});

// Theme list
//  - default
//  - white
//  - black
//  - river
//  - cyan
//  - green
//  - metan
//  - yellow
//  - red
// Check at http://en.mygeoposition.com/

$(document).ready(function () {
	if ($('.canhcam-map-1 #ccmaps')) {
		$('.canhcam-map-1 #ccmaps').kmaps();
	}
});

$(window).resize(function () {});

function changeNewsItemNews1() {
	if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
		var geth = $('.canhcam-news-1 .top-list .item:first-child figure').outerHeight();
		var countitem = $('.canhcam-news-1 .part-list').find('.item').length;
		$('.canhcam-news-1 .part-list .item figure').each(function () {
			$(this).css({
				'height': 'calc(' + geth / countitem + 'px - 1rem)'
			});
		});
	} else {
		$('.canhcam-news-1 .part-list .item figure').each(function () {
			$(this).css({
				'height': 'initial'
			});
		});
	}
}

$(document).ready(function () {
	changeNewsItemNews1();

	$('.canhcam-news-1 .owl-carousel').owlCarousel({
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		items: 1,
		loop: true,
		center: true,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		nav: true,
		dots: false,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true
	});

	$('.canhcam-news-1 .news-list #list').click(function (event) {
		event.preventDefault();
		$(this).addClass('active');
		$('.canhcam-news-1 .news-list #grid').removeClass('active');
		$('.canhcam-news-1 #products').addClass('list-group-wrapper').removeClass('grid-group-wrapper');
	});
	$('.canhcam-news-1 .news-list #grid').click(function (event) {
		event.preventDefault();
		$(this).addClass('active');
		$('.canhcam-news-1 .news-list #list').removeClass('active');
		$('.canhcam-news-1 #products').removeClass('list-group-wrapper').addClass('grid-group-wrapper');
	});
});

$(window).resize(function () {
	changeNewsItemNews1();
});

function changeNewsItemNews2() {
	if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
		$('.canhcam-news-2 .news-hot').each(function () {
			var geth = $(this).find('.top-list .item:first-child figure').outerHeight();
			var countitem = $(this).find('.part-list').find('.item').length;
			$(this).find('.part-list .item figure').each(function () {
				$(this).css({
					'height': 'calc(' + geth / countitem + 'px - 1rem)'
				});
			});
		});
	} else {
		$('.canhcam-news-2 .part-list .item figure').each(function () {
			$(this).css({
				'height': 'initial'
			});
		});
	}
}

$(document).ready(function () {
	changeNewsItemNews2();
	$('.canhcam-news-2 .news-list #list').click(function (event) {
		event.preventDefault();
		$(this).addClass('active');
		$('.canhcam-news-2 .news-list #grid').removeClass('active');
		$('.canhcam-news-2 #products').addClass('list-group-wrapper').removeClass('grid-group-wrapper');
	});
	$('.canhcam-news-2 .news-list #grid').click(function (event) {
		event.preventDefault();
		$(this).addClass('active');
		$('.canhcam-news-2 .news-list #list').removeClass('active');
		$('.canhcam-news-2 #products').removeClass('list-group-wrapper').addClass('grid-group-wrapper');
	});
});

$(window).resize(function () {
	changeNewsItemNews2();
});

function changeNewsItemNews3() {
	if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
		$('.canhcam-news-3 .news-item').each(function () {
			var geth = $(this).find('.top-list .item:first-child figure').outerHeight();
			var countitem = $(this).find('.part-list').find('.item').length;
			$(this).find('.part-list .item figure').each(function () {
				$(this).css({
					'height': 'calc(' + geth / countitem + 'px - 1rem)'
				});
			});
		});
	} else {
		$('.canhcam-news-3 .part-list .item figure').each(function () {
			$(this).css({
				'height': 'initial'
			});
		});
	}
}

$(document).ready(function () {
	changeNewsItemNews3();

	if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
		$('.canhcam-news-3 .owl-carousel').owlCarousel({
			items: 1,
			loop: true,
			center: true,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			nav: true,
			dots: false,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true
		});
	}

	$('.canhcam-news-3 .news-list #list').click(function (event) {
		event.preventDefault();
		$(this).addClass('active');
		$('.canhcam-news-3 .news-list #grid').removeClass('active');
		$('.canhcam-news-3 #products').addClass('list-group-wrapper').removeClass('grid-group-wrapper');
	});
	$('.canhcam-news-3 .news-list #grid').click(function (event) {
		event.preventDefault();
		$(this).addClass('active');
		$('.canhcam-news-3 .news-list #list').removeClass('active');
		$('.canhcam-news-3 #products').removeClass('list-group-wrapper').addClass('grid-group-wrapper');
	});
});

$(window).resize(function () {
	changeNewsItemNews3();
});

$(document).ready(function () {
	shopCanhCam1();
	$(".canhcam-shop-1 #price").slider({
		formatter: function formatter(value) {
			return value;
		}
	});
	$(".canhcam-shop-1 #price").on("slide", function (slideEvt) {
		$(".canhcam-shop-1 #geVal").text(slideEvt.value);
	});
	selectCountriesShop1();
});

function selectCountriesShop1() {
	var datano = $('.canhcam-shop-1 #selectcountries').attr('data-no');
	$('.canhcam-shop-1 #selectcountries').select2({
		"language": {
			"noResults": function noResults() {
				return datano;
			}
		},
		escapeMarkup: function escapeMarkup(markup) {
			return markup;
		}
	});
}

function shopCanhCam1() {
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID_SM) {
		$('.canhcam-shop-1 #filterSearch').addClass('collapse');
	} else {
		$('.canhcam-shop-1 #filterSearch').removeClass('collapse');
	}
}

$(window).resize(function () {
	shopCanhCam1();
});

$(document).ready(function () {
	shopCanhCam2();
	$(".canhcam-shop-2 #price").slider({
		formatter: function formatter(value) {
			return value;
		}
	});
	$(".canhcam-shop-2 #price").on("slide", function (slideEvt) {
		$(".canhcam-shop-2 #geVal").text(slideEvt.value);
	});
	selectCountriesShop2();
});

function selectCountriesShop2() {
	var datano = $('.canhcam-shop-2 #selectcountries').attr('data-no');
	$('.canhcam-shop-2 #selectcountries').select2({
		"language": {
			"noResults": function noResults() {
				return datano;
			}
		},
		escapeMarkup: function escapeMarkup(markup) {
			return markup;
		}
	});
}

function shopCanhCam2() {
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID_SM) {
		$('.canhcam-shop-2 #filterSearch').addClass('collapse');
	} else {
		$('.canhcam-shop-2 #filterSearch').removeClass('collapse');
	}
}

$(window).resize(function () {
	shopCanhCam2();
});
//# sourceMappingURL=app.js.map
