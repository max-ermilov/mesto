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

initialCards.forEach((cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__name');
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  list.prepend(cardElement);
});

//  Modals
const editModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_add-card');

const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_field_name');
const jobInput = formElement.querySelector('.popup__input_field_job');
const nameProfile = document.querySelector('.profile__name-text');
const jobProfile = document.querySelector('.profile__job');

//  Buttons
const editProfileButton = document.querySelector('.profile__edit-btn');
const closeEditModalButton = editModal.querySelector('.popup__close-btn');
const addCardButton = document.querySelector('.profile__add-btn')
const closeAddModalButton = addCardModal.querySelector('.popup__close-btn');


nameInput.value = nameProfile.textContent;
jobInput.value = jobProfile.textContent;

function toggleModal(modal) {
  modal.classList.toggle('popup_opened');
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  toggleModal(editModal);
}

editProfileButton.addEventListener('click', () => toggleModal(editModal));
closeEditModalButton.addEventListener('click',  () => toggleModal(editModal));
formElement.addEventListener('submit', formSubmitHandler);

addCardButton.addEventListener('click',  () => toggleModal(addCardModal));
closeAddModalButton.addEventListener('click',  () => toggleModal(addCardModal));
