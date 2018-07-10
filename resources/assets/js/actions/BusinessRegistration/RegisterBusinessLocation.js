import {post} from 'axios'

export const REGISTER_BUSINESS_LOCATION = "register_business_location";

export function registerBusinessLocation(values, cb, notFoundCb) {
    let formData = new FormData();
    formData.append("related_id", values.related_id);
    formData.append("apartment", values.apartment);
    formData.append("address", values.address);
    formData.append("city", values.city);
    formData.append("province", values.province);
    formData.append("postal_code", values.postal_code);
    formData.append("country", "canada");

    let request = post("/business/register/location", formData);

    request.then((data) => cb(data.data));

    request.catch(thrown => {
        if (parseInt(thrown.response.status) === 404) {
            notFoundCb(thrown.response.data);
        }
    });


    return {
        type: REGISTER_BUSINESS_LOCATION,
        payload: request,
    }
}