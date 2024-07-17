const express = require("express")
const app = express()
require("dotenv").config()
const path = require("path")
require("./config/mongoose-connection")
const indexRouter = require("./routes/index-router")
const hisabRouter = require("./routes/hisab-router")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash())
app.use(cookieParser())



app.use("/",indexRouter)
app.use("/hisab",hisabRouter)


app.listen(process.env.PORT)