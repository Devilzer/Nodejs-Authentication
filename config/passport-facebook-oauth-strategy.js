const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user");
const crypto = require("crypto");
require("dotenv").config();

passport.use(new FacebookStrategy({
    clientID : process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL:"http://localhost:3000/auth/facebook/callback",
    profileFields:['id','displayName',"name","email"]
},async(accessToken, refreshToken, profile, done)=>{
    try {
        const user =await User.findOne({email:profile.emails[0].value});
        if(user){
            return done(null,user);
        }
        else{
            const tempUser = new User;
            tempUser.username = profile.displayName,
            tempUser.email=profile.emails[0].value,
            tempUser.password = crypto.randomBytes(20).toString("hex");
            await tempUser.save();
            // req.flash("success","Signed-In Successfully.");
            return done(null,tempUser);
        }

    } catch (error) {
        console.log("error in facebook strategy-passport",error);
        return;
    }
    
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){
            console.log("error in finding user passport",err);
        }
        return done(null,user);
    });
});

module.exports = passport;

