const express = require("express");
const { rendereditproduct, postEditProducts } = require("../controllers/productsControllers");

const routes = express.Router();
const bodyParser = require("body-parser");
routes.use(bodyParser.urlencoded({extended:true}));

routes.get("/:id", rendereditproduct );

routes.post("/:id", postEditProducts);


module.exports = routes;