import React, { useMemo } from 'react';
import Image from 'next/image';
import { IBook } from '@/../types/book';
import map from 'lodash.map';

type BooksGridProps = {
  books: IBook[];
};

const BooksGrid = ({ books }: BooksGridProps) => {
  const randomized = useMemo(() => {
    const shuffled = books.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }, [books]);

  return (
    <div className="grid-container">
      <div className="columns">
        {map(randomized, (book: IBook, index: number) => (
          <div
            className="grid-item"
            data-scroll
            data-scroll-delay="0.06"
            data-scroll-speed={String(index)}
          >
            <Image
              width={230}
              height={350}
              src={book.image.url}
              alt={book.image.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default BooksGrid;
