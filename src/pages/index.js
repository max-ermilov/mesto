import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  validationConfig,
  cardTemplateSelector,
  formEditProfile,
  formAddCard,
  inputName,
  inputDescription,
  editProfileButton,
  addCardButton,
  initialCards,
} from '../utils/constants.js';
import { api } from '../components/Api';

api.getProfile()
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about)
  });

api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
      const card = createCard(data);
      section.addItem(card);
    })
  })

const formEditProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);

const createCard = (data) => {
  const card = new Card(data, cardTemplateSelector, () =>
    handleCardClick(data));
  return card.renderCard();
};

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      section.addItem(cardElement);
    },
  },
  '.elements__list'
);

const handleAddCardModalSubmit = (data) => {
  const cardElement = createCard(
    {
      name: data.title,
      link: data.link,
    });

  api.addCard(data.title, data.link)
    .then(res => console.log('res', res))

  section.addItem(cardElement);

  popupWithFormEditProfile.close();
};

const handleEditProfileModal = (data) => {
  const { name, job } = data;
  api.editProfile(name, job)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
      popupWithFormAddCard.close();
    })
};

const popupWithImage = new PopupWithImage('.popup_type_image');
const popupWithFormAddCard = new PopupWithForm(
  '.popup_type_add-card',
  handleAddCardModalSubmit
);
const popupWithFormEditProfile = new PopupWithForm(
  '.popup_type_edit',
  handleEditProfileModal
);
const userInfo = new UserInfo({
  userNameSelector: '.profile__name-text',
  userJobSelector: '.profile__job',
});

function handleCardClick(data) {
  const { name, link } = { name: data.title || data.name, link: data.link };
  popupWithImage.open(name, link);
}

section.renderElements();
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
popupWithImage.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupWithFormEditProfile.setEventListeners();

editProfileButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  inputName.value = name;
  inputDescription.value = job;
  formEditProfileValidator.resetValidation();
  popupWithFormEditProfile.open();
});

addCardButton.addEventListener('click', () => {
  formAddCardValidator.resetValidation();
  popupWithFormAddCard.open();
});
