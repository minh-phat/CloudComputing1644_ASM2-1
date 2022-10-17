const express = require("express");
const router = express.Router();
const fs = require("fs");
const controller = require("../controller/authController");

//Auth routes|==================================

router.post("/signup/newAccount", controller.newAccount);

//Export module|========================================

exports.authRouter = router;