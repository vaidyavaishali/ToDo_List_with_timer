const express = require("express")
const bodyparser = require("body-parser")
const Users = require("../models/userModels")
const bcrypt = require("bcrypt")
const register = express.Router()
register.use(bodyparser.json())

register.post("/register", async (req, res) => {
    try {
        const existing = await Users.findOne({email:req.body.email})
        // console.log(req.body)
        if (existing) {
            res.status(403).json({
                status: "Failed",
                result: "User Already Exist"
            })
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (!err) {
                    try{
                        const user = await Users.create({
                            email: req.body.email,
                            password: hash
                        })
                        res.status(200).json({
                            status: "Success",
                            result: user
                        })
                    }catch(e){
                        res.status(400).json({
                            status: 'Failed',
                            message: e.message
                        })
                    }
                    
                }
            })
        }
    } catch (e) {
        res.status(400).json({
            status: 'Failed',
            message: e.message
        })
    }

})
module.exports = register