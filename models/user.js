const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        trim:true,
        maxlength:12,
        unique:true
    },

    password:{
        type: String,
        required: true,
        minLength: 6        
    },

    firstName:{
        type:String,
        required:true,        
    },

    lastName:{
        type:String,
        required:true,        
    }
})

module.exports = mongoose.model("User",userSchema);
