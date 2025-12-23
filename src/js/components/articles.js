import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function articles() {
  const section = document.querySelector('.articles');
  if (!section) return;

  const thumbSwiper = new Swiper('.articles__swiper', {
    slidesPerView: 1.3,
    grabCursor: true,
    speed: 800,
    spaceBetween: rem(1.6),
    allowTouchMove: true,
    breakpoints: {
      768: {
        slidesPerView: 2.3,
        spaceBetween: rem(2)
      }
    },
       navigation: {
      prevEl: section.querySelector('.swiper-button--prev'),
      nextEl: section.querySelector('.swiper-button--next')
    }
  });

 
}

export default articles;
