const { Console } = require("console");
const express = require("express");
const router = express.Router();
const fs = require("fs");

////// - Model Call
const Category = require("../model/categories");
const Product = require("../model/products");

//Setting routes in module|================================================

router.get("/", home);
async function home(request, response) {
    try {
        let CategoryList = await Category.find({});
        if (request.session.username) {
            console.log(CategoryList);
            response.render("userPage/home", { username: request.session.username , Categories: CategoryList })
        } else {
            console.log(CategoryList);
            response.render("userPage/home",{Categories: CategoryList});
        }
    } catch (error) {
        console.log(error);
    }
}


// router.get("/shop", (req, res) => {
//     res.render("userPage/shop");
// });

router.get("/shop",shop);
async function shop(request, response) {
    try {
        let CategoryList = await Category.find({});
        let ProductList = await Product.find({});
        if (request.session.username) {
            console.log("/n Category : " +CategoryList);
            console.log("/n Product : " +ProductList);
            response.render("userPage/shop", { username: request.session.username , Categories: CategoryList, Products: ProductList })
        } else {
            console.log("/n Category : " + CategoryList);
            console.log("/n Product : " + ProductList);
            response.render("userPage/shop",{ Categories: CategoryList, Products: ProductList });
        }
    } catch (error) {
        console.log(error);
    }
}
// router.get( "/shop" , shop);
// async function shop(request, response) {
//     try {
//         let productsList = await Product.find({}).populate('category');
//         console.log("Products currently in database are: \n" + productsList);
//         if(request.session.message){
//             response.render("adminPage/viewProducts", { products: productsList, message: request.session.message } );
//         }else {
//             response.render("adminPage/viewProducts", { products: productsList } );
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

router.get("/shopDetail", (req, res) => {
    res.render("userPage/shopDetail");
});

router.get("/cart", (req, res) => {
    res.render("userPage/cart");
});

router.get("/checkout", (req, res) => {
    res.render("userPage/checkout");
});

router.get("/contact", (req, res) => {
    res.render("userPage/contact");
});

//!Exporting router module|================================================

exports.UserRouter = router;