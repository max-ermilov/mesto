import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {
  validationConfig,
  cardTemplateSelector,
  formEditProfile,
  formAddCard,
  inputName,
  inputDescription,
  editProfileButton,
  addCardButton,
  initialCards }
  from './constants.js';

const formEditProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);

const section = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const card = new Card(element, cardTemplateSelector, () => handleCardClick(element));
      const cardElement = card.createCard();
      section.addItem(cardElement);
    },
  },
  '.elements__list'
);

const addCardModalSubmitHandler = (data) => {
  const card = new Card({ name: data.title, link: data.link }, cardTemplateSelector, () => handleCardClick(data));
  const cardElement = card.createCard();
  section.addItem(cardElement);

  popupWithFormEditProfile.close();
}

const editProfileModalSubmitHandler = (data) => {
  const { name, job} = data;
  userInfo.setUserInfo(name, job);
  popupWithFormAddCard.close();
}

const popupWithImage = new PopupWithImage('.popup_type_image');
const popupWithFormAddCard = new PopupWithForm('.popup_type_add-card', addCardModalSubmitHandler);
const popupWithFormEditProfile = new PopupWithForm('.popup_type_edit', editProfileModalSubmitHandler);
const userInfo = new UserInfo({ userNameSelector: '.profile__name-text', userJobSelector: '.profile__job' })

function handleCardClick(data) {
  popupWithImage.open(data.name, data.link);
}

section.renderElements();
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
popupWithImage.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupWithFormEditProfile.setEventListeners();

editProfileButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo()
  inputName.value = name;
  inputDescription.value = job;
  formEditProfileValidator.toggleButton();
  popupWithFormEditProfile.open();
});

addCardButton.addEventListener('click', () => {
  popupWithFormAddCard.open();
  formAddCardValidator.toggleButton();
});
