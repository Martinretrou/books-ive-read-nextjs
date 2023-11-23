import classNames from 'classnames';
import React from 'react';
import Fade from 'react-reveal/Fade';

import styles from '../../styles/Hero.module.css';

export type FilterType = {
  type: 'search' | 'alphabetical';
  value: string;
};

const Hero = () => (
  <header className={classNames(`grid-1-cols`, styles.hero)}>
    <div className={styles.heroContent}>
      <Fade bottom>
        <div data-scroll data-scroll-speed="5" className={styles.heroTitle}>
          <h1>Books I've read</h1>
        </div>
      </Fade>
      <Fade bottom delay={150}>
        <h2 data-scroll data-scroll-speed="3">
          <mark>2016 - {new Date().getFullYear()}</mark>
        </h2>
      </Fade>
      <Fade bottom delay={300}>
        <div
          className={styles.heroDescription}
          data-scroll
          data-scroll-speed="2"
        >
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
      </Fade>
      {/* <div className={styles.detailed}>
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path
            vectorEffect="non-scaling-stroke"
            d="M18.25 15.5a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h7.19L6.22 16.72a.75.75 0 1 0 1.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"
          />
        </svg>
        <p>Detailed list</p>
      </div> */}
      <Fade bottom delay={1500}>
        <div className={styles.showcase}>
          <div data-scroll data-scroll-speed="1">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              data-scroll
              data-scroll-speed="4"
            >
              <path
                vectorEffect="non-scaling-stroke"
                d="M18.25 15.5a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h7.19L6.22 16.72a.75.75 0 1 0 1.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"
              />
            </svg>
          </div>
          {/* <p data-scroll data-scroll-speed="1">
          Showcase
        </p> */}
          <div data-scroll data-scroll-speed="2">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                vectorEffect="non-scaling-stroke"
                d="M18.25 15.5a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h7.19L6.22 16.72a.75.75 0 1 0 1.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"
              />
            </svg>
          </div>
        </div>
      </Fade>
    </div>
  </header>
);

export default Hero;
