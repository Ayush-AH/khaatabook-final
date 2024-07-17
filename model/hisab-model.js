const mongoose = require("mongoose")

let hisabSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    encrypted:{
        type:Boolean,
        default:false
    },
    passcode:{
        type:String,
    },
    shareable:{
        type:Boolean,
        default:false
    },
    editable:{
        type:Boolean,
        default:false
    },
})

module.exports = mongoose.model("hisab",hisabSchema)