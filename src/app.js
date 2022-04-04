const express = require("express");
const path = require("path")
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn");
const hbs = require("hbs");
const Register= require("./models/registers");

// for getting data through reg page
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//defining path of static files for html

// app.use(express.static(path.join(__dirname,"../public")));

//using hbs extension 
app.set("view engine","hbs");
app.set("views",path.join(__dirname,"../templates/views"));//views folder path
hbs.registerPartials(path.join(__dirname,"../templates/partials"));//register partials path

// console.log(path.join(__dirname,"../public"));
app.get("/",(req,res)=>{
    res.render("index.hbs");
});

//register page
app.get("/register",(req,res)=>{
    res.render("register.hbs");
})
// register post request or to create a user in db

app.post("/register", async(req,res)=>{

    try {
        
       const std_user = new Register({
           username:req.body.username,
           email:req.body.email,
           password:req.body.password
       })

// **create token
console.log("the success part" + std_user);
const token = await std_user.generateAuthToken();
console.log("the token part" + token);




      const sub_std = await std_user.save();
    //   console.log("the page part" + sub_std );
      
      res.status(201).send("data saved");
    //   res.status(201).render("index");


    } catch (error) {
         
        res.status(400).send(error);
    }

})


//login form
app.get("/login",(req,res)=>{
    res.render("login.hbs");
})
//login 
app.post("/login",async(req,res)=>{
    try {
        
            const email = req.body.email;
            const password = req.body.password;
            const useremail= await Register.findOne({email:email});
           
            // const token = await std_user.generateAuthToken();
            // console.log("the token part" + token);
            
           
            if(useremail.password===password){
                res.status(201).send("welcome "+useremail.username);
            

               
            }else{
                res.send("invalid email and password");
            }



    } catch (error) {
        
        res.status(400).send("invalid email or password");
    }
})

// *****
// const jwt = require("jsonwebtoken");

// const createToken = async() =>{
//     const token = await jwt.sign({_id:"6234d5f3a201811c47e229f8"}, "mynameiskomalkanaujiyaitengineer");
//     console.log(token);
//     const userVer = await jwt.verify(token,"mynameiskomalkanaujiyaitengineer");
//     console.log(userVer);
// }

// createToken();

// ****

app.listen(port,()=>{
    console.log("port is running at  "+`${port}`);
});