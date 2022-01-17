//  initialCards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
const list = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.card-template').content;

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
  list.prepend(cardElement);
}
initialCards.forEach(createCard);

//  Modals
const editModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_add-card');

//  Forms
const editForm = editModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');

//  Inputs
const inputTitle = document.querySelector('.popup__input_field_title');
const inputLink = document.querySelector('.popup__input_field_link');
const inputName = editForm.querySelector('.popup__input_field_name');
const inputDescription = editForm.querySelector('.popup__input_field_job');

//  Profile
const profileName = document.querySelector('.profile__name-text');
const profileJob = document.querySelector('.profile__job');

//  Buttons
const editProfileButton = document.querySelector('.profile__edit-btn');
const closeEditModalButton = editModal.querySelector('.popup__close-btn');
const addCardButton = document.querySelector('.profile__add-btn');
const closeAddModalButton = addCardModal.querySelector('.popup__close-btn');

//  add current values to editModal
inputName.value = profileName.textContent;
inputDescription.value = profileJob.textContent;

function toggleModal(modal) {
  modal.classList.toggle('popup_opened');
}

function editModalSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputDescription.value;
  toggleModal(editModal);
}

function addCardModalSubmitHandler(e) {
  e.preventDefault();
  createCard({
    name: inputTitle.value,
    link: inputLink.value,
  });
  addCardForm.reset();
  toggleModal(addCardModal);
}

editProfileButton.addEventListener('click', () => toggleModal(editModal));
closeEditModalButton.addEventListener('click', () => toggleModal(editModal));
editForm.addEventListener('submit', editModalSubmitHandler);

addCardButton.addEventListener('click', () => toggleModal(addCardModal));
closeAddModalButton.addEventListener('click', () => toggleModal(addCardModal));
addCardForm.addEventListener('submit', addCardModalSubmitHandler);
