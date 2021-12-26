const popupOpenButton = document.querySelector(".profile__edit-btn");
const popupCloseButton = document.querySelector(".popup__close-btn");
const popup = document.querySelector(".popup");
const formElement = document.querySelector(".popup__container");
const nameInput = document.querySelector(".popup__input_field_name");
const jobInput = document.querySelector(".popup__input_field_job");

function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = document.querySelector(".profile__name-text").textContent;;
  jobInput.value = document.querySelector(".profile__job").textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector(".profile__name-text").textContent = nameInput.value;
  document.querySelector(".profile__job").textContent = jobInput.value;
  closePopup();
}

popupOpenButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);

