import map from 'lodash.map';
import React from 'react';

import classNames from 'classnames';
import { SmoothScrollProvider } from '@/providers/ScrollProvider';
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
  byYears: Book[][];
  years: string[];
};

const BooksList = ({ books, isMobile, years, byYears }: BooksListProps) => (
  <section className={classNames(styles.list, `menu`)}>
    {map(years, (year: string, index: number) => (
      <div key={index} className={styles.year}>
        <h2
          className="invert-title"
          data-scroll-direction="horizontal"
          data-scroll
          data-scroll-speed="-2"
        >
          {year} {year} {year} {year} {year} {year} {year} {year} {year} {year}
        </h2>
        <h2
          data-scroll-direction="horizontal"
          data-scroll
          data-scroll-speed="2"
        >
          {year} {year} {year} {year} {year} {year} {year} {year} {year} {year}
        </h2>
        <h2
          className="invert-title"
          data-scroll-direction="horizontal"
          data-scroll
          data-scroll-speed="-4"
        >
          {year} {year} {year} {year} {year} {year} {year} {year} {year} {year}
        </h2>
        <div className="container">
          {map(byYears[index], (book: Book, indexIndex: number) => (
            <BookListItem
              speed={String(index + 2)}
              key={`${book?.title}-${indexIndex}`}
              isMobile={isMobile}
              book={book}
            />
          ))}
        </div>
      </div>
    ))}
  </section>
);

export default BooksList;
