/* eslint-disable no-nested-ternary */
import React, { useMemo, useState, useEffect } from 'react';
import { BooksList, Hero, Filters } from '@/components';
import { formatBooks } from '@/helpers/book';
import { Book } from '@/components/books-list';
import Head from 'next/head';
import Menu from '@/helpers/menu';
import { NextSeo } from 'next-seo';
import GridOverlay from '@/components/grid-overlay';
import { client } from '../../prismic-configuration';
import styles from '../styles/Home.module.css';
import { SmoothScrollProvider } from '../providers/ScrollProvider';

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
      const temp = [...books.filter((book) => book?.readIn)];
      return [...new Set(temp.map((book) => book.readIn))]
        .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
        .reverse();
    }
    return [];
  }, [books]);

  const booksByYear = useMemo(() => {
    if (books && allYears) {
      const temp = [];
      allYears?.map((year) => {
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

  const currentlyReading = useMemo(() => {
    if (books) {
      return books.filter((book) => book.currentlyReading);
    }
    return [];
  }, [books]);

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

  // useEffect(() => {
  //   if (typeof window !== `undefined` && !isMobile) {
  //     const menuEl = document.querySelector(`.menu`);
  //     // eslint-disable-next-line no-new
  //     new Menu(
  //       menuEl,
  //       resultQuery?.map((book) => book.image.url),
  //     );
  //   }
  // }, [windowSize?.width, resultQuery]);

  return (
    <main data-scroll-container className="container">
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
          <div data-scroll-section className={styles.wrapper}>
            <GridOverlay />
            <Hero />
            {/* <Filters {...heroData} /> */}
            {currentlyReading.length > 0 && (
              <BooksList
                books={currentlyReading}
                title="CURRENTLY READING"
                isMobile={isMobile}
                hideRating
                orange
              />
            )}
            {booksByYear.map((b: Book[]) => (
              <BooksList
                key={b[0].readIn}
                books={b}
                year={b[0].readIn}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </SmoothScrollProvider>
    </main>
  );
};

export async function getServerSideProps() {
  const data = await client.getSingle(`homepage`, {});

  return { props: { data } };
}

export default Home;
