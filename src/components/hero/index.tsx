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
};

const Hero = ({
  title,
  description,
  totalBooks,
  readThisYear,
  onSearchChange,
}: HeroProps) => {
  const [rating, setRating] = useState<any>({ min: 0, max: 5 });
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
          {readThisYear && (
            <p>
              Books read so far in {new Date().getFullYear()}: {readThisYear}
            </p>
          )}
          {totalBooks && <p>Total books read: {totalBooks}</p>}
        </div>
      </div>
      <p>Filters</p>
      <div className={styles.filters}>
        <div className={styles.filter}>
          <InputRange
            maxValue={5}
            minValue={0}
            value={rating}
            onChange={(value) => {
              setRating(value as any);
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Hero;
