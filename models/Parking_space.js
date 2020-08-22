const mongoose = require("mongoose")
const spaceSchema= new mongoose.Schema({
   title:{
      type:String,
      required:true, 
      unique:true
   },
   zone_id:{
    ref: "parking_zone",
    type: mongoose.Schema.Types.ObjectId
   },
   vehicle:{
      ref: "vehicle_parking",
      type: mongoose.Schema.Types.ObjectId,
      default:null  
   }
})

module.exports= Space= mongoose.model("parking_space",spaceSchema)