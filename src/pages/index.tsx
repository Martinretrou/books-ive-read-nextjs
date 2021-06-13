/* eslint-disable no-nested-ternary */
import React, { useMemo, useState, useEffect } from 'react';
import { BooksList, Hero } from '@/components';
import { formatBooks } from '@/helpers/book';
import { Book } from '@/components/books-list';
import Head from 'next/head';
import Cursor from '@/helpers/cursor';
import { NextSeo } from 'next-seo';
import { SmoothScrollProvider } from '../providers/ScrollProvider';

import { client } from '../../prismic-configuration';
import styles from '../styles/Home.module.css';

type HomeProps = {
  data: any;
};

const Home: React.FC<HomeProps> = ({ data }) => {
  const [search, setSearch] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [rating, setRating] = useState<any>({ min: 0, max: 5 });
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const books = useMemo(() => {
    if (data?.data?.books) {
      return formatBooks(data?.data?.books)
        .sort((a: Book, b: Book) =>
          a.readIn > b.readIn ? -1 : a.readIn < b.readIn ? 1 : 0,
        )
        .filter(
          (book) =>
            Number(book.review) <= Number(rating.max) &&
            Number(book.review) >= Number(rating.min),
        );
    }
    return [];
  }, [data, rating]);

  const booksReadThisYear = useMemo(
    () =>
      books?.filter(
        (book: Book) => book.readIn === String(new Date().getFullYear()),
      ).length,
    [books],
  );

  const filteredBooksBySelectedYear = useMemo(() => {
    if (selectedYear && books) {
      return books.filter((book) => book.readIn === selectedYear.toString());
    }
    return books;
  }, [selectedYear, books]);

  const resultQuery = useMemo(() => {
    if (search) {
      return filteredBooksBySelectedYear?.filter((book: Book) =>
        search
          .toLowerCase()
          .split(` `)
          .every(
            (v) =>
              book?.title?.toLowerCase().includes(v) ||
              book?.author?.toLowerCase().includes(v),
          ),
      );
    }
    return filteredBooksBySelectedYear;
  }, [search, books, filteredBooksBySelectedYear]);

  const allYears = useMemo(() => {
    if (books) {
      return [...new Set(books.map((book) => book.readIn))]
        .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
        .reverse();
    }
    return [];
  }, [books]);

  const booksByYear = useMemo(() => {
    if (books && allYears) {
      const temp = [];
      allYears.map((year) => {
        temp.push(books.filter((book) => book.readIn === year.toString()));
      });
      return temp;
    }
    return [];
  }, [books, allYears]);

  const heroData = useMemo(
    () => ({
      title: data?.data.hero_title[0].text,
      description: data?.data.hero_description[0].text,
      onSearchChange: setSearch,
      onRangeChange: setRating,
      onYearChange: setSelectedYear,
      rating,
      allYears,
      totalBooks: books?.length,
      readThisYear: booksReadThisYear,
    }),
    [data, rating, books, booksReadThisYear, setSearch, setRating],
  );

  useEffect(() => {
    function handleResize() {
      if (typeof window !== `undefined`) {
        setWindowSize({
          width: window.innerWidth as any,
          height: window.innerHeight as any,
        });
      }
    }
    if (typeof window !== `undefined`) {
      window.addEventListener(`resize`, handleResize);
      handleResize();
      return () => window.removeEventListener(`resize`, handleResize);
    }
  }, []);

  const isMobile = useMemo(() => (windowSize?.width as any) <= 1000, [
    windowSize?.width,
  ]);

  useEffect(() => {
    const cursor = new Cursor(document.querySelector(`.cursor`));
    [...document.querySelectorAll(`a`)].forEach((link) => {
      link.addEventListener(`mouseenter`, () => cursor.enter());
      link.addEventListener(`mouseleave`, () => cursor.leave());
    });
  }, []);

  return (
    <SmoothScrollProvider options={{ smooth: true }}>
      <div className={styles.page}>
        <Head>
          <title>Books I've read</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <NextSeo
          title="Books I've read"
          description="Books I've read in the previous years."
          canonical="https://www.booksiveread.fr/"
          openGraph={{
            url: `https://www.booksiveread.fr/`,
            title: `Books I've read`,
            description: `Books I've read`,
            site_name: `Books I've read`,
          }}
          twitter={{
            handle: `@MartinRetrou`,
            cardType: `summary_large_image`,
          }}
        />
        <div className={styles.wrapper}>
          {/* <Hero {...heroData} /> */}
          <BooksList
            isMobile={isMobile}
            byYears={booksByYear}
            books={resultQuery}
            years={allYears}
          />
        </div>
        {/* <svg className="cursor" width="20" height="20" viewBox="0 0 20 20">
          <circle className="cursor__inner" cx="10" cy="10" r="5" />
        </svg> */}
        <svg
          className="cursor"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="cursor__inner"
            cx="20"
            cy="20"
            r="19.5"
            stroke="white"
          />
        </svg>
      </div>
    </SmoothScrollProvider>
  );
};

export async function getServerSideProps() {
  const data = await client.getSingle(`homepage`, {});

  return { props: { data } };
}

export default Home;
