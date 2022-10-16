const express = require("express");
const router = express.Router();
const fs = require("fs");

//-------------------------------------------

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/", (req, res) => {
    res.render("userPage/home");
});

router.get("/shop", (req, res) => {
    res.render("userPage/shop");
});

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

//-------------------------------------------
exports.UserRouter = router;