import {IS_AUTHENTICATED} from '../actions/Auth';

export default function (state = false, action) {
    switch (action.type) {
        case IS_AUTHENTICATED:
            return action.payload;
        default:
            return state;
    }
}