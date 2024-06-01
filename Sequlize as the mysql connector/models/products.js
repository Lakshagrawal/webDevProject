const { DataTypes } = require("sequelize")
const sequelize = require("../utils/database")

const Product = sequelize.define("product",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    productname:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    image:{
        type: DataTypes.STRING,
        allowNull:false,
    }
},{
    tableName:"products",
    timestamps:false
})

module.exports = Product;