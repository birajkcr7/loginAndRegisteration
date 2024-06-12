const mongoose =require("mongoose");

mongoose.connect("mongodb://localhost:27017/ytRegistration",{}).then(()=>{
    console.log("connected to db");
}).catch((e)=>{
    console.log("not connected to db");
})