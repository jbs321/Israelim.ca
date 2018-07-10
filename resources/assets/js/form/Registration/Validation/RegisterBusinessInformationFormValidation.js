export const validate = values => {
    const errors = {};

    const requiredFields = [
        'name',
        'email',
        'phone_number',
        'industry',
    ];

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = `Required`
        }
    });

    if (values.phone_number === "+1 (   )    -    ") {
        errors.phone_number = 'Missing Business Phone Number';
    }

    return errors;
};