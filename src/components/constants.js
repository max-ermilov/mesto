export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
};

export const cardTemplateSelector = '.card-template';

//  Modals
export const modalEditProfile = document.querySelector('.popup_type_edit');
export const modalAddCard = document.querySelector('.popup_type_add-card');

//  Forms
export const formEditProfile = modalEditProfile.querySelector('.popup__form');
export const formAddCard = modalAddCard.querySelector('.popup__form');

//  Inputs
export const inputName = formEditProfile.querySelector(
  '.popup__input_field_name'
);
export const inputDescription = formEditProfile.querySelector(
  '.popup__input_field_job'
);

//  Buttons
export const editProfileButton = document.querySelector('.profile__edit-btn');
export const addCardButton = document.querySelector('.profile__add-btn');

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
