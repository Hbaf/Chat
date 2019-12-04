import * as types from '../Actions/ActionTypes';

const initState = {
    users: [],
    roomExist: false,
    roomIsFull: false,
    roomEntered: false,
    roomID: '',
};

const chatReducer = (state = initState, action) => {
    switch (action.type) {
        case types.ROOM_ENTERED: {
            return {
                ...state,
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
            }
        }

        case types.ROOM_DOESNT_EXIST:{
            return {
                ...state,
                roomExist: false,
            }
        }

        case types.LEAVE_THE_ROOM: {
            return {
                ...state,
                users: [],
                roomEntered: false,
            };
        }

        case types.USER_CAME_OUT:{
            let tempUsers = state.users.filter(user => {return action.userID !== user.id});
            return {
                ...state,
                users: tempUsers
            }
        }

        default:
            return state;
    }
};


export default chatReducer;