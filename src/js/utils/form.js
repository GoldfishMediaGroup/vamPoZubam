import './forms';
import { formFieldsInit, formSubmit } from './forms';
import 'inputmask';

const form = () => {
  // form fields
  formFieldsInit({ viewPass: true });
  // submit form
  formSubmit();
  nameValidate();
  mailValidate();
  // textareaValidate();
  phoneMask();
  telValidate();

  function telValidate() {
    const tel = document.querySelectorAll('.input--tel');


     function validateMail(item, isSpan) {
      const inputValue = item.value.trim();
      const span = isSpan && item.parentElement.nextElementSibling;
      const parent = item.parentElement;

      const isValid = /^\+7 \(\d \d \d\) \d \d \d - \d \d - \d \d$/.test(inputValue);

      parent.classList.remove('_form-error', '_form-filled');
      span && span.classList.remove('active');

      if (inputValue !== '') {
        parent.classList.add('_form-filled');

        if (!isValid) {
          span && span.classList.add('active');
          parent.classList.add('_form-error');
        }
      } else {
        // Пустое поле — ошибка
        span && span.classList.add('active');
        parent.classList.add('_form-error');
      }
    }

    tel.forEach((item) => {
      item.addEventListener('input', () => {
        item.parentElement.classList.remove('_form-error', '_form-filled');
        item.parentElement.nextElementSibling.classList.remove('active');
      });
      item.addEventListener('blur', () => {
        validateMail(item, true);
      });
    });

    
  }

  function nameValidate() {
    const name = document.querySelectorAll('.input--name');

    function validateName(item) {
      const inputValue = item.value.trim();
      const span = item.parentElement.nextElementSibling;
      const parent = item.parentElement;
      const isValid = /^[a-zA-Zа-яА-Я\s\-]+$/.test(inputValue);

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

    function validateMail(item, isSpan) {
      const inputValue = item.value.trim();
      const span = isSpan && item.parentElement.nextElementSibling;
      const parent = item.parentElement;

      const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(inputValue);

      // Сброс
      parent.classList.remove('_form-error', '_form-filled');
      span && span.classList.remove('active');

      if (inputValue !== '') {
        parent.classList.add('_form-filled');

        if (!isValid) {
          span && span.classList.add('active');
          parent.classList.add('_form-error');
        }
      } else {
        // Пустое поле — ошибка
        span && span.classList.add('active');
        parent.classList.add('_form-error');
      }
    }

    mail.forEach((item) => {
      item.addEventListener('input', () => {
        item.parentElement.classList.remove('_form-error', '_form-filled');
        item.parentElement.nextElementSibling.classList.remove('active');
      });
      item.addEventListener('blur', () => {
        validateMail(item, true);
      });
    });
  }

  function phoneMask() {
    const mask = new Inputmask('+7 (9 9 9) 9 9 9 - 9 9 - 9 9');
    mask.mask($('.phone-mask'));
  }

  // function textareaValidate() {
  //   const textareas = document.querySelectorAll('.form__textarea');

  //   function textareaCount(item) {
  //     let textareaValue = item.value.trim();
  //     const span = item.closest('.form__textarea-wrap').querySelector('.form__textarea-count .current');
  //     const length = item.closest('.form__textarea-wrap').querySelector('.form__textarea-count .all').textContent;
  //     if (textareaValue.length > 0) {
  //       span.parentElement.classList.add('active');
  //     } else {
  //       span.parentElement.classList.remove('active');
  //     }
  //     if (textareaValue.length > length) {
  //       textareaValue = textareaValue.substring(0, length);
  //       item.value = textareaValue;
  //     }

  //     // Обновляем спан
  //     const remaining = textareaValue.length;
  //     if (span) {
  //       span.textContent = remaining;
  //     }
  //   }
  //   textareas.forEach((textarea) => {
  //     textarea.addEventListener('input', () => {
  //       textareaCount(textarea);
  //     });
  //   });
  // }

  function setupFormListener(formSelector, submitButtonSelector) {
    const form = document.querySelector(formSelector);
    const submitButton = document.querySelector(submitButtonSelector);

    if (!form || !submitButton) return;

    const formElements = form.querySelectorAll('input[data-required], textarea[data-required]');

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

  setupFormListener('.application__form', '.application .btn-arr');
  setupFormListener('.popup__form', '.popup .btn-arr');
};

export default form;
