const mongoose =require("mongoose");

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