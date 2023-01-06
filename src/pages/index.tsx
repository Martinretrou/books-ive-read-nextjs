/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { BooksGrid, BooksList, Hero } from '@/components';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { db } from '@/../firebase';
import { IBook } from '@/../types/book';
import dynamic from 'next/dynamic';

import {
  SmoothScrollContext,
  SmoothScrollProvider,
} from '@/providers/SmoothScrollProvider';
import Loader from '@/components/loader';

import CursorContextProvider from '@/providers/CursorContext';
import Cursor from '@/components/cursor';

const Lightbox = dynamic(() => import(`../components/lightbox`));

type HomeProps = {
  data: IBook[];
};

const Home: React.FC<HomeProps> = ({ data }) => {
  const [allBooks, setAllBooks] = useState<IBook[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const isLoaded = useMemo(() => !!allBooks.length, [allBooks]);

  const [focusedItem, setFocusedItem] = useState<{
    yearIndex: any;
    bookIndex: number | null;
  } | null>(null);

  const { scroll } = useContext(SmoothScrollContext);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const ref = db.ref(`books/`);
        const snapshot = await ref.once(`value`);
        const books = Object.values(snapshot.val()) || ([] as IBook[]);
        const filtered = books;
        if (filtered) {
          filtered.sort((a: any, b: any) =>
            Number(a.readIn) > Number(b.readIn)
              ? -1
              : Number(a.readIn) < Number(b.readIn)
              ? 1
              : 0,
          );
        }
        setAllBooks(filtered as IBook[]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllBooks();
  }, []);

  const books = useMemo(() => {
    if (allBooks || data) {
      return (allBooks || data).sort((a: IBook, b: IBook) =>
        a.readIn > b.readIn ? -1 : a.readIn < b.readIn ? 1 : 0,
      );
    }
    return [];
  }, [allBooks, data]);

  const allYears = useMemo(() => {
    if (allBooks || books) {
      const temp = [...(allBooks || books).filter((book) => book?.readIn)];
      return [...new Set(temp.map((book) => String(book.readIn)))]
        .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
        .reverse();
    }
    return [];
  }, [allBooks, books]);

  // const allAuthors = useMemo(() => getAuthorsFromBooks(allBooks || books), [
  //   allBooks || books,
  // ]);

  const booksByYear = useMemo(() => {
    if ((allBooks || books) && allYears) {
      const temp: any[] = [];
      // eslint-disable-next-line array-callback-return
      allYears?.map((year) => {
        let nextBooks = (allBooks || books).filter(
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
  }, [allBooks, books, allYears, rating, search, selectedAuthor, selectedYear]);

  console.log({ booksByYear });

  return (
    <CursorContextProvider>
      <Cursor />
      <main data-scroll-section>
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
          {isLoaded ? (
            <SmoothScrollProvider options={{ smooth: true }}>
              <div className="wrapper" id="wrapper">
                <Hero />
                <BooksGrid books={books} />
                {/* <Filters
            years={allYears}
            authors={allAuthors}
            onSearchChange={setSearch}
            onAuthorChange={setSelectedAuthor}
            onRangeChange={setRating}
            onYearChange={setSelectedYear}
          /> */}
                {booksByYear.map((b: IBook[], yearIndex: number) => (
                  <BooksList
                    key={b[0]?.readIn}
                    books={b}
                    year={b[0]?.readIn}
                    handleClick={(bookIndex) => {
                      setFocusedItem({ yearIndex, bookIndex });
                      (scroll as any)?.stop();
                    }}
                  />
                ))}
              </div>
              <Lightbox
                books={booksByYear[focusedItem?.yearIndex]}
                selectedIndex={focusedItem?.bookIndex}
                onIndexChange={(bookIndex) => {
                  setFocusedItem({
                    yearIndex: focusedItem?.yearIndex,
                    bookIndex,
                  });
                }}
              />
            </SmoothScrollProvider>
          ) : (
            <Loader />
          )}
        </div>
      </main>
    </CursorContextProvider>
  );
};

export async function getServerSideProps() {
  const ref = db.ref(`books/`).limitToLast(30);
  const snapshot = await ref.once(`value`);
  const books = Object.values(snapshot.val()) || [];

  return { props: { data: books } };
}

export default Home;
