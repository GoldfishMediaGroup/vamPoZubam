import { rem } from './constants';

function scroll() {
  const allAnchors = document.querySelectorAll('.nav-link, .nav-link-end, .nav-top-link, .nav-link-offset');
  if (allAnchors.length <= 0) return;
  allAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      // Если клик по .nav-top-link → скроллим в самый верх
      if (anchor.classList.contains('nav-top-link')) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const href = anchor.getAttribute('href');
      const blockId = href.startsWith('#') ? href : `#${href.split('#')[1]}`;
      const scrollBlock = document.querySelector(blockId);

      // Определяем куда скроллить (start или end)
      const scrollPosition = anchor.classList.contains('nav-link-end') ? 'end' : 'start';

      // Если якорь найден на текущей странице — скроллим
      if (scrollBlock) {
        e.preventDefault();
        scrollBlock.scrollIntoView({
          behavior: 'smooth',
          block: scrollPosition
        });
      }

      if (anchor.classList.contains('nav-link-offset')) {
        const scrollPosition = anchor.classList.contains('nav-link-end') ? 'end' : 'start';
        const elementPosition = scrollBlock.getBoundingClientRect().top + window.pageYOffset;
        let offsetPosition = elementPosition;

        if (scrollPosition === 'start') {
          offsetPosition = elementPosition - (window.innerWidth > 768 ? rem(13.5) : rem(16));
        }
        // Для 'end' можно тоже добавить отступ если нужно

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
      }
      // Если нет — браузер сам перейдет на другую страницу с якорем
    });
  });
}

export default scroll;
