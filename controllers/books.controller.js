import {response} from 'express';
import {Book} from '../models/book.js';
import {getBooks} from '../services/books.service.js';

export const createBook = async (req, res = response) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear'
      })
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({message: err.message})
  }
}
export const getAllBooks = async (req, res = response) => {
  try {
    const { page =1, limit = 0 } = req.query;

    const books = await getBooks();
    return res.status(200).json({
      count: books.length,
      data: books,
      limit,
      page,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
};

export const getBookById = async (req, res = response) => {
  try {
    const {id} = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
};

export const updateBook = async (req, res = response) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear'
      });
    }

    const {id} = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({message: 'Book not found'});
    }

    return res.status(200).send({message: 'Book updated successfully'});
  } catch (err) {
    console.log(err.message);
    res.status(500).send({message: err.message});
  }
};

export const deleteBook = async (req, res = response) => {
  try {
    const {id} = req.params;
    const result = await Book.findByIdAndDelete(id);

    if(!result) {
      return res.status(404).json({message: 'Book not found'});
    }

    return res.status(200).send({message: 'Book deleted successfully'});
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
};