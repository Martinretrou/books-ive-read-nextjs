import { auth, signInWithEmailAndPassword } from '@/../firebase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Auth: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [user, loading, error] = useAuthState(auth as any);

  useEffect(() => {
    if (user && !error && !loading) {
      router.push(`/admin/dashboard`);
    }
  }, [user, error, loading]);

  return (
    <main className="container">
      <form>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="button"
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
      </form>
    </main>
  );
};

export async function getServerSideProps() {
  return {};
}

export default Auth;
