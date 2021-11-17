import classNames from 'classnames';
import React from 'react';
import styles from '../../styles/Hero.module.css';

export type FilterType = {
  type: 'search' | 'alphabetical';
  value: string;
};

const Hero = () => (
  <header className={classNames(`grid-1-cols`, styles.hero)}>
    <div className={styles.heroContent}>
      <div className={styles.heroTitle}>
        <h1>
          Books I've read <br /> <mark>2016 - 2021</mark>
        </h1>
      </div>
      <div className={styles.heroDescription}>
        <p>
          Here's a list of my latest reading. I've started recording my readings
          in 2016 since I've fallen in the science-fiction rabbit hole.
          <br />
          <br />
          The list is mostly composed of science-fiction books ranging from some
          classics (Isaac Asimov, Frank Herbert, Dan Simmons, etc.) and some
          recent authors (Jeff Vandermeer, Emma Newman, and more). There's also
          some thriller, science, and others types of books.
        </p>
      </div>
    </div>
  </header>
);

export default Hero;
