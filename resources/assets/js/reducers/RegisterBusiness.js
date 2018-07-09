import {REGISTER_BUSINESS_INFO} from '../actions/BusinessRegistration/RegisterBusinessInfo';
import {REGISTER_BUSINESS_LOCATION} from '../actions/BusinessRegistration/RegisterBusinessLocation';
import {REGISTER_BUSINESS_LOCATION_CONFIRMATION} from '../actions/BusinessRegistration/RegisterBusinessLocationConfirmation';

export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_BUSINESS_INFO:
            return (action.payload) ? action.payload.data : false;

        case REGISTER_BUSINESS_LOCATION:
            return (action.payload) ? action.payload.data : false;

        case REGISTER_BUSINESS_LOCATION_CONFIRMATION:
            return (action.payload) ? action.payload.data : false;

        default:
            return state;
    }
}