import { auth, db } from '@/../firebase';
import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { BookTable } from '@/components';
import { IBook } from '@/../types/book';

type EditBookListingProps = {
  books: IBook[];
};

const EditBookListing = ({ books }: EditBookListingProps) => {
  const router = useRouter();
  const [user] = useAuthState(auth as any);

  useEffect(() => {
    if (!user) {
      router.push(`/admin/auth`);
    }
  }, [user]);

  const columns = useMemo(
    () => [
      {
        Header: `Books`,
        columns: [
          {
            Header: `Cover`,
            accessor: `image`,
            Cell: ({ cell }: { cell: any }) => (
              <div>
                <img
                  height={100}
                  src={cell?.value?.url}
                  alt={cell?.value?.alt}
                />
              </div>
            ),
          },
          {
            Header: `Title`,
            accessor: `title`,
          },
          {
            Header: `Author`,
            accessor: `author`,
          },
          {
            Header: `Read in`,
            accessor: `readIn`,
            sortDescFirst: true,
          },
          {
            Header: `Review`,
            accessor: `review`,
          },
          {
            Header: `Actions`,
            accessor: `actions`,
            Cell: ({ cell }: { cell: any }) => (
              <div>
                <Link
                  href={`/admin/dashboard/edit-book/${cell?.row?.original?.id}`}
                >
                  <a className="link">Edit book</a>
                </Link>
              </div>
            ),
          },
        ],
      },
    ],
    [],
  );

  return (
    <main>
      <NextSeo
        title="Edits books | Books I've read"
        canonical="https://www.booksiveread.fr/"
      />
      <div className="page">
        <div className="wrapper">
          <header className="header">
            <h1>Edit book</h1>
            <Link href="/admin/dashboard">
              <a className="link">← Back to dashboard</a>
            </Link>
          </header>

          <BookTable columns={columns} data={books} />
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  const ref = db.ref(`books/`);
  const snapshot = await ref.once(`value`);
  const books = Object.entries(snapshot.val()).map((item) => ({
    id: item[0],
    ...(item[1] as any),
  }));

  return { props: { books } };
}

export default EditBookListing;
