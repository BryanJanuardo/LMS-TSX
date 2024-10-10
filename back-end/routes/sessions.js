var express = require('express');
var router = express.Router();

const Session = require('../models/session');

router.get('/', async(req, res) => {
  try{
    const sessions = await Session.find();
    res.json(sessions);
  } catch (error){
    res.status(500).json({ error: 'Failed fetch sessions '});
  }
});

module.exports = router;

