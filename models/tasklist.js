const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskListSchema = new Schema({
    type: {type: String},
    // reference the Task model -> will come in handy when implementing drag-and-drop
    tasks: [{type: Schema.Types.ObjectId, ref: "Task"}]
});

const TaskList = mongoose.model('TaskList', TaskListSchema);

module.exports = TaskList; 