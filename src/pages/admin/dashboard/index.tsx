import { auth, db } from '@/../firebase';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from '@/styles/Dashboard.module.css';
import { IBook } from '@/../types/book';

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
    <main className="container">
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
          <div className={styles.stats}>
            <div className={styles.stat}>
              <p>
                Total books: <b>{books?.length}</b>
              </p>
            </div>
          </div>
          <Link href="/admin/dashboard/add-book">Add book</Link>
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