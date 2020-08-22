const mongoose = require("mongoose")
const vehicleSchema= new mongoose.Schema({
    zone_id: {
        ref: "parking_zone",
        required:true,
        type: mongoose.Schema.Types.ObjectId
    },
    space_id: {
        ref: "parking_space",
        required:true,
        type: mongoose.Schema.Types.ObjectId
    },
    reg_no:{
        type:String,
        required:true
    },
    booking:{
        type:Date,
        required:true,
        default:Date.now()
    },
    release:{
        type:Date,
        default:null
    }
})

module.exports= Vehicle= mongoose.model("vehicle_parking",vehicleSchema)

