import React, { ChangeEvent, useState } from 'react';
import InputRange from 'react-input-range';
import styles from '../../styles/Hero.module.css';

export type FilterType = {
  type: 'search' | 'alphabetical';
  value: string;
};

type HeroProps = {
  title: string;
  description: string;
  totalBooks?: number;
  readThisYear?: number;
  onSearchChange: (value: string) => void;
  onRangeChange: (range: { min: number; max: number }) => void;
};

const Hero = ({
  title,
  description,
  totalBooks,
  readThisYear,
  onSearchChange,
  onRangeChange,
}: HeroProps) => {
  const [rating, setRating] = useState<any>({ min: 0, max: 5 });
  const handleRangeChange = (value: any) => {
    setRating(value);
    onRangeChange(value);
  };
  return (
    <header className={styles.hero}>
      <div className={styles.wrapper}>
        <h1>{title}</h1>
        <p>{description}</p>
        <input
          type="text"
          placeholder="Search a book by title or author"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e?.target.value)
          }
        />
        <div className={styles.stats}>
          {readThisYear !== 0 && (
            <p>
              Books read so far in {new Date().getFullYear()}: {readThisYear}
            </p>
          )}
          {totalBooks !== 0 && <p>Total books read: {totalBooks}</p>}
        </div>
      </div>

      <div className={styles.filters}>
        <p className={styles.filterstitle}>Filters</p>
        <div className={styles.filtersitems}>
          <div className={styles.filter}>
            <p className={styles.rating}>Rating</p>
            <InputRange
              maxValue={5}
              minValue={0}
              value={rating}
              onChange={(value) => handleRangeChange(value as any)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
