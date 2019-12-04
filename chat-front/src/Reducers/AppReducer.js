import * as types from '../Actions/ActionTypes';

const initState = {
    url: ''
};


const appReducer = (state = initState, action) => {
    switch (action.type) {
        case types.ADD_URL: {
            return {
                ...state,
                url: action.url,
            };
        }

        default:
            return state;
    }
};


export default appReducer;