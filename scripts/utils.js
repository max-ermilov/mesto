export function closeModal(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalOnKeydownHandler);
}

function closeModalOnKeydownHandler(e) {
    if (e.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened'); // <==нашли открытый попап
      closeModal(openedPopup);
    }
}

export function openModal(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalOnKeydownHandler);
}
