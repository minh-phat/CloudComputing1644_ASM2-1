// const { request } = require('express');
const categories = require('../model/categories');
const Product = require('../model/products');
// const Product = require('../model/products');
const Cart = require('../model/carts');
//const { request } = require('express');

exports.addToCart = async (request, respond , next) => {
    
    // const productID = request.query.productId;
    // const quantity= /* request.query.quantity */ "4646464";

    // const addCart = new Cart(productID, quantity);
    // Cart.save(addCart);

    //console.log(" find product to add to cart: " + addCart );

    console.log(' Query|| productID: ' + request.query.productID);
    const findProductID = await Product.findOne({ _id: request.query.productID}); 
    console.log(" Find Product to add to cart : " + findProductID );
    Cart.save(findProductID._id);
    
    respond.redirect("/shop");

}