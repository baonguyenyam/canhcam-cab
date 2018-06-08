$(document).ready(function() {

	$(".canhcam-gallery-8 .gallery-details .item .hidden").lightGallery({
		thumbnail:true
	});

	$('.canhcam-gallery-8 .gallery-details .item').each(function() {
		$(this).click(function(){
			$(this).find('.hidden a:first-child').trigger('click')
		})
	});



});
