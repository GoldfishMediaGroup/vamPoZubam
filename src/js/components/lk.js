import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function lk() {
  lkArticles();

  function lkArticles() {
    const wrap = document.querySelector('.lk-article');

    if (!wrap) return;

    const swiper = new Swiper('.lk-article__swiper', {
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
      pagination: {
        el: '.lk-article__pagin'
      },
      navigation: {
        prevEl: wrap.querySelector('.swiper-button--prev'),
        nextEl: wrap.querySelector('.swiper-button--next')
      }
    });
  }
}

export default lk;
