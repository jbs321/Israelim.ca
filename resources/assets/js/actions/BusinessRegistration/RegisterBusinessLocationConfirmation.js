import {post} from 'axios'

export const REGISTER_BUSINESS_LOCATION_CONFIRMATION = "register_business_location_confirmation";

export const registerBusinessLocationConfirmation = (values, cb, notFoundCb) => {
    let formData = new FormData();
    formData.append("is_confirmed", true);

    let request = post("/business/register/location/confirm/" + values.location_id, formData);

    request.then((data) => cb(data.data));

    request.catch((thrown) => {
        if (parseInt(thrown.response.status) === 404) {
            notFoundCb(thrown.response.data);
        }
    });

    return {
        type: REGISTER_BUSINESS_LOCATION_CONFIRMATION,
        payload: request,
    }
};