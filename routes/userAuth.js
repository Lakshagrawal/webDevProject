const express = require("express");
const { logout, renderSignUp,registerUser,renderlogin,validateLogin } = require("../controllers/userAuthControler");

const router = express.Router();


const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}))
// router.use(cookieParser);


router.get("/sign-up",renderSignUp);

router.post("/sign-up",registerUser);

router.get("/login",renderlogin);

router.post("/login",validateLogin);

router.get("/logout",logout);
module.exports = router;