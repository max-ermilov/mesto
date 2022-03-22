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

Promise.all(
  [api.getProfile().then((res) => {
    userId = res._id;
    userInfo.setUserInfo(res.name, res.about, res.avatar);
  }),

  api.getInitialCards().then((cardList) => {
    cardList.forEach((data) => {
      data.userId = userId;
      const card = createCard(data);
      section.addItemAppend(card);
    });
  })]
)
  .catch((err) => {
    console.log(err);
  })

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
          .catch((err) => {
            console.log(err);
          });
      });
    },
    (cardId) => {
      if (card.isLiked()) {
        api.deleteLike(cardId).then((res) => {
          card.setLikes(res.likes);
        })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.addLike(cardId).then((res) => {
          card.setLikes(res.likes);
        })
          .catch((err) => {
            console.log(err);
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
      section.addItemPrepend(cardElement);
    },
  },
  '.elements__list'
);

const handleAddCardModalSubmit = (data) => {
  popupWithFormAddCard.renderButtonText(true);
  api
    .addCard(data.title, data.link)
    .then((res) => {
      res.userId = userId;
      const cardElement = createCard(res);
      section.addItemPrepend(cardElement);
      popupWithFormAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormAddCard.renderButtonText(false);
    });
};

const handleEditProfileModal = (data) => {
  popupWithFormEditProfile.renderButtonText(true);
  const { name, job } = data;
  api
    .editProfile(name, job)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      popupWithFormEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormEditProfile.renderButtonText(false);
    });
};

const handleEditAvatarModal = (newAvatar) => {
  popupWithFormEditAvatar.renderButtonText(true);
  api
    .editAvatar(newAvatar)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      popupWithFormEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormEditAvatar.renderButtonText(false);
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
