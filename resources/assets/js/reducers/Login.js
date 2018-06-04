import {LOGIN, LOGOUT} from '../actions/Login';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN:
            return action.payload;
        case LOGOUT:
            return action.payload;
        default:
            return state;
    }
}