const express = require('express');
require("./db/conn");
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
    res.render("index");
})

app.get("/login", (req,res)=>{
    res.render("login");
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

        const registered = registerEmp.save();
        res.status(201).render("index");


       }else{
        res.send("password not matched");
       }

    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port, ()=>{
    console.log(`connected to port ${port}`);
});