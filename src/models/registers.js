const mongoose =require("mongoose");
const validator = require("validator");

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
            if(validator.isEmail(value)){
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
});


//  creating the collection

const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;