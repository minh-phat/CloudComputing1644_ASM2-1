const express = require("express");
const router = express.Router();
const sessions = require('express-session');
const fs = require("fs");

//Setting routes in module|================================================

router.get("/dashboard", (req, res) => {
    res.render("adminPage/dashboard");
});
router.get("/formImplement", (req, res) => {
    res.render("adminPage/formImplement");
});
router.get("/table", (req, res) => {
    res.render("adminPage/table");
});

router.get("/userView", (req, res) => {
    res.render("adminPage/users");
});
    
router.get("/userView", (req, res) => {
    res.render("adminPage/managers");
});



exports.AdminRouter = router;