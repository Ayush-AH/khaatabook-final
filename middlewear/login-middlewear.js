const jwt = require("jsonwebtoken")

module.exports.isLoggedIn = function (req, res, next) {
    if (!req.cookies.token) return res.send("you must login!!")
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, function (err, decoded) {
        req.user = decoded
        next()
    })
}