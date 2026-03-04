function popupRegistration() {
  const popup = document.querySelector('#popup__registration');
  if (!popup) return;

  const btns = popup.querySelectorAll('.tab-btns__btn');
  const allTabs = popup.querySelectorAll('.popup__tab');

  let countdownInterval;

  function clickTriggerBtns() {
    const modalTriggers = document.querySelectorAll(`[data-popup="#popup__registration"]`);
    const popup = document.querySelector('#popup__registration');

    if (!popup) return;

    modalTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const kind = trigger.getAttribute('data-kind-register') || 'tel';
        if (kind) {
          switchRegistrationTab(popup, kind);
        }
      });
    });
  }

  function startRetryTimer(endBlock) {
    const timerBtn = endBlock.querySelector('.tab__end-timer.btn-primary');
    if (!timerBtn) return;

    clearInterval(countdownInterval);
    let timeLeft = timerBtn.dataset.timer;

    timerBtn.disabled = true;
    const btnText = timerBtn.querySelector('span');

    // Функция форматирования времени (секунды в M:SS)
    const updateText = (totalSeconds) => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      // Форматируем секунды, чтобы всегда было две цифры (0:05 вместо 0:5)
      const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
      btnText.textContent = `Запросить код повторно через ${minutes}:${paddedSeconds}`;
    };

    updateText(timeLeft);

    countdownInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft > 0) {
        updateText(timeLeft);
      } else {
        clearInterval(countdownInterval);
        btnText.textContent = 'Запросить код повторно';
        timerBtn.disabled = false;
      }
    }, 1000);

    // Обработка клика по кнопке "Получить код"
    timerBtn.onclick = (e) => {
      e.preventDefault();
      startRetryTimer(endBlock);
    };
  }

  function switchRegistrationTab(popup, targetId) {
    const targetBtn = popup.querySelector(`[data-triger="${targetId}"]`);
    if (!targetBtn) return;

    // Сброс таймера при переключении между табами
    clearInterval(countdownInterval);

    btns.forEach((b) => b.classList.toggle('isActive', b === targetBtn));

    if (btns[0] && btns[0].parentElement) {
      btns[0].parentElement.classList.toggle('isActive', targetId === 'email');
    }

    allTabs.forEach((tab) => {
      const isTarget = tab.dataset.content === targetId;
      tab.classList.toggle('isActive', isTarget);

      if (isTarget) {
        tab.querySelector('[data-start]')?.classList.add('isActive');
        const endPart = tab.querySelector('[data-end]');

        if (endPart) {
          endPart.classList.remove('isActive');
          const endForm = endPart.querySelector('form');
          if (endForm) {
            endForm.reset();
            endForm.querySelectorAll('._form-filled, ._form-error').forEach((el) => {
              el.classList.remove('_form-filled', '_form-error');
            });
          }

          // Возврат кнопки таймера в исходный вид при деактивации таба
          const timerBtn = endPart.querySelector('.tab__end-timer.btn-primary span');
          if (timerBtn) timerBtn.textContent = 'Запросить код повторно через 1:20';
          const btn = endPart.querySelector('.tab__end-timer.btn-primary');
          if (btn) btn.disabled = true;
        }
      }
    });
  }

  function clickModalTabAndBack(e) {
    const btn = e.target.closest('[data-triger]');
    const backBtn = e.target.closest('.popup__end-back-btn');

    if (btn) {
      const targetId = btn.dataset.triger;
      switchRegistrationTab(popup, targetId);
      return;
    }

    if (backBtn) {
      const currentTab = backBtn.closest('[data-content]');
      if (currentTab) {
        const targetId = currentTab.dataset.content;
        switchRegistrationTab(popup, targetId);
      }
    }
  }

  function sumbitStartTabModal(e) {
    const form = e.target.closest('.tab__form');
    const startBlock = e.target.closest('[data-start]');

    if (!startBlock || !form) return;

    e.preventDefault();

    const currentTab = startBlock.closest('.popup__tab');
    const endBlock = currentTab.querySelector('[data-end]');
    const input = form.querySelector('input');

    const inputValue = input ? input.value : '';
    const infoSpan = endBlock.querySelector('.tab__end-back-info p span');
    if (infoSpan) infoSpan.textContent = inputValue;

    startBlock.classList.remove('isActive');
    if (endBlock) {
      endBlock.classList.add('isActive');
      startRetryTimer(endBlock); // Запуск таймера при переходе на финальный этап
    }

    setTimeout(() => {
      form.reset();
      const submitBtn = form.querySelector('.submit-btn');
      if (submitBtn) submitBtn.disabled = true;
      if (input) input.classList.remove('_form-filled');
    }, 500);
  }

  clickTriggerBtns();
  popup.addEventListener('click', clickModalTabAndBack);
  popup.addEventListener('submit', sumbitStartTabModal);
}

export default popupRegistration;
