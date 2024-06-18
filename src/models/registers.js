const mongoose =require("mongoose");
const validator = require("validator");
const bcrypt =require('bcryptjs');
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema({
    firstname : {
        type: String,
        require : true
    },
    lastname : {
        type: String,
        require : true
    },
    email : {
        type: String,
        require : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("invalid Email");
            }
        } 
        
    },
    gender : {
        type: String,
        require: true
    },
    phone : {
        type: Number,
        require : true,
        unique : true
    },
    password : {
        type: String,
        require : true,
    },
    confirmpassword : {
        type: String,
        require : true,
    },
    tokens: [{
        token: {
            type: String,
            require : true,
        }
    }]
});


// adding the token in register
employeeSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id: this._id.toString()}, "mynameisbirajkcandiamgoingtoamerica");
        this.tokens= this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log("error in registering");
    }
}



// hasing the password  
employeeSchema.pre("save",async function(next) {

    if(this.isModified("password")){

        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.password, 10);

    }
    next();
} )


//  creating the collection

const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;