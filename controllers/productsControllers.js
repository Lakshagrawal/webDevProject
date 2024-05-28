// const product = [
//     {
//         id:1,
//         productname: "apple",
//         price: 20,
//         img: "1.png"
//     },
//     {
//         id:2,
//         productname: "game",
//         price: 30,
//         img: "2.png"
//     }
// ]

const Products = require("../models/products");
const jwt = require("jsonwebtoken");

exports.renderProducts = (req,res)=>{
    // res.send("Wellcome to the home route");
    // const cookie = req.cookies;

    // taking the cookie from the user
    // const cookie = req.session.isLoggedIn;

    //using jwt to verifiying the token from the user
    // const token  = req.session.token
    // console.log(token)
    // const cookie = jwt.verify(token,"This is the secret").isLoggedIn;  
    // console.log(cookie)
    Products.fetchProduct().then(([rows,fieldData])=>{
        // console.log(rows);
        // console.log(fieldData);
        return res.render("home", {products: rows, isLoggedIn: global.isLoggedIn});   
    })
}
 
exports.renderaddproduct = (req,res)=>{
    // const cookie = req.session.isLoggedIn;
    res.render('add-product',{isLoggedIn:global.isLoggedIn});
}

exports.rendereditproduct = (req,res)=>{
    // const cookie = req.session.isLoggedIn;
    const id = req.params.id;
    Products.fetchProductId(id).then(([[productdata], fieldData])=>{
        // console.log(productdata);
        // console.log(fieldData);
        return res.render("edit-product", {product:productdata, isLoggedIn:global.isLoggedIn});
    });
}


exports.postAddProducts = (req,res)=>{
    const{productname,price,img} = req.body;

    const obj = new Products(null, price,productname,img);
    // console.log(obj);

    obj.addProduct().then(()=>{
        console.log("data have been added in the system");    
        res.redirect("/");      
    })
}


exports.postEditProducts = (req,res)=>{
    // console.log(req.body)
    const{productname,price,img} = req.body;
    const id = req.params.id;

    const obj = new Products(id, price,productname,img);
    // console.log(obj);

    obj.editData().then(()=>{
        console.log("Edit of the data is successfully");    
        res.redirect("/");      
    })
}

exports.deleteProduct = (req,res)=>{
    const id = req.params.id;

    Products.deleteProduct(id).then(()=>{
        res.redirect("/");
    }).catch((error)=>{
        res.send(error);
    })
}
