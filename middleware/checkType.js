
module.exports=(req,res,next)=>{
    // console.log("req",req.user)
      if(req.user.type==='P'){
         res.status(403).json({errors:[{msg:"Not authorized to update"}]})
     }
 
     else{
         next();
     }
 }   