const express = require("express");
const UserController = require("../controllers/userController");
const passport = require("passport");
const router = express.Router();

router.get("/signin",passport.checkNotAuthenticated,(req,res)=>{
 return res.render("signin");
});
router.get("/forgotpswd",(req,res)=>{
    return res.render("forgetpassword");
});
router.get("/",passport.checkAuthentication,(req,res)=>{
    return res.render("home");
});
//user sign out route
router.get("/signout",UserController.signoutUser);

//signup route
router.post("/signup",UserController.createUser);

//signin route for local strategy
router.post("/signin",passport.authenticate(
    'local',{
        failureRedirect:"signin"
    }
),(req,res)=>{
    return res.redirect('/');
});

module.exports = router;