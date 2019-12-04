import * as types from './ActionTypes';

export function signInUser(data) {
    return {
        type: types.SIGN_IN_USER,
        userID: data.userID,
        userName: data.userName,
    }
}

export function signOutUser() {
    return {
        type: types.SIGN_OUT_USER
    }
}