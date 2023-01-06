import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { IBook } from '@/../types/book';
import useCursorHandlers from '@/hooks/useCursorHandlers';
import styles from '../../styles/BooksList.module.css';

type BookListItemProps = {
  book: IBook;
  hideRating?: boolean;
  priority?: boolean;
  handleClick?: () => void;
};

const BookListItem = ({
  book,
  priority = false,
  hideRating = false,
  handleClick,
}: BookListItemProps) => {
  const { onMouseEnter, onMouseLeave } = useCursorHandlers();

  const handleMouseEnter = (e: any) => {
    if (onMouseEnter) onMouseEnter(e, { active: true, expand: true });
  };

  const handleMouseLeave = (e: any) => {
    if (onMouseLeave) onMouseLeave(e, { active: false, expand: false });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames(styles.item)}
      onClick={handleClick}
    >
      <div
        className={styles.img}
        data-scroll
        data-scroll-speed="1"
        data-scroll-delay="0.08"
      >
        <Image
          width={200}
          height={300}
          src={book.image.url}
          alt={book.image.alt}
          priority={priority}
        />
      </div>
      <div
        className={styles.content}
        data-scroll
        data-scroll-speed="1"
        data-scroll-delay="0.06"
      >
        <div className="meta">
          <p className={classNames(styles.title)}>{book.title}</p>
          <p className={classNames(styles.author)}>Author: {book.author}</p>
          {book.comment && (
            <p className={classNames(styles.comment)}>{book.comment}</p>
          )}
        </div>
        {!hideRating && book.currentlyReading && (
          <div className={styles.rating}>
            <p>
              Rating: <b>{Number(book.review)}/5</b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default BookListItem;
