require('dotenv').config();

// setup mongoose
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true, dbName: "Library"
});


// Define mongoose schema and model
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    comments: [String],
    commentcount: { type: Number, default: 0 }
});

let Book = mongoose.model('Book', bookSchema);

// Define functions to search books
const getBooks = (query, done) => {
    Book.find(query, (err, data) => {
        done(err, data);
    })
}

// Define functions to search books
const getBookById = (id, done) => {
    Book.findById(id, (err, data) => {
        done(err, data);
    })
}

// Define functions to create and save new books
const addBook = (title, done) => {
    let book = new Book({ title })
    book.save((err, data) => {
        done(err, data);
    });
};

// Define functions to add comments to books
const addCommentToBook = (_id, comment, done) => {
    Book.findByIdAndUpdate(_id, { $push: { comments: comment }, $inc: { commentcount: 1 } }, { new: true }, (err, data) => {
        done(err, data);
    });
};

// Define functions to delete books
const deleteBook = (_id, done) => {
    Book.findByIdAndDelete(_id, (err, data) => {
        done(err, data);
    });
}

// Define functions to delete books
const deleteAllBooks = (query, done) => {
    Book.deleteMany(query, (err, data) => {
        done(err, data);
    });
}

module.exports = {
    addBook,
    addCommentToBook,
    deleteBook,
    getBooks,
    getBookById,
    deleteAllBooks
};