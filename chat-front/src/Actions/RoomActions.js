import * as types from './ActionTypes';

export function roomEntered(data) {
    return {
        type: types.ROOM_ENTERED,
        roomID: data.roomID,
        users: data.users,
    }
}

export function leaveTheRoom() {
    return {
        type: types.LEAVE_THE_ROOM
    }
}

export function roomIsFull(){
    return {
        type: types.ROOM_IS_FULL
    }
}

export function roomDoesntExist() {
    return {
        type: types.ROOM_DOESNT_EXIST
    }
}

export function userCameOut(data){
    return {
        type: types.USER_CAME_OUT,
        user: data
    }
}

export function userCameIn(data) {
    return {
        type: types.USER_CAME_IN,
        user: data,
    }
}