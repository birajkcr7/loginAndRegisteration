const express = require('express');
require("./db/conn");
const bcrypt =require("bcryptjs");
const Register = require("./models/registers");

const path = require("path");
const hbs= require("hbs");

const app = express();
const port = process.env.PORT || 8000;

const staticPath = path.join(__dirname, "../public");
const tempPath =path.join(__dirname,"../templates/views");
const partialsPath =path.join(__dirname,"../templates/partials");

// to get the data from the page we should do this
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", tempPath);
hbs.registerPartials(partialsPath);


app.get("/", (req,res)=>{
    res.render("index",{
        // login : "login",
        // register : "Sign up"
    });
})

app.get("/login", (req,res)=>{
    res.render("login",{
        // login : `${req.body.firstname}`,
    });
})

app.get("/register", (req,res)=>{
    res.render("register");
})


// create a new user
app.post("/register",  async (req,res)=>{
    try {
       const password = req.body.password;
       const cpassword = req.body.confirmpassword;

       if(password===cpassword){

        const registerEmp = new Register({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            gender : req.body.gender,
            phone  : req.body.phone,
            age : req.body.age,
            password : req.body.password,
            confirmpassword : req.body.confirmpassword,
        });

        const token = await registerEmp.generateAuthToken();

        const registered = registerEmp.save();
        res.status(201).render("index");


       }else{
        res.send("password not matched");
       }

    } catch (error) {
        res.status(400).send(error);
    }
})

// LOGIN validation

app.post("/login", async(req,res)=>{
    try {
        
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Register.findOne({email : email });
        const isMatch = await bcrypt.compare(password,userEmail.password);

        const token = await userEmail.generateAuthToken();

        
        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("password not matching");
        }

    } catch (error) {
        res.status(400).send("invalid")
    }
    
})


// const bcrypt = require("bcryptjs");

// const securePassword = async(password)=>{

//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);

//     const passwordMatch = await bcrypt.compare(password, passwordHash);
//     console.log(passwordMatch);
// }

// securePassword("biraj123")


// const jwt = require("jsonwebtoken");


// const createToken = async()=>{

//      const token = await jwt.sign({_id:"666c247ebb2636f93d44a5c9"}, "mynameisbirajkcr7andiamronaldofan");
//      console.log(token);

//      const userVer = await jwt.verify(token,"mynameisbirajkcr7andiamronaldofan");
//      console.log(userVer)
// }


// createToken();



app.listen(port, ()=>{
    console.log(`connected to port ${port}`);
});