
$(document).ready(function() {
	shopCanhCam1()
	$(".canhcam-shop-1 #price").slider({
		formatter: function (value) {
			return value;
		}
	});
	$(".canhcam-shop-1 #price").on("slide", function (slideEvt) {
		$(".canhcam-shop-1 #geVal").text(slideEvt.value);
	});
	selectCountriesShop1()
});

function selectCountriesShop1() {
	var datano = $('.canhcam-shop-1 #selectcountries').attr('data-no')
	$('.canhcam-shop-1 #selectcountries').select2({
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
		var attributes = e.target.value
		window.location.href = attributes
	});
}

function shopCanhCam1() {
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID_SM) {
		$('.canhcam-shop-1 #filterSearch').addClass('collapse')
	} else {
		$('.canhcam-shop-1 #filterSearch').removeClass('collapse')
	}
}

$(window).resize(function() {
	shopCanhCam1()
})
