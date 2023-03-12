const express = require("express")
const bodyparser = require("body-parser")
const Users = require("../models/userModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const login = express.Router()
const Auth = "AUTH"
login.use(bodyparser.json())

login.post("/login", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) {
            res.status(403).json({
                status: "success",
                message: "User Does not exist"
            })
        } else {
            let result = bcrypt.compare(req.body.password, user.password)
            if (result) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user.email
                }, "Auth");
                res.status(200).json({
                    status: "ok",
                    token
                })
            } else {
                res.status(404).json({
                    status: "Failed",
                    message: "Password doesn't match"
                })
            }
        }
    } catch (e) {
        res.status(400).json({
            status: 'Failed',
            message: e.message
        })
    }
})
module.exports = login