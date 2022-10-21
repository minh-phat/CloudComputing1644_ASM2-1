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


router.get("/shop",shop);
async function shop(request, response) {
    try {
        let CategoryList = await Category.find({});
        let ProductList = await Product.find({});
        if (request.session.username) {
            console.log(" Category : " +CategoryList);
            console.log(" Product : " +ProductList);
            response.render("userPage/shop", { username: request.session.username , Categories: CategoryList, Products: ProductList })
        } else {
            console.log(" Category : " + CategoryList);
            console.log(" Product : " + ProductList);
            response.render("userPage/shop",{ Categories: CategoryList, Products: ProductList });
        }
    } catch (error) {
        console.log(error);
    }
}

router.get("/shopDetail/?",shopDetail);
async function shopDetail(request, response) {

    try {
        console.log(" Query : " + request.query)
        productID = request.query.productID;
        let ProductList = await Product.findOne({ _id: productID }); 
        if (request.session.username) {
            console.log(" Product : " +ProductList);
            response.render("userPage/shopDetail", { username: request.session.username , Products: ProductList })
        } else {
            console.log(" Product : " + ProductList);
            response.render("userPage/shopDetail",{ Products: ProductList });
        }
    } catch (error) {
        console.log(error);
    }
}

// router.get("/cart", (req, res) => {


//     res.render("userPage/cart");
// });

router.get("/cart/?",cart);
async function cart(request, response) {

    // try {
    //     console.log(" Query : " + request.query)
    //     productID = request.query.productID;
    //     let ProductList = await Product.findOne({ _id: productID }); 
    //     if (request.session.username) {
    //         console.log(" Product : " +ProductList);
    //         response.render("userPage/shopDetail", { username: request.session.username , Products: ProductList })
    //     } else {
    //         console.log(" Product : " + ProductList);
    //         response.render("userPage/shopDetail",{ Products: ProductList });
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
}

router.get("/checkout", (req, res) => {
    res.render("userPage/checkout");
});

router.get("/contact", (req, res) => {
    res.render("userPage/contact");
});

//!Exporting router module|================================================

exports.UserRouter = router;