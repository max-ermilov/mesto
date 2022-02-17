import { validationConfig, imageModal } from './constants.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';
import { openModal, closeModal } from './utils.js';
import { Card } from './Card.js';

const list = document.querySelector('.elements__list');
const cardTemplateSelector = '.card-template';

//  Modals
const modals = document.querySelectorAll('.popup');
const modalEditProfile = document.querySelector('.popup_type_edit');
const modalAddCard = document.querySelector('.popup_type_add-card');

//  Forms
const formEditProfile = modalEditProfile.querySelector('.popup__form');
const formAddCard = modalAddCard.querySelector('.popup__form');

//  Inputs
const inputTitle = document.querySelector('.popup__input_field_title');
const inputLink = document.querySelector('.popup__input_field_link');
const inputName = formEditProfile.querySelector('.popup__input_field_name');
const inputDescription = formEditProfile.querySelector(
  '.popup__input_field_job'
);

//  Profile
const profileName = document.querySelector('.profile__name-text');
const profileJob = document.querySelector('.profile__job');

//  Buttons
const editProfileButton = document.querySelector('.profile__edit-btn');
const addCardButton = document.querySelector('.profile__add-btn');

// Validators
const formEditProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);

function addCard(data) {
  const card = new Card(data, cardTemplateSelector);
  const cardElement = card.createCard();
  list.prepend(cardElement);
}

function disableSubmitButtonOnSubmit(e) {
  const currentSubmitButton = e.target.querySelector('.popup__submit-btn');
  if (currentSubmitButton) {
    disableSubmitButton(currentSubmitButton);
  }
}

function editProfileModalSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputDescription.value;
  closeModal(modalEditProfile);
  disableSubmitButtonOnSubmit(e);
}

function addCardModalSubmitHandler(e) {
  e.preventDefault();
  addCard({
    name: inputTitle.value,
    link: inputLink.value,
  });
  formAddCard.reset();
  closeModal(modalAddCard);
  disableSubmitButtonOnSubmit(e);
}

initialCards.forEach(addCard);
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

editProfileButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileJob.textContent;
  openModal(modalEditProfile);
});

formEditProfile.addEventListener('submit', editProfileModalSubmitHandler);

addCardButton.addEventListener('click', () => {
  openModal(modalAddCard);
  formAddCard.reset();
});

formAddCard.addEventListener('submit', addCardModalSubmitHandler);

modals.forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup_opened')) {
      closeModal(modal);
    }
    if (e.target.classList.contains('popup__close-btn')) {
      closeModal(modal);
    }
  });
});
