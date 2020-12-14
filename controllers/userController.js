const User = require("../models/user");
const Otp = require("../models/otp");
const bcrypt = require("bcrypt");
const randomatic = require("randomatic");
const transporter = require("../config/nodemailer");
const store = require("store");

//create user method.
module.exports.createUser = async(req,res)=>{
    const user = new User;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = await bcrypt.hash(req.body.password,10);
    await user.save();
    req.flash("info","User Registered.");
    return res.redirect("back");
};

// user signout method.
module.exports.signoutUser = (req,res)=>{
    req.logout();
    req.flash("info","Signed-Out Successfully.");
    return res.redirect("signin");
};

//otp function for forgot password.
module.exports.sendOtp = async(req,res)=>{
    const user =await User.findOne({email:req.body.email});
    if(user){
        const otpRandom =randomatic('0',8);
        const otp =new Otp;
        otp.otp = otpRandom;
        await otp.save();
        store.set("email",req.body.email);
        let mailOptions = {
            from: 'Node Auth', // TODO: email sender
            to: req.body.email, // TODO: email receiver
            subject: 'Password Reset OTP',
            text: `your one time password is ${otpRandom}`
        };
        transporter.sendMail(mailOptions,(err,data)=>{
            if (err) {
                 console.log('Error occurs');
            }
            else{
                console.log('mail sent',data);
            }  
        });
        req.flash("success","Otp Sent");
        return res.redirect("/verifyotp");
    }
    else{
        req.flash("error","email does not exits.");
        return res.redirect("/forgotpswd");
    } 
};

module.exports.verifyOtp = async(req,res)=>{
    const otp = await Otp.findOne({otp : req.body.otp});
    if(otp){
        await Otp.findOneAndDelete({otp:req.body.otp});
        req.flash("success","Otp verified");
        return res.redirect("/changepassword");
    }
    else{
        req.flash("error","Wrong Otp");
        return res.redirect("/verifyotp");
    }
};
module.exports.changePassword = async(req,res)=>{
    const email = store.get("email");
    console.log(req.body);
    const user =await User.findOne({email : email});
    user.password = await bcrypt.hash(req.body.password,10); 
    await user.save();
    req.flash("success","Password Changed!");
    return res.redirect("/");
};
