$(function () {
	var swiper = new Swiper('.canhcam-slider-6 .swiper-container', {
		// loop: true,
		lazy: true,
		autoHeight: true,
		spaceBetween: 20,
		slidesPerView: 1,
		centeredSlides: true,
		// loopFillGroupWithBlank: true,
		// slidesPerGroup: 3,
		// slidesPerView: 'auto',
		// autoplay: {
		// 	delay: 2500,
		// 	disableOnInteraction: false,
		// },
		// pagination: {
		// 	el: '.swiper-pagination',
		// 	dynamicBullets: true,
		// 	clickable: true,
		// 	renderBullet: function (index, className) {
		// 		return '<span class="' + className + '">' + (index + 1) + '</span>';
		// 	},
		// },
		// hashNavigation: {
		// 	watchState: true,
		// },
		navigation: {
			nextEl: '.canhcam-slider-6 .swiper-button-next',
			prevEl: '.canhcam-slider-6 .swiper-button-prev',
		},
		// breakpoints: {
		// 	1024: {
		// 		slidesPerView: 3,
		// 	},
		// 	768: {
		// 		slidesPerView: 3,
		// 	},
		// 	640: {
		// 		slidesPerView: 2,
		// 	},
		// 	320: {
		// 		slidesPerView: 1,
		// 	}
		// },
		on: {
			init: function () {
				checkIndexSlider(this)
			},
			slideChange: function () {
				checkIndexSlider(this)
			}
		},
	});
	// swiper.on('init', function (e) {
	// 	console.log(e);
	// });

	//Set Active Slide 2 
	// swiper.slideTo(1);

	$('.swiper-nav li').on('click', function() {
		
		swiper.slideTo($(this).attr('slide-to'));
	})

});


function checkIndexSlider(e) {
	var trai, phai;
	var defaultelm = $(e.slides[0]).attr('bg-img')
	// console.log(e.previousIndex);
	// console.log(e.realIndex);
	// console.log(e.activeIndex);
	// console.log(e.slides);
	if(!e.previousIndex || e.previousIndex === 'undefined') {
		trai = defaultelm
		phai = $(e.slides[e.activeIndex+1]).attr('bg-img') ? $(e.slides[e.activeIndex+1]).attr('bg-img') : defaultelm
	} else {
		trai = $(e.slides[e.activeIndex-1]).attr('bg-img') ? $(e.slides[e.activeIndex-1]).attr('bg-img') : $(e.slides[e.activeIndex]).attr('bg-img')
		phai = $(e.slides[e.activeIndex+1]).attr('bg-img') ? $(e.slides[e.activeIndex+1]).attr('bg-img') : $(e.slides[e.activeIndex]).attr('bg-img')
	} 
	$('.canhcam-slider-6 .swiper-button-prev-thumb').css({
		"background-image": "url("+trai+")"
	})
	$('.canhcam-slider-6 .swiper-button-next-thumb').css({
		"background-image": "url("+phai+")"
	})
}
