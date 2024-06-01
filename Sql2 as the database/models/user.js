const poll = require("../utils/database");

module.exports = class Users{
    constructor(id, userName, password){
        this.id = id;
        this.userName = userName;
        this.password = password;
    }

    insertUser(){
        return poll.execute("insert into Users (userName, password) values (?,?)" , [this.userName, this.password]);
    }

    static fetchUserByUsername(userName){
        return poll.execute("select * from Users where userName = ?", [userName]);
    }
}