const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true,
    },
    balance:{
        type:Number,
        required:true
    }
})

const account = mongoose.model("account", balanceSchema);

module.exports = account;