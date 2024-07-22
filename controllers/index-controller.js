const userModel = require("../model/user-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


module.exports.registerController = async function (req, res) {
    try {
        let { username, email, password } = req.body
        if (!username || !email || !password) {
            req.flash("error", "please fill all the fields")
            return res.redirect("/register")
        }

        let user = await userModel.findOne({ username })
        if (user) {
            req.flash("error", "you already have account please loggin")
            return res.redirect("/register")
        }

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
    catch (err) {
        console.log(err.message);
    }


}

module.exports.loginController = async function (req, res) {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            req.flash("error", "please fill all the fields")
            return res.redirect("/")
        }

        let user = await userModel.findOne({ email })
        if (!user) {
            req.flash("error", "email or password is incorrect")
            return res.redirect("/")
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (!result) {
                req.flash("error", "email or password is incorrect")
                return res.redirect("/")
            }
            let token = jwt.sign({ email, _id: user._id }, process.env.JWT_SECRET)
            res.cookie("token", token)
            res.redirect("/profile")
        })
    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports.logoutController = function (req, res) {
    try {
        req.cookies.token = ""
        res.redirect("/")
    }
    catch (err) {
        res.send(err._message)
    }
}
