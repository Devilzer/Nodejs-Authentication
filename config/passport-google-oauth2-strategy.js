const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const crypto = require("crypto");

const User = require("../models/user");

require("dotenv").config();

passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
,},async(accessToken, refreshToken, profile, done)=>{
    try {
        const user = await User.findOne({email:profile.emails[0].value});
    if(user){
        return done(null, user);
    }
    else{
        const tempUser = new User;
        tempUser.username = profile.displayName,
        tempUser.email = profile.emails[0].value,
        tempUser.password = crypto.randomBytes(20).toString("hex"),
        await tempUser.save();
        return done(null,tempUser);
    }
        
    } catch (error) {
        console.log("error in google strategy-passport", error);
          return;
    }
    
}
));
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