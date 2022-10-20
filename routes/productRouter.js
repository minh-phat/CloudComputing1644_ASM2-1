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
        if(request.session.message){
            response.render("adminPage/newProduct", {categories: categoriesList, message: request.session.message});
        }else {
            response.render("adminPage/newProduct", {categories: categoriesList});
        }
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
const { error } = require("console");
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

    //Validate required for some fields
    if( 
        !request.body.product_name ||
        !request.body.description ||
        !request.body.price ||
        !request.body.color1 ||
        !request.body.stock1
    ) {
        request.session.message = "Please fill in all the fields";
        return response.redirect("/newProduct");
    }

    //Validate image is uploaded
    if(!request.file) {
        request.session.message = "Please upload an image";
        return response.redirect("/newProduct");
    }

    //Validate if product name is unique
    Product.findOne({ product_name: request.body.product_name }).exec((error, product) => {
        if(error){
            console.log(error);
            return response.redirect("/newProduct");
        }
        if(product){
            request.session.message = "There can only be one product " + request.body.product_name;
            console.log("There can only be one product " + request.body.product_name);
            return response.redirect("/newProduct");
        }

        //If product name is indeed unique then save to database
        request.body.image = request.file.filename; //make image link the filename
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
            }
            
            if ( document ) {
                console.log("\nInserted one document: \n" + document)
                request.session.message = "Inserted one product " + document.product_name;
                response.redirect("/viewProducts")
            }
        })
    })
});

//Direct to product view page
router.get( "/viewProducts" , viewProducts);
async function viewProducts(request, response) {
    try {
        let productsList = await Product.find({}).populate('category');
        console.log("Products currently in database are: \n" + productsList);
        if(request.session.message){
            response.render("adminPage/viewProducts", { products: productsList, message: request.session.message } );
        }else {
            response.render("adminPage/viewProducts", { products: productsList } );
        }
    } catch (error) {
        console.log(error);
    }
}

//Delete product
router.get("/deleteProduct?:id", deleteProducts);
async function deleteProducts(request, response) {
    try{
        const document = await Product.findOne({ _id: request.query.id });
        console.log(request.query)
        const deleted = await document.remove( function (error, deleted) {
            if(error) {
                console.log(error);
                return response.redirect("/viewProducts")
            }
            if(deleted) {
                console.log("Deleted one document: \n" + document);
                request.session.message = "Deleted product " + document.product_name;
                return response.redirect("/viewProducts");
            }
        } );
    } catch(error) {
        console.log(error);
    }
}

//Update product
router.get("/updateProduct?:id", updateProduct);
async function updateProduct(request, response) {
    try{
        const document = await Product.findOne( { _id: request.query.id } );
        const categoriesList = await Category.find({});
        if(request.session.message) {
            response.render( "adminPage/updateProduct", { categories: categoriesList, product: document, message: request.session.message } )
        }else {
            response.render( "adminPage/updateProduct", { categories: categoriesList, product: document } )
        }
    } catch(error) {
        console.log(error);
    }
}

//Save updated information to database
router.post( "/updateProduct?:id" , upload.single("image"), (request, response, next) => {
    console.log("\n BODY: ", request.body);
    console.log("\n File: ", request.file);

    //Validate required for some fields
    if( 
        !request.body.product_name ||
        !request.body.description ||
        !request.body.price ||
        !request.body.color1 ||
        !request.body.stock1
    ) {
        request.session.message = "Please fill in all the fields";
        return response.redirect("/updateProduct?id=" + request.body._id);
    }
    request.body.image = request.file.filename; //make image link the filename
    let toy = {};

    //If product name is updated then check if it is duplicated or not
    if(request.body.updated){
        Product.findOne({ product_name: request.body.product_name }).exec((error, product) => {
            if(error){
                console.log(error);
                return response.redirect("/updateProduct?id=" + request.body._id);
            }
            if(product){
                request.session.message = "There can only be one product " + request.body.product_name;
                console.log("There can only be one product " + request.body.product_name);
                return response.redirect("/updateProduct?id=" + request.body._id);
            }
    
            //If product name is indeed unique then save to database
    
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
    
            Product.updateOne( {_id: request.body._id}, { $set: toy },function (error, document) {
                if (error) {
                    console.error(error)
                }
                
                if ( document ) {
                    console.log("Updated " + document.product_name + "\n" + document)
                    request.session.message = "Updated " + document.product_name;
                    response.redirect("/updateProduct?:id")
                }
            })
        })
    }else{
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

        Product.updateOne( {_id: request.body._id}, { $set: toy },function (error, document) {
            if (error) {
                console.error(error)
            }
            
            if ( document ) {
                console.log("Updated " + document.product_name + "\n" + document)
                request.session.message = "Updated " + document.product_name;
                response.redirect("/updateProduct?:id")
            }
        })
    }
});

//!Exporting router module|================================================

exports.ProductRouter = router;