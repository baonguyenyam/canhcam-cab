$(document).ready(function(){
	// $('.c-accordion__item:not(:first) .c-accordion__list').hide();
	$('.c-accordion__list').hide();
	$('.c-accordion h3').click(function() {
		if($(this).next().is(':hidden') === true){
			$('.c-accordion__list').slideUp('fast');
			$('.c-accordion__item h3').removeClass('is--open');
			$(this).next().slideDown('fast');
			$(this).addClass('is--open');
		}else{
			$('.c-accordion__item h3').removeClass('is--open');
			$(this).next().slideUp('fast');
		}
	});
})