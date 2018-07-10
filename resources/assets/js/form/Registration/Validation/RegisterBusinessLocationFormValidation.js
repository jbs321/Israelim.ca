import axios from "axios/index";

export const validate = (values) => {
    const errors = {};

    const requiredFields = [
        'address',
        'city',
        'province',
        'postal_code',
    ];

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = `Required`
        }
    });

    requiredFields.forEach(field => {
        if (values[field] && values[field].length > 191) {
            errors[field] = `Too Long`;
        }
    });

    return errors;
};

export const asyncValidate = values => {
    let form = new FormData();
    form.append("postal_code", values.postal_code);
    form.append("province", values.province);
    form.append("city", values.city);
    form.append("apartment", values.apartment);
    form.append("address", values.address);
    form.append("country", "canada");

    const promise = new Promise((resolve, reject) => {
            axios.post("/business/register/location/validate", values).then((data) => {
                resolve(data);
            }).catch((data) => reject(data));
        }
    );

    return promise
        .then((data) => {
            let errors = {};

            if (data.data.validation === "success") {
                return true;
            }

            _.each(data.data, function (value, key) {
                errors[key] = value.pop();
            });

            throw errors;
        }).catch((data) => {
            throw data;
        });
};