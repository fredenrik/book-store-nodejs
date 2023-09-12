import { Router } from 'express';
import {
  getBookById,
  getAllBooks,
  updateBook,
  deleteBook,
  createBook
} from '../controllers/books.controller.js';

const router = Router();

// Route for save a new book
router.post('/', createBook);

// Route for get all books from database
router.get('/', getAllBooks);

// Route for get one book from database by id
router.get('/:id', getBookById);

// Route for update a book
router.put('/:id', updateBook);

// Route for delete a book
router.delete('/:id', deleteBook);

export default router;