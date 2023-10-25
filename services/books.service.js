import {Book} from '../models/book.js';

export const getBooks = async () => {
  const books = await Book.find({});
  return books;
}