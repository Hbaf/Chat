import SocketActions from "../config/socketActions";
import store from "../store";
import * as RoomActions from "../Actions/RoomActions";

class RoomEndP {
    constructor(socket) {
        this.socket = socket;
        this.onUserCameIn();
        this.onUserCameOut();
        this.onRoomCreated();
        this.onRoomConnected();
        this.onRoomDoesntExist();
        this.onRoomIsFull();
    }

    createRoom(data){
        this.socket.emit(SocketActions.CREATE_ROOM, data);
    }

    enterRoom(data){
        this.socket.emit(SocketActions.CONNECT_TO_ROOM, data);
    }

    leaveRoom(){
        this.socket.emit(SocketActions.LEAVE_ROOM)
    }

    // handlers
    onRoomDoesntExist(){
        this.socket.on(SocketActions.ROOM_DOESNT_EXIST, store.dispatch(RoomActions.roomDoesntExist()))
    }

    onRoomIsFull(){
        this.socket.on(SocketActions.ROOM_IS_FULL, store.dispatch(RoomActions.roomIsFull()))
    }

    onRoomCreated(){
        this.socket.on(SocketActions.ROOM_CREATED, data => store.dispatch(RoomActions.roomEntered(data)));
    }

    onRoomConnected(){
        this.socket.on(SocketActions.ROOM_CONNECTED, data => store.dispatch(RoomActions.roomEntered(data)))
    }

    onUserCameOut(){
        this.socket.on(SocketActions.USER_CAME_OUT, data => store.dispatch(RoomActions.userCameOut(data)));
    }

    onUserCameIn(){
        this.socket.on(SocketActions.USER_JOINED, data => store.dispatch(RoomActions.userCameIn(data)));
    }
}

export default RoomEndP;