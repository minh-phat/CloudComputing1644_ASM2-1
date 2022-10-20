const express = require("express");
const router = express.Router();
const sessions = require('express-session');
const fs = require("fs");
const accounts = require("../model/accounts");
const controller = require("../controller/userController");
const managerController = require("../controller/managerController");

//Setting routes in module|================================================

router.get("/dashboard", (req, res) => {
    if (req.session.username && req.session.class === "Director" ||
        req.session.username && req.session.class === "Manager") {
        res.render("adminPage/dashboard", { username: req.session.username })   //check login class
    } else {
        res.redirect("/login");
    }
});
router.get("/formImplement", (req, res) => {
    res.render("adminPage/formImplement");
});

router.get("/table", (req, res) => {
    if (req.session.username && req.session.class === "Director" ||
        req.session.username && req.session.class === "Manager") {
        res.render("adminPage/table", { username: req.session.username })   //check login class
    } else {
        res.redirect("/login");
    }
});

router.get("/userView", async (req, res) => {
    if (req.session.message) {
        userList = await accounts.find({ account_class: 'User' });
        res.render("adminPage/userView", { User: userList, message: req.session.message });
    } else {
        userList = await accounts.find({ account_class: "User" });
        res.render("adminPage/userView", { User: userList });
    }
    req.session.message = null;
});

router.get("/managerView", async (req, res) => {
    if (req.session.message) {
        managerList = await accounts.find({ account_class: 'Manager' });
        res.render("adminPage/managerView", { User: managerList, message: req.session.message });
    } else {
        managerList = await accounts.find({ account_class: "Manager" });
        res.render("adminPage/managerView", { User: managerList });
    }
    req.session.message = null;
});

router.get("/managerInsert", (req, res) => {
    if (req.session.username && req.session.class === "Director" ||
        req.session.username && req.session.class === "Manager") {
        res.render("adminPage/managerInsert", { username: req.session.username })   //check login class
    } else {
        res.redirect("/login");
    }
});

router.get("/accountDelete/:id", controller.delAccount);

router.post("/managerAdd", managerController.managerAdd);

exports.AdminRouter = router;