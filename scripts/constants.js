export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

export const imageModal = document.querySelector('.popup_type_image');
export const imageOpened = imageModal.querySelector('.popup__image');
export const imageOpenedName = imageModal.querySelector('.popup__image-name');
