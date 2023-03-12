const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const jwt = require("jsonwebtoken")
const Auth = "AUTH"
mongoose.set('strictQuery', false);
const register = require("./src/component/routes/registerRoutes")
const login = require("./src/component/routes/loginroutes")
const todoRoutes = require("./src/component/routes/todoroutes")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const app = express()
app.use(cors())
const port = process.env.PORT
app.use(express.json())
app.use(bodyparser.json())
mongoose.connect(process.env.DATABASE_URL, () => {
    console.log("conncted to db")
})

app.use("/todopost", (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (token) {
            const decoded = jwt.verify(token, "Auth")
            req.user = decoded.data,
                next()
        }
        else {
            res.json({
                status: "Failed",
                result: "Token is Missing"
            })
        }
    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })

    }
})
app.use('/', register)
app.use("/", login)
app.use("/", todoRoutes)

app.listen(port, () => {
    console.log(`Server Running port ${port}`)
})