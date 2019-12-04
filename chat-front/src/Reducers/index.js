import { combineReducers } from 'redux';

import appReducer from "./AppReducer";
import roomReducer from './RoomReducer';
import authReducer from "./AuthReducer";
import chatReducer from "./ChatReducer";


const index = combineReducers({
    appState: appReducer,
    roomState: roomReducer,
    authState: authReducer,
    chatState: chatReducer,
});

export default index;