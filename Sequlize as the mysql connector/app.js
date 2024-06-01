const express = require("express")
const app = express();
const session = require("express-session");
const MysqlStore = require("express-mysql-session")(session);
const bcrypt = require("bcrypt");
const multer = require("multer");
const sequelize = require("./utils/database")
// I have use img as the 'name' in the add-product and edit-product ejs
const storage = multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null, path.join(__dirname, 'public', 'images'));
    },
    filename : (req,file,cb)=>{
        cb(null,  (new Date().toISOString().replace(/:/g, '-') + '-') + file.originalname); 
    }
});

app.use(multer({storage}).single("img"));

const home = require("./routes/home")
const addproduct = require("./routes/addproduct");
const editproduct = require("./routes/editproduct");
const deleteproduct = require("./routes/deleteproduct");
const userAuth = require("./routes/userAuth");
const path = require("path");
app.use('/public', express.static(path.join(__dirname + '/public')));

const options = {
    connectionLimit: 100,
    port:3306,
    host:"localhost",
    database:"mystore",
    user:"root",
    password:"12345",
    createDatabaseTable: true
}

const sessionStore = new MysqlStore(options)
app.use(session({
    secret: "It is the secret",
    resave: false,
    saveUninitialized : false,
    store: sessionStore
}))


app.get("/trysession",(req,res)=>{
    res.send(req.session.isLoggedIn);
})
// console.log(path.join(__dirname + '/public'));


app.use("/",home);
app.use('/add-product',addproduct)
app.use('/edit-product',editproduct)
app.use('/delete-product',deleteproduct)
app.use('/',userAuth);

app.set("view engine", "ejs");
app.set("views", "views");

const port = 3000;
sequelize.authenticate().then(()=>{
    
    console.log("database is connected to the server");
}).catch((err)=>{
    console.log(err)
})

sequelize.sync().then(()=>{
    app.listen(port, ()=>{
        console.log("server is running");
    })
})