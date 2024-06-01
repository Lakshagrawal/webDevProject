const fs = require("fs");   
const Product = require("../models/products");
const path = require("path");

exports.renderProducts = async(req,res)=>{
    try {
        const productdata = await Product.findAll();
        console.log(productdata);
        return res.render("home", {products: productdata, isLoggedIn: global.isLoggedIn}); 
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server error');
    }
}
 
exports.renderaddproduct = (req,res)=>{
    // const cookie = req.session.isLoggedIn;
    res.render('add-product',{isLoggedIn:global.isLoggedIn});
}

exports.rendereditproduct = async(req,res)=>{
    // const cookie = req.session.isLoggedIn;
    try {
        const id = req.params.id;
        const editProductData = await Product.findByPk(id);
        if(editProductData){
            return res.render("edit-product", {product:editProductData, isLoggedIn:global.isLoggedIn});
        }
        else{
            return res.redirect("/");   
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server error');
    }
    
}


exports.postAddProducts = async (req,res)=>{
    try {
        const{productname,price} = req.body;
        const img =  req.file.filename;
        // console.log(req.body);
        console.log(img);

        await Product.create({
            productname:productname,
            price,
            image:img
        });

        console.log("New Product is added succesfully")
        // console.log(obj);
        return res.redirect("/");      
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server error');  
    }
    
}


exports.postEditProducts = async(req,res)=>{
    try {
        const{productname,price} = req.body;
        const id = req.params.id;
        const img =  req.file.filename;
        console.log(img)
        const editProductData = await Product.findByPk(id);
        if(!editProductData){
            console.log("Product Not found")
            return res.status(404).send("Product not found");
        }
        else{
            editProductData.productname = productname;
            editProductData.price = price;
            // Handle image update
            if (img) {
                const oldImagePath = path.join(__dirname, '..', 'public', 'images', editProductData.image);
                
                // Check if the old image exists and delete it
                if (editProductData.image && fs.existsSync(oldImagePath)) {
                    fs.unlink(oldImagePath, (err) => {
                        if (err) {
                            console.log("File is not able to delete from the system:", err);
                        } else {
                            console.log("Old image deleted successfully");
                        }
                    });
                }
                // Assign the new image filename to the product data
                editProductData.image = img;
            }
            await editProductData.save();
            console.log("product is edited successfuly");
            return res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server error');  
    }
    
}

exports.deleteProduct = async(req,res)=>{
    const id = req.params.id;
    try {
        const deleteData = await Product.destroy({where:{
            id:id
        }});
        console.log("Product is deleted succusefuly");
        return res.redirect("/");
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server error');  
    }
}
