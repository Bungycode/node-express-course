// Import Task model 
const Task = require('../models/Task')

// Get all tasks handler
const getAllTasks = (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Get all tasks", data: ''})
  } catch (error) {
    console.log(`${error}\nLocated at ${__filename}\n`)
    res.status(400).json({ success: false, message: `Something went wrong with your request! ${error}`})
  }
};

// Create a task handler
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    // Task.create({ name: 'first task' }) // Can also manually add the document data but it makes more sense to grab the data from the request body.

    res.status(201).json({ success: true, message: "A new task has been created!", data: { task } })
  } catch (error) {
    console.log(`${error}\nLocated at ${__filename}\n`)
    res.status(400).json({ success: false, message: `Something went wrong with your request! ${error}`})
  }
};

// Get a single task
const getSingleTask = (req, res) => {
  try {
    res.status(200).json({ success: true, message: `Get Single task with id of ${req.params.id}`, data: ''})
  } catch (error) {
    console.log(`${error}\nLocated at ${__filename}\n`)
    res.status(400).json({ success: false, message: `Something went wrong with your request! ${error}`})
  }
};

// Update a task
const updateTask = (req, res) => {
  try {
    res.status(201).json({ success: true, message: `A task with an id of ${req.params.id} has been updated!`, data: req.body})
  } catch (error) {
    console.log(`${error}\nLocated at ${__filename}\n`)
    res.status(400).json({ success: false, message: `Something went wrong with your request! ${error}`})
  }
};

// Delete a Task
const deleteTask = (req, res) => {
  try {
    res.status(200).json({ success: true, message: `A task with an id of ${req.params.id} has been deleted!`, data: ''})
  } catch (error) {
    console.log(`${error}\nLocated at ${__filename}\n`)
    res.status(400).json({ success: false, message: `Something went wrong with your request! ${error}`})
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
