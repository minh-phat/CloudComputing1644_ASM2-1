const express = require("express");
const router = express.Router();
const PORT = process.env.PORT || 8080;
const appServer = express();
const fs = require("fs");
const path = require('path');
const mongoose = require("mongoose");
const hbs = require("hbs");

//Middleware|=======================================================================

const bodyParser = require("body-parser");
const { CLIENT_RENEG_LIMIT } = require("tls");

//View engine setup|=================================================================

appServer.set("views", path.join(__dirname, "view")); //setting views directory for views.
appServer.set("view engine", "hbs"); //setting view engine as handlebars

//Page partials|==========================================================================

hbs.registerPartials('view/userPage');
hbs.registerPartials('view/adminPage');

//Config|============================================================================

appServer.use(express.static("public"));

//Connect database|==================================================================

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

//Middleware|========================================================================

router.use((req, res, next) => {
    console.log("REQ: ", Date.now(), req.url);
    next();
});

router.use((err, req, res, next) => {
    console.log("ERROR: ", Date.now(), req.url);
    console.log(err);
    res.status(500).send("Uh oh stinky error! No clue where it is from tho !");
});

//Routing|============================================================================
//! routes cannot have spaces in them else they will not be able to run
//User routing|==================================================================

const UserRouter = require("./routes/userRouter").UserRouter;
appServer.use("/", UserRouter);

//Admin routing|==================================================================

const AdminRouter = require("./routes/adminRouter").AdminRouter;
appServer.use("/admin", AdminRouter);

//Product routing|==================================================================

const ProductRouter = require("./routes/productRouter").ProductRouter;
appServer.use("/", ProductRouter);

//Add middleware|=====================================================================

appServer.use("/", router);
appServer.use(bodyParser.json());
appServer.use(bodyParser.urlencoded({ extended: true }));

//Sessions|==========================================================================

//const session = express.session();
//appServer.use(session({secret: "id-session-Mr.Tu"​}));
//appServer.use("/", router);

//Controller routers|==============================================================

const AuthRouter = require("./routes/authRouter").authRouter;
appServer.use("/", AuthRouter);

//!Launch|=======================================================

appServer.listen(PORT);
console.log("||Web da mo tai " + PORT + "||=====================================");

//!Launch|=======================================================

