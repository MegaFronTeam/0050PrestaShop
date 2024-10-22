"use strict";

// import Swiper from '../libs/swiper/swiper-bundle.min.mjs';
// import JSCCommon from "./JSCCommon.js";

function eventHandler() {
	// const $ = jQuery;
	JSCCommon.init();

	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener(
		"scroll",
		() => {
			JSCCommon.setFixedNav();
		},
		{passive: true}
	);
	window.addEventListener("resize", whenResize, {passive: true});

	whenResize();

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: " .swiper-pagination",
			type: "bullets",
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	};

	new Swiper(".breadcrumb-slider--js", {
		slidesPerView: "auto",
		freeMode: true,
		watchOverflow: true,
	});

  const headerSwiper = new Swiper(".headerBlock__slider--js", {

		slidesPerView: 1,
		spaceBetween: 10,
    // observeParents: true,
		navigation: {
			nextEl: ".headerBlock .swiper-button-next",
			prevEl: ".headerBlock .swiper-button-prev",
		},
    // grid: {
    //   rows: 2,
    // },
		pagination: {
			el: '.headerBlock .swiper-pagination',
			type: 'bullets',
			clickable: true, 
		},
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        spaceBetween: 24,
        slidesPerView: 2,
      //   centeredSlides: true,
      //   initialSlide: 1,
      //   spaceBetween: 0,
      }
    }
	});

  document.querySelectorAll('.sSliderMore').forEach((sliderElement, index) => {
    const sSliderMore = new Swiper(sliderElement.querySelector(".wrap"), {

      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: sliderElement.querySelector('.swiper-button-next'),
        prevEl: sliderElement.querySelector('.swiper-button-prev'),
      },
      loop: true,
      pagination: {
        el: sliderElement.querySelector('.swiper-pagination'),
        type: 'bullets',
        clickable: true, 
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 4,
        }
      }
    });
  })
  new Swiper('.sBlog__swiper--js', {
		freeMode: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		breakpoints: {
			960: {
				// spaceBetween: 20,
				// slidesPerView: 4,
			},
		},
	})

   /* thumb slider */
   let prodCardThumb = new Swiper(".sProdCard-thumb-js", {
		slidesPerView: 3,
		spaceBetween: 24,
    breakpoints: {
      768: {
        slidesPerView: 4,
        direction: "vertical",
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 24,
        direction: "vertical",
      },
      1200: {
        slidesPerView: 5,
        direction: "vertical",
      }
    },
    on: {
      init: function() {
        setLastVisibleSlideOpacity(this);
      },
      slideChange: function() {
        setLastVisibleSlideOpacity(this);
      },
      resize: function() {
        setLastVisibleSlideOpacity(this);
      }
    }
  });

  function setLastVisibleSlideOpacity(swiper) {
    swiper.slides.forEach(slide => {
      slide.style.opacity = '1';
    });

    const lastVisibleIndex = swiper.activeIndex + swiper.params.slidesPerView - 1;
    if (lastVisibleIndex < swiper.slides.length - 1) {
      swiper.slides[lastVisibleIndex].style.opacity = '0.5';
    }
  }

	let prodCardSlider = new Swiper(".sProdCard-slider-js", {
		spaceBetween: 10,
		thumbs: {
			swiper: prodCardThumb,
		},
		loop: true,
    centeredSlides: 'true'
	}); //

  /* prod swiper */
  let prodSlider = new Swiper(".sProductDetails__slider--js .s-wrap", {
		spaceBetween: 10,
		slidesPerView: 1,
		// loop: true,
		pagination: {
			el: '.sProductDetails__slider--js .swiper-pagination',
			type: 'bullets',
			clickable: true, 
		},
	}); //

  const swiperTabs1 = new Swiper(".tabs__swiper--js", {
		slidesPerView: "auto",
		freeMode: true,
		watchOverflow: true,
	});

  $('.filter-btn-js').click(function () {
    $(this).toggleClass('active');
    $('.sidebar--js').slideToggle(function () {
      $(this).toggleClass('active');
    });
  });

  let readMoreConts = document.querySelectorAll('.rm-cont-js');

  for (let cont of readMoreConts) {
    let btn = cont.querySelector('.rm-btn-js');

    if (btn) {
      btn.addEventListener('click', function () {
        this.classList.toggle('active');
        let hidden = cont.querySelector('.rm-hidden-js');
        $(hidden).slideToggle(function () {
          $(this).toggleClass('active');
        });
      });
    }
  } // rangle sliders

  function currencyFormat(num) {
		return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
	}

  $(".range-wrap--age").each(function () {
		let _this = $(this);

		var $range = _this.find(".slider-js");

		var $inputFrom = _this.find(".input_from");

		var $inputTo = _this.find(".input_to");

    var $spanFrom = _this.find(".range-from");
    var $spanTo = _this.find(".range-to");

		var instance,
			from,
			to,
			min = $range.data("min"),
			max = $range.data("max");

		$range.ionRangeSlider({
			skin: "round",
			type: "double",
			grid: false,
			grid_snap: false,
			hide_min_max: true,
			hide_from_to: true,
			//here
			onStart: updateInputs,
			onChange: updateInputs,
			onFinish: updateInputs,
		});
		instance = $range.data("ionRangeSlider");

		function updateInputs(data) {
			from = data.from;
			to = data.to;
			$inputFrom.prop("value", currencyFormat(from));
			$inputTo.prop("value", currencyFormat(to));

      $spanFrom.text(from);
      $spanTo.text(to);
		}

		$inputFrom.on("change input ", function () {
			var val = +$(this).prop("value").replace(/\s/g, ""); // validate

			if (val < min) {
				val = min;
			} else if (val > to) {
				val = to;
			}

			instance.update({
				from: val,
			});
			$(this).prop("value", currencyFormat(val));
		});
		$inputTo.on("change input ", function () {
			var val = +$(this).prop("value").replace(/\s/g, ""); // validate

			if (val < from) {
				val = from;
			} else if (val > max) {
				val = max;
			}

			instance.update({
				to: val,
			});
			$(this).prop("value", currencyFormat(val));
		});
	});

  /* 2 */
  $(".range-wrap--filter").each(function () {
		let _this = $(this);

		var $range = _this.find(".slider-js");

		var $inputFrom = _this.find(".input_from");

		var $inputTo = _this.find(".input_to");

		var instance,
			from,
			to,
			min = $range.data("min"),
			max = $range.data("max");

		$range.ionRangeSlider({
			skin: "round",
			type: "double",
			grid: false,
			grid_snap: false,
			hide_min_max: true,
			hide_from_to: true,
			//here
			onStart: updateInputs,
			onChange: updateInputs,
			onFinish: updateInputs,
		});
		instance = $range.data("ionRangeSlider");

		function updateInputs(data) {
			from = data.from;
			to = data.to;
			$inputFrom.prop("value", currencyFormat(from));
			$inputTo.prop("value", currencyFormat(to));

		}

		$inputFrom.on("change input ", function () {
			var val = +$(this).prop("value").replace(/\s/g, ""); // validate

			if (val < min) {
				val = min;
			} else if (val > to) {
				val = to;
			}

			instance.update({
				from: val,
			});
			$(this).prop("value", currencyFormat(val));
		});
		$inputTo.on("change input ", function () {
			var val = +$(this).prop("value").replace(/\s/g, ""); // validate

			if (val < from) {
				val = from;
			} else if (val > max) {
				val = max;
			}

			instance.update({
				to: val,
			});
			$(this).prop("value", currencyFormat(val));
		});
	});

  /* search */
  window.addEventListener("load", () => {
    const btnSearch = document.querySelector('.icon-btn--search')
    const wrapSearch = document.querySelector('.search-wrap--js')
  
    if (btnSearch) {
      btnSearch.addEventListener('click', ()=> {
        wrapSearch.classList.toggle('show')
      })
    }

    document.addEventListener('click', (event) => {
      if (!wrapSearch.contains(event.target) && !btnSearch.contains(event.target)) {
        wrapSearch.classList.remove('show');
      }
    });
  })


  const showMoreBtn = document.getElementById('show-more-btn');
  const hideMoreBtn = document.getElementById('hide-more-btn');
  const additionalWrap = document.querySelector('.additional-wrap');

  if (additionalWrap) {
    showMoreBtn.addEventListener('click', function() {
      additionalWrap.classList.add('show-all');
    });
  
    hideMoreBtn.addEventListener('click', function() {
      additionalWrap.classList.remove('show-all');
    });
  
  }


}
if (document.readyState !== "loading") {
	eventHandler();
} else {
	document.addEventListener("DOMContentLoaded", eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
