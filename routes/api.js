/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const myDb = require('../connection.js');

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      myDb.getBooks(req.query, (_, data) => {
        res.json(data)
      });

    })

    .post(function (req, res) {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title

      if (!title || title == "") return res.send("missing required field title")
      myDb.addBook(title, (err, data) => {
        if (err || !data) return res.send("missing required field title")
        res.json({ _id: data._id, title: data.title })
      })
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
      myDb.deleteAllBooks({}, (err, data) => {
        if (err || !data) return res.send("no book exists")
        res.send('complete delete successful')
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      myDb.getBookById(bookid, (err, data) => {
        if (err || !data) return res.send("no book exists")
        res.json(data)
      });
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      if (!comment || comment == "") return res.send("missing required field comment")

      myDb.addCommentToBook(bookid, comment, (err, data) => {
        if (err || !data) return res.send("no book exists")
        res.send(data)
      })
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      myDb.deleteBook(bookid, (err, data) => {
        if (err || !data) return res.send("no book exists")
        res.send('delete successful')
      })
    });

};
