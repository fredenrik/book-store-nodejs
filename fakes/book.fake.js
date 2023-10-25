import {faker} from '@faker-js/faker';

export const generateOneBook = () => ({
  _id: faker.string.uuid() ,
  title: faker.commerce.productName(),
  author: faker.person.fullName(),
  publishYear: faker.date.birthdate({ max: 70, min: 1, mode: 'age' }).getFullYear(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
  __v: 0
});

export const generateManyBook = (size) => {
  const limit = size ?? 10;
  const fakeBooks = [];
  for(let index = 0; index < limit; index++) {
    fakeBooks.push(generateOneBook());
  }

  return [...fakeBooks];
}

