import {REGISTER_BUSINESS_INFO, RELOAD_BUSINESS_REGISTRATION} from '../actions/BusinessRegistration/RegisterBusinessInfo';
import {REGISTER_BUSINESS_LOCATION_CONFIRMATION} from '../actions/BusinessRegistration/RegisterBusinessLocationConfirmation';
import {REGISTER_BUSINESS_LOCATION} from "../actions/BusinessRegistration/RegisterBusinessLocation";

export default function (state = {}, action) {
    switch (action.type) {
        case REGISTER_BUSINESS_INFO:
            // console.log("1. general", action.payload);
            return (action.payload) ? action.payload.data : false;

        case REGISTER_BUSINESS_LOCATION:
            // console.log("2. location", action.payload);
            return (action.payload) ? action.payload.data : false;

        case REGISTER_BUSINESS_LOCATION_CONFIRMATION:
            // console.log("3. confirmation", action.payload);
            return (action.payload) ? action.payload.data : false;

        case RELOAD_BUSINESS_REGISTRATION:
            return (action.payload) ? action.payload.data : false;

        default:
            return state;
    }
}