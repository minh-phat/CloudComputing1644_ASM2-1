// const { request } = require('express');
const categories = require('../model/categories');
const Product = require('../model/productAddCart');
const Cart = require('../model/carts');
const { request } = require('express');

exports.addToCart = (request, respond , next) => {
    
    console.log(' Query : ' + request.query.id );
    const addedProduct = Product.findById(request.query.id)[0];
    Cart.save(addedProduct);
    respond.redirect("/shop");

}