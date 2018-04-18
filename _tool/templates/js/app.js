"use strict";

var CANHCAM_APP = { "DEV_MODE": true, "DEV_MODE_GIRD_FULL": false, "ACTIVE_FIXED_FOOTER": true, "ACTIVE_BACKTOTOP": true, "ACTIVE_RESPONSIVE": true, "DISPLAY_FOOTER": 600, "DISPLAY_BACKTOTOP": 100, "CHANGE_GRID": 991 };
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
$(function () {
    if ($('.owl-carousel').length) {
        $('.owl-carousel').owlCarousel({
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            items: 1,
            loop: true,
            center: false,
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
$(document).ready(function () {
    if ($('#gmap, #gmap_canvas')) {
        $('#gmap, #gmap_canvas').kmaps();
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
var LOGOMAIN = '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Bao Nguyen  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="477.293px" height="87.294px" viewBox="0 0 477.293 87.294" enable-background="new 0 0 477.293 87.294" xml:space="preserve"><g><polygon fill="#EF3D3A" points="93.452,23.737 89.866,18.075 111.465,1.646 117.102,11.237 "/><path fill="#EF3D3A" d="M31.832,87.293C14.752,87.293,1,73.864,1,57.095c0-16.98,13.344-30.201,30.413-30.201c13.129,0,24.583,7.396,29.06,20.611h-15.63c-2.813-5.308-7.182-7.911-13.43-7.911c-9.576,0-16.457,7.289-16.457,17.395c0,10.102,7.193,17.595,16.769,17.595c5.732,0,9.694-2.287,13.118-7.59h15.63C55.686,79.897,45.262,87.293,31.832,87.293z"/><path fill="#EF3D3A" d="M109.641,28.246v7.697c-4.799-6.345-10.521-9.05-18.851-9.05c-17.08,0-29.382,12.807-29.382,30.405c0,17.401,12.195,29.994,29.06,29.994c8.127,0,13.655-2.609,19.173-8.847v7.492h12.71V28.245L109.641,28.246L109.641,28.246z M92.454,74.583c-10.113,0-17.08-6.871-17.08-16.974c0-10.522,6.967-18.016,16.865-18.016c9.898,0,16.983,7.396,16.983,17.93C109.222,67.089,102.963,74.583,92.454,74.583z"/><path fill="#EF3D3A" d="M163.789,85.94V57.717c0-15.413-4.165-18.123-11.046-18.123c-4.369,0-8.008,1.878-10.198,5.313c-1.761,2.814-2.287,6.144-2.287,13.851V85.94h-13.859V28.248h12.818v5.507c5.099-4.89,9.683-6.86,16.243-6.86c8.019,0,14.267,2.909,18.024,8.331c3.113,4.477,4.166,9.468,4.166,19.777V85.94H163.789L163.789,85.94z"/><path fill="#EF3D3A" d="M267.211,87.293c-17.08,0-30.833-13.43-30.833-30.198c0-16.98,13.333-30.201,30.413-30.201c13.13,0,24.585,7.396,29.062,20.611h-15.62c-2.813-5.308-7.182-7.911-13.44-7.911c-9.586,0-16.445,7.289-16.445,17.395c0,10.102,7.171,17.595,16.758,17.595c5.743,0,9.684-2.287,13.129-7.59h15.62C291.065,79.897,280.652,87.293,267.211,87.293z"/><path fill="#EF3D3A" d="M345.02,85.94v-7.491c-5.527,6.235-11.047,8.846-19.172,8.846c-16.865,0-29.062-12.593-29.062-29.994c0-17.598,12.292-30.405,29.384-30.405c8.328,0,14.063,2.705,18.85,9.05v-7.697h12.701v57.692L345.02,85.94L345.02,85.94z M327.619,39.594c-9.898,0-16.865,7.492-16.865,18.016c0,10.103,6.967,16.974,17.08,16.974c10.52,0,16.758-7.493,16.758-17.06C344.59,46.991,337.516,39.594,327.619,39.594z"/><path fill="#EF3D3A" d="M434.486,85.94V54.283c0-11.564-4.369-14.688-10.83-14.688c-7.697,0-11.67,4.165-11.67,17.93V85.94h-13.848V54.283c0-11.344-3.963-14.688-11.252-14.688c-8.029,0-11.26,4.267-11.26,17.93V85.94h-13.84V28.248h12.699v5.405c4.07-4.89,8.234-6.758,14.998-6.758c7.922,0,13.021,2.705,16.973,8.948c4.691-6.243,10.424-8.948,18.551-8.948c15.199,0,23.316,8.427,23.316,25.725v33.32H434.486z"/><path fill="#EF3D3A" d="M211.174,26.786c-5.937,0-10.521,1.664-14.675,5.411V9.75l-13.859,7.333V85.94h13.859V56.687c0-12.713,4.273-17.093,12.185-17.093c8.127,0,11.25,4.788,11.25,16.867V85.94h13.849V53.348C233.782,34.387,225.033,26.786,211.174,26.786z"/><g><path fill="#EF3D3A" d="M453.918,30.19h-3.35v-3.049h9.994v3.049h-3.264v9.345h-3.381V30.19L453.918,30.19z"/><path fill="#EF3D3A" d="M461.689,27.141h2.781l4.016,5.646l4.016-5.646h2.791v12.394h-3.137v-6.57l-3.67,5.094l-3.662-5.094v6.57h-3.135V27.141z"/></g></g></svg>';
$(function () {
    $('[site-logo]').html(LOGOMAIN);
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
$(function () {
    if ($('.canhcam-carousel-1 .owl-carousel').length) {
        $('.canhcam-carousel-1 .owl-carousel').owlCarousel({
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            items: 1,
            loop: true,
            center: false,
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
function CCFooter1() {};

$(function () {
    CCFooter1();
});

$(window).resize(function () {});

function CCForm1() {};

$(function () {
    CCForm1();
});

$(window).resize(function () {});

function CCHeader1() {};

$(function () {
    CCHeader1();
});

$(window).resize(function () {});
$(document).ready(function () {
    if ($('.canhcam-map-1 #ccmaps')) {
        $('.canhcam-map-1 #ccmaps').kmaps();
    }
});

$(window).resize(function () {});
//# sourceMappingURL=app.js.map
