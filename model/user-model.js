const mongoose = require("mongoose")

let userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    hisabs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hisab"
    }]
})

module.exports = mongoose.model("user",userSchema)