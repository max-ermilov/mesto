// function disableSubmitButton(button) {
//   button.classList.add('popup__submit-btn_inactive');
//   button.setAttribute('disabled', '');
// }

export function closeModal(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalOnKeydownHandler);
  // modal.removeEventListener('click', closeModalOnOverlayClickHandler(modal));
}

// export function closeModalOnOverlayClickHandler(modal) {
//   return (e) => {
//     if (e.target === e.currentTarget) {
//       closeModal(modal);
//     }
//   };
// }

export function closeModalOnKeydownHandler(e) {
    if (e.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened'); // <==нашли открытый попап
      closeModal(openedPopup);
    }
}

export function openModal(modal) {
  // const currentSubmitButton = modal.querySelector('.popup__submit-btn');
  // if (currentSubmitButton) {
  //   disableSubmitButton(currentSubmitButton);
  // }
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalOnKeydownHandler);
  // modal.addEventListener('click', closeModalOnOverlayClickHandler(modal));
}
