import axios from "axios/index";

export const validate = values => {
    const errors = {};

    const requiredFields = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone_number',
        'password_confirmation',
    ];

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = `Required`
        }
    });

    if (values.phone_number === "+1 (   )    -    ") {
        errors.phone_number = `Required`
    }

    if (!/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/i.test(values.phone_number)) {
        errors.phone_number = 'please make sure to add proper phone number'
    }

    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (values.password_confirmation !== values.password) {
        errors.password_confirmation = 'Passwords not matching';
    }

    return errors;
};

export const asyncValidate = values => {
    let form = new FormData();
    form.append("first_name", values.first_name);
    form.append("last_name", values.last_name);
    form.append("email", values.email);
    form.append("phone_number", values.phone_number);
    form.append("password", values.password);
    form.append("password_confirmation", values.password_confirmation);


    const promise = new Promise((resolve, reject) => {
            axios.post("/register/validator", values).then((data) => {
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