// Получаем шаблон карточки и контейнер для карточек
const template = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
};

// Функция создания карточки
function createCard(cardData, deleteCallback) {
    // Клонируем содержимое шаблона
    const cardElement = template.querySelector(".card").cloneNode(true);

    // Устанавливаем значения для карточки
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Обработчик для кнопки удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCallback(cardElement));

    return cardElement;
}

// Функция для вывода карточек на страницу
function renderCards(cards) {
    cards.forEach((cardData) => {
        const cardElement = createCard(cardData, deleteCard);
        placesList.append(cardElement);
    });
}

// Выводим карточки из массива initialCards
renderCards(initialCards);
