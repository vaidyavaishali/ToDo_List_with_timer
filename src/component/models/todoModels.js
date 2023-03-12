const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
     activity: { type: String, required: true },
     time_taken: { type: String },
     Status: { type: String, default:"pending" },
     user: { type: String, ref: "user" }
})
const todomodel = mongoose.model("todo", TodoSchema)

module.exports = todomodel