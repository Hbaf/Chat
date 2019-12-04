import * as types from '../Actions/ActionTypes';

const initState = {
    isUserLogged: false,
    userName: '',
    userID: '',
};


const authReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SIGN_IN_USER: {
            return {
                ...state,
                isUserLogged: true,
                userName: action.userName,
            };
        }

        case types.SIGN_OUT_USER: {
            return {
                ...state,
                isUserLogged: false,
                userName: '',
            };
        }

        default:
            return state;
    }
};


export default authReducer;