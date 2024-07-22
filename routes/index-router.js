const express = require("express")
const router = express.Router()
const userModel = require("../model/user-model")
const { registerController, loginController, logoutController } = require("../controllers/index-controller")
const { isLoggedIn } = require("../middlewear/login-middlewear")


router.get("/", function (req, res) {
    res.render("login", { login: false ,error:req.flash("error")})
})
router.get("/register", function (req, res) {
    res.render("register", { login: false,error:req.flash("error")})
})
router.get("/profile", isLoggedIn, async function (req, res) {
   try{
    let {startDate, endDate, byDate} = req.query
    startDate = startDate ? startDate : new Date("2000-01-01")
    endDate = endDate ? endDate : new Date()
    byDate = byDate ? Number(byDate): -1
    let user = await userModel.findOne({ email: req.user.email }).populate({
        path: "hisabs",
        match:{createdAt:{$gte:startDate , $lte:endDate}},
        option:{sort:{createdAt:byDate}}
    })
    res.render("profile", { user })
   }
   catch(err){
    res.send(err._message)
   }
})

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/logout", logoutController)



module.exports = router