const express = require("express");
const router= express.Router();
const User= require("./../../models/User")
const passport= require("passport")

//@route /auth/register
//@desc register a User
router.post("/register",async (req,res)=>{
    try{
    //Search if user alreay exists
    let {name,email,password,type}= req.body;
    let user= await User.findOne({email});
    if(user){
      return res.status(400).json({errors:[{msg:"user already exists"}]});
    }
    else{
    //save user
     const newUser= new User(
      {
        name: name,
        email: email,
        password: password,
        type:type
      })
      await newUser.save();
      return res.json(newUser);
    }
}
catch(err){
    console.error(err.message);
    res.status(500).json({errors:[err,{msg:"server error,Registration denied"}]})
  }
})

//@route /auth/login
//@desc login a User
router.post("/login", passport.authenticate('local'),(req,res)=>{ 
    return res.json(req.user)
})

//@route /auth/api/get_user
//@desc check if user is authenticated
router.get("/api/get_user",(req,res)=>{
        if(!req.user)
        //if(!req.isAuthenticated)
        return res.status(401).json({errors:[{msg:"Not logged in, Please login first!"}]})
        res.json(req.user)
      })

module.exports=router