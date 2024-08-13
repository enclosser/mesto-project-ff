const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-21",
  headers: {
    authorization: "ba726ca4-babe-4c60-b803-4ec06cee7921",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, options) {
  return fetch(`${config.baseUrl}${endpoint}`, {
    headers: config.headers,
    ...options,
  }).then(checkResponse);
}

// Функции для выполнения запросов к API

export const getUserInfo = () => 
  request("/users/me", { method: "GET" });

export const getCards = () => 
  request("/cards", { method: "GET" });

export const updateUserServerInfo = (data) =>
  request("/users/me", {
    method: "PATCH",
    body: JSON.stringify({
      name: data.name,
      about: data.job,
    }),
  });

export const createNewPost = (data) =>
  request("/cards", {
    method: "POST",
    body: JSON.stringify({
      link: data.dataCard.link,
      name: data.dataCard.name,
    }),
  });

export const deleteCard = (cardId) =>
  request(`/cards/${cardId}`, { method: "DELETE" });

export const addLike = (cardId) =>
  request(`/cards/likes/${cardId}`, { method: "PUT" });

export const removeLike = (cardId) =>
  request(`/cards/likes/${cardId}`, { method: "DELETE" });

export const changeAvatar = (linkImg) =>
  request("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({ avatar: linkImg }),
  });
