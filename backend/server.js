const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;



// MIDDLEWARE

app.use(cors());

app.use(express.json());



// TEMP DATABASE

let tasks = [];



// GET ALL TASKS

app.get("/tasks", (req, res) => {

  res.json(tasks);

});



// ADD TASK

app.post("/tasks", (req, res) => {

  const newTask = {
    text: req.body.text,
    completed: false
  };

  tasks.push(newTask);

  res.json({
    message: "Task added",
    tasks
  });

});



// UPDATE TASK TEXT

app.put("/tasks/edit/:index", (req, res) => {

  const index = req.params.index;

  tasks[index].text = req.body.text;

  res.json({
    message: "Task updated",
    tasks
  });

});



// TOGGLE COMPLETE

app.put("/tasks/complete/:index", (req, res) => {

  const index = req.params.index;

  tasks[index].completed =
    !tasks[index].completed;

  res.json({
    message: "Task completed",
    tasks
  });

});



// DELETE TASK

app.delete("/tasks/:index", (req, res) => {

  const index = req.params.index;

  tasks.splice(index, 1);

  res.json({
    message: "Task deleted",
    tasks
  });

});



// START SERVER

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});