function backToTop() {
    if ($('#back-to-top').length) {
        var backToTop = function() {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > CANHCAM_APP.DISPLAY_BACKTOTOP) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        $('#back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
}

$(document).ready(function() {
    if (CANHCAM_APP.ACTIVE_BACKTOTOP) {
        backToTop()
    }
});