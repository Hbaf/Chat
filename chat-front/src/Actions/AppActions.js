import * as types from './ActionTypes';

export function add_url(data) {
    return {
        type: types.ADD_URL,
        url: data.url,
    }
}