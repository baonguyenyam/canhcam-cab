$(document).ready(function() {
	shopCanhCam3()
	$(".canhcam-shop-3 #price").slider({
		formatter: function (value) {
			return value;
		}
	});
	$(".canhcam-shop-3 #price").on("slide", function (slideEvt) {
		$(".canhcam-shop-3 #geVal").text(slideEvt.value);
	});
	selectCountriesShop3()

});

function selectCountriesShop3() {
	var datano = $('.canhcam-shop-3 #selectcountries').attr('data-no')
	$('.canhcam-shop-3 #selectcountries').select2({
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

function shopCanhCam3() {
	if ($(window).width() <= CANHCAM_APP.CHANGE_GRID_SM) {
		$('.canhcam-shop-3 #filterSearch').addClass('collapse')
	} else {
		$('.canhcam-shop-3 #filterSearch').removeClass('collapse')
	}
}

$(window).resize(function() {
	shopCanhCam3()
})

$('.canhcam-shop-3 .boxproducts [data-toggle="modal"]').each(function () {
	$(this).click(function(){
		var getcnt = $(this).parents('.item').find('.item-detail')
		$('#quickView .modal-title').html(getcnt.find('h2').html())
		$('#quickView .modal-body').html(getcnt.html())
		$('#quickView .quantity input').TouchSpin({
			min: 0,
			max: 100,
			buttondown_class: "btn btn-default",
			buttonup_class: "btn btn-default"
		});
		$('#quickView .list-thumb').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			fade: false,
			autoplay: false
		});
	})
})


