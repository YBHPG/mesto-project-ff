import { likeCard, unlikeCard, deleteCard } from './api.js';

const template = document.querySelector('#card-template').content;

export function createCard(cardData, handleCardClick, handleLikeClick, handleDeleteClick, currentUserId) {
  const cardElement = getCardTemplate(template);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Установка количества лайков
  likeCounter.textContent = cardData.likes.length;

  // --- ДОБАВЬТЕ ЭТО: закрашиваем лайк, если пользователь уже лайкал ---
  if (cardData.likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Отображение кнопки удаления только для карточек текущего пользователя
  if (cardData.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', (evt) => handleDeleteClick(evt, cardData._id, cardElement));
  }

  likeButton.addEventListener('click', (evt) => handleLikeClick(evt, cardData, likeCounter));
  cardImage.addEventListener('click', () => handleCardClick(cardData));

  return cardElement;
}

export function handleLikeClick(evt, cardData, likeCounter) {
  const isLiked = evt.target.classList.contains('card__like-button_is-active');

  if (isLiked) {
    unlikeCard(cardData._id)
      .then((updatedCard) => {
        evt.target.classList.remove('card__like-button_is-active');
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log(`Ошибка при снятии лайка: ${err}`));
  } else {
    likeCard(cardData._id)
      .then((updatedCard) => {
        evt.target.classList.add('card__like-button_is-active');
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log(`Ошибка при добавлении лайка: ${err}`));
  }
}

export function handleDeleteClick(evt, cardId, cardElement) {
  // Отправка запроса на удаление карточки
  deleteCard(cardId)
    .then(() => {
      cardElement.remove(); // Удаление карточки из DOM
    })
    .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
}

export function getCardTemplate(template) {
  return template.querySelector('.card').cloneNode(true);
}