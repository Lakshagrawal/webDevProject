const express = require("express")
const app = express();
const session = require("express-session");
const MysqlStore = require("express-mysql-session")(session);


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

app.listen(port, ()=>{
    console.log("server is running");
})
