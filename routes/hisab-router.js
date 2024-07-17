const express = require("express")
const router = express.Router()
const {createHisabController} = require("../controllers/hisab-controller")
const {isLoggedIn} = require("../middlewear/login-middlewear")


router.get("/create",function(req,res){
    res.render("create")
})
router.post("/createhisab",isLoggedIn, createHisabController)

module.exports = router