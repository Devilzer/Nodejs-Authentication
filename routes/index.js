const express = require("express");

const router = express.Router();

router.get("/signin",(req,res)=>{
 return res.render("signin");
});

module.exports = router;