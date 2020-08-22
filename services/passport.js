const passport = require('passport')
const config= require('config')
const User= require("./../models/User");
const localStrategy=require("passport-local").Strategy;

passport.use(new localStrategy(
    {
    usernameField: 'email',
    passwordField: 'password'
   // passReqToCallback: true
},
    async (email,password,done)=>{
     try{
     const user= await User.findOne({ email });
       if (!user) {
              // console.log("Into incorrect user", user);
              return done(null, false, { message: 'Invalid username' });
            }
         if (password!=user.password) {
                // console.log("Into incorrect pass", user);
                return done(null, false, { message: "invalid password" })
              }
              else {
              //  console.log("Into login",user)
                return done(null, user)
              }
        }
        catch(err){
               console.log(err);
               done(err)
        }
      }));


passport.serializeUser((user,done)=>{
done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
const user=await User.findById(id);
done(null,user);
})