const baseUrl = 'https://norma.nomoreparties.space/api/'

function request(endpoint, options) {
    return fetch(baseUrl + endpoint, options)
        .then(checkResponse);
}

function checkResponse(res) {
    if (res.ok) 
        return res.json();
    return Promise.reject(`Ошибка ${res.status}`);
}

export default request;