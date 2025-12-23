import { gsap, ScrollTrigger } from 'gsap/all';

function headerBurger() {
  const burger = document.querySelector('.header__burger');
  if (!burger) return;

  const body = document.body;

  const logo = document.querySelector('.header__logo');
  const navWrapper = document.querySelector('.header__nav');

  // Класс для блокировки скролла
  const disableScrollClass = 'no-scroll';

  function scrollToTop(duration = 400) {
    const start = window.pageYOffset;
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      window.scrollTo(0, start * (1 - progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }
  function openBurger() {
    burger.classList.add('isOpen');
    navWrapper.classList.add('isOpen');

    body.classList.add(disableScrollClass);
    scrollToTop();
  }

  function closeBurger() {
    body.classList.remove(disableScrollClass);

    burger.classList.remove('isOpen');
    navWrapper.classList.remove('isOpen');
  }

  burger.addEventListener('click', () => {
    burger.classList.contains('isOpen') ? closeBurger() : openBurger();
  });

  logo.addEventListener('click', closeBurger);

  navWrapper.addEventListener('click', (e) => {
    if (e.target.classList.contains('header__link')) {
      closeBurger();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && burger.classList.contains('isOpen')) {
      closeBurger();
    }
  });
}

export default headerBurger;
