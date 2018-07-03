export const validate = (values) => {
    const errors = {};

    const requiredFields = [
        'street_address',
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