import '../pages/index.css';
import { openModal, closeModal, addPopupEventListeners } from '../components/modal.js';
import { createCard } from '../components/card.js';
import { initialCards } from '../components/utils.js';

// Глобальные переменные
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const placesList = document.querySelector('.places__list');

// Открытие и закрытие попапов
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
});

addCardButton.addEventListener('click', () => openModal(addCardPopup));

profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profilePopup);
});

addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCard = createCard(
        { name: cardNameInput.value, link: cardLinkInput.value },
        handleCardClick,
        handleLikeClick,
        handleDeleteClick
    );
    placesList.prepend(newCard);
    closeModal(addCardPopup);
    addCardForm.reset();
});

// Обработчик клика по карточке
function handleCardClick(cardData) {
    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;
    openModal(imagePopup);
}

// Обработчик лайка
function handleLikeClick(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

// Обработчик удаления карточки
function handleDeleteClick(evt) {
    evt.target.closest('.card').remove();
}

// Рендер начальных карточек
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, handleCardClick, handleLikeClick, handleDeleteClick);
    placesList.append(cardElement);
});

// Добавляем обработчики для закрытия попапов
addPopupEventListeners();