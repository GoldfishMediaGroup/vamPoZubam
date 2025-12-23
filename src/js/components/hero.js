import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function hero() {
  const section = document.querySelector('.hero');
  if (!section) return;

  const swiper = new Swiper('.hero__swiper', {
    slidesPerView: 1,
    grabCursor: true,
    speed: 800,
    spaceBetween: rem(4),
    effect: 'fade',
    allowTouchMove: true,
    navigation: {
      prevEl: section.querySelector('.swiper-button--prev'),
      nextEl: section.querySelector('.swiper-button--next')
    },
    pagination: {
      el: section.querySelector('.swiper-pagination'),
      clickable: true
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },
    loop: true,
    fadeEffect: {
      crossFade: 'fade'
    },
    autoHeight: true,
    breakpoints: {
      768: {
        allowTouchMove: false
      }
    }
  });
}

export default hero;
