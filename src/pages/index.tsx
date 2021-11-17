/* eslint-disable no-nested-ternary */
import React, { useMemo, useState } from 'react';
import { BooksList, Filters, Hero } from '@/components';
import { formatBooks } from '@/helpers/book';
import { Book } from '@/components/books-list';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { client } from '../../prismic-configuration';
import styles from '../styles/Home.module.css';

type HomeProps = {
  data: any;
};

const Home: React.FC<HomeProps> = ({ data }) => {
  const [search, setSearch] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const books = useMemo(() => {
    if (data?.data?.books) {
      return formatBooks(data?.data?.books)
        .sort((a: Book, b: Book) =>
          a.readIn > b.readIn ? -1 : a.readIn < b.readIn ? 1 : 0,
        )
        .filter((book) => {
          if (rating) {
            return Number(book.review) === rating;
          }
          return book;
        });
    }
    return [];
  }, [data, rating]);

  const allYears = useMemo(() => {
    if (books) {
      const temp = [...books.filter((book) => book?.readIn)];
      return [...new Set(temp.map((book) => book.readIn))]
        .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
        .reverse();
    }
    return [];
  }, [books]);

  const allAuthors = useMemo(() => {
    if (books) {
      const temp = [...books.filter((book) => book?.author)];
      return [...new Set(temp.map((book) => book.author))];
    }
    return [];
  }, [books]);

  const booksByYear = useMemo(() => {
    if (books && allYears) {
      const temp: any[] = [];
      // eslint-disable-next-line array-callback-return
      allYears?.map((year) => {
        let nextBooks = books.filter((book) => book.readIn === year.toString());
        if (rating) {
          nextBooks = nextBooks.filter(
            (book) => Number(book.review) === rating,
          );
        }
        if (search) {
          nextBooks = nextBooks.filter((book) =>
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
        if (selectedAuthor) {
          nextBooks = nextBooks.filter(
            (book) => book.author === selectedAuthor,
          );
        }
        if (selectedYear) {
          nextBooks = nextBooks.filter((book) => book.readIn === selectedYear);
        }
        temp.push(nextBooks);
      });
      return temp;
    }
    return [];
  }, [books, allYears, rating, search, selectedAuthor, selectedYear]);

  return (
    <main className="container">
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
          <Hero />
          <Filters
            years={allYears}
            authors={allAuthors}
            onSearchChange={setSearch}
            onAuthorChange={setSelectedAuthor}
            onRangeChange={setRating}
            onYearChange={setSelectedYear}
          />
          {booksByYear.map((b: Book[]) => (
            <BooksList key={b[0]?.readIn} books={b} year={b[0]?.readIn} />
          ))}
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  const data = await client.getSingle(`homepage`, {});

  return { props: { data } };
}

export default Home;
