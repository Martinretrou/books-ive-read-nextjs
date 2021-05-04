import { Book } from '@/components/books-list';

export const formatBooks = (books: any[]): Book[] =>
  books.map((book: any) => ({
    title: book?.book_title[0]?.text,
    author: book?.book_author[0]?.text,
    review: book?.rating,
    readIn: book?.read_in[0]?.text,
    image: {
      url: book?.cover?.url,
      alt: book?.cover?.alt,
    },
  }));
