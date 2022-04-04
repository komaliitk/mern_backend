const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/student_registeration",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
}).then(()=>{
    console.log("connection succesfull to db");
}).catch((e)=>{
    console.log(e);
})