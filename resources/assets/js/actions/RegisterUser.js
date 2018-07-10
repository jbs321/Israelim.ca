import axios, {put, post} from "axios"
import qs from 'qs';

export const REGISTER_USER = "register_user";

const {
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

    let request = (!user.id) ? post("/register", form) : request = axios.post("/register/update", form);

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
                baseURL: "/",
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