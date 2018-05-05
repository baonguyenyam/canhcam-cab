$(document).ready(function () {
	if (CANHCAM_APP.ACTIVE_VALIDATOR) {
		$('[data-toggle="validator"]').validator({
			feedback: {
				success: 'fa fa-check',
				error: 'fa fa-close'
			}
		}).on('submit', function (e) {
			if (e.isDefaultPrevented()) {
				$('[data-toggle="validator"]').find('select').parent('.form-group').addClass('has-danger')
			}
		})
		if ($('[data-toggle="validator"]').find('select').hasClass('has-success')) {
			this.removeClass('has-danger')
		}
	}
});
