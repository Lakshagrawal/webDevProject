const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const tokensignature = require("../utils/globals")


exports.renderSignUp = (req,res)=>{
    // const cookies = req.session.isLoggedIn;
    res.render("signup",{isLoggedIn:global.isLoggedIn});
}

exports.registerUser = async(req,res)=>{
    console.log(req.body)
    try {
        const {userName, password} = req.body;
        const hashPassword = await bcrypt.hash(password,10);

        await User.create({
            username:userName,
            password: hashPassword
        })

        return res.redirect("/");
    } catch (err) {
        console.log(err)
    }
   

}

exports.renderlogin = (req,res)=>{
    // const cookies = req.session.isLoggedIn;
    res.render("login",{isLoggedIn:global.isLoggedIn    });
}

exports.validateLogin = async(req,res)=>{
    try {
        const {userName, password} = req.body;
        const validateUser = await User.findOne({
            where:{
                username:userName
            }
        });
        // console.log(validateUser);

        if(validateUser){
            const isMatch = await bcrypt.compare(password,validateUser.password);
            if(isMatch){
                const token = jwt.sign({userName},tokensignature);
                req.session.token = token;
                return res.redirect("/");
            }else{
                return res.redire("/login");
            }
        }else{
            return res.redire("/login");
        }
    } catch (err) {
        console.log(err)
    }
    
}

exports.logout = (req,res)=>{
    // res.cookies.isLoggedIn = "false"; //("isLoggedIn","false");
    // res.cookie("isLoggedIn", "false");
    // this will update the data for the user in the database
    // req.session.isLoggedIn = "false";

    // this will remove the data from the database for that user
    req.session.destroy(req.session.id );
    res.redirect('/');
}