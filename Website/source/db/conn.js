const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/UserData",{
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useCreateIndex:true
}).then(()=>{
    console.log("Connection Successful");
}).catch((error)=>{
    console.log(error);
})