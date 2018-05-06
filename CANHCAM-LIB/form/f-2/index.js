function CCForm2() {
	$('.canhcam-form-2 .validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
		} else {
			$(this)[0].reset();
		}
	})
};

$(document).ready(function () {
	canhcamform2()
});

function canhcamform2() {
	var datano = $('.canhcam-form-2 #selectcountries').attr('data-no')
	$('.canhcam-form-2 #selectcountries').select2({
		"language": {
			"noResults": function () {
				return datano;
			}
		},
		escapeMarkup: function (markup) {
			return markup;
		}
	}).on('select2:select', function (e) {
		var data = e.params.data;
		changeMapForm2(data.id)
	});
}

$(function() {
    CCForm2();
})

function changeMapForm2(a) {
	$('#map-change').html('<iframe src="'+a+'" frameborder="0" style="border: 0px;"></iframe>')
}

$(window).resize(function() {})
