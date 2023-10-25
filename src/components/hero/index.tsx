import classNames from 'classnames';
import React from 'react';
import styles from '../../styles/Hero.module.css';

export type FilterType = {
  type: 'search' | 'alphabetical';
  value: string;
};

const Hero = () => {
  const currentYear = new Date().getFullYear();

  return (
    <header className={classNames(`grid-1-cols`, styles.hero)}>
      <div className={styles.heroContent}>
        <div className={styles.heroTitle}>
          <h1>
            Books I've read <br /> <mark>2016 - {currentYear}</mark>
          </h1>
        </div>
        <div className={styles.heroDescription}>
          <p>
            Here's a list of the books I've read since 2016. I've started
            recording my readings since I've fallen in the science-fiction
            rabbit hole.
            <br />
            <br />
            The list is mostly composed of science-fiction books ranging from
            some classics (Isaac Asimov, Frank Herbert, Dan Simmons, etc.) and
            some recent authors (Jeff Vandermeer, Emma Newman, and more).
            There's also some thriller, science, and others types of books.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Hero;
