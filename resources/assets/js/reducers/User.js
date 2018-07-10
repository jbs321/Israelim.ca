import {FETCH_USER_PROFILE} from '../actions/User';
import {REGISTER_USER} from '../actions/RegisterUser';

export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return (action.payload) ? action.payload.data : false;

        case FETCH_USER_PROFILE:
            return (action.payload) ? action.payload.data : false;
        default:
            return state;
    }
}