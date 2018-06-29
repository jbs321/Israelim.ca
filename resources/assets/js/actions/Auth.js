import _ from 'lodash';
export const IS_AUTHENTICATED = "is_authenticate";
export const LOGOUT = "logout";

let qs = require('qs');

export function fetchAuth(cb = undefined) {
    let isAuth = false;
    let token_type = localStorage.getItem('token_type');
    let access_token = localStorage.getItem('access_token');
    let token = token_type + " " + access_token;

    if (_.has(localStorage, 'token_type') && _.has(localStorage, 'access_token')) {
        isAuth = true;
    }

    if(cb != undefined) {
        cb(isAuth);
    }

    return {
        type: IS_AUTHENTICATED,
        payload: isAuth
    }
}

export function logOut(cb = undefined) {
    if(cb !== undefined) {
        cb();
    }

    return {
        type: LOGOUT,
        payload: false
    }
}