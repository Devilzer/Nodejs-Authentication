const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const path = require("path");
const sassMiddleware = require("node-sass-middleware");
const db = require("./config/mongoose");
const session  =  require("express-session");
const MongoStore = require('connect-mongo')(session);

//scss middleware
app.use(sassMiddleware({
    src:"./assets/scss/",
    dest:"./assets/css/",
    debug:true,
    outputStyle:'extended',
    prefix :"/css"
}));
app.use(express.urlencoded());


//setting up views
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views/"));
app.use(express.static("assets/"));
//using routes..
app.use("/",require("./routes/index"));

app.listen(PORT,(err)=>{
    if(err){
        console.log("error in running the server",err);
    }
    console.log("server is up and running on port",PORT);
})