const list = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.card-template').content;

//  Modals
const modalEditProfile = document.querySelector('.popup_type_edit');
const modalAddCard = document.querySelector('.popup_type_add-card');
const imageModal = document.querySelector('.popup_type_image');

const imageOpened = imageModal.querySelector('.popup__image');
const imageOpenedName = imageModal.querySelector('.popup__image-name');

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
const closeModalEditProfileButton =
  modalEditProfile.querySelector('.popup__close-btn');
const addCardButton = document.querySelector('.profile__add-btn');
const closeAddModalButton = modalAddCard.querySelector('.popup__close-btn');
const closeImageModalButton = imageModal.querySelector('.popup__close-btn');

function deleteHandler(e) {
  e.target.closest('.element').remove();
}

function likeHandler(e) {
  e.target.classList.toggle('element__like-btn_active');
}

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__name');
  const deleteButton = cardElement.querySelector('.element__delete-btn');
  const likeButton = cardElement.querySelector('.element__like-btn');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener('click', deleteHandler);
  likeButton.addEventListener('click', likeHandler);
  cardImage.addEventListener('click', () => {
    imageOpened.src = cardImage.src;
    imageOpened.alt = cardTitle.textContent;
    imageOpenedName.textContent = cardTitle.textContent;
    openModal(imageModal);
  });
  return cardElement;
}

function addCard(cardData) {
  const card = createCard(cardData);
  list.prepend(card);
}

function openModal(modal) {
  const currentSubmitButton = modal.querySelector('.popup__submit-btn');
  if (currentSubmitButton) {
    disableSubmitButton(currentSubmitButton);
  }
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalOnKeydownHandler(modal));
  modal.addEventListener('click', closeModalOnOverlayClickHandler(modal));
}

function closeModal(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalOnKeydownHandler(modal));
  modal.removeEventListener('click', closeModalOnOverlayClickHandler(modal));
}

function disableSubmitButton(button) {
  button.classList.add('popup__submit-btn_inactive');
  button.setAttribute('disabled', '');
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

function closeModalOnOverlayClickHandler(modal) {
  return (e) => {
    if (e.target === e.currentTarget) {
      closeModal(modal);
    }
  };
}

function closeModalOnKeydownHandler(modal) {
  return (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      closeModal(modal);
    }
  };
}

initialCards.forEach(addCard);

editProfileButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileJob.textContent;
  openModal(modalEditProfile);
});

closeModalEditProfileButton.addEventListener('click', () =>
  closeModal(modalEditProfile)
);

formEditProfile.addEventListener('submit', editProfileModalSubmitHandler);

addCardButton.addEventListener('click', () => {
  openModal(modalAddCard);
  formAddCard.reset();
});

closeAddModalButton.addEventListener('click', () => closeModal(modalAddCard));

formAddCard.addEventListener('submit', addCardModalSubmitHandler);

closeImageModalButton.addEventListener('click', () => closeModal(imageModal));
