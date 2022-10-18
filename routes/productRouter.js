const express = require("express");
const router = express.Router();
const fs = require("fs");
const categories = require("../model/categories");
const multer = require("multer");
const product = require("../model/products");

//Setting routes in module|================================================
router.get( "/newProduct" , loadCategories);
async function loadCategories(request, response) {
    try {
        let categoriesList = await categories.find({});
        console.log(categoriesList);
        response.render("adminPage/newProduct", {categories: categoriesList});
    } catch (error) {
        console.log(error);
    }
}

//! Save image to database
//Setting storage engine
const storageEngine = multer.diskStorage({
    destination: "public/img/products",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});
const path = require("path");
const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can only Upload Images!!");
    }
};
const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
})

//Save product to database
router.post( "/newProduct" , upload.single("image"), (request, response, next) => {

    console.log("\n BODY: ", request.body);
    // console.log("\n Params: ", request.params);
    // console.log("\n Query: ", request.query);
    console.log("\n File: ", request.file);

    request.body.image = "img/products/" + request.file.filename; //gán Imagelink bằng đường link tới ảnh trong document

    newProduct = new product({
        product_name: request.body.product_name,
        category: request.body.category,
        description: request.body.description,
        price: request.body.price,
        image: request.body.image
    });
    newProduct.save(); //save data into database
    response.redirect('/newProduct');
    //!Add render to view page
});

//!Exporting router module|================================================

exports.ProductRouter = router;