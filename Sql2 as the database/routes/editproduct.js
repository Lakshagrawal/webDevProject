const express = require("express");
const { rendereditproduct, postEditProducts } = require("../controllers/productsControllers");

const routes = express.Router();
const bodyParser = require("body-parser");
const { auth } = require("../middlewares/auth");
routes.use(bodyParser.urlencoded({extended:true}));

routes.get("/:id",auth, rendereditproduct );

routes.post("/:id",auth, postEditProducts);


module.exports = routes;