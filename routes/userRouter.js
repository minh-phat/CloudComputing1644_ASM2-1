const express = require("express");
const router = express.Router();
const fs = require("fs");

//Setting routes in module|================================================

router.get("/", (req, res) => {
    if (req.session.username) {
        res.render("userPage/home", { username: req.session.username })
    } else {
        res.render("userPage/home");
    }
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

//!Exporting router module|================================================

exports.UserRouter = router;