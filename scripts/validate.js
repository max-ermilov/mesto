function showError(
  input,
  errorContainer,
  errorText,
  { inputErrorClass, errorClass }
) {
  input.classList.add(inputErrorClass);
  errorContainer.classList.add(`${errorClass}_active`);
  errorContainer.textContent = errorText;
}

function hideError(input, errorContainer, { inputErrorClass, errorClass }) {
  input.classList.remove(inputErrorClass);
  errorContainer.classList.remove(`${errorClass}_active`);
  errorContainer.textContent = '';
}

function toggleButton(form, { submitButtonSelector, inactiveButtonClass }) {
  const button = form.querySelector(submitButtonSelector);
  const isFormValid = form.checkValidity();

  if (isFormValid) {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', '');
  }
}

function validateInput(form, input, classes) {
  const errorContainer = form.querySelector(`#${input.id}-error`);

  let isValid = input.validity.valid;
  let errorText = input.validationMessage;

  if (isValid) {
    hideError(input, errorContainer, classes);
  } else {
    showError(input, errorContainer, errorText, classes);
  }

  toggleButton(form, classes);
}

function enableValidation({ formSelector, inputSelector, ...rest }) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    const inputs = form.querySelectorAll(inputSelector);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        validateInput(form, input, rest);
      });
    });

    toggleButton(form, rest);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
});
