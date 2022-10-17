const express = require("express");
const router = express.Router();
const fs = require("fs");

//Setting routes in module|================================================

router.get("/newProduct", (req, res) => {
    res.render("adminPage/newProduct");
});

//!Exporting router module|================================================

exports.ProductRouter = router;