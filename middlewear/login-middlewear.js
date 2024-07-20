const jwt = require("jsonwebtoken")

module.exports.isLoggedIn = function (req, res, next) {
    if (!req.cookies.token) return res.send("you must login!!")
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, function (err, decoded) {
        req.user = decoded
        next()
    })
}

module.exports.passcodeCheck = function(req,res,next){
    if(req.session.hisabid === req.params.id) return next()
    res.redirect(`/hisab/view/${req.params.id}`)    
}