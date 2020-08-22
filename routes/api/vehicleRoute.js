const express = require("express");
const router= express.Router();
const Vehicle= require("./../../models/Vehicle_parking")
const Space= require("./../../models/parking_space")
const Zone= require("./../../models/parking_zone")
const passport= require("passport")
const auth= require("./../../middleware/auth");
const Vehicle_parking = require("./../../models/Vehicle_parking");

//@route /vehicle/init
//@desc init parking
router.post("/init",auth,async (req,res)=>{
    try{
        await Vehicle.deleteMany({})
       await Zone.deleteMany({})
         await Space.deleteMany({})
        let zoneArr=['A','B','C'];
        zoneArr.map(async zone=>{
           const newZone= new Zone({
               title:zone
           });
         const zoneCreated=  await newZone.save()
         for(let i=1;i<=10;i++){
             const newSpace= new Space({
                 title:zone.concat(i),
                 zone_id:zoneCreated._id
             })
             await newSpace.save()
            }
        })
        return res.json("Initialized successfully")
    }
    catch(err){
        console.log(err)
        return res.status(500).json({errors:[err,{msg:"Not initialized"}]})
       
    }
} )


//@route /vehicle/book
//@desc book a vehicle
router.put("/book",auth,async (req,res)=>{
    try{
        const {space,reg_no} = req.body;
        
        const rSpace=await Space.findOne({title:space})
        if(!rSpace){
           return res.status(404).json("Incorrect space")
        }
        const vehicles = await Vehicle_parking.find({space_id:rSpace.id})
    //console.log("space",vehicles)
        
        if(vehicles.length!==0){
           const isNotReleased= vehicles.some(veh=>veh.release===null)
           if(isNotReleased)
          return res.status(403).json({errors:[{msg:"Parking already booked"}]})  
        }
        const newBooking= new Vehicle_parking({
            reg_no: reg_no,
            zone_id:rSpace.zone_id,
            space_id:rSpace.id,
        })
     const result=  await newBooking.save();
     const upSpace= await Space.updateOne({_id:rSpace.id},{vehicle:result.id})
     const spaceRes =await Space.findOne({vehicle:result.id}).populate('vehicle');
return res.json(spaceRes)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({errors:[err,{msg:"Parking not booked"}]})   
    }
} )


//@route /vehicle/release
//@desc release a vehicle
router.put("/release",auth, async (req,res)=>{
try{
const {id}=req.body;
const vehicle = await Vehicle_parking.findById(id);
if(!vehicle){
    return res.status(404).json("Incorrect space")
}
if(vehicle.release){
    return res.status(403).json({errors:[{msg:"Parking already released"}]}) 
}
const upVehicle = await Vehicle_parking.updateOne({_id:id},{release:Date.now()});
const upSpace = await Space.updateOne({_id:vehicle.space_id},{vehicle:null});
const spaceRes =await Space.findOne({_id:vehicle.space_id}).populate('vehicle');
return res.json(spaceRes)
}
catch(err){
    console.log(err)
    return res.status(500).json({errors:[err,{msg:"Parking not released"}]})   
}
})
//@route /vehicle/space
//@desc get all parking spaces and its vehicle details
router.get("/space",async (req,res)=>{
    try{
    const space =await Space.find({release:null}).populate('vehicle');
    return res.json(space);
}
catch(err){
    console.log(err)
    return res.status(500).json({errors:[err,{msg:"Unable to get spaces"}]})
}
})


//@route /vehicle/report
//@desc get report for vehicles
router.get("/report", async (req, res) => {
    try {
        const space = await Space.find({ release: null }).populate('vehicle');
        return res.json(space);
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ errors: [err, { msg: "Unable to fetch report" }] })
    }
})


module.exports=router