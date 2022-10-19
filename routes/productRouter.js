const express = require("express");
const router = express.Router();
const Category = require("../model/categories");
const Product = require("../model/products");
const multer = require("multer");

//Direct to create product page
router.get( "/newProduct" , loadCategories);
async function loadCategories(request, response) {
    try {
        let categoriesList = await Category.find({});
        response.render("adminPage/newProduct", {categories: categoriesList});
    } catch (error) {
        console.log(error);
    }
}

//Save product to database
//Setting storage engine and save image to server
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

router.post( "/newProduct" , upload.single("image"), (request, response, next) => {
    console.log("\n BODY: ", request.body);
    console.log("\n File: ", request.file);

    request.body.image = request.file.filename; //gán Imagelink bằng đường link tới ảnh trong document

    //This is stupid
    let toy = {};
    if(request.body.counter == 1){
        toy = {
            product_name: request.body.product_name,
            category: request.body.category,
            description: request.body.description,
            price: request.body.price,
            image: request.body.image,
            configurations: [{
                color: request.body.color1,
                stock: request.body.stock1
            }]
        }
    }else if(request.body.counter == 2){
        toy = {
            product_name: request.body.product_name,
            category: request.body.category,
            description: request.body.description,
            price: request.body.price,
            image: request.body.image,
            configurations: [{
                color: request.body.color1,
                stock: request.body.stock1
            }, {
                color: request.body.color2,
                stock: request.body.stock2
            }]
        }
    }else if(request.body.counter == 3){
        toy = {
            product_name: request.body.product_name,
            category: request.body.category,
            description: request.body.description,
            price: request.body.price,
            image: request.body.image,
            configurations: [{
                color: request.body.color1,
                stock: request.body.stock1
            }, {
                color: request.body.color2,
                stock: request.body.stock2
            }, {
                color: request.body.color3,
                stock: request.body.stock3
            }]
        }
    }else if(request.body.counter == 4){
        toy = {
            product_name: request.body.product_name,
            category: request.body.category,
            description: request.body.description,
            price: request.body.price,
            image: request.body.image,
            configurations: [{
                color: request.body.color1,
                stock: request.body.stock1
            }, {
                color: request.body.color2,
                stock: request.body.stock2
            }, {
                color: request.body.color3,
                stock: request.body.stock3
            },{
                color: request.body.color4,
                stock: request.body.stock4
            }]
        }
    }else {
        toy = {
            product_name: request.body.product_name,
            category: request.body.category,
            description: request.body.description,
            price: request.body.price,
            image: request.body.image,
            configurations: [{
                color: request.body.color1,
                stock: request.body.stock1
            }, {
                color: request.body.color2,
                stock: request.body.stock2
            }, {
                color: request.body.color3,
                stock: request.body.stock3
            },{
                color: request.body.color4,
                stock: request.body.stock4
            }, {
                color: request.body.color5,
                stock: request.body.stock5
            }]
        }
    }

    const newToy = new Product(toy)
    newToy.save(function (error, document) {
        if (error) {
            console.error(error)
        }else{
            console.log(document)
            response.redirect("./newProduct")
        }
    })
});

//Direct to product view page
router.get( "/viewProducts" , viewProducts);
async function viewProducts(request, response) {
    try {
        let productsList = await Product.find({}).populate('category');

        console.log(productsList);
        response.render("adminPage/viewProducts", { products: productsList } );
    } catch (error) {
        console.log(error);
    }
}

//!Exporting router module|================================================

exports.ProductRouter = router;