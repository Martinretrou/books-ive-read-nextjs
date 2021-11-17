import map from 'lodash.map';
import React from 'react';

import classNames from 'classnames';
import { IBook } from '@/../types/book';
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
  currentlyReading?: boolean;
  comment?: string;
};

type BooksListProps = {
  books: IBook[];
  year?: string | number;
  title?: string;
  hideRating?: boolean;
};

const BooksList = ({ books, year, title, hideRating }: BooksListProps) => (
  <div className={styles.container}>
    <h2 className={styles.year}>{year || title}</h2>
    <div className={classNames(styles.list, `menu`, `grid-1-cols`)}>
      {map(books, (book: IBook, index: number) => (
        <BookListItem
          key={`${book?.title}-${index}`}
          hideRating={hideRating}
          book={book}
          priority={index === 0}
        />
      ))}
    </div>
  </div>
);

export default BooksList;
