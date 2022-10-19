const express = require("express");
const router = express.Router();
const fs = require("fs");
const controller = require("../controller/authController");

//Auth routes|==================================

router.get("/signup", (req, res) => {
    if (req.session.message) {
        res.render("signup", { message: req.session.message });
    } else {
        res.render("signup");
    }
});

router.get("/login", (req, res) => {
    if (req.session.message) {
        res.render("login", {
            message: req.session.message,
            formData: {
                username: "failtest",
            }
        });
    } else {
        res.render("login");
    }
});

router.post("/signup/newAccount", controller.newAccount);   //signup

router.post("/login/accountAuth", controller.accountAuth);  //signin

//Export module|========================================

exports.authRouter = router;