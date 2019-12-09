module.exports.Room = class Room {
    
    constructor(id) {
        this._id = id;
        this._users = new Map();
        this._isFull = false;
        this._isEmpty = true;
    }

    addUser(user) {
        this._users.set(user.id, user);
        if (this._users.size === 6)
            this._isFull = true;
        this._isEmpty = false;
    }

    deleteUser(id) {
        this._users.delete(id);
        this._isFull = false;
        if (this._users.size === 0)
            this._isEmpty = true;
    }

    getUserById(id) {
        return this._users.get(id);
    }

    get isFull(){
        return this._isFull;
    }

    get isEmpty(){
        return this._isEmpty;
    }

    get users() {
        return this._users;
    }
    
    get id() {
        return this._id;
    }

};