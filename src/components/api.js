const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-mag-4',
    headers: {
        authorization: 'f042b0b6-fdd9-47cc-9e42-af1745098107', // Ваш токен
        'Content-Type': 'application/json',
    },
};

// Проверка ответа сервера
function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// Обновление информации о пользователе
export function updateUserInfo(data) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data),
    }).then(checkResponse);
}

// Получение карточек
export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// Получение информации о пользователе
export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// Добавление новой карточки
export function addCard(data) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data),
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// Удаление карточки
export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(checkResponse);
}

// Постановка лайка
export function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    }).then(checkResponse);
}

// Снятие лайка
export function unlikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(checkResponse);
}

export function updateAvatar(data) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data),
    }).then(checkResponse);
}