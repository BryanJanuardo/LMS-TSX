var express = require('express');
var router = express.Router();

const Session = require('../models/session');
const SessionLearning = require('../models/sessionlearning');
const CourseLearning = require('../models/courselearning');

router.get('/:courseID/sessions/', async(req, res) => {
  try{
    const courselearning = await CourseLearning.findById(req.params.courseID).populate('SessionLearningID');
    const sessions = await courselearning.SessionLearningID;
    res.json(sessions);
  } catch (error){
    res.status(500).json({ message: 'Failed fetch sessions '});
  }
});

router.post('/:courseID/session/create', async(req, res) => {
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

    const courselearning = await CourseLearning.findById(req.params.courseID);
    courselearning.SessionLearningID.push(sessionlearning._id);
    await courselearning.save();

    console.log(courselearning);

    res.status(200).json({ message: 'Success create a new session'});
  } catch (error){
    res.status(500).json({ message: 'Failed create a new session'});
    console.log(error);
  }
})



router.get('/:id', async(req, res) => {
  try{
    console.log(req.params.id);
    const sessions = await Session.findById(req.params.id);
    res.json(sessions);
  } catch (error){
    res.status(500).json({ message: 'Failed fetch sessions '});
  }
});

router.post('/create', async(req, res) => {
  try{
    const sessions = await Session.create(req.body);
    res.status(201).json(sessions);
  } catch (error){
    res.status(500).json({ message: 'Failed fetch sessions '});
  }
});

router.put('/update/:id', async(req, res) => {
  try{
    const sessions = await Session.findByIdAndUpdate(req.params.id, req.body,{new: true});
    if(!sessions){
      return res.status(404).json({ message: 'Session not found' });
    }
    res.status(200).json(sessions);
  } catch (error){
    res.status(500).json({ message: 'Failed fetch sessions '});
  }
});
router.delete('/delete/:id', async(req, res) => {
  try{
    const sessions = await Session.findByIdAndDelete(req.params.id);
    if(!sessions){
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json(sessions);
  } catch (error){
    res.status(500).json({ message: 'Failed fetch sessions '});
  }
});

module.exports = router;

