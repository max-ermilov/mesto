export default class Card {
  constructor(
    data,
    cardTemplateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._data = data;
    this._template = document
      .querySelector(cardTemplateSelector)
      .content.querySelector('.element');
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  delete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () =>
      this._handleDeleteClick(this._data._id)
    );
    this._likeButton.addEventListener('click', () =>
      this._handleLikeClick(this._data._id)
    );
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  _fillCard() {
    this._cardTitle.textContent = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
  }

  _setLikeIcon() {
    this._likeButton.classList.add('element__like-btn_active');
  }

  _unsetLikeIcon() {
    this._likeButton.classList.remove('element__like-btn_active');
  }

  isLiked() {
    return this._data.likes.find((user) => user._id === this._data.userId);
  }

  setLikes(newLikes) {
    this._data.likes = newLikes;
    const likeCountElement = this._cardElement.querySelector(
      '.element__like-count'
    );
    likeCountElement.textContent = this._data.likes.length;
    if (this.isLiked()) {
      this._setLikeIcon();
    } else {
      this._unsetLikeIcon();
    }
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
    this.setLikes(this._data.likes);
    if (this._data.owner._id !== this._data.userId) {
      this._deleteButton.style.display = 'none';
    }
    return this._cardElement;
  }
}
