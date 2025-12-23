import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function recom() {
  const section = document.querySelector('.recom');
  if (!section) return;

  const thumbSwiper = new Swiper('.recom__swiper-thumbs ', {
    slidesPerView: 2.8,
    grabCursor: true,
    speed: 800,
    spaceBetween: rem(1.6),
    slideToClickedSlide: true,
    allowTouchMove: true,
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: rem(2)
      }
    }
  });

  const options = {
    slidesPerView: 1,
    grabCursor: true,
    speed: 800,
    spaceBetween: rem(4),
    effect: 'fade',
    allowTouchMove: true,

    fadeEffect: {
      crossFade: 'fade'
    },
    autoHeight: true,
    breakpoints: {
      768: {
        allowTouchMove: false
      }
    }
  };
  const swiperVideo = new Swiper('.recom__swiper-img ', {
    ...options,
    thumbs: {
      swiper: thumbSwiper
    },
    navigation: {
      prevEl: section.querySelector('.swiper-button--prev'),
      nextEl: section.querySelector('.swiper-button--next')
    }
  });

  const swiperText = new Swiper('.recom__swiper-text ', options);

  swiperVideo.controller.control = swiperText;
  swiperText.controller.control = swiperVideo;
}

export default recom;
