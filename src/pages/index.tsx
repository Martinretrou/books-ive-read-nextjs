/* eslint-disable no-nested-ternary */
import React, { useMemo, useState } from 'react';
import { BooksList, Filters, Hero } from '@/components';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { db } from '@/../firebase';
import { IBook } from '@/../types/book';
import { getAuthorsFromBooks } from '@/helpers/book';

type HomeProps = {
  data: IBook[];
};

const Home: React.FC<HomeProps> = ({ data }) => {
  const [search, setSearch] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const books = useMemo(() => {
    if (data) {
      return data.sort((a: IBook, b: IBook) =>
        a.readIn > b.readIn ? -1 : a.readIn < b.readIn ? 1 : 0,
      );
    }
    return [];
  }, [data]);

  const allYears = useMemo(() => {
    if (books) {
      const temp = [...books.filter((book) => book?.readIn)];
      return [...new Set(temp.map((book) => String(book.readIn)))]
        .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
        .reverse();
    }
    return [];
  }, [books]);

  const allAuthors = useMemo(() => getAuthorsFromBooks(books), [books]);

  const booksByYear = useMemo(() => {
    if (books && allYears) {
      const temp: any[] = [];
      // eslint-disable-next-line array-callback-return
      allYears?.map((year) => {
        let nextBooks = books.filter(
          (book) => String(book.readIn) === String(year),
        );
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
    <main>
      <div className="page">
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
        <div className="wrapper">
          <Hero />
          <Filters
            years={allYears}
            authors={allAuthors}
            onSearchChange={setSearch}
            onAuthorChange={setSelectedAuthor}
            onRangeChange={setRating}
            onYearChange={setSelectedYear}
          />
          {booksByYear.map((b: IBook[]) => (
            <BooksList key={b[0]?.readIn} books={b} year={b[0]?.readIn} />
          ))}
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  const ref = db.ref(`books/`);
  const snapshot = await ref.once(`value`);
  const books = Object.values(snapshot.val()) || [];

  return { props: { data: books } };
}

export default Home;
