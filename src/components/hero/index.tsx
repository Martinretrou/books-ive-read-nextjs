import React, { ChangeEvent, useMemo, useState } from 'react';
import InputRange from 'react-input-range';
import Select from 'react-select';
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
  allYears: string[];
  onSearchChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onRangeChange: (range: { min: number; max: number }) => void;
};

const Hero = ({
  allYears,
  title,
  description,
  totalBooks,
  readThisYear,
  onSearchChange,
  onYearChange,
  onRangeChange,
}: HeroProps) => {
  const [rating, setRating] = useState<any>({ min: 0, max: 5 });
  const handleRangeChange = (value: any) => {
    setRating(value);
    onRangeChange(value);
  };

  const handleYearChange = (value: string) => {
    onYearChange(value);
  };

  const options = useMemo(
    () => allYears.map((item) => ({ value: item, label: item })),
    [allYears],
  );

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
          <div className={styles.filter}>
            <p className={styles.rating}>Read in</p>
            <Select
              className="select"
              classNamePrefix="select"
              options={[{ label: `All years`, value: false }, ...options]}
              onChange={(value: { label: string; value: string }) =>
                handleYearChange(value.value)
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
