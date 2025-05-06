// Регулярное выражение для проверки имени и описания
const nameAndDescriptionRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

// Функция для отображения ошибки
function showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (!errorElement) return;
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

// Функция для скрытия ошибки
function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (!errorElement) return;
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
}

// Проверка валидности поля
function checkInputValidity(formElement, inputElement, config) {
    // Проверка для формы профиля
    if (inputElement.name === 'name') {
        if (!inputElement.value) {
            showInputError(formElement, inputElement, 'Вы пропустили это поле.', config);
        } else if (!nameAndDescriptionRegex.test(inputElement.value)) {
            showInputError(formElement, inputElement, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.', config);
        } else if (inputElement.value.length < 2 || inputElement.value.length > 40) {
            showInputError(formElement, inputElement, 'Имя должно быть от 2 до 40 символов.', config);
        } else {
            hideInputError(formElement, inputElement, config);
        }
        return;
    }
    if (inputElement.name === 'description') {
        if (!inputElement.value) {
            showInputError(formElement, inputElement, 'Вы пропустили это поле.', config);
        } else if (!nameAndDescriptionRegex.test(inputElement.value)) {
            showInputError(formElement, inputElement, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.', config);
        } else if (inputElement.value.length < 2 || inputElement.value.length > 200) {
            showInputError(formElement, inputElement, 'О себе должно быть от 2 до 200 символов.', config);
        } else {
            hideInputError(formElement, inputElement, config);
        }
        return;
    }
    // Проверка для формы добавления карточки
    if (inputElement.name === 'card-name') {
        if (!inputElement.value) {
            showInputError(formElement, inputElement, 'Вы пропустили это поле.', config);
        } else if (!nameAndDescriptionRegex.test(inputElement.value)) {
            showInputError(formElement, inputElement, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.', config);
        } else if (inputElement.value.length < 2 || inputElement.value.length > 30) {
            showInputError(formElement, inputElement, 'Название должно быть от 2 до 30 символов.', config);
        } else {
            hideInputError(formElement, inputElement, config);
        }
        return;
    }
    if (inputElement.name === 'link' || inputElement.type === 'url') {
        if (!inputElement.value) {
            showInputError(formElement, inputElement, 'Вы пропустили это поле.', config);
        } else if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, 'Введите адрес сайта.', config);
        } else {
            hideInputError(formElement, inputElement, config);
        }
        return;
    }
    // Проверка для формы смены аватара
    if (inputElement.name === 'avatar') {
        if (!inputElement.value) {
            showInputError(formElement, inputElement, 'Вы пропустили это поле.', config);
        } else if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, 'Введите адрес сайта.', config);
        } else {
            hideInputError(formElement, inputElement, config);
        }
        return;
    }
    // Стандартная проверка для остальных случаев
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
}

// Переключение состояния кнопки
function toggleButtonState(inputList, buttonElement, config) {
    const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid || inputElement.classList.contains(config.inputErrorClass));
    if (hasInvalidInput) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

// Установка обработчиков событий
function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
}

// Включение валидации
export function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
}

// Очистка ошибок валидации
export function clearValidation(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, config);
    });

    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
}