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
};

const BookListItem = ({ book, isMobile }: BookListItemProps) => (
  <div
    className={classNames(styles.item, `menu__item`, isMobile && styles.mobile)}
    data-img={book.image.url}
  >
    <div className={styles.content}>
      <div className="meta">
        <p className={classNames(styles.author, `menu__item-sub`)}>
          {book.author}
        </p>
      </div>
      <div className={styles.img}>
        <LazyLoadImage
          effect="blur"
          src={book.image.url}
          alt={book.image.alt}
        />
      </div>
      <div className="meta">
        <p className={classNames(styles.title, `menu__item-text`)}>
          <span className="menu__item-textinner">{book.title}</span>
        </p>
      </div>
      <div className={styles.other}>
        {/* <p className={styles.read}>
          Read in <b>{book.readIn}</b>
        </p> */}
        <ReactStars
          className={styles.rating}
          count={5}
          value={Number(book.review)}
          size={12}
          color="#f0efef"
          activeColor="#ffd700"
        />
      </div>
    </div>
  </div>
);

export default BookListItem;
