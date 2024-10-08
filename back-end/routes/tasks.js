var express = require('express');
var router = express.Router();

const Task = require('../models/task');

// get all
router.get('/', async(req, res) => {
  try{
    const tasks = await Task.find();
    res.json(tasks); 
  } catch (error){
    res.status(500).json({ error: 'Failed fetch Tasks '});
  }
});

// create
router.post('/create', async(req, res) => {
    try{
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (error){
        res.status(500).json({ message: 'Error creating Tasks', error });
    }
});

// update
router.put('/update/:id', async(req, res) => {
    try{
        const currTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!currTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
    } catch (error){
        res.status(500).json({ message: 'Error updating Tasks', error });
    }
});

router.delete('/delete/:id', async(req, res) => {
    try{
        const currTask = await Task.findByIdAndDelete(req.params.id);
        if (!currTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(currTask);
    } catch (error){
        res.status(500).json({ message: 'Error deleting book', error });
    }
});

module.exports = router;
