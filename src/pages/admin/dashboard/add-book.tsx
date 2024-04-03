import { auth, db, storage } from '@/../firebase';
import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { BookForm } from '@/components';
import { IBook } from '@/../types/book';
import { getAuthorsFromBooks } from '@/helpers/book';
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';

type AddBookProps = {
  books: IBook[];
};

const AddBook = ({ books }: AddBookProps) => {
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
    const uuid = uuidv4();

    const ref = storage.ref(`/covers/${uuid}`);
    const uploadTask = ref.put(image.file);

    uploadTask.on(`state_changed`, console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        const promise = db.ref(`books/${uuid}`).set({
          ...rest,
          image: {
            url,
            alt: image.alt,
          },
        });
        toast.promise(promise, {
          loading: `Loading...`,
          success: `Successfully added the book !`,
          error: `Error when adding the book`,
        });
      });
    });
  };

  return (
    <main>
      <NextSeo
        title="Add a book | Books I've read"
        canonical="https://www.booksiveread.fr/"
      />
      <div className="page">
        <div className="wrapper">
          <header className="header">
            <h1>Add a book</h1>
            <Link className="link" href="/admin/dashboard">
              ← Back to dashboard
            </Link>
          </header>

          <BookForm onSubmit={submitBook} authors={authors} />
        </div>
      </div>
      <Toaster />
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
