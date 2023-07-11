// Import Task model
const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async-wrapper");
const { createCustomError } = require("../errors/custom-errors");

// Get all tasks handler
const getAllTasks = asyncWrapper(async (req, res) => {
  // If you don't use "await" keyword for returning this promise, this error will appear in the CLI: TypeError: Converting circular structure to JSON\n    --> starting at object with constructor 'NativeTopology'\n    |     property 's' -> object with constructor 'Object'\n    |     property 'sessionPool' -> object with constructor 'ServerSessionPool'\n    --- property 'topology' closes the circle"
  const tasks = await Task.find({});

  // if no tasks, return message notifying user.
  if (tasks.length === 0) {
    return res.status(404).json({
      success: true,
      message: "No tasks found! Please create a task.",
      tasks,
    });
  }
  return res
    .status(200)
    .json({ success: true, message: "Get all tasks", tasks });
});

// Create a task handler
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  // Task.create({ name: 'first task' }) // Can also manually add the document data but it makes more sense to grab the data from the request body.

  return res
    .status(201)
    .json({ success: true, message: "A new task has been created!", task });
});

// Get a single task
const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  // When invoking the findOne method looking for a specific "_id", if it is not a string of 24 hex characters, it will generate this error - Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters.
  // It will throw an error if you pass in an id of 23 characters or less and/or 25 characters or more. Has to be 24 characters.
  const task = await Task.findOne({ _id: taskID });
  // The "_id" value passed in has to be an incorrect ID consisting of exactly 24 characters to fire off this if statement.
  if (!task) {
    return next(createCustomError(`No task with id of ${taskID}`, 404));
  }
  return res.status(200).json({
    success: true,
    message: `Get Single task with id of ${req.params.id}`,
    task,
  });
  // If the "_id" value we pass in is 23 characters or less and/or 25 characters or more, it will result in a CastError. This means that the ID passed in does not have the correct amount of characters which is a string of 24 characters. Then, this catch block will execute in regard to this CastError.
});

// Delete a Task
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  console.log("task:", task);
  if (!task) {
    return next(createCustomError(`No task with id of ${taskID}`, 404));
  }
  return res.status(200).json({
    success: true,
    message: `Task with id of ${taskID} has been deleted!`,
    task,
  });
});

// Update a task
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id of ${taskID}`, 404));
  }
  return res.status(201).json({
    success: true,
    message: `A task with an id of ${taskID} has been updated!`,
    data: task,
  });
});

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
