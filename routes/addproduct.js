const express = require("express");
const { renderaddproduct,postAddProducts } = require("../controllers/productsControllers");

const routes = express.Router();

const bodyParser = require("body-parser");
const { auth } = require("../middlewares/auth");
routes.use(bodyParser.urlencoded({extended:true}));


routes.get("/",auth, renderaddproduct );

routes.post("/",auth, postAddProducts);
module.exports = routes;