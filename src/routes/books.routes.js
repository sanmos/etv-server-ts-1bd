const express = require('express');
const router = express.Router(); 

// import the controller file for fcuntions
const bookController = require('../controllers/books.contoller');

// use 
router.get('/', bookController.baseRoute);

// create
router.post('/create', bookController.createBook);

// read all
router.get('/getBooks', bookController.getBooks);

// read one
router.get('/getBook/:id', bookController.getSingleBook);

// update
router.put('/book/:id/update', bookController.updateBook);

// delete
router.delete('/delete/:id', bookController.deleteBook);

module.exports = router;



/*const express = require('express');
const Book = require('../../models/Book');
//const Chapter = require('../models/Chapter');

const router = express.Router();

router.get('/books', async (req, res) => {
  try {
    const books = await Book.list();
    res.json(books);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/books/:slug', async (req, res) => {
  try {
    const book = await Book.getBySlug({ slug: req.params.slug, userId: req.user && req.user.id });
    res.json(book);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});*/

/*router.get('/get-chapter-detail', async (req, res) => {
  try {
    const { bookSlug, chapterSlug } = req.query;
    const chapter = await Chapter.getBySlug({
      bookSlug,
      chapterSlug,
      userId: req.user && req.user.id,
      isAdmin: req.user && req.user.isAdmin,
    });
    res.json(chapter);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});
*/

//module.exports = router;