module.exports.User = class User {

    constructor(name, id) {
        this._name = name;
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    //перевод в удобный вид для отправки
    toObject() {
        return {
            name: this._name,
            id: this._id
        }
    }
};