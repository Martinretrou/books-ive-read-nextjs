import React from 'react';
import Image from 'next/image';
import { IBook } from '@/../types/book';
import map from 'lodash.map';
import Fade from 'react-reveal/Fade';

type BooksGridProps = {
  books: IBook[];
};

const BooksGrid = ({ books }: BooksGridProps) => (
  <div className="grid-container">
    <div className="grid">
      {map(books, (book: IBook, index: number) => (
        <Fade delay={index * 35}>
          <div className="grid-item">
            <Image
              width={225}
              height={350}
              src={book.image.url}
              alt={book.image.alt}
            />
          </div>
        </Fade>
      ))}
    </div>
  </div>
);

export default BooksGrid;
