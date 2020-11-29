const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const path = require("path");
const sassMiddleware = require("node-sass-middleware");
const db = require("./config/mongoose");
const session  =  require("express-session");
const { Session } = require("inspector");
const MongoStore = require('connect-mongo')(session);
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

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

//setting session and mongostore for persistent user session
app.use(
    session({
        name:"authcookies",
        secret:"randomsecretkey",
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge : 24*60*60*1000
        },
        store : new MongoStore({
            mongooseConnection:db,
            autoRemove:"disabled",
        },(err)=>{
            console.log(err || "connect-mongo online");
        }
        ),
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//using routes..
app.use("/",require("./routes/index"));

app.listen(PORT,(err)=>{
    if(err){
        console.log("error in running the server",err);
    }
    console.log("server is up and running on port",PORT);
})