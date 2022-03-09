import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    console.log(this._popupImage);
    this._popupImageName = this._popup.querySelector('.popup__image-name');
    console.log(this._popupImageName);
  }

  open(name, link) {
    this._popupImage.src = link;
    console.log('_popupImage.src>'+this._popupImage.src);
    this._popupImage.alt = name;
    console.log('_popupImage.alt>'+this._popupImage.alt);
    this._popupImageName.textContent = name;
    console.log('this._popupImageName.textContent>'+this._popupImageName.textContent);
    super.open();
  }
}
