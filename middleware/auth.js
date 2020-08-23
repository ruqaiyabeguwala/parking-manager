
module.exports=(req,res,next)=>{
   // console.log("req",req.user)
    if(!req.user ){
        
        res.status(403).json({errors:[{msg:"Unauthorized"}]})
    }
    else{
        next();
    }
}   