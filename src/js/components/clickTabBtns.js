function clickTabBtns() {
  function updateTabPosition(container) {
    const btns = Array.from(container.querySelectorAll('.tab-btns__btn'));
    const activeBtn = container.querySelector('.tab-btns__btn.isActive') || btns[0];
    const index = btns.indexOf(activeBtn);

    container.style.setProperty('--index', index);
    container.style.setProperty('--tabs-count', btns.length);

    // Добавляем переключение контента, если кнопки связаны с табами
    const targetId = activeBtn.dataset.triger;

    if (targetId) {
      const allTabs = container.parentElement.querySelectorAll(`[data-content]`);
      allTabs.forEach((tab) => {
        tab.classList.toggle('isActive', tab.dataset.content === targetId);
      });
    }
  }

  document.querySelectorAll('.tab-btns').forEach(updateTabPosition);

  document.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('.tab-btns__btn');
    if (!targetBtn) return;
    e.preventDefault();

    const container = targetBtn.parentElement;
    const btns = container.querySelectorAll('.tab-btns__btn');

    btns.forEach((btn) => btn.classList.remove('isActive'));
    targetBtn.classList.add('isActive');

    updateTabPosition(container);
  });
}

export default clickTabBtns;
