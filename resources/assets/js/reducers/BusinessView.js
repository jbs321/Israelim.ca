import {
    GET_VIEW_BUSINESS
} from '../actions/BusinessView';



export default function (state = {}, action) {
    switch (action.type) {
        case GET_VIEW_BUSINESS:
            if (action.payload.data) {
                const {data} = action.payload;

                return data;
            }
            break;
    }

    return state;
}
