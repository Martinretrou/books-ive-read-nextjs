import map from 'lodash.map';
import React from 'react';

import classNames from 'classnames';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
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
  books: Book[];
  isMobile: boolean;
  year?: string | number;
  title?: string;
  hideRating?: boolean;
  orange?: boolean;
};

const BooksList = ({
  books,
  isMobile,
  year,
  title,
  hideRating,
  orange,
}: BooksListProps) => (
  <section className={orange && styles.orange}>
    <h2>{year || title}</h2>
    <div className={classNames(styles.list, `menu`, `grid-1-cols`)}>
      {map(books, (book: Book, index: number) => (
        <BookListItem
          key={`${book?.title}-${index}`}
          hideRating={hideRating}
          isMobile={isMobile}
          book={book}
        />
      ))}
    </div>
  </section>
);

export default BooksList;
