const  express = require("express");
const  router = express.Router();
const fs = require("fs");
const appServer = express();
const hbs = require("hbs");

////// - Model
const Category = require("../model/categories");

//Middleware|=======================================================================

const bodyParser = require("body-parser");
const { CLIENT_RENEG_LIMIT } = require("tls");

//View engine setup|=================================================================


appServer.set("view engine", "hbs"); //setting view engine as handlebars

//Page partials|==========================================================================

hbs.registerPartials('view/userPage');
hbs.registerPartials('view/adminPage');

//Config|============================================================================

appServer.use(express.static("public"));


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
        let CategoryList = await Category.find({});
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

    
    yeucau.body.image = yeucau.file.filename; //gán Imagelink bằng đường link tới ảnh trong document

    oneCategory = new Category(yeucau.body);
    oneCategory.save(); //save data into database

    trave.redirect('./categoryView');
    
});

//----------------------<<Delete one Category
router.get( "/categoryDelete/:id" , (yeucau, trave) => {

    var deleteId= yeucau.params.id; //take id on link http

    //use to delete item have id like which id on http
    Category.findOneAndRemove({_id: deleteId}, function(err){
        if(err) {
            console.log(err);
            return trave.status(500).send();
        }
        return trave.status(200).send();
    });

    trave.redirect('../categoryView');
});
//----------------------Delete one Category>>


// router.get( "/categoryUpdate/:id" , (yeucau, trave) => {

//     var updateId= yeucau.params.id; //take id on link http

//     //use to delete item have id like which id on http
//     Category.findByIdAndUpdate({_id: updateId}, function(err){
//         if(err) {
//             console.log(err);
//             return trave.status(500).send();
//         }
//         return trave.status(200).send();
//     });

//     trave.redirect('../categoryView');
// });

// SHOW EDIT USER FORM
router.get('/categoryEdit:id', async (yeucau, trave) => {
   
    console.log("\n BODY: ", yeucau.body);
    console.log("\n Params: ", yeucau.params);
    console.log("\n Query: ", yeucau.query);


    try {
        let CategoryID = await Category.findOne({ _id: yeucau.params.id });
        console.log(CategoryID );
        trave.render("adminPage/categoryEdit", {Categories: CategoryID});
    } catch (error) {
        console.log(error);
    }

});


// router.post( "/categoryEdit:id" , (yeucau, trave) => {


//     console.log("\n BODY: ", yeucau.body);
//     console.log("\n Params: ", yeucau.params);
//     console.log("\n Query: ", yeucau.query);

//     var updateId= yeucau.params.id; //take id on link http

//     //use to delete item have id like which id on http
//     Category.findByIdAndUpdate(updateId, {category_name:yeucau.query.category_name} ,{image:yeucau.query.image}, function(err){
//         if(err) {
//             console.log(err);
//             return trave.status(500).send();
//         }
//         return trave.status(200).send();
//     });

//     trave.redirect('../categoryView');
// });


router.post( "/categoryEdit:id" , upload.single("image"), (yeucau, trave, ketiep) =>  {


    console.log("\n BODY: ", yeucau.body);
    console.log("\n Params: ", yeucau.params);
    console.log("\n Query: ", yeucau.query);
    console.log("\n File: ", yeucau.file);
    
    yeucau.body.image = yeucau.file.filename; //gán Imagelink bằng đường link tới ảnh trong documents
    
    //var updateId= yeucau.params.id; //take id on link http

    var myquery = { _id: yeucau.params.id };
    var newvalues = { $set: { category_name: yeucau.body.category_name, image: yeucau.body.image } };

    
    //use to delete item have id like which id on http
    Category.updateOne(myquery, newvalues, function(err){
        if(err) {
            console.log(err);
            return trave.status(500).send();
        }
        return trave.status(200).send();
    });

    trave.redirect('../categoryView');
});



//-------------------------------------------
exports.categoryController = router;