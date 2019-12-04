module.exports.Room = class Room {
    
    constructor(id) {
        this._id = id;
        this._users = new Map();
        this._userNames = new Map();
        this._isFull = false;
    }
    usersToObject() {
        let tempUsers = {};
        for (let userID in this._users) {
            if (this._users.hasOwnProperty(userID)) {
                tempUsers[userID] = this._users[userID].toObject();
            }
        }
        return tempUsers;
    }
    addUser(user) {
        this._users.set(user.id, user);
        this._userNames.set(user.id, user.name);
        if (this._users.size === 6)
            this._isFull = true;
    }

    countOfUsers() {
        return this._users.size;
    }

    getUserById(id) {
        return this._users.has(id);
    }

    get isFull(){
        return this._isFull;
    }

    set isFull(isFull){
        this._isFull = isFull;
    }

    get users() {
        return this._users;
    }

    get userNames() {
        return this._userNames;
    }

    deleteUser(id) {
        this._users.delete(id);
        this._userNames.delete(id);
    }

    get id() {
        return this._id;
    }

};