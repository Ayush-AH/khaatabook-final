const userModel = require("../model/user-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


module.exports.registerController = async function (req, res) {
   try{
    let { username, email, password } = req.body
    if (!username || !email || !password) return res.send("please fill all the fields")

    let user = await userModel.findOne({ username })
    if (user) return res.send("you already have account please loggin")

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let createdUser = await userModel.create({
                username,
                email,
                password: hash
            })
            let token = jwt.sign({ email, _id: createdUser._id }, process.env.JWT_SECRET)
            res.cookie("token", token)
            res.redirect("/profile")
        })
    })
   }
   catch(err){
    console.log(err.message);
   }


}

module.exports.loginController = async function (req, res) {
   try{
    let {email,password} = req.body
    if (!email || !password) return res.send("please fill all the fields")
     
    let user = await userModel.findOne({email})
    if(!user) return res.send("email or password is incorrect") 
    
    bcrypt.compare(password,user.password,function(err,result){
        if(!result) return res.send("email or password is incorrect")
        let token = jwt.sign({email,_id:user._id},process.env.JWT_SECRET) 
        res.cookie("token",token)
        res.redirect("/profile")
    })    
   }
   catch(err){
    console.log(err.message);
   }
}

module.exports.logoutController = function(req,res){
    req.cookies.token = ""
    res.redirect("/")
}
