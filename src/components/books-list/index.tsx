import map from 'lodash.map';
import React from 'react';
import { BookListItem } from '..';
import styles from '../../styles/BooksList.module.css';

export type FilterType = {
  type: 'search' | 'alphabetical';
  value: string;
};

export type Book = {
  title: string;
  author: string;
  review: string;
  image: {
    url: string;
    alt: string;
  };
  readIn: string;
};

type BooksListProps = {
  books: Book[];
};

const BooksList = ({ books }: BooksListProps) => (
  <section className={styles.list}>
    <div className={styles.side}>
      <img
        className={styles.latestarrow}
        src="/svg/arrow.svg"
        alt="arrow icon"
      />
      <img
        className={styles.oldestarrow}
        src="/svg/arrow.svg"
        alt="arrow icon"
      />
      <p className={styles.latest}>Latest</p>
      <p className={styles.oldest}>Oldest</p>
      <div className={styles.line} />
    </div>
    {map(books, (book: Book, index: number) => (
      <BookListItem key={`${book?.title}-${index}`} book={book} />
    ))}
  </section>
);

export default BooksList;
