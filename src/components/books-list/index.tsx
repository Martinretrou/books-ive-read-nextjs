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
  hideRating?: boolean;
  handleClick?: (index: number) => void;
};

const BooksList = ({
  books,
  year,
  title,
  hideRating,
  handleClick,
}: BooksListProps) => (
  <section className={classNames(styles.container, `books-list`)}>
    <div className={classNames(styles.list, `menu`, `grid-1-cols`)}>
      {map(books, (book: IBook, index: number) => (
        <BookListItem
          key={book.id}
          hideRating={hideRating}
          book={book}
          priority={index === 0}
          handleClick={() => {
            if (handleClick) handleClick(index);
          }}
        />
      ))}
    </div>
    <Marquee
      style={{ width: `100%`, position: `fixed`, left: 0, zIndex: -1 }}
      gradient={false}
    >
      <h2
        data-scroll-direction="horizontal"
        data-scroll-speed="10"
        // data-scroll-position="right"
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
