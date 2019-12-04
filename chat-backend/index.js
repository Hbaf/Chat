const config = require('./config/config');
const actions = require('./config/socketActions');

const app = require("express")();
const server = require("http").createServer(app);
const port = config.PORT || 4002;
server.listen(port, () => console.log(`Listening on port ${port}`));
const io = require("socket.io")(server);

const uuidv1 = require('uuid/v1');
const {Room} = require("./Room");
const {User} = require("./User");

//все текущие комнаты
let rooms = new Map();

io.on(actions.CONNECTION, socket => {
    console.log("New client - " + socket.id);
    socket.on(actions.CREATE_ROOM, createRoom);
    socket.on(actions.CONNECT_TO_ROOM, connectToRoom);
    socket.on(actions.LEAVE_ROOM, disconnect);
    socket.on(actions.DISCONNECT, disconnect);
    socket.on(actions.SEND_MESSAGE, sendMessage);
});

function createRoom(data){
    const socket = this;
    //рандомный ид по времени
    let roomID = uuidv1();
    let room = new Room(roomID);
    let user = new User(data.name, socket.id);
    room.addUser(user);
    rooms.set(roomID, room);
    //подключаем пользователя
    socket.join(roomID);
    //сообщаем пользователю, что комната создана
    socket.emit(actions.ROOM_CREATED, { roomID: roomID, users: [...room.userNames.values()] });
}

function connectToRoom(data) {
    const socket = this;
    let {name, roomID} = data;
    let room = rooms.get(roomID);
    //проверка существует ли комната
    if (!room) {
        socket.emit(actions.ROOM_DOESNT_EXIST);
        return;
    }
    //переполнена ли комната
    if (room.isFull) {
        socket.emit(actions.ROOM_IS_FULL);
        return;
    }
    let user = new User(name, socket.id);

    room.addUser(user);
    if (room.countOfUsers() === 6){
        room.isFull = true;
    }
    socket.join(roomID);
    socket.emit(actions.ROOM_CONNECTED, { roomID: roomID, users: [...room.userNames.values()] });
    io.to(roomID).emit(actions.USER_JOINED, user);
}

function disconnect() {
    console.log('disconnect');
    const socket = this;
    const room = findRoomDisconnectedUser(socket.id);
    if (!room) {
        return;
    }
    let user = room.getUserById(socket.id);
    room.deleteUser(socket.id);
    if (room.countOfUsers() === 0) {
        rooms.delete(room.id);
    } else {
        io.to(room.roomID).emit(actions.USER_CAME_OUT, user);
    }
}

function sendMessage(data) {
    this.to(data.roomID).emit(actions.RECEIVE_MESSAGE, data);
}

let findRoomDisconnectedUser = (id) => {
    for (let room of rooms.values()) {
        let user = room.getUserById(id);
        if (user) {
            return room;
        }
    }
};

