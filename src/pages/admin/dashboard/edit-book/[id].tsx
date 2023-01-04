import { auth, db, storage } from '@/../firebase';
import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { BookForm } from '@/components';
import { IBook } from '@/../types/book';
import { getAuthorsFromBooks } from '@/helpers/book';
import toast, { Toaster } from 'react-hot-toast';

type EditBookProps = {
  books: IBook[];
  book: IBook;
};

const EditBook = ({ books, book }: EditBookProps) => {
  const router = useRouter();
  const [user] = useAuthState(auth as any);

  useEffect(() => {
    if (!user) {
      router.push(`/admin/auth`);
    }
  }, [user]);

  const authors = useMemo(() => getAuthorsFromBooks(books), [books]);

  const submitBook = (form: any) => {
    const { image, hasChangedCover, ...rest } = form;

    if (hasChangedCover) {
      const ref = storage.ref(`/covers/${book.id}`);
      const uploadTask = ref.put(image.file);

      uploadTask.on(`state_changed`, console.log, console.error, () => {
        ref.getDownloadURL().then((url) => {
          db.ref(`books/${book.id}`).set({
            ...rest,
            image: {
              url,
              alt: image.alt,
            },
          });
        });
      });
    } else {
      const promise = db.ref(`books/${book.id}`).set({
        ...rest,
        image: book.image,
      });
      toast.promise(promise, {
        loading: `Loading...`,
        success: `Successfully edited the book !`,
        error: `Error when editing the book`,
      });
    }
  };

  const deleteBook = () => {
    const promise = db.ref(`books/${book.id}`).remove();
    toast.promise(promise, {
      loading: `Loading...`,
      success: `Successfully deleted the book !`,
      error: `Error when deleting the book`,
    });
  };

  return (
    <main>
      <NextSeo
        title="Edit a book | Books I've read"
        canonical="https://www.booksiveread.fr/"
      />
      <div className="page">
        <div className="wrapper">
          <header className="header">
            <h1>Edit a book</h1>
            <Link href="/admin/dashboard/edit-book">
              <p className="link">← Back to book table</p>
            </Link>
          </header>

          <BookForm
            onDelete={deleteBook}
            book={book}
            onSubmit={submitBook}
            authors={authors}
          />
          <Toaster />
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps({ params }: { params: any }) {
  const { id } = params;
  const ref = db.ref(`books/`);
  const snapshot = await ref.once(`value`);
  const books = Object.entries(snapshot.val()).map((item) => ({
    id: item[0],
    ...(item[1] as any),
  }));
  const book = books.find((book) => book.id === id);

  return { props: { books, book } };
}

export default EditBook;
