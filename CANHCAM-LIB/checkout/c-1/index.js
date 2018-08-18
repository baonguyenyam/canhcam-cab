function CheckOut1() {
	$('.canhcam-checkout-1 #quantity input').TouchSpin({
		min: 0,
		max: 100,
		buttondown_class: "btn btn-default",
		buttonup_class: "btn btn-default"
	});
};

$(function() {
    CheckOut1();
})

$(window).resize(function() {})
