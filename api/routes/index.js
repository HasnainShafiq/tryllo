var express = require('express');
var router = express.Router();


const TaskList = require("../../models/tasklist");
const Task = require("../../models/task");


/* Homepage: Retrieve lists */
router.get('/api/board', async (req, res, next) => {
  // to get task data, need to populate the 'tasks' field.
  const taskLists = await TaskList.find().populate('tasks').then(lists => res.json(lists));

});

router.post('/api/board/tasklists/:id', async (req, res, next) => {
  const {id} = req.params;
  const task = req.body;

  console.log(task);
  const {title, desc} = task;

  console.log('task:', title)
  console.log('description', desc)

  const newTask = new Task({
    title: title,
    description: desc
  })

  await newTask.save()
  console.log(newTask);

  const taskList = await TaskList.findById(id);

  await taskList.tasks.push(newTask);
  await taskList.save();
  res.redirect('http://localhost:5173/')

  console.log('it worked')
  console.log('sent from:', id)
})


module.exports = router;
