export default class Api {
  constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
  }

  /*Проверка ошибки*/
  _handleResponse(res) {
      if (res.ok) {
          return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  /*Загрузка карточек с сервера*/
  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
          //  method: 'GET',
          headers: this._headers,
      }).then(this._handleResponse);
  }

  getDataUser() {
      return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
      }).then(this._handleResponse);
  }

  setUserData(data) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
              name: data.name,
              about: data.about,
          }),
      }).then(this._handleResponse);
  }

  setUserAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
              avatar: data.avatar,
          }),
      }).then(this._handleResponse);
  }

  /*Добавление новой карточки*/
  addNewCard(/*name, link*/ data) {
      return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
              name: data.name,
              link: data.link,
          }),
      }).then(this._handleResponse);
  }

  /*Удаление карточки*/
  deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
      }).then(this._handleResponse);
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: /*liked ? 'DELETE' :*/ "PUT",
        headers: this._headers,
    }).then(this._handleResponse);
}

  /*Удаление лайков*/
  deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: "DELETE",
          headers: this._headers,
      }).then(this._handleResponse);
  }
}
/*Загрузка информации о пользователе с сервера*/
export const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-68",
    headers: {
        authorization: "0b764e67-5e2a-419b-ae24-cb0da79c917b",
        "Content-Type": "application/json",
    },
});