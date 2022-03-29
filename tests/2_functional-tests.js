/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let _id;

suite('Functional Tests', function () {
  this.timeout(3000);

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */


  /* test('#example Test GET /api/books', function (done) {
    chai.request(server)
      .get('/api/books')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  }); */


  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function () {


    suite('POST /api/books with title => create book object/expect book object', function () {

      test('Test POST /api/books with title', function (done) {
        chai.request(server)
          .post('/api/books').send({ title: "Test Title" })
          .end(function (err, res) {
            _id = res.body._id; //will be used in further testing

            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json", "Response type should be 'application/json'");
            assert.equal(res.body.title, "Test Title", "Response body.title should be correct");
            done();
          });
      });

      test('Test POST /api/books with no title given', function (done) {
        chai.request(server)
          .post('/api/books')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "missing required field title", "Response text should be correct");
            done();
          });
      });

    });


    suite('GET /api/books => array of books', function () {

      test('Test GET /api/books', function (done) {
        chai.request(server)
          .get('/api/books')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json", "Response type should be 'application/json'");
            assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');
            done();
          });
      });

    });


    suite('GET /api/books/[id] => book object with [id]', function () {

      test('Test GET /api/books/[id] with id not in db', function (done) {
        chai.request(server)
          .get('/api/books/' + _id + "1")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "no book exists", "Response text should be correct");
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', function (done) {
        chai.request(server)
          .get('/api/books/' + _id)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json", "Response type should be 'application/json'");
            assert.property(res.body, 'commentcount', 'Book should contain commentcount');
            assert.property(res.body, 'title', 'Book should contain title');
            assert.property(res.body, '_id', 'Book should contain _id');
            done();
          });
      });

    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function () {

      test('Test POST /api/books/[id] with comment', function (done) {
        chai.request(server)
          .post('/api/books/' + _id).send({ comment: "Test Comment" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json", "Response type should be 'application/json'");
            assert.property(res.body, 'commentcount', 'Book should contain commentcount');
            assert.property(res.body, 'title', 'Book should contain title');
            assert.property(res.body, '_id', 'Book should contain _id');
            done();
          });
      });

      test('Test POST /api/books/[id] without comment field', function (done) {
        chai.request(server)
          .post('/api/books/' + _id)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "missing required field comment", "Response text should be correct");
            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function (done) {
        chai.request(server)
          .post('/api/books/' + _id + "1").send({ comment: "Test Comment" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "no book exists", "Response text should be correct");
            done();
          });
      });

    });

    suite('DELETE /api/books/[id] => delete book object id', function () {

      test('Test DELETE /api/books/[id] with valid id in db', function (done) {
        chai.request(server)
          .delete('/api/books/' + _id)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "delete successful", "Response text should be correct");
            done();
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function (done) {
        chai.request(server)
          .delete('/api/books/' + _id)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "no book exists", "Response text should be correct");
            done();
          });
      });

    });

  });

});
