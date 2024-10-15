var express = require('express');
var router = express.Router();

const Session = require('../models/session');


router.get('/', async(req, res) => {
  try{
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

