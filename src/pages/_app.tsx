import { AppProps } from 'next/app';
import '@/styles/global.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import '@/../firebase';
import CursorContextProvider from '@/providers/CursorContext';
import Cursor from '@/components/cursor';
import * as ga from '../lib/ga';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on(`routeChangeComplete`, handleRouteChange);

    return () => {
      router.events.off(`routeChangeComplete`, handleRouteChange);
    };
  }, [router.events]);

  return (
    <CursorContextProvider>
      <Cursor />
      <main data-scroll-container className="container">
        <Component {...pageProps} />
      </main>
    </CursorContextProvider>
  );
}
