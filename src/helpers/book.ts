import { IBook } from '@/../types/book';
import { Book } from '@/components/books-list';

export const formatBooks = (books: any[]): Book[] =>
  books.map((book: any) => ({
    title: book?.book_title[0]?.text,
    author: book?.book_author[0]?.text,
    comment: book?.comment[0]?.text,
    review: book?.rating,
    readIn: book?.read_in[0]?.text,
    image: {
      url: book?.cover?.url,
      alt: book?.cover?.alt,
    },
    currentlyReading: book?.currently_reading,
  }));

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
