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
        req.flash("success","Signed-In Successfully.");
        return done(null,user);
    }
    else{
        req.flash("error", "Invalid Username/Password.");
        return done(null,false);
    }
   }
   else{
        req.flash("error", "Invalid Username/Password.");
       return done(null,false);
   }
}
));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){
            console.log("error in find user passport",err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("signin");
};
passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
      //req.user contains the current signed in user and we are just sending it to the locals for the views
      res.locals.user = req.user;
    }
    next();
  };
module.exports = passport;
passport.checkNotAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
}