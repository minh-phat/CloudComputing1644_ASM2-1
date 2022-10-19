//Middleware|=======================================================================

const bodyParser = require("body-parser");
const { CLIENT_RENEG_LIMIT } = require("tls");

//View engine setup|=================================================================

appServer.set("views", path.join(__dirname, "view")); //setting views directory for views.
appServer.set("view engine", "hbs"); //setting view engine as handlebars

//Page partials|==========================================================================

hbs.registerPartials('view/userPage');
hbs.registerPartials('view/adminPage');

//Config|=====================================================================