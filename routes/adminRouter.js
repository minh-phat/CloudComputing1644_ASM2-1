const express = require("express");
const router = express.Router();
const fs = require("fs");

//-------------------------------------------

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

//-------------------------------------------
exports.AdminRouter = router;