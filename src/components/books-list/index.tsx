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
};

type BooksListProps = {
  books: Book[];
  isMobile: boolean;
};

const BooksList = ({ books, isMobile }: BooksListProps) => (
  <section>
    <h2>{books[0].readIn}</h2>
    <div className={classNames(styles.list, `menu`, `grid-2-cols`)}>
      {map(books, (book: Book, index: number) => (
        <LazyLoadComponent key={`${book?.title}-${index}`}>
          <BookListItem isMobile={isMobile} book={book} />
        </LazyLoadComponent>
      ))}
    </div>
  </section>
);

export default BooksList;
