var express = require('express');
var router = express.Router();

const Book = require('../models/book');

router.get('/', async(req, res) => {
  try{
    const books = await Book.find();
    res.json(books); 
  } catch (error){
    res.status(500).json({ error: 'Failed fetch user '});
  }
});

module.exports = router;

  