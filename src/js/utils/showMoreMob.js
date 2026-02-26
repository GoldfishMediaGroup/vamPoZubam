  function showMoreMob(selector, count, heightStr, selectoeBtn) {
    const elem = document.querySelector(selector);

    if(!elem) return
    let text = elem.innerHTML;

    window.addEventListener('resize', handleResize);

    function handleResize() {
      if (window.innerWidth > 768) {
        // Десктоп - показываем полный текст
        showFullText();
      } else {
        // Мобилка - применяем обрезку если активирована
        if (elem.hasAttribute('data-short')) {
          text_crop();
        }
      }
    }

    function showFullText() {
      elem.innerHTML = text;
      elem.style.maxHeight = 'none';
      // elem.removeAttribute('data-short');
    }

    function text_crop() {
      const mobileSize = count;
      elem.setAttribute('data-fulltext', text);

      if (text.length > mobileSize) {
        const croppedText = text.slice(0, mobileSize - 10);
        elem.innerHTML = croppedText + '...';
        elem.setAttribute('data-short', true);
        elem.style.maxHeight = heightStr;
      }
    }

    function expandText() {
      if (window.innerWidth > 768) {
        // На десктопе функция не нужна, но на всякий случай
        return;
      }

      if (elem.hasAttribute('data-short')) {
        // Разворачиваем текст
        const fullText = elem.getAttribute('data-fulltext');
        elem.innerHTML = fullText;
        elem.style.maxHeight = `${elem.scrollHeight + 20}rem`;
        elem.removeAttribute('data-short');
        elem.parentElement.classList.add('isActive');
      } else {
        // Сворачиваем текст
        elem.style.maxHeight = heightStr;
        elem.parentElement.classList.remove('isActive');
        setTimeout(() => {
          text_crop();
        }, 300);
      }
    }

    // Инициализация
    if (window.innerWidth > 768) {
      showFullText();
    } else {
      text_crop();
    }

    document.querySelectorAll(selectoeBtn).forEach((item) => item.addEventListener('click', expandText));
  }

  export default showMoreMob

