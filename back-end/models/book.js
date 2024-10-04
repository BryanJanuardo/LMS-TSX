const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    isbn: String,
    pageCount: Number,
    publishedDate: Date,
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: String,
    status: String,
    authors: [String],
    categories: [String],
}, {
    collection: 'books',
});

module.exports = mongoose.model('Book', bookSchema)