const express = require("express");
const router = express.Router();
const fs = require("fs");

//-------------------------------------------

router.get("/signup", (req, res) => {
    res.render("signup");
});

//-------------------------------------------
exports.UserRouter = router;