import _ from 'lodash'

export const mergeClass = (...args) => {
    args.map((val) => {
        if(!_.isString(val)) {
            throw new Error(`Element is not string ${val}`);
        }
        return val;
    });

    return args.join(" ");
};