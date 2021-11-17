import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { Book } from '../books-list';
import styles from '../../styles/BooksList.module.css';

type BookListItemProps = {
  book: Book;
  hideRating?: boolean;
  priority?: boolean;
};

const BookListItem = ({
  book,
  priority = false,
  hideRating = false,
}: BookListItemProps) => (
  <div className={classNames(styles.item, `menu__item`)}>
    <div className={styles.img}>
      <Image
        width={260}
        height={400}
        src={book.image.url}
        alt={book.image.alt}
        priority={priority}
      />
    </div>
    <div className={styles.content}>
      <div className="meta">
        <p className={classNames(styles.title, `menu__item-text`)}>
          <span className="menu__item-textinner">{book.title}</span>
        </p>
        <p className={classNames(styles.author, `menu__item-sub`)}>
          Author: {book.author}
        </p>
        {book.comment && (
          <p className={classNames(styles.comment)}>{book.comment}</p>
        )}
      </div>
      {!hideRating && (
        <div className={styles.rating}>
          <p>
            Rating: <b>{Number(book.review)}/5</b>
          </p>
        </div>
      )}
    </div>
  </div>
);

export default BookListItem;
