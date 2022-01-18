import { auth, db, storage } from '@/../firebase';
import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { BookForm } from '@/components';
import { IBook } from '@/../types/book';
import { getAuthorsFromBooks } from '@/helpers/book';
import kebabCase from 'lodash.kebabcase';
import { v4 as uuidv4 } from 'uuid';

type AddbookProps = {
  books: IBook[];
};

const AddBook = ({ books }: AddbookProps) => {
  const router = useRouter();
  const [user] = useAuthState(auth as any);

  useEffect(() => {
    if (!user) {
      router.push(`/admin/auth`);
    }
  }, [user]);

  const authors = useMemo(() => getAuthorsFromBooks(books), [books]);

  const submitBook = (form: any) => {
    const { image, ...rest } = form;

    const ref = storage.ref(`/covers/${kebabCase(image.alt)}`);
    const uploadTask = ref.put(image.file);

    uploadTask.on(`state_changed`, console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        db.ref(`books/${uuidv4()}`).set({
          ...rest,
          image: {
            url,
            alt: image.alt,
          },
        });
      });
    });
  };

  return (
    <main className="container">
      <NextSeo
        title="Add a book | Books I've read"
        canonical="https://www.booksiveread.fr/"
      />
      <div className="page">
        <div className="wrapper">
          <header className="header">
            <h1>Add a book</h1>
            <Link href="/admin/dashboard">
              <a className="link">← Back to dashboard</a>
            </Link>
          </header>

          <BookForm onSubmit={submitBook} authors={authors} />
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  const ref = db.ref(`books/`);
  const snapshot = await ref.once(`value`);
  const books = Object.values(snapshot.val()) || [];

  return { props: { books } };
}

export default AddBook;
