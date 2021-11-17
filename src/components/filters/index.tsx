import React, { ChangeEvent, useMemo } from 'react';
import Select from 'react-select';
import styles from '../../styles/Filters.module.css';

export type FilterType = {
  type: 'search' | 'alphabetical';
  value: string;
};

type FiltersProps = {
  totalBooks?: number;
  readThisYear?: number;
  years: string[];
  authors: string[];
  onSearchChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onRangeChange: (value: number) => void;
};

const Filters = ({
  years,
  authors,
  onSearchChange,
  onYearChange,
  onAuthorChange,
  onRangeChange,
}: FiltersProps) => {
  const handleRangeChange = (value: number) => {
    onRangeChange(value);
  };

  const handleYearChange = (value: string) => {
    onYearChange(value);
  };

  const yearsOptions = useMemo(
    () => years?.map((item) => ({ value: item, label: item })),
    [years],
  );

  const authorsOptions = useMemo(
    () => authors?.map((item) => ({ value: item, label: item })),
    [authors],
  );

  const ratingOptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];

  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <p>Filters</p>
      </div>
      <div className={styles.filters}>
        <div className={styles.filter}>
          <input
            className={styles.search}
            type="text"
            placeholder="Search"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSearchChange(e?.target.value)
            }
          />
        </div>
        <div className={styles.filter}>
          <Select
            placeholder="Author"
            inputId="select"
            name="select"
            className="select"
            classNamePrefix="select"
            options={[{ label: `All authors`, value: null }, ...authorsOptions]}
            onChange={(value: { label: string; value: string }) =>
              onAuthorChange(value.value)
            }
          />
        </div>
        <div className={styles.filter}>
          <Select
            placeholder="Year"
            inputId="select"
            name="select"
            className="select"
            classNamePrefix="select"
            options={[{ label: `All years`, value: null }, ...yearsOptions]}
            onChange={(value: { label: string; value: string }) =>
              handleYearChange(value.value)
            }
          />
        </div>
        <div className={styles.filter}>
          <Select
            placeholder="Rating"
            inputId="select"
            name="select"
            className="select"
            classNamePrefix="select"
            options={[{ label: `All ratings`, value: null }, ...ratingOptions]}
            onChange={(value: { label: number; value: number }) =>
              handleRangeChange(value.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
