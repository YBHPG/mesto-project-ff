import '../pages/index.css';
import { openModal, closeModal, addPopupEventListeners } from '../components/modal.js';
import { createCard, handleLikeClick, handleDeleteClick } from '../components/card.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getInitialCards, getUserInfo, updateUserInfo, addCard, updateAvatar } from '../components/api.js';

// Глобальные переменные
let currentUserId = null;
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = profilePopup.querySelector('.popup__form');
const saveButton = profileForm.querySelector('.popup__button');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

const placesList = document.querySelector('.places__list');

const avatarEditButton = document.querySelector('.profile__avatar-edit');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar-link');

// Включение валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

// Очистка ошибок при открытии попапов
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(profileForm, validationConfig);
    openModal(profilePopup);
});

addCardButton.addEventListener('click', () => {
    clearValidation(addCardForm, validationConfig);
    openModal(addCardPopup);
});

// Обработчик формы редактирования профиля
profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    saveButton.textContent = 'Сохранение...';

    updateUserInfo({
        name: nameInput.value,
        about: jobInput.value,
    })
        .then((userData) => {
            profileName.textContent = userData.name;
            profileDescription.textContent = userData.about;
            closeModal(profilePopup);
        })
        .catch((err) => {
            console.log(`Ошибка при обновлении профиля: ${err}`);
        })
        .finally(() => {
            saveButton.textContent = 'Сохранить';
        });
});

addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const addBtn = addCardForm.querySelector('.popup__button');
    addBtn.textContent = 'Сохранение...';

    addCard({ name: cardNameInput.value, link: cardLinkInput.value })
        .then((newCard) => {
            const cardElement = createCard(newCard, handleCardClick, handleLikeClick, handleDeleteClick, currentUserId);
            placesList.prepend(cardElement);
            closeModal(addCardPopup);
            addCardForm.reset();
        })
        .catch((err) => {
            console.log(`Ошибка при добавлении карточки: ${err}`);
        })
        .finally(() => {
            addBtn.textContent = 'Сохранить';
        });
});

// Обработчик клика по карточке
function handleCardClick(cardData) {
    const imagePopup = document.querySelector('.popup_type_image');
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');

    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;

    openModal(imagePopup);
}

// Открытие попапа смены аватара
avatarEditButton.addEventListener('click', () => {
    clearValidation(avatarForm, validationConfig);
    avatarForm.reset();
    openModal(avatarPopup);
});

// Обработка отправки формы смены аватара
avatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const saveBtn = avatarForm.querySelector('.popup__button');
    saveBtn.textContent = 'Сохранение...';
    updateAvatar({ avatar: avatarInput.value })
        .then((userData) => {
            profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
            closeModal(avatarPopup);
            avatarForm.reset();
        })
        .catch((err) => {
            console.log(`Ошибка при обновлении аватара: ${err}`);
        })
        .finally(() => {
            saveBtn.textContent = 'Сохранить';
        });
});

// Загрузка данных пользователя и карточек
Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
        currentUserId = userData._id; // теперь переменная доступна во всех обработчиках

        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

        cards.forEach((card) => {
            const cardElement = createCard(
                card,
                handleCardClick,
                handleLikeClick,
                handleDeleteClick,
                currentUserId
            );
            placesList.append(cardElement);
        });
    })
    .catch((err) => console.log(err));

// Добавляем обработчики для закрытия попапов
addPopupEventListeners();