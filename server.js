const express= require("express");
const app= express();
const mongoose=require("mongoose");
const config= require("config")
const cookieSession= require("cookie-session");
const passport= require("passport")
const bodyParser= require("body-parser")

mongoose
.connect(config.get("mongoURI"),{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true,
    //useFindAndModify:false
})
.then(()=>console.log("mongoDB connected"))
.catch((err)=>console.log(err));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieSession({
    maxAge:60*60*1000,
    keys: [config.get("jwtSecret")]
}))
app.use(passport.initialize());
app.use(passport.session());
require("./services/passport");

//app.use("/student",require("./routes/api/student"))
app.use("/vehicle",require("./routes/api/vehicleRoute"))
app.use("/auth",require("./routes/api/userRoute"))

const PORT= process.env.PORT|| 5000;
let server= app.listen(PORT, () => console.log(`server running on port ${PORT}`));


module.exports = server;