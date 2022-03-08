import FormValidator from './FormValidator.js';
import { openModal, closeModal } from './utils.js';
import Card from './Card.js';
import Section from './Section.js';
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
      const card = new Card(element, cardTemplateSelector, handleCardClick);
      // console.log(card);
      const cardElement = card.createCard();
      // console.log(cardElement);
      renderCardList.addItem(cardElement);
    },
  },
  // '.elements__list'
  cardsList
);

function handleCardClick(name, link) {
  imageOpened.src = link;
  imageOpened.alt = name;
  imageOpenedName.textContent = name;
  openModal(imageModal);
}

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

// initialCards.forEach(addCard);
renderCardList.renderElements();
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

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

modals.forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('popup_opened') ||
      e.target.classList.contains('popup__close-btn')
    ) {
      closeModal(modal);
    }
  });
});
