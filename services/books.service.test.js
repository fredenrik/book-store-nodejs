import {getBooks} from './books.service.js';
import {Book} from '../models/book.js';
import {generateManyBook, generateOneBook} from '../fakes/book.fake.js';
// import mockingoose from 'mockingoose';
const mockingoose = require('mockingoose');

describe('Test for BooksService', () => {
  describe('test for getBooks with mockingoose', () => {
    test('should return a books list ',  async () => {
      const fakeBook = generateOneBook();

      mockingoose(Book).toReturn(fakeBook, 'find');
      const results = await getBooks();
      expect(results.title).toBe(fakeBook.title);
    });
  })

  describe('test for getBooks with spyOn', () => {
    test('should return a books list ',  async () => {
      const fakeBooks = generateManyBook(10);

      const findSpy = jest.spyOn(Book, 'find');
      findSpy.mockResolvedValue(fakeBooks);
      const result = await getBooks();

      expect(fakeBooks.length).toEqual(10);

      expect(findSpy).toHaveBeenCalled();
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({});

      expect(result).toEqual(fakeBooks);
      findSpy.mockRestore();
    });
  });
});