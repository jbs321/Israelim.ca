import axios from 'axios';

export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";

let qs = require('qs');

const {
    REACT_AUTH_CONFIG_CLIENT_ID,
    REACT_AUTH_CONFIG_CLIENT_SECRET
} = process.env.ENV;

export function login(email, password, cb) {
    const scope = '';

    let postData = {
        grant_type: 'password',
        password: password,
        client_id: REACT_AUTH_CONFIG_CLIENT_ID,
        client_secret: REACT_AUTH_CONFIG_CLIENT_SECRET,
        username: email,
        scope: scope,
    };

    const request = axios({
        method: "POST",
        url: "oauth/token",
        baseURL: "/",
        data: qs.stringify(postData),
    });

    request.then(response => {
        let result = response.data;
        let expiresIn = JSON.stringify((result.expires_in * 1000) + new Date().getTime());
        localStorage.setItem('token_type', result.token_type);
        localStorage.setItem('expires_in', expiresIn);
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('refresh_token', result.refresh_token);

        axios.defaults.headers.common['Authorization'] = result.token_type + " " + result.access_token;

        cb();
    });

    return {
        type: LOGIN,
        payload: request
    }
}

export function logout(cb) {
    localStorage.setItem('token_type', "");
    localStorage.setItem('expires_in', "");
    localStorage.setItem('access_token', "");
    localStorage.setItem('refresh_token', "");
    axios.defaults.headers.common['Authorization'] = "";

    cb();

    return {
        type: LOGOUT,
        payload: request
    }
}

export function register(user) {
    let form = new FormData();
    form.append("first_name", user.first_name);
    form.append("last_name", user.last_name);
    form.append("email", user.email);
    form.append("phone_number", user.phone_number);
    form.append("password", user.password);
    form.append("password_confirmation", user.password_confirmation);

    const request = axios.post("/register", form);

    request.then(response => {
            let result = response.data;
            let expiresIn = JSON.stringify((result.expires_in * 1000) + new Date().getTime());
            localStorage.setItem('token_type', result.token_type);
            localStorage.setItem('expires_in', expiresIn);
            localStorage.setItem('access_token', result.access_token);
            localStorage.setItem('refresh_token', result.refresh_token);

            axios.defaults.headers.common['Authorization'] = result.token_type + " " + result.access_token;
        }
    );

    return {
        type: REGISTER,
        payload: request
    }
}