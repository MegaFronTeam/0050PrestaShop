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
			hide_from_to: false,
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
