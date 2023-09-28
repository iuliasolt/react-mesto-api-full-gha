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

  _getHeaders() {
    const jwt = localStorage.getItem("jwt");
    return {
      "Authorization": `Bearer ${jwt}`,
      ...this._headers,
    };
  }
  
  /*Загрузка карточек с сервера*/
  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._getHeaders(),
      }).then((res) => { 
        return this._handleResponse(res);
      });
  }

  getDataUser() {
      return fetch(`${this._baseUrl}/users/me`, {
          headers: this._getHeaders(),
      }).then((res) => { 
        return this._handleResponse(res);
      });
  }

  setUserData(data) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: this._getHeaders(),
          body: JSON.stringify({
              name: data.name,
              about: data.about,
          }),
      }).then((res) => { 
        return this._handleResponse(res);
      });
  }

  setUserAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: this._getHeaders(),
          body: JSON.stringify({
              avatar: data.avatar,
          }),
      }).then((res) => { 
        return this._handleResponse(res);
      });
  }

  /*Добавление новой карточки*/
  addNewCard(/*name, link*/ data) {
      return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._getHeaders(),
          body: JSON.stringify({
              name: data.name,
              link: data.link,
          }),
      }).then((res) => { 
        return this._handleResponse(res);
      });
  }

  /*Удаление карточки*/
  deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: "DELETE",
          headers: this._getHeaders(),
      }).then((res) => { 
        return this._handleResponse(res);
      });
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._getHeaders(),
    }).then((res) => { 
        return this._handleResponse(res);
      });
}

  /*Удаление лайков*/
  deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: "DELETE",
          headers: this._getHeaders(),
      }).then((res) => { 
        return this._handleResponse(res);
      });
  }
}
/*Загрузка информации о пользователе с сервера*/
export const api = new Api({
    /*baseUrl: "https://mesto.nomoreparties.co/v1/cohort-68",*/
    baseUrl: "https://api.iuliasolt.nomoredomainsrocks.ru",
    headers: {
        //authorization: "0b764e67-5e2a-419b-ae24-cb0da79c917b",
        "Content-Type": "application/json",
    },
});