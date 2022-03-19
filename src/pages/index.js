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

let userId;

api.getProfile()
  .then((res) => {
    userId = res._id;
    userInfo.setUserInfo(res.name, res.about)
  });

api.getInitialCards()
  .then(cardList => {
    cardList.reverse();
    cardList.forEach(data => {
      data.userId = userId;
      // console.log(data);
      // data.ownerId = data.owner._id
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
  const card = new Card(
    data,
    cardTemplateSelector,
    () => handleCardClick(data),
    (id) => {
      popupWithFormDeleteConfirm.open();
      popupWithFormDeleteConfirm.cangeSubmitHandler(() => {
        api.deleteCard(id)
          .then(() => {
            card.delete();
            popupWithFormDeleteConfirm.close();
          })
      });
    }
  );

  return card.renderCard();
};

const section = new Section(
  {
    // items: initialCards,
    items: [],
    renderer: (data) => {
      data.userId = userId;
      const cardElement = createCard(data);
      section.addItem(cardElement);
    },
  },
  '.elements__list'
);

const handleAddCardModalSubmit = (data) => {
    api.addCard(data.title, data.link).then((res) => {
      const cardElement = createCard(res);
      section.addItem(cardElement);
      popupWithFormEditProfile.close();
    });
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
const popupWithFormDeleteConfirm = new PopupWithForm(
  '.popup_type_delete-confirm' );
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
popupWithFormDeleteConfirm.setEventListeners();

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
