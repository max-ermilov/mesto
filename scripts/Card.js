import { openModal } from './utils.js';
import { imageModal, imageOpened, imageOpenedName } from './constants.js';

export class Card {
  constructor(data, cardTemplateSelector) {
    this._data = data;
    this._template = document.querySelector(cardTemplateSelector).content;
    // this._template = document.querySelector(cardTemplateSelector).content.querySelector('.element');
  }

  _likeHandler() {
    this._likeButton.classList.toggle('element__like-btn_active');
  }

  _deleteHandler() {
    console.log(this._cardElement);
    this._cardElement.remove();
  }

  _openImageModalHandler() {
    imageOpened.src = this._data.link;
    imageOpened.alt = this._data.name;
    imageOpenedName.textContent = this._data.name;
    openModal(imageModal);
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', this._deleteHandler);
    this._likeButton.addEventListener('click', this._likeHandler);
    this._cardImage.addEventListener('click', this._openImageModalHandler);
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
    this._deleteButton = this._cardElement.querySelector('.element__delete-btn');
    this._likeButton = this._cardElement.querySelector('.element__like-btn');

    this._fillCard();
    this._setEventListeners();
    return this._cardElement;
  }
}
