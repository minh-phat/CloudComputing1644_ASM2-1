const  express = require("express");
const  router = express.Router();
const fs = require("fs");

////// - Model
const Product = require("../model/categories");


//-------------------------------------<<handle upload file img
// Upload - https://www.npmjs.com/package/multer 
const multer = require('multer');

//Setting storage engine
const storageEngine = multer.diskStorage({
    destination: "public/img/categories",
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
        cb("Error: You can Only Upload Images!!");
    }
};

const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
})
//-------------------------------------handle upload file img>>

//-------------------------------------------
router.get( "/categoryView" , categoryView);
async function categoryView(yeucau, trave) {
    try {
        let CategoryList = await Product.find({});
        console.log(CategoryList);
        trave.render("adminPage/categoryView", {Categories: CategoryList});
    } catch (error) {
        console.log(error);
    }
}

router.get( "/categoryInsert" , (yeucau, trave) => {
    trave.render("adminPage/categoryInsert");
});

router.post( "/categoryInsert" , upload.single("image"), (yeucau, trave, ketiep) => {

    console.log("\n BODY: ", yeucau.body);
    console.log("\n Params: ", yeucau.params);
    console.log("\n Query: ", yeucau.query);
    console.log("\n File: ", yeucau.file);

    
    yeucau.body.image = "/img/categories" + yeucau.file.filename; //gán Imagelink bằng đường link tới ảnh trong document

    oneCategory = new Category(yeucau.body);
    oneCategory.save(); //save data into database

    trave.render("adminPage/categoryView",  {Categories: CategoryList});
    //trave.render("categoryView",  {sanpham: yeucau.body}); //check dữ liệu trả về
});

//-------------------------------------------
exports.categoryController = router;