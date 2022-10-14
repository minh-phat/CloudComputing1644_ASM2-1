const express = require("express");
const PORT = process.env.PORT || 8080;
const appServer = express();
const router = express.Router();
const fs = require("fs");
const path = require('path');
const mongoose = require("mongoose");
const hbs = require("hbs");

//Partials
hbs.registerPartials('view/userPage');

// Middleware
const bodyParser = require("body-parser");
const { CLIENT_RENEG_LIMIT } = require("tls");
// ---- 
//view engine setup
appServer.set("views", path.join(__dirname, "view")); //setting views directory for views.
appServer.set("view engine", "hbs"); //setting view engine as handlebars

// Config
appServer.use(express.static("public"));

// Connect database
const DB_USERNAME = "trietnfriends";
const DB_PASSWORD = "trietnfriends";
const DB_SERVER = "atn-shop.c7pvv4i.mongodb.net";
const uri = `mongodb+srv://` + DB_USERNAME + `:` + DB_PASSWORD + `@` + DB_SERVER + `/?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", _ => {
    console.log("Connected to Database");
})

// ------------------- Middleware - kiem soat tinh huong
router.use((yeucau, trave, ketiep) => {
    console.log("REQ: ", Date.now(), yeucau.url);
    ketiep();
});

router.use((loixayra, yeucau, trave, ketiep) => {
    console.log("ERROR: ", Date.now(), yeucau.url);
    console.log(loixayra);
    trave.status(500).send("Dang co loi xay ra, chua biet o dau !!!");
});

// ------------------- Routing
router.get("/", (yeucau, trave) => {

    trave.render("userPage/home");
});

router.get("/shop", (yeucau, trave) => {

    trave.render("userPage/shop");
});

appServer.use("/", router);

//--- Add middleware
//const session = express.session();
appServer.use(bodyParser.json());
appServer.use(bodyParser.urlencoded({ extended: true }));
//appServer.use(session({secret: "id-session-Mr.Tu"​}));


// ------------------------- Add Router / Controller
// appServer.use("/", router);

// const ProductRouter = require("./controller/productController").ProductRouter;
// appServer.use("/products", ProductRouter);

// const LoginRouter = require("./controller/loginController").LoginRouter;
// appServer.use("/login", LoginRouter);

// ----------- RUN / Launching !!! 
appServer.listen(PORT);

console.log("Web da mo tai " + PORT);