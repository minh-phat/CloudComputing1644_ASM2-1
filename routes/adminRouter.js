const express = require("express");
const router = express.Router();
const sessions = require('express-session');
const fs = require("fs");
const accounts = require("../model/accounts");
const controller = require("../controller/userController");

//Setting routes in module|================================================

router.get("/dashboard", (req, res) => {
    if (req.session.username && req.session.class === "Director") {
        res.render("adminPage/dashboard", { username: req.session.username })   //check login class
    } else {
        res.redirect("/login");
    }
});
router.get("/formImplement", (req, res) => {
    res.render("adminPage/formImplement");
});
router.get("/table", (req, res) => {
    res.render("adminPage/table");
});

router.get("/userView", async (req, res) => {
    userList = await accounts.find({ account_class: 'User' });
    res.render("adminPage/userView", { User: userList });
});

router.get("/userView", (req, res) => {
    res.render("adminPage/managerView");
});

router.get("/userDelete/:id", controller.delAccount);



exports.AdminRouter = router;