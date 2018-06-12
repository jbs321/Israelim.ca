import _ from 'lodash';
import Pagination from '../dataset/pagination';
import {
    GET_ALL_BUSINESS
} from '../actions/Business';



export default function (state = {}, action) {
    switch (action.type) {
        case GET_ALL_BUSINESS:
            if (action.payload.data) {
                const {data} = action.payload;
                let list = _.keyBy(data.data, "idx");

                return {
                    current_page: data.current_page,
                    list: list,
                    pages: {
                        [data.current_page]: new Pagination(data)
                    }
                }
            }

            break;
    }

    return state;
}
