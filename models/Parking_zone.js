const mongoose = require("mongoose")
const zoneSchema= new mongoose.Schema({
   title:{
       type:String,
       required:true,
       unique:true
   }
})

module.exports= Zone= mongoose.model("parking_zone",zoneSchema)