export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this.close();
    }
  };

  _handleMouseClose = (e) => {
    if (
      e.target.classList.contains('popup_opened') ||
      e.target.classList.contains('popup__close-btn')
    ) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener('click', this._handleMouseClose);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
