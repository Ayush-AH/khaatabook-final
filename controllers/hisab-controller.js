const hisabModel = require("../model/hisab-model")

module.exports.createHisabController = async function(req,res){
    let {title,content,encrypted,passcode,shareable,editable} = req.body
    if(!title || !content ) return res.send("empty field!!")
     encrypted = encrypted === "on"? true:false   
     shareable = shareable === "on"? true:false   
     editable = editable === "on"? true:false   
     if (encrypted && !passcode){
        return res.send("passcode required!!")
     }
     let hisab = await hisabModel.create({
        title,
        content,
        user:req.user._id,
        encrypted,
        passcode,
        shareable,
        editable
     })
     res.redirect("/profile")
}