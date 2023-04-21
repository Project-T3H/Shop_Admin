const { API_BASE_URL } = require("env");

const API_URL_LOGIN = API_BASE_URL +  "login";

const API_URL_REGISTER = API_BASE_URL + "register";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

// =============================================================

// Đăng nhập thông tin tài khoản USER
export function login(username, password){
    var raw = JSON.stringify({
        "username": username,
        "password": password
      });

    return request({
        url: API_URL_LOGIN,
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}


// Đăng ký thông tin tài khoản USER
export function register(username, email, password){
    var raw = JSON.stringify({
        "username": username,
        "email": email,
        "password": password
      });

    return request({
        url: API_URL_REGISTER,
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}