const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {type: String, required: true, maxLength: 100, default: "New Task"},
    description: {type: String, required: true, default: "Describe your task..."},
    // can potentially link status to TaskList. Might need to try this.
    status: {type: String},
    // order can also be used to reference the relevant TaskList the Task belongs to. 
    order: {type: Number}
});


module.exports = mongoose.model("Task", taskSchema); 


