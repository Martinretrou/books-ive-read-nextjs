/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { IBook } from '@/../types/book';

import { SmoothScrollContext } from '@/providers/SmoothScrollProvider';
import classNames from 'classnames';
import { Portal } from '@/components/portal';
import useCursorHandlers from '@/hooks/useCursorHandlers';
import styles from '../../styles/BooksList.module.css';

type LightboxProps = {
  books: IBook[];
  selectedIndex?: number | null;
  onIndexChange: (index: number | null) => void;
};

const Lightbox: React.FC<LightboxProps> = ({
  books,
  selectedIndex,
  onIndexChange,
}) => {
  const { scroll } = useContext(SmoothScrollContext);
  const { onMouseEnter, onMouseLeave } = useCursorHandlers();

  const handleMouseEnterPrevious = (e: any) => {
    if (onMouseEnter && selectedIndex !== 0)
      onMouseEnter(e, { active: true, previous: true });
  };

  const handleMouseLeavePrevious = (e: any) => {
    if (onMouseLeave && selectedIndex !== 0)
      onMouseLeave(e, { active: false, previous: false });
  };

  const handleMouseEnterNext = (e: any) => {
    if (onMouseEnter && selectedIndex !== books.length - 1)
      onMouseEnter(e, { active: true, next: true });
  };

  const handleMouseLeaveNext = (e: any) => {
    if (onMouseLeave && selectedIndex !== books.length - 1)
      onMouseLeave(e, { active: false, next: false });
  };

  const resetFocusedItem = () => {
    onIndexChange(null);
    (scroll as any)?.start();
  };

  const focusNextItem = () => {
    if (selectedIndex !== undefined && !!books[(selectedIndex || 0) + 1])
      onIndexChange((selectedIndex || 0) + 1);
  };

  const focusPreviousItem = () => {
    if (selectedIndex !== undefined && !!books[(selectedIndex || 0) - 1])
      onIndexChange((selectedIndex || 0) - 1);
  };

  return selectedIndex !== null && books?.[selectedIndex || 0] ? (
    <Portal>
      <div
        className={styles.lightbox}
        data-scroll-sticky
        data-scroll-target="#wrapper"
      >
        <div className={styles.lightboxContent}>
          <div className={styles.lightboxClose} onClick={resetFocusedItem}>
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path
                fill="none"
                d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
              />
            </svg>
          </div>
          <div
            className={styles.contentPrevious}
            onClick={focusPreviousItem}
            onMouseEnter={handleMouseEnterPrevious}
            onMouseLeave={handleMouseLeavePrevious}
          >
            {selectedIndex !== 0 && (
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path
                  vectorEffect="non-scaling-stroke"
                  d="M18.25 15.5a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h7.19L6.22 16.72a.75.75 0 1 0 1.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"
                />
              </svg>
            )}
          </div>
          <div className={styles.lightboxImg}>
            <img
              src={books[selectedIndex || 0].image.url}
              alt={books[selectedIndex || 0].image.alt}
            />
          </div>
          <div className={styles.content}>
            <div className="meta">
              <p className={classNames(styles.title)}>
                {books?.[selectedIndex || 0].title}
              </p>
              <p className={classNames(styles.author)}>
                Author:{` `}
                {books?.[selectedIndex || 0].author}
              </p>
              {books?.[selectedIndex || 0].comment && (
                <p className={classNames(styles.comment)}>
                  {books?.[selectedIndex || 0].comment}
                </p>
              )}
            </div>
            <div className={styles.rating}>
              <p>
                Rating:{` `}
                <b>
                  {Number(books?.[selectedIndex || 0].review)}
                  /5
                </b>
              </p>
            </div>
          </div>
          <div
            className={styles.contentNext}
            onMouseEnter={handleMouseEnterNext}
            onMouseLeave={handleMouseLeaveNext}
            onClick={focusNextItem}
          >
            {selectedIndex !== books.length - 1 && (
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path
                  vectorEffect="non-scaling-stroke"
                  d="M18.25 15.5a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h7.19L6.22 16.72a.75.75 0 1 0 1.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"
                />
              </svg>
            )}
          </div>
        </div>
        <div className={styles.lightboxBackdrop} />
      </div>
    </Portal>
  ) : (
    <></>
  );
};

export default Lightbox;
