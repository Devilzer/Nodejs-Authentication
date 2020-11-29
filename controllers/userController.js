const User = require("../models/user");
const bcrypt = require("bcrypt");
module.exports.verifyUser = (req,res)=>{

};
module.exports.createUser = async(req,res)=>{
    const user = new User;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = await bcrypt.hash(req.body.password,10);
    await user.save();
    console.log("user registered!!");
    return res.redirect("back");
};