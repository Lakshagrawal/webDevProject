const express = require("express");
const { renderaddproduct,postAddProducts } = require("../controllers/productsControllers");

const routes = express.Router();

const bodyParser = require("body-parser");
routes.use(bodyParser.urlencoded({extended:true}));


routes.get("/", renderaddproduct );

routes.post("/",postAddProducts);
module.exports = routes;