import axios from "axios/index";

let qs = require('qs');

/**
 * Action Keys
 */
export const GET_ALL_BUSINESS = 'get_all_business';

export function getAllBusiness() {
    const request = axios({
        method: "POST",
        url: `/business`,
    });

    return {
        type: GET_ALL_BUSINESS,
        payload: request
    }
}