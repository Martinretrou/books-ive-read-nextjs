import { auth } from '@/../firebase';
import React, { createRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import styles from '@/styles/Dashboard.module.css';

const AddBook: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth as any);
  const [title, setTitle] = useState(``);
  const [author, setAuthor] = useState(``);
  const [year, setYear] = useState(``);
  const file = createRef<HTMLInputElement>();

  useEffect(() => {
    if (!user) {
      router.push(`/admin/auth`);
    }
  }, [user]);

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
            <Link href="/admin/dashboard">Back to dashboard</Link>
          </header>
          <div className={styles.form}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <input
              type="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
            />
            {/* https://fr.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag - fileInput.current.files[0].name */}
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Read in"
            />
            <input type="file" ref={file} placeholder="cover" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddBook;
