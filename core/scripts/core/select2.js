$(document).ready(function () {
	if (CANHCAM_APP.ACTIVE_SELECT) {
		$(".select2").select2({
			placeholder: "Chọn một"
		});

		$('.select2').on("select2:select", function (e) {
			var valSelect = $(e.currentTarget).val()
		});
		$('.select2').on("select2:unselect", function (e) {
			var valUnselect = $(e.currentTarget).val()
		});
	}
});

function selectResset(e) {
	$(e).val(null).trigger("change", 0);
}
