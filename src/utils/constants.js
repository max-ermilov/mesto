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
    name: 'Меркурий',
    link: 'https://scriptangle.agency/mesto/01_Mercury_PIA11245_orig.jpg',
  },
  {
    name: 'Венера',
    link: 'https://scriptangle.agency/mesto/02_Venus_PIA00271_medium.jpg',
  },
  {
    name: 'Земля',
    link: 'https://scriptangle.agency/mesto/03_Earth_as11-44-6551_large.jpg',
  },
  {
    name: 'Марс',
    link: 'https://scriptangle.agency/mesto/04_Mars_PIA01591_orig.jpg',
  },
  {
    name: 'Юпитер',
    link: 'https://scriptangle.agency/mesto/05_Jupitetr_PIA00343_orig.jpg',
  },
  {
    name: 'Сатурн',
    link: 'https://scriptangle.agency/mesto/06_Saturn_PIA05389_orig.jpg',
  },
  {
    name: 'Уран',
    link: 'https://scriptangle.agency/mesto/07_Uranus_stsci-h-p1906c-f-514x514.a_orig.png',
  },
  {
    name: 'Нептун',
    link: 'https://scriptangle.agency/mesto/08_Neptune_PIA01492_medium.jpg',
  },
];
