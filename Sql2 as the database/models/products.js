const pool = require("../utils/database");

module.exports = class Product{

    constructor(id,prices,productname,img){
        this.id = id;
        this.prices= prices;
        this.productname = productname;
        this.img = img;
    }

    static fetchProduct(){
        return pool.execute("select * from products");
    }

    static fetchProductId(id){
        return pool.execute("select * from products where id = ?", [id]);
    }
    static deleteProduct(id){
        return pool.execute("delete from products where id = ?", [id]);
    }
    
    addProduct(prices,productname,img){
        return pool.execute("insert into products (price,productname,img) values (?,?,?)",[this.prices,this.productname,this.img]);
    }

    editData(){
        return pool.execute("update products set price=?, productname=?,img=? where id=?",[this.prices,this.productname,this.img,this.id]);
    }
}