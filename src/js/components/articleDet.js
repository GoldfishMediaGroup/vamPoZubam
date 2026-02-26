import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function articleDet() {
  const section = document.querySelector('.article-det');
  if (!section) return;

  const thumbSwiper = new Swiper('.article-like__swiper', {
    slidesPerView: 1.3,
    grabCursor: true,
    speed: 800,
    spaceBetween: rem(1.6),
    allowTouchMove: true,
    breakpoints: {
      768: {
        slidesPerView: 3.3,
        spaceBetween: rem(2)
      }
    },
    pagination: {
      el: '.article-like__pagin'
    },
    navigation: {
      prevEl: section.querySelector('.swiper-button--prev'),
      nextEl: section.querySelector('.swiper-button--next')
    }
  });
}

export default articleDet;
