import { IBook } from '@/../types/book';

export const getAuthorsFromBooks = (books: IBook[]) => {
  if (books) {
    const temp = [...books.filter((book) => book?.author)];
    return [...new Set(temp.map((book) => book.author))];
  }
  return [];
};

export const ratingOptions = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
];
