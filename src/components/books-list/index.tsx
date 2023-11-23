import map from 'lodash.map';
import React from 'react';

import classNames from 'classnames';
import { IBook } from '@/../types/book';
import Marquee from 'react-fast-marquee';
import BookListItem from '../book-list-item';
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
  handleClick?: (id: string | undefined) => void;
};

const BooksList = ({ books, year, title, handleClick }: BooksListProps) => (
  <section className={classNames(styles.container, `books-list`)}>
    <div className={styles.list}>
      {map(books, (book: IBook) => (
        <BookListItem
          key={book.id}
          book={book}
          priority={year === new Date().getFullYear()}
          handleClick={() => {
            if (handleClick) handleClick(book.slug);
          }}
        />
      ))}
    </div>
    <Marquee className={styles.marquee} gradient={false}>
      <h2
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="10"
        className={styles.year}
      >
        {year || title}
        {` `} {year || title}
        {` `} {year || title}
        {` `} {year || title}
        {` `} {year || title}
        {` `} {year || title}
        {` `} {year || title}
        {` `} {year || title}
        {` `} {year || title}
      </h2>
    </Marquee>
  </section>
);

export default BooksList;
