export function createCard(cardData, handleCardClick, handleLikeClick, handleDeleteClick) {
  const template = document.querySelector('#card-template').content;
  const cardElement = template.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener('click', handleLikeClick); // Передаём обработчик лайка
  deleteButton.addEventListener('click', handleDeleteClick); // Передаём обработчик удаления
  cardImage.addEventListener('click', () => handleCardClick(cardData)); // Передаём обработчик клика по изображению

  return cardElement;
}

export function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function handleDeleteClick(evt) {
  evt.target.closest('.card').remove();
}