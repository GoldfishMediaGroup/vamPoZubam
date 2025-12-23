window.$ = window.jQuery = require('jquery');

function faqAccordion() {
  const items = document.querySelectorAll('.faq__item');
  const infos = document.querySelectorAll('.faq__info');
    if (items.length <= 0 || infos.length <= 0) return;
  items.forEach((item, i) => {
    item.addEventListener('click', () => {
        item.classList.toggle('isActive');
      $(infos[i]).slideToggle();
    });
  });
}

export default faqAccordion;
