import React from 'react';
import styles from '../../styles/Hero.module.css';

export type FilterType = {
  type: 'search' | 'alphabetical';
  value: string;
};

const Hero = () => (
  <header className="grid-1-cols">
    <div className={styles.heroContent}>
      <h1 data-scroll data-scroll-speed="2">
        BOOKS I'VE <br />
        READ SINCE
      </h1>
      <p data-scroll data-scroll-speed="1" className={styles.year}>
        2016
      </p>
      <hr />
      <p className={styles.content}>
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
  </header>
);

export default Hero;
