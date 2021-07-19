import React from 'react';
import ReactStars from 'react-rating-stars-component';
import classNames from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Book } from '../books-list';
import styles from '../../styles/BooksList.module.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

type BookListItemProps = {
  book: Book;
  isMobile: boolean;
  hideRating?: boolean;
};

const BookListItem = ({
  book,
  isMobile,
  hideRating = false,
}: BookListItemProps) => (
  <div
    className={classNames(styles.item, `menu__item`, isMobile && styles.mobile)}
    data-img={book.image.url}
  >
    <div className={styles.img}>
      <LazyLoadImage effect="blur" src={book.image.url} alt={book.image.alt} />
    </div>
    <div className={styles.content}>
      <div className="meta">
        <p className={classNames(styles.title, `menu__item-text`)}>
          <span className="menu__item-textinner">{book.title}</span>
        </p>
        <p className={classNames(styles.author, `menu__item-sub`)}>
          {book.author}
        </p>
        {book.comment && (
          <p className={classNames(styles.comment)}>{book.comment}</p>
        )}
      </div>
      {!hideRating && (
        <div className={styles.other}>
          <div className="row">
            <ReactStars
              className={styles.rating}
              count={5}
              value={Number(book.review)}
              size={20}
              edit={false}
              color="#f0efef"
              activeColor="#000"
            />
          </div>
        </div>
      )}
    </div>
  </div>
);

export default BookListItem;
