import * as types from '../Actions/ActionTypes';

const initState = {
    users: [],
    roomExist: false,
    roomIsFull: false,
    roomEntered: false,
    roomID: '',
};

const roomReducer = (state = initState, action) => {
    switch (action.type) {
        case types.ROOM_ENTERED: {
            return {
                users: [...action.users],
                roomExist: true,
                roomIsFull: false,
                roomEntered: true,
                roomID: action.roomID,
            };
        }

        case types.ROOM_IS_FULL:{
            return {
                ...state,
                roomExist: true,
                roomIsFull: true,
            };
        }

        case types.ROOM_DOESNT_EXIST:{
            return {
                ...state,
                roomExist: false,
                roomIsFull: false,
            };
        }

        case types.LEAVE_THE_ROOM: {
            return {
                ...state,
                users: [],
                roomEntered: false,
                roomExist: false,
                roomIsFull: false,
            };
        }

        case types.USER_CAME_OUT:{
            let tempUsers = state.users.filter(user => {return action.user.userID !== user.userID});
            return {
                ...state,
                users: tempUsers
            };
        }

        case types.USER_CAME_IN:{
            let tempUsers = [...state.users];
            tempUsers.push(action.user);
            return {
                ...state,
                users: tempUsers
            };
        }

        default:
            return state;
    }
};


export default roomReducer;