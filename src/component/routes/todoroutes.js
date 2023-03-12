const express = require("express")
const bodyparser = require("body-parser")
const TodoData = require("../models/todoModels")
const todo_routes = express.Router()
todo_routes.use(bodyparser.json())

todo_routes.post("/todopost", async (req, res) => {
    try {
        const todo = await TodoData.create({
            activity: req.body.activity,
            Status: req.body.Status,
            time_taken: req.body.time_taken,
            user: req.user
        })
        res.status(200).json({
            status: "success",
            todo
        })

    } catch (e) {
        res.status(400).json({
            status: 'Failed',
            message: e.message
        })
    }
})

todo_routes.get("/todopost", async (req, res) => {
    try {
        const todo = await TodoData.find({ user: req.user })
        res.status(200).json({
            status: "ok",
            todo
        })
    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })

    }

})

todo_routes.put('/todopost/:id', async (req, res) => {
    try {
       const update = await TodoData.updateOne({ _id: req.params.id}, { $set: { time_taken: req.body.time_taken, Status:req.body.Status } })
        console.log(update);
       res.status(200).json({
            status: "success",
            update
        })
    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })

    }
})
module.exports = todo_routes