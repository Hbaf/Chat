import * as types from './ActionTypes';


export function receiveMessage(data) {
    return {
        type: types.ADD_MESSAGE,
        message: data.message,
        time: data.time,
        userName: data.userName,
    }
}


export function clearMessages() {
    return {
        type: types.CLEAR_MESSAGES,
    }
}