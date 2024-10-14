var express = require('express');
var router = express.Router();

const SessionLearning = require('../models/sessionlearning');
const Session = require('../models/session');
const Material = require('../models/material');
const Task = require('../models/task');
// get all
router.get('/', async(req, res) => {
  try{
    const Session = await SessionLearning.find()
    .populate('SessionID')
    .populate('MaterialID')
    .populate('TaskID');
    res.json(Session);
  } catch (error){
    res.status(500).json({ error: 'Failed fetch SessionLearning '});
  }
});

// create
router.post('/create', async(req, res) => {
    try{
        const newSession = await SessionLearning.create(req.body);
        res.status(201).json(newSession);
    } catch (error){
        res.status(500).json({ message: 'Error creating SessionLearning', error });
    }
});

// update
router.put('/update/:id', async(req, res) => {
    try{
        const currSession = await SessionLearning.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!currSession) {
            return res.status(404).json({ message: 'SessionLearning not found' });
        }
        return res.status(200).json(currSession);
    } catch (error){
        res.status(500).json({ message: 'Error updating SessionLearning', error });
    }
});

router.delete('/delete/:id', async(req, res) => {
    try{
        const currSession = await SessionLearning.findByIdAndDelete(req.params.id);
        if (!currSession) {
            return res.status(404).json({ message: 'SessionLearning not found' });
        }
        res.status(200).json(currSession);
    } catch (error){
        res.status(500).json({ message: 'Error deleting book', error });
    }
});

module.exports = router;
