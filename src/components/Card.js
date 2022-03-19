export default class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick) {
    this._data = data;
    this._template = document
      .querySelector(cardTemplateSelector)
      .content.querySelector('.element');
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _likeHandler() {
    this._likeButton.classList.toggle('element__like-btn_active');
  }

  delete() {
    this._cardElement.remove();
  }



  _setEventListeners() {
    // this._deleteButton.addEventListener('click', () => this._deleteHandler());
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._data._id));
    this._likeButton.addEventListener('click', () => this._likeHandler());
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  _fillCard() {
    this._cardTitle.textContent = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
  }

  _setLikes() {
    const likeCountElement = this._cardElement.querySelector('.element__like-count');
    likeCountElement.textContent = this._data.likes.length ;
  }

  renderCard() {
    this._cardElement = this._template.cloneNode(true);

    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardTitle = this._cardElement.querySelector('.element__name');
    this._deleteButton = this._cardElement.querySelector(
      '.element__delete-btn'
    );
    this._likeButton = this._cardElement.querySelector('.element__like-btn');

    this._fillCard();
    this._setEventListeners();
    this._setLikes();
    if (this._data.owner._id !== this._data.userId) {
      this._deleteButton.style.display = 'none';
    };
    return this._cardElement;
  }
}
