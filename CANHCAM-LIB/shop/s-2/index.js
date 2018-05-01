$(document).ready(function() {
	shopCanhCam2()
	$(".canhcam-shop-2 #price").slider({
		formatter: function (value) {
			return value;
		}
	});
	$(".canhcam-shop-2 #price").on("slide", function (slideEvt) {
		$(".canhcam-shop-2 #geVal").text(slideEvt.value);
	});
	selectCountriesShop2()

});

function selectCountriesShop2() {
	var datano = $('.canhcam-shop-2 #selectcountries').attr('data-no')
	$('.canhcam-shop-2 #selectcountries').select2({
		"language": {
			"noResults": function () {
				return datano;
			}
		},
		escapeMarkup: function (markup) {
			return markup;
		}
	});
}

function shopCanhCam2() {
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID_SM) {
		$('.canhcam-shop-2 #filterSearch').addClass('collapse')
	} else {
		$('.canhcam-shop-2 #filterSearch').removeClass('collapse')
	}
}

$(window).resize(function() {
	shopCanhCam2()
})
