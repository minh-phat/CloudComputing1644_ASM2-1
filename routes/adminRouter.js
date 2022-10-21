const express = require("express");
const router = express.Router();
const sessions = require('express-session');
const fs = require("fs");
const accounts = require("../model/accounts");
const controller = require("../controller/userController");
const managerController = require("../controller/managerController");
const authMiddleware = require("../middleware/authMiddleware");
const { GeoReplyWith } = require("redis");

//Setting routes in module|================================================

router.get("/formImplement", authMiddleware.hasClass(['Director', 'Manager']), (req, res) => {
    res.render("adminPage/formImplement");
});

router.get("/table", authMiddleware.hasClass(['Director', 'Manager']), (req, res) => {
    if (req.session.username) {
        res.render("adminPage/table", { username: req.session.username })   //check login class
    } else {
        res.redirect("/login");
    }
});

router.get("/accountDelete/:id", authMiddleware.hasClass(['Director', 'Manager']), controller.delAccount);

router.post("/managerAdd", authMiddleware.hasClass(['Director', 'Manager']), managerController.managerAdd);

router.get("/dashboard", authMiddleware.hasClass(['Director', 'Manager']), (req, res) => {
    req.session.username ? res.render("adminPage/dashboard", { username: req.session.username }) : res.redirect("/login")
});

router.get("/userView", authMiddleware.hasClass(['Director', 'Manager']), async (req, res) => {
    if (req.session.username) {
        userList = await accounts.find({ account_class: 'User' });
        res.render("adminPage/userView", req.session.message ? { User: userList, message: req.session.message } : { User: userList });
        req.session.message = null;
    } else {
        res.redirect("/login");
    }
});

router.get("/managerView", authMiddleware.hasClass(['Director']), async (req, res) => {
    if (req.session.username) {
        managerList = await accounts.find({ account_class: 'Manager' });
        res.render("adminPage/managerView", req.session.message ? { User: managerList, message: req.session.message } : { User: managerList });
        req.session.message = null;
    } else {
        res.redirect("/login");
    }
});

router.get("/managerInsert", authMiddleware.hasClass(['Director']),  (req, res) => {
    if (req.session.username) {
        res.render("adminPage/managerInsert", { username: req.session.username })   //check login class
    } else {
        res.redirect("/login");
    }
});

exports.AdminRouter = router;