import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import {
  validationConfig,
  cardsList,
  cardTemplateSelector,
  modals,
  modalEditProfile,
  modalAddCard,
  imageModal,
  imageOpened,
  imageOpenedName,
  formEditProfile,
  formAddCard,
  inputLink,
  inputName,
  inputTitle,
  inputDescription,
  profileName,
  profileJob,
  editProfileButton,
  addCardButton,
  initialCards }
  from './constants.js';
import UserInfo from './UserInfo.js';


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
  const card = addCard({
    name: data.title,
    link: data.link
  });
  popupWithFormEditProfile.close();
}

const editProfileModalSubmitHandler = (data) => {
  const { name, job} = data;
  // profileName.textContent = name;
  // profileJob.textContent = job;
  userInfo.setUserInfo(name, job);
  popupWithFormAddCard.close();
}

const popupWithImage = new PopupWithImage('.popup_type_image');
const popupWithFormAddCard = new PopupWithForm('.popup_type_add-card', addCardModalSubmitHandler);
const popupWithFormEditProfile = new PopupWithForm('.popup_type_edit', editProfileModalSubmitHandler);
const userInfo = new UserInfo({ userNameSelector: '.profile__name-text', userJobSelector: '.profile__job' })

function handleCardClick(data) {
  console.log(data);
  popupWithImage.open(data.name, data.link);
}

function addCard(data) {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  const cardElement = card.createCard();
  cardsList.prepend(cardElement);
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
