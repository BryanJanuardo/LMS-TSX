var express = require('express');
var router = express.Router();

const SessionLearning = require('../models/sessionlearning');
const Session = require('../models/session');
const Material = require('../models/material');
const Task = require('../models/task');
const CourseLearning = require('../models/courselearning');
const course = require('../models/course');

router.get('/:courselearningID/sessions', async(req, res) => {
  try{
    const courselearningID = req.params.courselearningID;
    const courselearning = await CourseLearning.findById(courselearningID)
    .populate({
      path: 'SessionLearningID',
      populate: [
        { path: 'SessionID', model: 'Session' },
        { path: 'MaterialID', model: 'Material' },
        { path: 'TaskID', model: 'Task' }
      ]
    });
    const sessionlearning = await courselearning.SessionLearningID; 
    res.json(sessionlearning);
  } catch (error){
    console.log(error);
    res.status(500).json({ error: 'Failed fetch SessionLearning '});
  }
});

router.post('/:courselearningID/sessions/create', async(req, res) => {
  try{
    const lastSession = await Session.findOne({}, {}, { sort: { _id: -1 } });
    const newSessionId = lastSession ? lastSession._id + 1 : 1;

    const session = await Session.create({
      _id: newSessionId,
      SessionName: req.body.SessionName,
      SessionDescription: req.body.SessionDescription,
      SessionStart: req.body.SessionStart,
      SessionEnd: req.body.SessionEnd
    });

    const lastSessionLearning = await SessionLearning.findOne({}, {}, { sort: { _id: -1 } });
    const newSessionLearningId = lastSessionLearning ? lastSessionLearning._id + 1 : 1;

    const sessionlearning = await SessionLearning.create({
      _id: newSessionLearningId,
      SessionID: session._id,
      MaterialID: [],
      TaskID: []
    });

    const courselearning = await CourseLearning.findById(req.params.courselearningID);
    courselearning.SessionLearningID.push(sessionlearning._id);
    await courselearning.save();

    res.status(200).json({ message: 'Success create a new session'});
  } catch (error){
    res.status(500).json({ message: 'Failed create a new session'});
    console.log(error);
  }
})

router.put('/:courselearningID/sessions/:sessionlearningID/update', async(req, res) => {
  const sessionlearning = await SessionLearning.findById(req.params.sessionlearningID)
  .populate('SessionID');
  try{
    if (!sessionlearning) {
      throw new Error('Sessionlearning not found');
    }else{
      sessionlearning.SessionID.SessionName = req.body.SessionName;
      sessionlearning.SessionID.SessionDescription = req.body.SessionDescription;
      sessionlearning.SessionID.SessionStart = req.body.SessionStart;
      sessionlearning.SessionID.SessionEnd = req.body.SessionEnd;
      console.log(sessionlearning);
      await sessionlearning.SessionID.save();
      res.status(200).json({ message: 'Success update sessionlearning' });
    }
  } catch (error){
    res.status(500).json({ message: 'Failed update sessionlearning '});
    console.log(error);
  }
});

router.delete('/:courselearningID/sessions/:sessionlearningID/delete', async(req, res) => {
  const sessionlearning = await SessionLearning.findById(req.params.sessionlearningID);
  try{
    if (!sessionlearning) {
      throw new Error('Sessionlearning not found');
    }else{
      await sessionlearning.deleteOne();
      res.status(200).json({ message: 'Success Delete sessionlearning' });
    }
  } catch (error){
    res.status(500).json({ message: 'Failed Delete sessionlearning '});
    console.log(error);
  }
});


router.get('/:id', async(req, res) => {
  try{
    const Session = await SessionLearning.findById(req.params.id)
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
