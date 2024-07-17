const mongoose = require("mongoose")

mongoose.connect(`${process.env.MONGODB_URL}`)
.then(function(){
    console.log("connected to db");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection