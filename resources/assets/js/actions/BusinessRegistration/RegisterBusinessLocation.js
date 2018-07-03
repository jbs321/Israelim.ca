import axios, {post} from 'axios'

const REGISTER_BUSINESS_LOCATION = "register_business_location";

export const registerBusinessLocation = (values, cb) => {
    let formData = new FormData();
    formData.append("apartment", values.apt);
    formData.append("address", values.street_address);
    formData.append("city", values.city);
    formData.append("province", values.province);
    formData.append("postal_code", values.postal_code);
    formData.append("country", "canada");

    let request = post("/business/register/location", formData)
        .then((data) => cb(data.data))
        .catch(function(thrown) {
            if(parseInt(thrown.response.status) === 404) {
                alert("address not found");
            }
        });

    return {
        type: REGISTER_BUSINESS_LOCATION,
        payload: request,
    }
};