import React from 'react';
import styles from '../../styles/GridOverlay.module.css';

const GridOverlay = () => (
  <div className={styles.lines}>
    <div data-scroll data-scroll-speed="16" className={styles.item} />
    <div data-scroll data-scroll-speed="20" className={styles.item} />
    <div data-scroll data-scroll-speed="24" className={styles.item} />
    <div data-scroll data-scroll-speed="28" className={styles.item} />
    <div data-scroll data-scroll-speed="32" className={styles.item} />
    <div data-scroll data-scroll-speed="36" className={styles.item} />
    <div data-scroll data-scroll-speed="40" className={styles.item} />
    <div data-scroll data-scroll-speed="44" className={styles.item} />
    <div data-scroll data-scroll-speed="48" className={styles.item} />
    <div data-scroll data-scroll-speed="52" className={styles.item} />
  </div>
);

export default GridOverlay;
