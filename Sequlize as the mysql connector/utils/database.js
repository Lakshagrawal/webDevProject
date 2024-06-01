const {Sequelize} = require("sequelize");

const sequelize = new Sequelize({
    dialect:"mysql",
    host:"localhost",
    port:3306,
    database:"mystore",
    username:"root",
    password:"12345",
    pool:{
        // maximum number of connection at one point of time 
        max:1000,
        min:0,
        acquire: 30000,
        idle:10000
    }
})

module.exports = sequelize;