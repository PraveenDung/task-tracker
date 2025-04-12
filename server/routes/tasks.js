const express = require('express');
const Task = require('../models/Task')
const router = express.Router();

//Create a new task
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;

        //Create a new a Task
        const newTask = new Task({
            title,
            description
        });

        await newTask.save();   //Save the task to the database
        res.status(201).json(newTask);  //Return the created task in the response
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get all tasks
router.get('/', async (req, res) => {
    try {
      const tasks = await Task.find(); // Fetch all tasks from the database
      res.json(tasks); // Return tasks as a response
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Get a single task by ID
router.get('/:id', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id); // Find task by ID
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task); // Return the found task
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Update a task
router.put('/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Return the updated task
      );
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task); // Return the updated task
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Delete a task
router.delete('/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id); // Find and delete the task
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted' }); // Return success message
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;