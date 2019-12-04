import * as types from '../Actions/ActionTypes';

const initState = {
    messages: []
};


const chatReducer = (state = initState, action) => {
    switch (action.type) {
        case types.ADD_MESSAGE: {
            let tempMessages = [...state.messages];
            tempMessages.push({
                time: action.time,
                userName: action.userName,
                text: action.message,
            });
            return {
                ...state,
                messages: tempMessages
            };
        }

        case types.CLEAR_MESSAGES: {
            return {
                ...state,
                messages: [],
            };
        }

        default:
            return state;
    }
};

export default chatReducer;