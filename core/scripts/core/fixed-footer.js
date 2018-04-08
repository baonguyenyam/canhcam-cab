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
            $("main").css('min-height', newfixedHeight + 'px')
        } else {
            if (!CANHCAM_APP.ACTIVE_FIXED_HEADER) {
                $("main").css('min-height', newHeight + 'px')
            } else {
                $("main").css('min-height', newfixedHeight + 'px')
            }
        }
    } else {
        $("main").css('min-height', 'initial')
    }
}

$(document).ready(function() {
    if (CANHCAM_APP.ACTIVE_FIXED_FOOTER) {
        setFooter()
    }
});

$(window).resize(function() {
    if (CANHCAM_APP.ACTIVE_FIXED_FOOTER) {
        setFooter()
    }
})