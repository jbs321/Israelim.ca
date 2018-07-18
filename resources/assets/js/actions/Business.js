import {post} from "axios";

export const GET_ALL_BUSINESS = 'get_all_business';

export function getAllBusiness() {
    const request = post(`view/business`);

    return {
        type: GET_ALL_BUSINESS,
        payload: request
    }
}