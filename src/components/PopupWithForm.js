import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = [...this._form.querySelectorAll('.popup__input')];
  }

  _getInputValues() {
    const formValues = {};
    this._inputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  _handleSubmit() {
    // e.preventDefault();
    this._formSubmitCallback(this._getInputValues());
    this.close();
  }

  cangeSubmitHandler(newSubmitHandler) {
    this._handleSubmit = newSubmitHandler
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
