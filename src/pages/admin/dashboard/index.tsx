import { auth } from '@/../firebase';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from '@/styles/Dashboard.module.css';

const Dashboard: React.FC = () => {
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
              <p>Total books: </p>
            </div>
          </div>
          <Link href="/admin/dashboard/add-book">Add book</Link>
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  return {};
}

export default Dashboard;
