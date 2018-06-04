import axios from "axios/index";

let qs = require('qs');


/**
 * Action Keys
 */
export const CREATE_USER_LOG = 'create_user_log';
export const GET_USER_LOG = 'get_user_log';
export const DELETE_USER_LOG = 'delete_user_log';

/**
 * Routes
 */
export const ROUTE__CREATE_LOG = "api/logs/user_log";
export const ROUTE__GET_LOG = "api/logs/user_log";
export const ROUTE__DELETE_LOG = "api/logs/user_log/";

export function createUserLog(description, cb = undefined) {
    const postData = {description};


    const request = axios({
        method: "POST",
        url: ROUTE__CREATE_LOG,
        data: qs.stringify(postData),
    });

    request.then((response) => {
        const {data} = response;

        if (cb != undefined) {
            cb(data);
        }
    });

    return {
        type: CREATE_USER_LOG,
        payload: request
    }
}

export function getUserLog() {
    const request = axios({
        method: "GET",
        url: ROUTE__GET_LOG,
    });

    return {
        type: GET_USER_LOG,
        payload: request
    }
}

export function deleteUserLog(id) {
    const request = axios({
        method: "DELETE",
        url: ROUTE__DELETE_LOG + id,
    });

    return {
        type: DELETE_USER_LOG,
        payload: id
    }
}
