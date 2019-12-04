import SocketActions from "../config/socketActions";
import store from "../store";
import * as ChatActions from '../Actions/ChatActions'

class ChatEndP {
    constructor(socket) {
        this.socket = socket;
        this.onReceiveMessage();
        this.initChat();
    }

    initChat(){
        store.dispatch(
            ChatActions.clearMessages()
        );
    }

    // from server
    onReceiveMessage() {
        this.socket.on(SocketActions.RECEIVE_MESSAGE, (data) => {
            console.log('new message: ' + data);
            store.dispatch(
                ChatActions.receiveMessage(data)
            );
        })

    }

    // to server
    sendMessage(data) {
        this.socket.emit(SocketActions.SEND_MESSAGE, data);
    }
}

export default ChatEndP;