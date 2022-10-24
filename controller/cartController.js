// const { request } = require('express');
const categories = require('../model/categories');
const Product = require('../model/products');
// const Product = require('../model/products');
const Cart = require('../model/carts');
//const { request } = require('express');

exports.addToCart = async (request, respond , next) => {

    // console.log("\n BODY: ", request.body);
    // console.log("\n Params: ", request.params);
    // console.log("\n Query: ", request.query);
    // console.log("\n File: ", request.file);

    const productID = request.body.id;
    const quantity = request.body.quantity;
    const image = request.body.image;;

    const addCart = new Cart(productID, quantity, image);
    Cart.save(addCart);

    //console.log(" find product to add to cart: " + addCart );

    // console.log(' Query|| productID: ' + request.query.productID);
    // const findProductID = await Product.findOne({ _id: request.query.productID}); 
    // console.log(" Find Product to add to cart : " + findProductID );
    // Cart.save(findProductID._id);
    
    respond.redirect("/shop");

}

exports.cartView = async (request, respond , next) => {

    try{
        let carts = await Cart.getCart({});

        console.log("productID: "+ carts.products[0].productID);
        

        // // get all ids
        // var ids = Cart.products.map(x => x.survey_id)
        // console.log(ids)

        // // get first id
        // var id = Cart.products[0].survey_id;
        // console.log(id)

        //JSON.stringify to show object array
        const str = JSON.stringify(carts);
        console.log("Products add cart: " + str);

        respond.render('userPage/cart',{cartList: carts});
    }
    catch(error){
        console.log(error);
    }
    
}