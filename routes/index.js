const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

router.get("/signin",(req,res)=>{
 return res.render("signin");
});
router.get("/forgotpswd",(req,res)=>{
    return res.render("forgetpassword");
});
router.get("/",(req,res)=>{
    return res.render("home");
});

router.post("/signup",UserController.createUser);
router.post("/signin",UserController.verifyUser);

module.exports = router;