/* eslint-disable no-nested-ternary */
import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import Fade from 'react-reveal/Fade';

import { db } from '@/../firebase';
import { IBook } from '@/../types/book';
import useCursorHandlers from '@/hooks/useCursorHandlers';

import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';

import styles from '../styles/BookDetailPage.module.css';

type BookDetailPageProps = {
  book: IBook;
  sameAuthor: IBook[];
};

const BookDetailPage: React.FC<BookDetailPageProps> = ({
  book,
  sameAuthor,
}) => {
  const { onMouseEnter, onMouseLeave } = useCursorHandlers();

  const handleMouseEnter = (e: any) => {
    if (onMouseEnter) onMouseEnter(e, { active: true, expand: true });
  };

  const handleMouseLeave = (e: any) => {
    if (onMouseLeave) onMouseLeave(e, { active: false, expand: false });
  };

  return (
    <main data-scroll-section>
      <div className="page">
        <Head>
          <title>{book?.title}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <NextSeo
          title={book?.title}
          description="Books I've read in the previous years."
          canonical="https://www.booksiveread.fr/"
          openGraph={{
            url: `https://www.booksiveread.fr/`,
            title: book?.title,
            description: book?.title,
            site_name: book?.title,
          }}
          twitter={{
            handle: `@MartinRetrou`,
            cardType: `summary_large_image`,
          }}
        />
        <SmoothScrollProvider options={{ smooth: true }}>
          <div className="wrapper" id="wrapper">
            <Link
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              scroll
              href="/"
            >
              <p className={styles.pageTitle}>Back to homepage</p>
            </Link>
            <section className={styles.detail}>
              <Fade bottom>
                <div
                  className={styles.img}
                  data-scroll
                  data-scroll-speed="1"
                  data-scroll-delay="0.08"
                >
                  <Image
                    width={400}
                    height={600}
                    src={book?.image?.url}
                    alt={book?.image?.alt}
                    priority
                  />
                </div>
              </Fade>

              <div
                className={styles.content}
                data-scroll
                data-scroll-speed="1"
                data-scroll-delay="0.06"
              >
                <Fade bottom delay={250}>
                  <div className="meta">
                    <p className={styles.title}>{book?.title}</p>
                    <p className={styles.author}>Author: {book?.author}</p>
                    {book?.comment && (
                      <p className={styles.comment}>{book?.comment}</p>
                    )}
                  </div>
                </Fade>
                <Fade bottom delay={550}>
                  <>
                    {(!book?.currentlyReading ||
                      book?.currentlyReading === `false`) && (
                      <div className={styles.rating}>
                        <p>
                          Rating: <b>{Number(book?.review)}/5</b>
                        </p>
                      </div>
                    )}
                    {Boolean(book?.currentlyReading) &&
                      book?.currentlyReading !== `false` && (
                        <div className={styles.rating}>
                          <p>Currently reading</p>
                        </div>
                      )}
                  </>
                </Fade>
              </div>
            </section>
            {!!sameAuthor.length && (
              <Fade bottom delay={950}>
                <section className={styles.sameAuthor}>
                  <p className={styles.gridTitle}>By the same author</p>
                  <div className={styles.grid}>
                    {sameAuthor?.map((book, index) => (
                      <Fade bottom delay={index * 50}>
                        <Link
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          scroll
                          href={`/${book.slug}`}
                        >
                          <Image
                            width={200}
                            height={300}
                            src={book.image?.url}
                            alt={book.image?.alt}
                          />
                        </Link>
                      </Fade>
                    ))}
                  </div>
                </section>
              </Fade>
            )}
          </div>
        </SmoothScrollProvider>
      </div>
    </main>
  );
};

export async function getServerSideProps(context: { query: { slug: string } }) {
  const { slug } = context.query;
  const ref = db.ref(`books`).orderByChild(`slug`).equalTo(slug);
  const snapshot = await ref.once(`value`);
  if (snapshot.val()) {
    const book = (Object.values(snapshot.val())[0] as IBook) || null;

    if (book) {
      const ref = db.ref(`books`).orderByChild(`author`).equalTo(book?.author);
      const snapshot = await ref.once(`value`);
      const sameAuthor =
        Object.values(snapshot.val()).filter(
          (item: any) => item.slug !== slug,
        ) || [];

      return { props: { book, sameAuthor } };
    }

    return { props: { book } };
  }

  return { props: { book: null } };
}

export default BookDetailPage;
