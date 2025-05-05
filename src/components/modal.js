export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeOnEsc);
}

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEsc);
}

function closeOnEsc(evt) {
    if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.popup_is-opened');
        if (openedModal) closeModal(openedModal);
    }
}

export function addPopupEventListeners() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            // Закрытие по клику на фон или крестик
            if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
                closeModal(popup);
            }
        });
    });
}