import {get} from "axios/index";

export const GET_VIEW_BUSINESS = 'get_view_business';

export function getBusiness(id) {
    if(id === undefined) {
        throw new Error("id not assigned");
    }

    const request = get(`/view/business/${id}`);

    return {
        type: GET_VIEW_BUSINESS,
        payload: request
    }
}