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

exports.renderProducts = (req,res)=>{
    // res.send("Wellcome to the home route");
    // const cookie = req.cookies;
    const cookie = req.session.isLoggedIn;
    console.log(cookie)
    Products.fetchProduct().then(([rows,fieldData])=>{
        // console.log(rows);
        // console.log(fieldData);
        return res.render("home", {products: rows, isLoggedIn: cookie});   
    })
}
 
exports.renderaddproduct = (req,res)=>{
    const cookie = req.session.isLoggedIn;
    res.render('add-product',{isLoggedIn:cookie});
}

exports.rendereditproduct = (req,res)=>{
    const cookie = req.session.isLoggedIn;
    const id = req.params.id;
    Products.fetchProductId(id).then(([[productdata], fieldData])=>{
        // console.log(productdata);
        // console.log(fieldData);
        return res.render("edit-product", {product:productdata, isLoggedIn:cookie});
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
