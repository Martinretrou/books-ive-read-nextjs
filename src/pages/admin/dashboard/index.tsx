import { auth, db } from '@/../firebase';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from '@/styles/Dashboard.module.css';
import { IBook } from '@/../types/book';
import { BooksByYearChart, MostReadAuthorBarChart } from '@/components';

type DashboardProps = {
  books: IBook[];
};

const Dashboard = ({ books }: DashboardProps) => {
  const router = useRouter();
  const [user] = useAuthState(auth as any);

  useEffect(() => {
    if (!user) {
      router.push(`/admin/auth`);
    }
  }, [user]);

  return (
    <main>
      <NextSeo
        title="Dashboard | Books I've read"
        canonical="https://www.booksiveread.fr/"
      />
      <div className="page">
        <div className="wrapper">
          <header className="header">
            <h1>Dashboard</h1>
            <p>Logged as: {user?.email}</p>
          </header>
          <div className={styles.actions}>
            <div className={styles.action}>
              <p>
                Total books: <b>{books?.length}</b>
              </p>
            </div>
            <div className={styles.action}>
              <Link href="/admin/dashboard/add-book">
                <button type="button">Add book</button>
              </Link>
            </div>
            <div className={styles.action}>
              <Link href="/admin/dashboard/edit-book">
                <button type="button">Edit books</button>
              </Link>
            </div>
          </div>
          <div className={styles.graphs}>
            <BooksByYearChart books={books} />
            <MostReadAuthorBarChart books={books} />
          </div>
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

export default Dashboard;
