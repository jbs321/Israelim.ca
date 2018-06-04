import _ from "lodash";

export const TO = 'to';
export const FROM = 'from';
export const DATA = 'data';
export const PATH = 'path';
export const TOTAL = 'total';
export const PER_PAGE = 'per_page';
export const LAST_PAGE = 'last_page';
export const CURRENT_PAGE = 'current_page';
export const PREV_PAGE_URL = 'prev_page_url';
export const LAST_PAGE_URL = 'last_page_url';
export const NEXT_PAGE_URL = 'next_page_url';
export const FIRST_PAGE_URL = 'first_page_url';

export const RESPONSE_HEADERS = [
    TO,
    FROM,
    DATA,
    PATH,
    TOTAL,
    PER_PAGE,
    LAST_PAGE,
    CURRENT_PAGE,
    PREV_PAGE_URL,
    LAST_PAGE_URL,
    NEXT_PAGE_URL,
    FIRST_PAGE_URL
];

export default class Pagination {
    constructor(response, mapByID = true) {
        RESPONSE_HEADERS.forEach((attr) => {
            if (!response.hasOwnProperty(attr)) {
                throw new Error(`Attribute ${attr} is missing in response`)
            }

            this[attr] = response[attr];
        });

        if(mapByID) {
            this.mapByID();
        }
    }

    mapByID() {
        if (!this[DATA]) {
            throw new Error(`Attribute ${DATA} is missing in class`);
        }

        this[DATA] = _.keyBy(this[DATA], 'id');
    }
}