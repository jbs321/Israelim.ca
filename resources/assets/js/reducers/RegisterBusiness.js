import {REGISTER_BUSINESS_INFO, RELOAD_BUSINESS_REGISTRATION} from '../actions/BusinessRegistration/RegisterBusinessInfo';
import {REGISTER_BUSINESS_LOCATION_CONFIRMATION} from '../actions/BusinessRegistration/RegisterBusinessLocationConfirmation';
import {REGISTER_BUSINESS_LOCATION} from "../actions/BusinessRegistration/RegisterBusinessLocation";
import {DELETE_BUSINESS_FILE} from '../actions/Files'

export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_BUSINESS_INFO:
        case REGISTER_BUSINESS_LOCATION:
        case REGISTER_BUSINESS_LOCATION_CONFIRMATION:
        case RELOAD_BUSINESS_REGISTRATION:
        case DELETE_BUSINESS_FILE:

            if(action.payload.response) {
                if(action.payload.response.status === 404) {
                    return state;
                }
            }

            return (action.payload) ? action.payload.data : false;

        default:
            return state;
    }
}