import axios from "axios/index";

let qs = require('qs');

/**
 * Action Keys
 */
export const GET_VIEW_BUSINESS = 'get_view_business';

export function getBusiness(id) {
    if(id === undefined) {
        throw new Error("id not assigned");
    }

    const request = axios({
        method: "POST",
        url: `/business/${id}`,
    });

    return {
        type: GET_VIEW_BUSINESS,
        payload: request
    }
}