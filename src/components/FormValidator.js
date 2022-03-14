export default class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._inputSelector = settings.inputSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputs = this._form.querySelectorAll(this._inputSelector);
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showError(input, errorContainer, errorText) {
    input.classList.add(this._inputErrorClass);
    errorContainer.classList.add(`${this._errorClass}_active`);
    errorContainer.textContent = errorText;
  }

  _hideError(input, errorContainer) {
    input.classList.remove(this._inputErrorClass);
    errorContainer.classList.remove(`${this._errorClass}_active`);
    errorContainer.textContent = '';
  }

  _toggleButton() {
    const isFormValid = this._form.checkValidity();

    if (isFormValid) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', '');
    }
  }

  resetValidation() {
    this._toggleButton();
    this._inputs.forEach((input) => {
      const errorContainer = this._form.querySelector(`#${input.id}-error`);
      this._hideError(input, errorContainer)
    })
  }

  _validateInput(input) {
    const errorContainer = this._form.querySelector(`#${input.id}-error`);

    const isValid = input.validity.valid;
    const errorText = input.validationMessage;

    if (isValid) {
      this._hideError(input, errorContainer);
    } else {
      this._showError(input, errorContainer, errorText);
    }

    this._toggleButton();
  }

  enableValidation() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);
      });
    });
  }
}
