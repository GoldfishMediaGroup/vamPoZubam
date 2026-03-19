import './forms';
import { formFieldsInit, formSubmit } from './forms';
import 'inputmask';

const form = () => {
  // form fields
  formFieldsInit({ viewPass: true });
  // submit form
  formSubmit();

  initMasks();
  amountMask();

  nameValidate();
  mailValidate();
  telValidate();
  cardValidate();
  timeValidate();
  dateValidate();
  numericValidate();

  codeNum();

  setupFormListener('.popup__tab.tab--tel .tab__start .tab__form ', '.popup__tab.tab--tel .tab__start .submit-btn');
  setupFormListener('.popup__tab.tab--email .tab__start .tab__form ', '.popup__tab.tab--email .tab__start .submit-btn');

  setupFormListener('.steps-step__tab.tab--tel .steps-step__tab-start .steps-step__tab-form ', '.steps-step__tab.tab--tel .steps-step__tab-start .submit-btn');
  setupFormListener('.steps-step__tab.tab--email .steps-step__tab-start .steps-step__tab-form ', '.steps-step__tab.tab--email .steps-step__tab-start .submit-btn');
  
  setupFormListener('.lk-mail__form', '.lk-mail__submit-btn');
  setupFormListener('[data-content="hand"] .steps-step__form', '[data-content="hand"] .steps-step__form .submit-btn');

  clickFpplicationBtn('.lk-mail__submit-btn', '.lk-mail__content', '.lk-mail__cancel');

  function nameValidate() {
    const name = document.querySelectorAll('.input--name');

    function validateName(item) {
      const inputValue = item.value.trim();
      const span = item.parentElement.nextElementSibling;
      const parent = item.parentElement;
      const isValid = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(inputValue);

      // Всегда сначала удаляем классы
      parent.classList.remove('_form-error', '_form-filled');
      span.classList.remove('active');

      if (inputValue !== '') {
        parent.classList.add('_form-filled'); // всегда вешаем, если не пустое
        if (!isValid) {
          span.classList.add('active');
          parent.classList.add('_form-error');
        }
      } else {
        span.classList.add('active');
        parent.classList.add('_form-error');
      }
    }
    name.forEach((item) => {
      item.addEventListener('input', () => {
        validateName(item);
      });
      item.addEventListener('blur', () => {
        validateName(item);
      });
    });
  }

  function mailValidate() {
    const mail = document.querySelectorAll('.input--mail');

    mail.forEach((item) => {
      item.addEventListener('input', () => {
        const inputValue = item.value.trim();
        const span = item.parentElement.nextElementSibling;
        const parent = item.parentElement.parentElement;
        console.log(123);
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(inputValue) && inputValue != '') {
          // span.classList.add('active');
          parent.classList.add('_form-error');
        }
        // else if (inputValue.length < 10) {
        //   parent.classList.add('_form-error');
        // }
        else {
          // span.classList.remove('active');
          parent.classList.remove('_form-error');
        }
      });
    });
  }

  function numericValidate() {
    const numeric = document.querySelectorAll('.input--numeric');

    numeric.forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/\D/g, '');

        const inputValue = item.value.trim();

        const span = item.parentElement.nextElementSibling;
        const parent = item.parentElement.parentElement;

        const maxLimit = parseInt(item.dataset.numericMax) || Infinity;

        const isEmpty = inputValue === '';

        const isTooLong = inputValue.length > maxLimit;

        if (isEmpty || isTooLong) {
          parent.classList.add('_form-error');

          if (isTooLong) {
            span.textContent = 'Превышено количество символов';
          } else {
            span.textContent = 'Некорректное значение';
          }
        } else {
          parent.classList.remove('_form-error');
        }
      });
    });
  }

  function initMasks() {
    const masks = [
      { selector: '.phone-mask', mask: '+7 (999) 999-99-99', placeholder: '+7 (___) ___-__-__' },
      { selector: '.time-mask', mask: '99:99', placeholder: '__:__' },
      { selector: '.date-mask', mask: '99.99.9999', placeholder: '__.__.____' },
      { selector: '.card-mask', mask: '9999 9999 9999 9999', placeholder: '____ ____ ____ ____' }
    ];

    masks.forEach((m) => {
      if (document.querySelector(m.selector)) {
        new Inputmask(m.mask, {
          placeholder: m.placeholder,
          showMaskOnHover: false,
          showMaskOnFocus: true
        }).mask(document.querySelectorAll(m.selector));
      }
    });
  }

  function amountMask() {
    const amountInputs = document.querySelectorAll('.input--amount');

    amountInputs.forEach((input) => {
      input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value) {
          value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }
        e.target.value = value;
      });
    });
  }

  function telValidate() {
    const tel = document.querySelectorAll('.input--tel');

    tel.forEach((item) => {
      item.addEventListener('input', () => {
        const inputValue = item.value.trim();
        const span = item.parentElement.nextElementSibling;
        const parent = item.parentElement.parentElement;

        if (!/^\+\d{1} \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(inputValue) && inputValue != '') {
          // span.classList.add('active');
          parent.classList.add('_form-error');
        } else if (inputValue.length < 16) {
          parent.classList.add('_form-error');
        } else {
          // span.classList.remove('active');
          parent.classList.remove('_form-error');
        }
      });
    });
  }

  function cardValidate() {
    const card = document.querySelectorAll('.input--card');

    card.forEach((item) => {
      item.addEventListener('input', () => {
        const cleanValue = item.value.replace(/\D/g, '');
        const inputValue = item.value.trim();
        const span = item.parentElement.nextElementSibling;
        const parent = item.parentElement.parentElement;

        if (cleanValue.length < 16) {
          parent.classList.add('_form-error');
        } else {
          parent.classList.remove('_form-error');
        }
      });
    });
  }

  function timeValidate() {
    const time = document.querySelectorAll('.input--time');

    time.forEach((item) => {
      item.addEventListener('input', () => {
        const inputValue = item.value.trim();
        const span = item.parentElement.nextElementSibling;
        const parent = item.parentElement.parentElement;

        if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(inputValue) && inputValue != '') {
          // span.classList.add('active');
          parent.classList.add('_form-error');
        }
        // else if (inputValue.length < 5) {
        //   parent.classList.add('_form-error');
        // }
        else {
          // span.classList.remove('active');
          parent.classList.remove('_form-error');
        }
      });
    });
  }

  function dateValidate() {
    const date = document.querySelectorAll('.input--date');

    date.forEach((item) => {
      item.addEventListener('input', () => {
        const inputValue = item.value.trim();
        const span = item.parentElement.nextElementSibling;
        const parent = item.parentElement.parentElement;

        if (!/^\d{2}\.\d{2}\.\d{4}$/.test(inputValue) && inputValue != '') {
          // span.classList.add('active');
          parent.classList.add('_form-error');
        } else if (inputValue.length < 10) {
          parent.classList.add('_form-error');
        } else {
          // span.classList.remove('active');
          parent.classList.remove('_form-error');
        }
      });
    });
  }

  function codeNum() {
    const boxes = document.querySelectorAll('.form__num-box');

    boxes.forEach((box) => {
      const codeInputs = box.querySelectorAll('.input--code');
      if (!codeInputs.length) return;

      function handleInput(index, currentInput) {
        // Удаляем всё, кроме цифр
        currentInput.value = currentInput.value.replace(/\D/g, '');

        if (currentInput.value && index < codeInputs.length) {
          codeInputs[index].focus();
        }
      }

      codeInputs.forEach((item, i) => {
        item.addEventListener('input', () => {
          handleInput(i + 1, item);
        });

        item.addEventListener('focus', () => {
          for (let j = i - 1; j >= 0; j--) {
            if (codeInputs[j].value === '') {
              codeInputs[j].focus();
              codeInputs[j + 1].classList.remove('_form-error');
              codeInputs[j + 1].parentElement.classList.remove('_form-error');
              codeInputs[j + 1].parentElement.parentElement.classList.remove('_form-error');
              break;
            }
          }
        });

        item.addEventListener('keydown', (event) => {
          if (event.key === 'Backspace' && item.value === '' && i > 0) {
            codeInputs[i - 1].focus();
          }
        });
      });

      const firstInput = codeInputs[0];

      firstInput.addEventListener('paste', (event) => {
        event.preventDefault();
        const data = (event.clipboardData || window.clipboardData).getData('text');
        // Оставляем только цифры
        const characters = data.replace(/\D/g, '').split('');

        codeInputs.forEach((input, index) => {
          if (characters[index]) {
            input.value = characters[index];
            input.classList.remove('_form-error');
            input.classList.add('_form-filled');
            input.parentElement.classList.remove('_form-error');
          }
        });

        const focusIndex = Math.min(characters.length, codeInputs.length) - 1;
        if (focusIndex >= 0) {
          codeInputs[focusIndex].focus();
        }
      });
    });
  }

  function setupFormListener(formSelector, submitButtonSelector) {
    const form = document.querySelector(formSelector);
    const submitButton = document.querySelector(submitButtonSelector);

    if (!form || !submitButton) return;

    let formElements = form.querySelectorAll('input[data-required], textarea[data-required]');

    const formElementCheckbox = form.querySelectorAll('.form__check-label input');
    const formElementsParents = form.querySelectorAll('.form__label');

    function updateSubmitButtonState() {
      const isEmpty = Array.from(formElements).some((element) => {
        return element.value.trim() === '';
      });
      const formError = Array.from(formElementsParents).some((element) => {
        return element.classList.contains('_form-error');
      });
      const formErrorInner = Array.from(formElementsParents).some((element) => {
        return element.querySelector('.form__label-inner').classList.contains('_form-error');
      });

      const formErrorCheckbox = Array.from(formElementCheckbox).some((element) => {
        return !element.checked;
      });

      if (isEmpty || formError || formErrorInner || formErrorCheckbox) {
        submitButton.setAttribute('disabled', 'disabled');
      } else {
        submitButton.removeAttribute('disabled');
      }
    }

    formElements.forEach((element) => {
      element.addEventListener('input', updateSubmitButtonState);
    });
    formElements.forEach((element) => {
      element.addEventListener('blur', updateSubmitButtonState);
    });
    formElementCheckbox.forEach((checkbox) => {
      checkbox.addEventListener('change', updateSubmitButtonState);
    });

    updateSubmitButtonState();
  }

  function clickFpplicationBtn(btnSelector, wrapSelector, canselBtnSelector = null) {
    const btn = document.querySelector(btnSelector);
    const wrap = document.querySelector(wrapSelector);
    if (!btn || !wrap) return;

    btn.addEventListener('click', () => {
      wrap.classList.add('isSuccess');
    });

    const canselBtn = document.querySelector(canselBtnSelector);

    canselBtn &&
      canselBtn.addEventListener('click', () => {
        wrap.classList.remove('isSuccess');
      });
  }

  function textareaValidate() {
    const textareas = document.querySelectorAll('.form__textarea');

    function textareaCount(item) {
      let textareaValue = item.value.trim();
      const span = item.closest('.form__textarea-wrap').querySelector('.form__textarea-count .current');
      const length = item.closest('.form__textarea-wrap').querySelector('.form__textarea-count .all').textContent;
      if (textareaValue.length > 0) {
        span.parentElement.classList.add('active');
      } else {
        span.parentElement.classList.remove('active');
      }
      if (textareaValue.length > length) {
        textareaValue = textareaValue.substring(0, length);
        item.value = textareaValue;
      }

      // Обновляем спан
      const remaining = textareaValue.length;
      if (span) {
        span.textContent = remaining;
      }
    }
    textareas.forEach((textarea) => {
      textarea.addEventListener('input', () => {
        textareaCount(textarea);
      });
    });
  }
};

export default form;
