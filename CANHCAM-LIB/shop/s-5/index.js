
// Trigger BTN
function shopMenuToggle5(){
	$('.canhcam-shop-5 .pl-filter-trigger').each(function(){
		$(this).on('click', function(){
			$('.canhcam-shop-5 .product-lists .pl-filter').toggleClass('active')
		})
	});
	$('.canhcam-shop-5 .pl-filter-content .dropdown-filter').each(function(){
		$(this).on('click', function(){
			$(this).parents('li').find('.sub-filter').toggleClass('active')
		})
	});
}

$(function() {
	shopMenuToggle5();
})

$(document).ready(function() {
	$(".canhcam-shop-5 #price").slider({
		formatter: function (value) {
			return value;
		}
	});
	$(".canhcam-shop-5 #price").on("slide", function (slideEvt) {
		$(".canhcam-shop-5 #geVal").text(slideEvt.value);
	});

});

$(window).resize(function () {
	$('.canhcam-shop-5 .product-lists .pl-filter').removeClass('active')
})
