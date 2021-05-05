/* eslint-disable no-nested-ternary */
import React, { useMemo, useState, useEffect } from 'react';
import { BooksList, Hero } from '@/components';
import { formatBooks } from '@/helpers/book';
import { Book } from '@/components/books-list';
import Head from 'next/head';
import LocomotiveScroll from 'locomotive-scroll';
import Menu from '@/helpers/menu';
import { NextSeo } from 'next-seo';
import { client } from '../../prismic-configuration';
import styles from '../styles/Home.module.css';

type HomeProps = {
  data: any;
};

const Home: React.FC<HomeProps> = ({ data }) => {
  const [search, setSearch] = useState<string | null>(null);
  const [rating, setRating] = useState<any>({ min: 0, max: 5 });

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

  const resultQuery = useMemo(() => {
    if (search) {
      return books?.filter((book: Book) =>
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
    return books;
  }, [search, books]);

  const heroData = useMemo(
    () => ({
      title: data?.data.hero_title[0].text,
      description: data?.data.hero_description[0].text,
      onSearchChange: setSearch,
      onRangeChange: setRating,
      rating,
      totalBooks: books?.length,
      readThisYear: booksReadThisYear,
    }),
    [data, rating, books, booksReadThisYear, setSearch, setRating],
  );

  useEffect(() => {
    if (typeof window !== `undefined`) {
      const menuEl = document.querySelector(`.menu`);
      // initialize the smooth scroll
      // const scroll = new LocomotiveScroll({ el: menuEl, smooth: true });

      // initialize custom cursor
      // const cursor = new Cursor(document.querySelector(`.cursor`));

      // initialize menu
      // eslint-disable-next-line no-new
      new Menu(
        menuEl,
        resultQuery?.map((book) => book.image.url),
      );
    }
  }, [resultQuery]);

  return (
    <div className={styles.page}>
      <Head>
        <title>Books I've read</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
        <Hero {...heroData} />
        <BooksList books={resultQuery} />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const data = await client.getSingle(`homepage`, {});

  return { props: { data } };
}

export default Home;
