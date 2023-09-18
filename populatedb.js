const mongoose = require("mongoose");

const Task = require("./models/task")
const TaskList = require("./models/tasklist")

mongoose.set("strictQuery", false);

const mongoDB = "mongodb+srv://Hasnain:KedZek7SLRSfMWKg@cluster0.qgxm3ff.mongodb.net/tryllo?retryWrites=true&w=majority";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}

// const task = new Task({
//     status: "To-do",
//     order: 1
// })

// task.save().then(task => {
//     console.log(task)
// })
// .catch(e => {
//     console.log(e)
// })

// const taskList = new TaskList({
//     type: "To-do"
// })

// taskList.save().then(taskList => {
//     console.log(taskList)
// })
// .catch(e => {
//     console.log(e)
// })

// const makeList = async () => {
//     const list = await TaskList.findOne({ type: "To-do" })
//     const task = await Task.findOne({ status: "To-do" });
//     list.tasks.push(task);
//     await list.save();
//     console.log(list);

//     const check = await TaskList.findOne({ type: "To-do"}).populate('tasks').exec()

//     console.log('check', check)
// }

// makeList();

