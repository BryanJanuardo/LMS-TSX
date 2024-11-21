var express = require('express');
var router = express.Router({ mergeParams: true });

const Session = require('../models/session');
const SessionLearning = require('../models/sessionlearning');
const CourseLearning = require('../models/courselearning');

// get all
router.get("/", async (req, res) => {
  let status = 500;
  const payload = { header: `Fetch All Materials`, message: ``, error: ``, data: null };

  try {
    const sessions = await Material.find();
    status = 200;
    payload.message = `Successfully fetched all sessions`;
    payload.data = sessions;
  } catch (error) {
    status = 500;
    payload.message = `Failed to fetch sessions`;
    payload.error = `Error fetching sessions`;
  }

  return res.status(status).json(payload);
});

// get by id
router.get("/:SessionID", async (req, res) => {
  let status = 500;
  const payload = { header: `Fetch Session By SessionID`, message: ``, error: ``, data: null };
  const sessionId = req.params.SessionID;

  try {
    const session = await Session.findById(sessionId);

    if (!session) {
      status = 404;
      payload.message = `Failed to fetch session`;
      payload.error = `Session ${sessionId} not found`;
    } else {
      status = 200;
      payload.message = `Successfully fetched session`;
      payload.data = session;
    }
  } catch (error) {
    status = 500;
    payload.message = `Failed to fetch session`;
    payload.error = `Error fetching session with SessionID: ${sessionId}`;
  }

  return res.status(status).json(payload);
});

// create
router.post("/", async (req, res) => {
  let status = 500;
  const payload = { header: `Create New Session`, message: ``, error: ``, data: null };

  try {
    const lastSession = await Session.findOne({}, {}, { sort: { _id: -1 } });
    const newSessionId = lastSession ? lastSession._id + 1 : 1;
    await Session.create({
      _id: newSessionId,
      SessionName: req.body.SessionName,
      SessionDescription: req.body.SessionDescription,
      SessionStart: req.body.SessionStart,
      SessionEnd: req.body.SessionEnd
    });

    status = 201;
    payload.message = `Successfully created new session`;
    payload.data = null;
  } catch (error) {
    status = 500;
    payload.message = `Failed to create session`;
    payload.error = `Error creating session`;
  }

  return res.status(status).json(payload);
});

// update
router.put("/:SessionID", async (req, res) => {
  let status = 500;
  const payload = { header: `Update Session`, message: ``, error: ``, data: null };
  const sessionId = req.params.SessionID;

  try {
    const currSession = await Session.findByIdAndUpdate(sessionId, req.body, { new: true });

    if (!currSession) {
      status = 404;
      payload.message = `Failed to update session`;
      payload.error = `Session ${sessionId} not found`;
    } else {
      status = 200;
      payload.message = `Successfully updated session`;
      payload.data = currSession;
    }
  } catch (error) {
    status = 500;
    payload.message = `Failed to update session`;
    payload.error = `Error updating session with SessionID: ${sessionId}`;
  }

  return res.status(status).json(payload);
});

// delete
router.delete("/:SessionID", async (req, res) => {
  let status = 500;
  const payload = { header: `Delete Session`, message: ``, error: ``, data: null };
  const sessionId = req.params.SessionID;

  try {
    const currSession = await Session.findByIdAndDelete(sessionId);

    if (!currSession) {
      status = 404;
      payload.message = `Failed to delete session`;
      payload.error = `Session ${sessionId} not found`;
    } else {
      status = 200;
      payload.message = `Successfully deleted session`;
    }
  } catch (error) {
    status = 500;
    payload.message = `Failed to delete session`;
    payload.error = `Error deleting session with SessionID: ${sessionId}`;
  }

  return res.status(status).json(payload);
});



router.get('/', async(req, res) => {
  try{
    const courseID = req.params.courselearningID;
    console.log(courseID);
    const Session = await SessionLearning.find()
      .populate('SessionID')
      .populate('MaterialID')
      .populate('TaskID');
    res.json(Session);
  } catch (error){
    res.status(500).json({ error: 'Failed fetch SessionLearning '});
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

router.get('/', async(req, res) => {
  try{
    console.log(req.params.id);
    const sessions = await Session.find();
    res.json(sessions);
  } catch (error){
    res.status(500).json({ message: 'Failed fetch sessions '});
  }
});

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

