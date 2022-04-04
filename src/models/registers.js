const async = require("hbs/lib/async");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const { create } = require("hbs");


const employeeSchemea = new mongoose.Schema({

        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            unique:true
        },

        tokens:[{
                token:{
                    type:String,
                    required:true
                    // unique:true
                }
            }]

})


// generating tokens

employeeSchemea.methods.generateAuthToken = async function(){
 try {
     console.log(this._id);
    const token1 = jwt.sign({_id:this._id.toString()},"mynameiskomalkanaujiyaitengineer");
    this.tokens = this.tokens.concat({token:token1})
    await this.save();
    console.log(token);
    return token1;
 } catch (error) {
     res.send("the error part" + error);
     console.log("the error part" + error);

 }


}




// now we need to create collection and pass it or export it
const Register = new mongoose.model("Register",employeeSchemea);

module.exports = Register;