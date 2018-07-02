$(function() {
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="popover"]').popover({
        trigger: 'focus'
    })
})
// Thêm [dropdown-type="hover"] vào thẻ a để bật tính năng hover open dropdown 
if ($(window).width() > CANHCAM_APP.CHANGE_GRID) {
	$('.dropdown').on('mouseenter mouseleave', function () {
		var ___d = $(this).find('[dropdown-type="hover"]').parents('.dropdown')
		if (___d && ___d.length > 0) {
			$(this).find('[dropdown-type="hover"]').removeAttr('data-toggle')
			setTimeout(function () {
				___d[___d.is(':hover') ? 'addClass' : 'removeClass']('show');
				___d.is(':hover') ? ___d.find('.dropdown-menu').show() : ___d.find('.dropdown-menu').hide()
			}, 10);
		}
	})
} else {
	$('.dropdown .dropdown-menu').show()
}

