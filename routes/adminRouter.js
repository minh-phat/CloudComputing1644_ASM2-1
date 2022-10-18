const express = require("express");
const router = express.Router();
const sessions = require('express-session');
const fs = require("fs");

//Setting routes in module|================================================

// if (req.session.class === admin) {
//     console.log("session for admin available!!=================================");
// }   //!test for admin login via session.

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/dashboard", (req, res) => {
    res.render("adminPage/dashboard");
});
router.get("/formImplement", (req, res) => {
    res.render("adminPage/formImplement");
});
router.get("/table", (req, res) => {

    res.render("adminPage/table");
});


// router.get( "/category" , categoryView);
// async function categoryView(req, res) {
//     try {
//         let CategoryList = await Product.find({});
//         console.log(dssp);
//         res.render("adminPage/categoryView", {Categories: CategoryList});
//     } catch (error) {
//         console.log(error);
//     }
// }

// const categoryController = require("../controller/categoryController").categoryController;
// appServer.use("/category", categoryController);


// router.get("/category", (req, res) => {

    
//     //res.render("adminPage/categoryView");
// });

exports.AdminRouter = router;