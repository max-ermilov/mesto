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
  formEditAvatar,
  inputName,
  inputDescription,
  inputAvatar,
  profileEditButton,
  cardAddButton,
  avatarEditButton,
} from '../utils/constants.js';
import { api } from '../components/Api';

let userId;

api.getProfile().then((res) => {
  userId = res._id;
  userInfo.setUserInfo(res.name, res.about, res.avatar);
});

api.getInitialCards().then((cardList) => {
  cardList.reverse();
  cardList.forEach((data) => {
    data.userId = userId;
    const card = createCard(data);
    section.addItem(card);
  });
});

const formEditProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);
const formEditAvatarValidator = new FormValidator(
  validationConfig,
  formEditAvatar
);

const createCard = (data) => {
  const card = new Card(
    data,
    cardTemplateSelector,
    () => handleCardClick(data),
    (cardId) => {
      popupWithFormDeleteConfirm.open();
      document.querySelector('.popup__confirm-btn').focus();
      popupWithFormDeleteConfirm.changeSubmitHandler(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.delete();
            popupWithFormDeleteConfirm.close();
          })
          .then(() => {
            popupWithFormDeleteConfirm.close();
          });
      });
    },
    (cardId) => {
      if (card.isLiked()) {
        api.deleteLike(cardId).then((res) => {
          card.setLikes(res.likes);
        });
      } else {
        api.addLike(cardId).then((res) => {
          card.setLikes(res.likes);
        });
      }
    }
  );

  return card.renderCard();
};

const section = new Section(
  {
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
    res.userId = userId;
    const cardElement = createCard(res);
    section.addItem(cardElement);
    popupWithFormAddCard.close();
  });
};

const handleEditProfileModal = (data) => {
  const { name, job } = data;
  api
    .editProfile(name, job)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    })
    .then(() => {
      popupWithFormEditProfile.close();
    });
};

const handleEditAvatarModal = (newAvatar) => {
  api
    .editAvatar(newAvatar)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    })
    .then(() => {
      popupWithFormEditAvatar.close();
    });
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
  '.popup_type_delete-confirm'
);
const popupWithFormEditAvatar = new PopupWithForm(
  '.popup_type_edit-avatar',
  handleEditAvatarModal
);
const userInfo = new UserInfo({
  userNameSelector: '.profile__name-text',
  userJobSelector: '.profile__job',
  userAvatarSelector: '.profile__avatar',
});

function handleCardClick(data) {
  const { name, link } = { name: data.title || data.name, link: data.link };
  popupWithImage.open(name, link);
}

section.renderElements();
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
formEditAvatarValidator.enableValidation();
popupWithImage.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupWithFormEditProfile.setEventListeners();
popupWithFormDeleteConfirm.setEventListeners();
popupWithFormEditAvatar.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  inputName.value = name;
  inputDescription.value = job;
  formEditProfileValidator.resetValidation();
  popupWithFormEditProfile.open();
});

cardAddButton.addEventListener('click', () => {
  formAddCardValidator.resetValidation();
  popupWithFormAddCard.open();
});

avatarEditButton.addEventListener('click', () => {
  const { avatar } = userInfo.getUserInfo();
  inputAvatar.value = avatar;
  formEditAvatarValidator.resetValidation();
  popupWithFormEditAvatar.open();
});
