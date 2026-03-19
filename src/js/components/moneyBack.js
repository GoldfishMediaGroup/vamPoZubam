function moneyBack() {
  const section = document.querySelector('.moneyback');

  if (!section) return;

  const step1 = section.querySelector('.steps-step--1');
  const step2 = section.querySelector('.steps-step--2');
  const step3 = section.querySelector('.steps-step--3');

  if (step1) {
    let videoStream = null;

    const fileInput = step1.querySelector('.choose-file__input');
    const dropArea = step1.querySelector('.choose-file');
    const mobileCameraInput = step1.querySelector('.take-photo__input');

    const startBtn = step1.querySelector('.camera-file__start');
    const snapBtn = document.querySelector('.camera-file__snap-btn');
    const video = document.querySelector('.camera-file__webcam');
    const canvas = document.querySelector('.camera-file__snapshot');
    const videoDisclaimer = document.querySelector('.camera-file__disclaimer');

    const resultsDir = step1.querySelector('.steps-step__file-list');

    const maxMb = parseFloat(resultsDir.getAttribute('data-max-size')) || 50;
    const iconPath = resultsDir.getAttribute('data-icon-path');

    const MAX_SIZE_KB = maxMb * 1024;

    // --- 1. ФУНКЦИИ УПРАВЛЕНИЯ СОСТОЯНИЕМ ---

    function toggleSubmitButton(inputName) {
      const targetObj = window.arrInputFiles.find((x) => x.name === inputName);

      // Ищем ближайший общий контейнер для списка файлов и кнопки
      const container = resultsDir.closest('[data-content]') || document.body;
      const submitBtn = container.querySelector('.submit-btn');

      if (!submitBtn) {
        console.error('Кнопка .submit-btn не найдена в контейнере [data-content]');
        return;
      }

      // Проверяем наличие файлов в массиве
      if (targetObj && targetObj.file.length > 0) {
        submitBtn.removeAttribute('disabled');
        submitBtn.disabled = false; // На всякий случай дублируем через свойство
      } else {
        submitBtn.setAttribute('disabled', 'disabled');
        submitBtn.disabled = true;
      }
    }
    function updateGlobalArray(inputName, file, isRemoving = false) {
      let targetObj = window.arrInputFiles.find((x) => x.name === inputName);

      if (!targetObj) {
        targetObj = { name: inputName, file: [] };
        window.arrInputFiles.push(targetObj);
      }

      if (isRemoving) {
        targetObj.file = targetObj.file.filter((f) => f.name !== file.name);
      } else {
        if (!targetObj.file.some((f) => f.name === file.name)) {
          targetObj.file.push(file);
        }
      }

      // Важно: передаем имя инпута, чтобы функция знала, какой объект проверять
      toggleSubmitButton(inputName);
    }
    // --- 2. ФУНКЦИИ ОБРАБОТКИ ФАЙЛОВ ---

    function handleFiles(files, isMobileTrigger = false) {
      Array.from(files).forEach((file, index) => {
        let finalFile = file;

        // Только для мобильной камеры генерируем уникальное имя
        if (isMobileTrigger) {
          const timestamp = Date.now();
          const randomID = Math.floor(Math.random() * 1000);
          const extension = file.name.split('.').pop() || 'jpg';

          finalFile = new File([file], `mobile_snap_${timestamp}_${randomID}_${index}.${extension}`, {
            type: file.type
          });
        }

        // Проверка на дубликаты в DOM
        if (!resultsDir.querySelector(`[data-name="${finalFile.name}"]`)) {
          resultsDir.appendChild(createFileItem(finalFile));
        }
      });
    }

    function createFileItem(file, isCamera = false) {
      const inputName =
        (fileInput ? fileInput.getAttribute('name') : null) ||
        (mobileCameraInput ? mobileCameraInput.getAttribute('name') : null) ||
        'file-bills';

      const sizeInBytes = file.size;
      const fileSizeKb = (sizeInBytes / 1024).toFixed(1);
      const fileName = file.name;
      const fileExt = fileName.split('.').pop().toLowerCase();

      const fileURL = isCamera ? file.preview : URL.createObjectURL(file);

      // Логика иконок (как была)
      let iconImg = 'fileIconJpg';
      if (fileExt === 'pdf') {
        iconImg = 'fileIconPdf';
      } else if (fileExt === 'png') {
        iconImg = 'fileIconPng';
      } else if (fileExt === 'webp') {
        iconImg = 'fileIconWebp';
      }

      const listItem = document.createElement('li');
      listItem.dataset.name = fileName;

      const isTooBig = sizeInBytes > MAX_SIZE_KB * 1024;
      listItem.classList.add('steps-step__file-item', 'file-item', isTooBig ? 'isError' : 'isLoading');

      listItem.innerHTML = `
        <div class="file-item__inner">
          <button class="file-item__remove-btn" type="button">
            <img src="${iconPath}canselFile.svg" alt="" />
            <img src="${iconPath}trash.svg" alt="" />
          </button>
          <div class="file-item__content">
            <a data-fancybox="billFile" data-src="${fileURL}" data-type="${fileExt === 'pdf' ? 'pdf' : 'image'}" class="file-item__icon">
                <img src="${iconPath}${iconImg}.svg" alt="" />
            </a>
            <div class="file-item__details">
              <p class="file-item__name txt20 semibold">${fileName}</p>
              <div class="file-item__progress-info">
                <span class="file-item__kb txt18 medium"><span class="current-kb">0</span> из ${fileSizeKb} KB</span>
                <div class="file-item__status">
                  <div class="file-item__status-svg">
                    <img src="${iconPath}load.svg" alt="" />
                    <img src="${iconPath}done.svg" alt="" />
                    <img src="${iconPath}error.svg" alt="" />
                  </div>
                  <span class="file-item__status-text txt18 medium grey">${isTooBig ? 'Ошибка загрузки' : 'Загружается...'}</span>
                </div>
              </div>
              <div class="file-item__progress-bar"><div class="file-item__progress-fill"></div></div>
            </div>
          </div>
        </div>`;

      listItem.querySelector('.file-item__remove-btn').addEventListener('click', () => {
        updateGlobalArray(inputName, file, true);
        listItem.remove();
        if (!isCamera) URL.revokeObjectURL(fileURL);
      });

      if (!isTooBig) {
        updateGlobalArray(inputName, file);
        simulateUpload(listItem, fileSizeKb);
      }

      return listItem;
    }

    function simulateUpload(item, totalKb) {
      const fill = item.querySelector('.file-item__progress-fill');
      const currentText = item.querySelector('.current-kb');
      let p = 0;
      const int = setInterval(() => {
        p += Math.random() * 25;
        if (p >= 100) {
          p = 100;
          clearInterval(int);
          item.classList.replace('isLoading', 'isSuccess');
          item.querySelector('.file-item__status-text').textContent = 'Загружено';
        }
        fill.style.width = p + '%';
        currentText.textContent = ((totalKb * p) / 100).toFixed(1);
      }, 200);
    }

    // --- 3. КАМЕРА И ИНПУТЫ ---

    function stopCamera() {
      if (videoStream) {
        videoStream.getTracks().forEach((t) => t.stop());
        video.srcObject = null;
        videoStream = null;
      }
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files, false);
        e.target.value = '';
      });
    }

    if (mobileCameraInput) {
      mobileCameraInput.addEventListener('change', (e) => {
        handleFiles(e.target.files, true);
        e.target.value = '';
      });
    }

    if (dropArea) {
      dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('isActive');
      });
      dropArea.addEventListener('dragleave', () => dropArea.classList.remove('isActive'));
      dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('isActive');
        handleFiles(e.dataTransfer.files, false);
      });
    }

    if (startBtn) {
      startBtn.addEventListener('click', async () => {
        try {
          videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = videoStream;
          videoDisclaimer.style.display = 'none';
          snapBtn.querySelector('span').textContent = 'Сделать фото';
        } catch (err) {
          videoDisclaimer.style.display = 'flex';
          videoDisclaimer.textContent = 'Камера недоступна';
          snapBtn.querySelector('span').textContent = 'Закрыть';
        }
      });
    }

    if (snapBtn) {
      snapBtn.addEventListener('click', () => {
        if (videoDisclaimer.style.display === 'flex') return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);

        const dataUrl = canvas.toDataURL('image/jpeg');
        const byteString = atob(dataUrl.split(',')[1]);
        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

        const photoFile = new File([ab], `snap_${Date.now()}.jpg`, { type: mimeString });
        photoFile.preview = dataUrl;

        resultsDir.appendChild(createFileItem(photoFile, true));

        setTimeout(() => {
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        }, 600);

        stopCamera();
      });
    }
  }

  if (step2) {
    const tabTriggers = step2.querySelectorAll('.tab-btns__btn');
    const tabs = step2.querySelectorAll('.steps-step__tab');

    function switchTabValidation(activeTabIndex) {
      tabs.forEach((tab, index) => {
        // Ищем инпут либо с активным атрибутом, либо с сохраненным "типом"
        const input = tab.querySelector('input[data-required], input[data-type]');

        if (!input) return;

        // Инициализация (сохраняем тип во временный атрибут один раз)
        if (!input.dataset.type) {
          input.setAttribute('data-type', input.getAttribute('data-required'));
        }

        if (index === activeTabIndex) {
          const type = input.getAttribute('data-type');
          input.setAttribute('data-required', type);
          input.setAttribute('data-validate', '');
        } else {
          input.removeAttribute('data-required');
          input.removeAttribute('data-validate');

          const parent = input.closest('.form__label') || input.parentElement.parentElement;
          if (parent) parent.classList.remove('_form-error');

          const span = parent?.querySelector('.form__error') || input.parentElement.nextElementSibling;
          if (span) span.classList.remove('active');
        }
      });
    }

    function setupFormListener(formSelector, submitButtonSelector) {
      const form = document.querySelector(formSelector);
      const submitButton = document.querySelector(submitButtonSelector);

      if (!form || !submitButton) return;

      function updateSubmitButtonState() {
        setTimeout(() => {
          const currentRequired = form.querySelectorAll('input[data-required], textarea[data-required]');
          const checkboxes = form.querySelectorAll('.form__check-label input');

          const isEmpty = Array.from(currentRequired).some((el) => el.value.trim() === '');

          const hasActiveError = Array.from(currentRequired).some((el) => {
            const parent = el.closest('.form__label') || el.parentElement;
            return el.classList.contains('_form-error') || parent.classList.contains('_form-error');
          });

          const hasUnchecked = Array.from(checkboxes).some((el) => !el.checked);

          if (isEmpty || hasActiveError || hasUnchecked) {
            submitButton.setAttribute('disabled', 'disabled');
          } else {
            submitButton.removeAttribute('disabled');
          }
        }, 0);
      }

      form.addEventListener('input', (e) => {
        if (e.target.matches('input, textarea')) updateSubmitButtonState();
      });

      form.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox' || e.target.type === 'radio') updateSubmitButtonState();
      });

      form.addEventListener('click', (e) => {
        if (e.target.closest('[data-triger]')) {
          updateSubmitButtonState();
        }
      });

      form.addEventListener(
        'blur',
        (e) => {
          if (e.target.hasAttribute('data-required')) updateSubmitButtonState();
        },
        true
      );

      updateSubmitButtonState();
    }

    setupFormListener('.steps-step--2 .steps-step__form-wrap ', '.steps-step--2 .steps-step__form-wrap  .submit-btn');

    switchTabValidation(0);
    tabTriggers.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        switchTabValidation(index);
      });
    });
  }

  if (step3) {
    const btns = Array.from(step3.querySelectorAll('.tab-btns__btn'));
    const allTabs = step3.querySelectorAll('.steps-step__tab');

    let countdownInterval;

    function clickTriggerBtns() {
      const modalTriggers = document.querySelectorAll(`[data-kind-step]`);

      modalTriggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
          const kind = trigger.getAttribute('data-kind-step');
          if (kind) {
            switchRegistrationTab(step3, kind);
            console.log(kind);
          }
        });
      });
    }

    function startRetryTimer(endBlock) {
      const timerBtn = endBlock.querySelector('.steps-step__tab-end-timer.btn-primary');
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

      const index = btns.indexOf(targetBtn);
      targetBtn.parentElement.style.setProperty('--index', index);
      targetBtn.parentElement.style.setProperty('--tabs-count', btns.length);

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
            const timerBtn = endPart.querySelector('.steps-step__tab-end-timer.btn-primary span');
            if (timerBtn) timerBtn.textContent = 'Запросить код повторно через 1:20';
            const btn = endPart.querySelector('.steps-step__tab-end-timer.btn-primary');
            if (btn) btn.disabled = true;
          }
        }
      });
    }
    function clickModalTabAndBack(e) {
      const btn = e.target.closest('[data-triger]');
      const backBtn = e.target.closest('.steps-step__tab-end-back-btn');

      if (btn) {
        const targetId = btn.dataset.triger;
        switchRegistrationTab(step3, targetId);
        return;
      }

      if (backBtn) {
        const currentTab = backBtn.closest('[data-content]');
        if (currentTab) {
          const targetId = currentTab.dataset.content;
          switchRegistrationTab(step3, targetId);
        }
      }
    }
    function sumbitStartTabModal(e) {
      const form = e.target.closest('.steps-step__tab-form');
      const startBlock = e.target.closest('[data-start]');

      if (!startBlock || !form) return;

      e.preventDefault();

      const currentTab = startBlock.closest('.steps-step__tab');
      const endBlock = currentTab.querySelector('[data-end]');
      const input = form.querySelector('input');

      const inputValue = input ? input.value : '';
      const infoSpan = endBlock.querySelector('.steps-step__tab-end-back-info p span');
      if (infoSpan) infoSpan.textContent = inputValue;

      startBlock.classList.remove('isActive');
      if (endBlock) {
        endBlock.classList.add('isActive');
        startRetryTimer(endBlock); // Запуск таймера при переходе на финальный этап
      }

      setTimeout(() => {
        hardReset(form);
        const submitBtn = form.querySelector('.submit-btn');
        if (submitBtn) submitBtn.disabled = true;
        if (input) input.classList.remove('_form-filled');
      }, 500);
    }
    function hardReset(form) {
      if (!form) return;
      const inputs = form.querySelectorAll('input, textarea, select');

      inputs.forEach((input) => {
        if (input.type === 'checkbox' || input.type === 'radio') {
          input.checked = false;
        } else {
          input.value = '';
        }
        const parent = input.closest('.form__label') || input.parentElement;
        if (parent) parent.classList.remove('_form-error');
      });
      if (typeof updateSubmitButtonState === 'function') {
        updateSubmitButtonState();
      }
    }
    clickTriggerBtns();
    step3.addEventListener('click', clickModalTabAndBack);
    step3.addEventListener('submit', sumbitStartTabModal);
  }
}

export default moneyBack;
