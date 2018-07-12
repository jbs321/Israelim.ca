import {GET_VIEW_BUSINESS} from '../actions/BusinessView';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_VIEW_BUSINESS:
            if (action.payload.response) {
                if (action.payload.response.status === 404) {
                    return state;
                }
            }

            return (action.payload) ? action.payload.data : state;
            break;
    }

    return state;
}
