import { openModal } from './utils.js';

export class Card {
  constructor(data, cardTemplateSelector) {
    this._data = data;
    this._template = document
      .querySelector(cardTemplateSelector)
      .content.querySelector('.element');
    this._imageModal = document.querySelector('.popup_type_image');
    this._imageOpened = this._imageModal.querySelector('.popup__image');
    this._imageOpenedName =
      this._imageModal.querySelector('.popup__image-name');
  }

  _likeHandler() {
    this._likeButton.classList.toggle('element__like-btn_active');
  }

  _deleteHandler() {
    this._cardElement.remove();
  }

  _openImageModalHandler() {
    this._imageOpened.src = this._data.link;
    this._imageOpened.alt = this._data.name;
    this._imageOpenedName.textContent = this._data.name;
    openModal(this._imageModal);
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._deleteHandler());
    this._likeButton.addEventListener('click', () => this._likeHandler());
    this._cardImage.addEventListener('click', () =>
      this._openImageModalHandler()
    );
  }

  _fillCard() {
    this._cardTitle.textContent = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
  }

  createCard() {
    this._cardElement = this._template.cloneNode(true);

    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardTitle = this._cardElement.querySelector('.element__name');
    this._deleteButton = this._cardElement.querySelector(
      '.element__delete-btn'
    );
    this._likeButton = this._cardElement.querySelector('.element__like-btn');

    this._fillCard();
    this._setEventListeners();
    return this._cardElement;
  }
}
