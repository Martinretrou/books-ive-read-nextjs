import map from 'lodash.map';
import React from 'react';

import classNames from 'classnames';
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
  isMobile: boolean;
};

const BooksList = ({ books, isMobile }: BooksListProps) => (
  <section className={classNames(styles.list, `menu`)}>
    {map(books, (book: Book, index: number) => (
      <BookListItem
        isMobile={isMobile}
        key={`${book?.title}-${index}`}
        book={book}
      />
    ))}
    {/* <svg className="cursor" width="80" height="80" viewBox="0 0 80 80">
      <circle className="cursor__inner" cx="40" cy="40" r="20" />
    </svg> */}
  </section>
);

export default BooksList;
