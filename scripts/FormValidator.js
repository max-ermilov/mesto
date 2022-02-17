export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._inputSelector = settings.inputSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
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
    const button = this._form.querySelector(this._submitButtonSelector);
    const isFormValid = this._form.checkValidity();

    if (isFormValid) {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute('disabled');
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute('disabled', '');
    }
  }

  _validateInput(input) {
    const errorContainer = this._form.querySelector(`#${input.id}-error`);

    let isValid = input.validity.valid;
    let errorText = input.validationMessage;

    if (isValid) {
      this._hideError(input, errorContainer);
    } else {
      this._showError(input, errorContainer, errorText);
    }

    this._toggleButton();
  }

  enableValidation() {
    const inputs = this._form.querySelectorAll(this._inputSelector);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);
        this._toggleButton();
      });
    });
  }
}
