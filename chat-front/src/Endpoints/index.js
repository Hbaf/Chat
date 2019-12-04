import socketIOClient from "socket.io-client";
import * as config from "../config/config"
import RoomEndP from "./RoomEndP";
import ChatEndP from "./ChatEndP";
import * as actions from '../Actions/AppActions';
import store from "../store";

const endpoint = config.PROTOCOL + "://" + config.HOST + ":" + config.PORT;
store.dispatch(actions.add_url({url: config.PROTOCOL + "://" + config.HOST + ":" + 3000}));
const socket = socketIOClient(endpoint);

export let chatEndP = new ChatEndP(socket);
export let roomEndP = new RoomEndP(socket);
