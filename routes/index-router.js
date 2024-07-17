const express = require("express")
const router = express.Router()
const {registerController , loginController,logoutController} = require("../controllers/index-controller")
const {isLoggedIn} = require("../middlewear/login-middlewear")


router.get("/",function(req,res){
    res.render("login",{login:false})
})
router.get("/register",function(req,res){
    res.render("register",{login:false})
})
router.get("/profile",isLoggedIn,function(req,res){
    res.render("profile")
})

router.post("/register",registerController)
router.post("/login",loginController)
router.get("/logout",logoutController)



module.exports = router