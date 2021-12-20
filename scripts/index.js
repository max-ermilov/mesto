const popupOpenButton = document.querySelector(".profile__edit-btn");
const popupCloseButton = document.querySelector(".popup__close-btn");
const popup = document.querySelector(".popup");
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__input_field_name");
let jobInput = document.querySelector(".popup__input_field_job");



function openPopup() {
  popup.classList.add("popup_opened");
  let nameInputValue = document.querySelector(".profile__name-text").textContent;
  let jobInputValue = document.querySelector(".profile__job").textContent;
  nameInput.value = nameInputValue;
  jobInput.value = jobInputValue;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function popupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    popup.classList.remove("popup_opened");
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector(".profile__name-text").textContent = nameInput.value;
  document.querySelector(".profile__job").textContent = jobInput.value;
}

popupOpenButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
popup.addEventListener("click", popupOnOverlayClick);

formElement.addEventListener("submit", formSubmitHandler);





