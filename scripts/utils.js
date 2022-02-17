// function disableSubmitButton(button) {
//   button.classList.add('popup__submit-btn_inactive');
//   button.setAttribute('disabled', '');
// }

export function closeModal(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalOnKeydownHandler(modal));
  modal.removeEventListener('click', closeModalOnOverlayClickHandler(modal));
}

export function closeModalOnOverlayClickHandler(modal) {
  return (e) => {
    if (e.target === e.currentTarget) {
      closeModal(modal);
    }
  };
}

export function closeModalOnKeydownHandler(modal) {
  return (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      closeModal(modal);
    }
  };
}

export function openModal(modal) {
  // const currentSubmitButton = modal.querySelector('.popup__submit-btn');
  // if (currentSubmitButton) {
  //   disableSubmitButton(currentSubmitButton);
  // }
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalOnKeydownHandler(modal));
  modal.addEventListener('click', closeModalOnOverlayClickHandler(modal));
}
