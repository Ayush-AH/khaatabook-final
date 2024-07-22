const express = require("express")
const router = express.Router()
const { createHisabController,
    viewHisabController,
    hisabVerifyController,
    verifiedHisabController,
    deleteHisabController,
    editHisabController,
    updateHisabController
} = require("../controllers/hisab-controller")
const { isLoggedIn, passcodeCheck } = require("../middlewear/login-middlewear")


router.get("/create", function (req, res) {
    res.render("create",{error:req.flash("error")})
})
router.post("/createhisab", isLoggedIn, createHisabController)
router.get("/view/:id", viewHisabController)
router.post("/:id/verify", hisabVerifyController)
router.get("/:id", passcodeCheck, verifiedHisabController)
router.get("/delete/:id", isLoggedIn, deleteHisabController)
router.get("/edit/:id", editHisabController)
router.post("/update/:id", updateHisabController)

module.exports = router