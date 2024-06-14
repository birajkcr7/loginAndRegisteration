const mongoose =require("mongoose");
const validator = require("validator");
const bcrypt =require('bcryptjs');

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
});


employeeSchema.pre("save",async function(next) {

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);

        this.confirmpassword = undefined;
    }
    next();
} )


//  creating the collection

const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;