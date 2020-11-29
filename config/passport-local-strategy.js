const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
passport.use(new LocalStrategy({
    usernameField:"email",
    passReqToCallback:true,
},
async(req,email,password,done)=>{
   const user = await User.findOne({email:email});
   if(user){
    const match = await bcrypt.compare(password,user.password);
    if(match){
        console.log("login successfull");
        return done(null,user);
    }
   }
   else{
       console.log("Wrong Credentials!!");
       return done(null,false);
   }
}
));