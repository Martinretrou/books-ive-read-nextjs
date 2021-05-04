/* eslint-disable no-nested-ternary */
import React, { useMemo, useState } from 'react';
import { BooksList, Hero } from '@/components';
import { formatBooks } from '@/helpers/book';
import { Book } from '@/components/books-list';
import styles from '../styles/Home.module.css';
import { client } from '../../prismic-configuration';

type HomeProps = {
  data: any;
};

const Home: React.FC<HomeProps> = ({ data }) => {
  const [search, setSearch] = useState<string | null>(null);

  const books = useMemo(() => {
    if (data?.data?.books) {
      return formatBooks(data?.data?.books).sort((a: Book, b: Book) =>
        a.readIn > b.readIn ? -1 : a.readIn < b.readIn ? 1 : 0,
      );
    }
    return [];
  }, [data]);

  const booksReadThisYear = useMemo(
    () =>
      books?.filter(
        (book: Book) => book.readIn === String(new Date().getFullYear()),
      ).length,
    [data],
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
      totalBooks: books?.length,
      readThisYear: booksReadThisYear,
    }),
    [data, books, booksReadThisYear],
  );
  return (
    <div className={styles.page}>
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
