import axios from "axios/index";
let qs = require('qs');

export const REGISTER_USER = "register_user";
export const REGISTER_BUSINESS = "register_business";
export const STEP_BACK = "step_back";
export const STEP_FORWARD = "step_forward";

const {
    APP_URL,
    REACT_AUTH_CONFIG_CLIENT_ID,
    REACT_AUTH_CONFIG_CLIENT_SECRET
} = process.env.ENV;

export function registerUser(user) {
    let form = new FormData();
    form.append("id", user.id);
    form.append("first_name", user.first_name);
    form.append("last_name", user.last_name);
    form.append("email", user.email);
    form.append("phone_number", user.phone_number);
    form.append("password", user.password);
    form.append("password_confirmation", user.password_confirmation);

    let request;

    if (user.id === undefined) {
        request = axios.post("/api/register", form);
    } else {
        request = axios.post("/api/register/update", form);
    }


    request.then(response => {
        let postData = {
            grant_type: 'password',
            username: user.email,
            password: user.password,
            client_id: REACT_AUTH_CONFIG_CLIENT_ID,
            client_secret: REACT_AUTH_CONFIG_CLIENT_SECRET,
            scope: '',
        };

        const authRequest = axios({
            method: "POST",
            url: "/oauth/token",
            data: qs.stringify(postData),
        });

        authRequest.then(response => {
            let result = response.data;
            let expiresIn = JSON.stringify((result.expires_in * 1000) + new Date().getTime());
            localStorage.setItem('token_type', result.token_type);
            localStorage.setItem('expires_in', expiresIn);
            localStorage.setItem('access_token', result.access_token);
            localStorage.setItem('refresh_token', result.refresh_token);

            axios.defaults.headers.common['Authorization'] = result.token_type + " " + result.access_token;
        });

        }
    );

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function registerBusiness(cb = undefined, business) {
    let form = new FormData();
    form.append("name", business.name);
    form.append("province", business.province);
    form.append("address", business.street_address);
    form.append("country", "Canada");
    form.append("city", business.city);
    form.append("industry", business.industry);
    form.append("email", business.email);
    form.append("phone_number", business.phone_number);

    let request;

    if (business.id === undefined) {
        request = axios.post("/api/business/register", form);
    } else {
        request = axios.post("/api/business/register/update", form);
    }

    //Trigger Callback
    request.then(data => {
        cb();
    });

    return {
        type: REGISTER_BUSINESS,
        payload: request
    }
}

export function stepBack() {
    return {
        type: STEP_BACK
    }
}

export function stepForward() {
    return {
        type: STEP_FORWARD
    }
}