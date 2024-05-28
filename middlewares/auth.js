const jwt  = require("jsonwebtoken");
const tokensignature = require("../utils/globals");
global.isLoggedIn = "inti";

exports.auth = (req,res,next)=>{
    const token =  req.session.token;
    if(req.path === "/logout"){
        global.isLoggedIn = 'init';
        next();
    }
    else{

        try {
            const decodeToken = jwt.verify(token,tokensignature);
            global.isLoggedIn = "true";
            console.log(decodeToken);
        } catch (error) {
            if(global.isLoggedIn === "init"){
                return next();
            }
            else{
                global.isLoggedIn = "false";
                return res.redirect("/login");  
            }
        }
        next(); 
    }
}