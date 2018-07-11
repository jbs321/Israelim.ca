import {put, post} from "axios"

export const REGISTER_BUSINESS_INFO = "register_business_info";

export function registerBusiness(cb = undefined, images, business) {
    let form = new FormData();
    form.append("name", business.name);
    form.append("province", business.province);
    form.append("address", business.street_address);
    form.append("country", "Canada");
    form.append("city", business.city);
    form.append("industry", business.industry);
    form.append("email", business.email);
    form.append("phone_number", business.phone_number);

    if (images.length !== 0)
        form.append("images", images);

    let request = (!business.id)
        ? post("/business/register/general", form)
        : post(`/business/register/general/update/${business.id}`, form);

    //Trigger Callback
    request.then(data => cb(data.data));

    return {
        type: REGISTER_BUSINESS_INFO,
        payload: request
    }
}

export const RELOAD_BUSINESS_REGISTRATION = 'reload_business_registration';

export function reLoadRegistration(cb = undefined) {
    let request = post("/business/register/reload");

    if(cb) {
        request.then((data) => cb(data.data));
    }

    return {
        type: RELOAD_BUSINESS_REGISTRATION,
        payload: request,
    }
}