const Users = require("../models/user");
exports.renderSignUp = (req,res)=>{
    const cookies = req.session.isLoggedIn;
    res.render("signup",{isLoggedIn:cookies});
}

exports.registerUser = (req,res)=>{
    // console.log(req.body)
    const {userName, password, confirmPassword} = req.body;

    const users = new Users(null,userName,password);

    users.insertUser().then(()=>{
        res.redirect("/");
    });

}

exports.renderlogin = (req,res)=>{
    const cookies = req.session.isLoggedIn;
    res.render("login",{isLoggedIn:cookies});
}

exports.validateLogin = (req,res)=>{
    const {userName, password} = req.body;
    Users.fetchUserByUsername(userName).then(([rows,fieldData])=>{
        console.log(rows);
        console.log(fieldData);
        if(rows.length > 0){
            const user = rows[0];
            if(user.password === password){
                req.session.isLoggedIn = "true";
                res.redirect("/");
            }else{
                res.session.isLoggedIn = "invalidPassword";
                res.redirect("/login");
            }
        }else{
            res.session.isLoggedIn = "invalidUserName";
            res.redirect("/login");
        }
    })  
}

exports.logout = (req,res)=>{
    // res.cookies.isLoggedIn = "false"; //("isLoggedIn","false");
    // res.cookie("isLoggedIn", "false");
    // this will update the data for the user in the database
    // req.session.isLoggedIn = "false";

    // this will remove the data from the database for that user
    req.session.destroy(req.session.id  );
    res.redirect('/');
}