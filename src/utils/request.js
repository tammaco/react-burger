export const BASE_URL = "https://norma.nomoreparties.space/api/";

export const request = (endpoint, options) => {
    return fetch(`${BASE_URL}${endpoint}`, options)
      .then(checkResponse)
      .then(checkSuccess);
  };

const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    // не забываем выкидывать ошибку, чтобы она попала в `catch`
    return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res) => {
    if (res && res.success) {
      return res;
    }
    // не забываем выкидывать ошибку, чтобы она попала в `catch`
    return Promise.reject(`Ответ не success: ${res}`);
};

export default request;