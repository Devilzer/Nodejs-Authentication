const User = require("../models/user");
const bcrypt = require("bcrypt");
module.exports.createUser = async(req,res)=>{
    const user = new User;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = await bcrypt.hash(req.body.password,10);
    await user.save();
    req.flash("info","User Registered.");
    return res.redirect("back");
};

module.exports.signoutUser = (req,res)=>{
    req.logout();
    req.flash("info","Signed-Out Successfully.");
    return res.redirect("signin");
};

//otp function for forgot password.
module.exports.sendOtp = async(req,res)=>{
    console.log(req.body);
    return res.redirect("/forgotpswd");
};
