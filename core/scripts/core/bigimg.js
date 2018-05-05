function CanhCamResponsive() {
    // Set BG Resposive
    $('[bg-img]').each(function() {
        var bgimg = $(this).attr('bg-img');
        $(this).css({
            "background-image": "url(" + bgimg + ")",
            "background-position": "center center",
            "background-size": "cover"
        });
    });

    $('[bg-img-responsive]').each(function() {
        var bgimg = $(this).attr('bg-img-responsive');
        var bgimgsm = $(this).attr('bg-img-responsive-sm');
        var bgimgxs = $(this).attr('bg-img-responsive-xs');
        if ($(window).width() >= CANHCAM_APP.CHANGE_GRID) {
            $(this).css({
                "background-image": "url(" + bgimg + ")",
                "background-position": "center center",
                "background-size": "cover"
            });
		} else if ($(window).width() < CANHCAM_APP.CHANGE_GRID && $(window).width() > CANHCAM_APP.CHANGE_GRID_SM) {
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

    $('[img-src-responsive]').each(function() {
        var bgimg2 = $(this).attr('img-src-responsive');
        var bgimg2sm = $(this).attr('img-src-responsive-sm');
        var bgimg2xs = $(this).attr('img-src-responsive-xs');
        if ($(window).width() >= CANHCAM_APP.CHANGE_GRID) {
            $(this).attr("src", "" + bgimg2 + "");
		} else if ($(window).width() < CANHCAM_APP.CHANGE_GRID && $(window).width() > CANHCAM_APP.CHANGE_GRID_SM) {
            $(this).attr("src", "" + bgimg2sm + "");
        } else {
            $(this).attr("src", "" + bgimg2xs + "");
        }
    });

};

$(function() {
    if (CANHCAM_APP.ACTIVE_RESPONSIVE) {
        CanhCamResponsive();
    }
})

$(window).resize(function() {
    if (CANHCAM_APP.ACTIVE_RESPONSIVE) {
        CanhCamResponsive();
    }
})
