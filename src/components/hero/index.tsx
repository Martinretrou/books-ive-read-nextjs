import React from 'react';
import styles from '../../styles/Hero.module.css';

export type FilterType = {
  type: 'search' | 'alphabetical';
  value: string;
};

const Hero = () => (
  <header className="grid-1-cols">
    <div className={styles.heroContent}>
      <h1>Books I've read</h1>
      <hr />
      <p>
        Here's a list of all my latest reading. I've started recording my
        readings in 2016 since I've fallen in the science-fiction genre rabbit
        hole.
      </p>
    </div>
  </header>
);

export default Hero;
