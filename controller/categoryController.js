const  express = require("express");
const  router = express.Router();
const fs = require("fs");
const appServer = express();
const hbs = require("hbs");

////// - Model
const Category = require("../model/categories");


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

router.post( "/categoryUpdate:id" , upload.single("image"), (yeucau, trave, ketiep) =>  {


    console.log("\n BODY: ", yeucau.body);
    console.log("\n Params: ", yeucau.params);
    console.log("\n Query: ", yeucau.query);
    console.log("\n File: ", yeucau.file);

    yeucau.body.image = yeucau.file.filename; //gán Imagelink bằng đường link tới ảnh trong documents
    
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


// router.get( "/view/:name" , async (yeucau, trave) => {
//     console.log("\n BODY: ", yeucau.body);
//     console.log("\n Params: ", yeucau.params);
//     console.log("\n Query: ", yeucau.query);

//     try {
//         let CategoryList = await Category.findOne({ category_name: yeucau.params.name });
//         console.log(sp);
//         trave.render("showProduct", {categories: sp});
//     } catch (error) {
//         console.log(error);
//     }

// });

// router.get( "/categoryView:category_name" , async (yeucau, trave) => {
//     console.log("\n BODY: ", yeucau.body);
//     console.log("\n Params: ", yeucau.params);
//     console.log("\n Query: ", yeucau.query);

//     var name = yeucau.params.category_name;
//     //const name = "Doll";
//     try {
//         let CategoryList = await Category.find({ category_name: /name/ });
//         console.log(CategoryList);
//         trave.render("adminPage/categoryView", {Categories: CategoryList});
//     } catch (error) {
//         console.log(error);
//     }

// });

// router.get( "/categorySearch" , async (yeucau, trave) => {

//     const filters = yeucau.query;
//     let filteredUsers = await Category.filter(Category => {
//     let isValid = true;
//     for (key in filters) {
//       console.log(key, Category[key], filters[key]);
//       isValid = isValid && Category[key] == filters[key];
//     }
//     return isValid;
//   });
//   trave.send(filteredUsers);

// });

router.get( "/categorySearch?" , async (yeucau, trave) => {

    console.log("\n BODY: ", yeucau.body);
    console.log("\n Params: ", yeucau.params);
    console.log("\n Query: ", yeucau.query);

    let category_name = yeucau.query.category_name;
    console.log("\n Search : " + category_name); // respond category name in console log to check category name

    try {
        // "{ $regex : category_name }" -- "$regex" that mean search the things relative element is filterd. cateroy_name taken from "let category_name"
        // "find({ category_name:...})" that mean find catetory_name in query 
        let CategoryList = await Category.find({ category_name: { $regex : category_name } }); 
        console.log(CategoryList);
        trave.render("adminPage/categoryView", {Categories: CategoryList});
    } catch (error) {
        console.log(error);
    }
    
});



//-------------------------------------------
exports.categoryController = router;