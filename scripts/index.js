import FormValidator from './FormValidator.js';
// import { openModal, closeModal } from './utils.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
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


// Validators
const formEditProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);

const renderCardList = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const card = new Card(element, cardTemplateSelector, () => handleCardClick(element));
      const cardElement = card.createCard();
      renderCardList.addItem(cardElement);
    },
  },
  // '.elements__list'
  cardsList
);

const popupWithImage = new PopupWithImage('.popup_type_image');

function handleCardClick(item) {
  popupWithImage.open(item.name, item.link);
}
// function handleCardClick(name, link) {
//   imageOpened.src = link;
//   imageOpened.alt = name;
//   imageOpenedName.textContent = name;
//   openModal(imageModal);
// }

function addCard(data) {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  const cardElement = card.createCard();
  cardsList.prepend(cardElement);
}

function editProfileModalSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputDescription.value;
  closeModal(modalEditProfile);
}

function addCardModalSubmitHandler(e) {
  e.preventDefault();
  addCard({
    name: inputTitle.value,
    link: inputLink.value,
  });
  formAddCard.reset();
  closeModal(modalAddCard);
}

function closeModal(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalOnKeydownHandler);
}

function closeModalOnKeydownHandler(e) {
    if (e.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened'); // <==нашли открытый попап
      closeModal(openedPopup);
    }
}

function openModal(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalOnKeydownHandler);
}

// initialCards.forEach(addCard);
renderCardList.renderElements();
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
popupWithImage.setEventListeners();

editProfileButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileJob.textContent;
  formEditProfileValidator.toggleButton();
  openModal(modalEditProfile);
});

formEditProfile.addEventListener('submit', editProfileModalSubmitHandler);

addCardButton.addEventListener('click', () => {
  openModal(modalAddCard);
  formAddCardValidator.toggleButton();
});

formAddCard.addEventListener('submit', addCardModalSubmitHandler);

// modals.forEach((modal) => {
//   modal.addEventListener('click', (e) => {
//     if (
//       e.target.classList.contains('popup_opened') ||
//       e.target.classList.contains('popup__close-btn')
//     ) {
//       closeModal(modal);
//     }
//   });
// });
