import { AppProps } from 'next/app';
import '@/styles/global.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { hasWindow } from '@/helpers/next';
import * as ga from '../lib/ga';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    if (!scroll && hasWindow()) {
      (async () => {
        try {
          const LocomotiveScroll = (await import(`locomotive-scroll`)).default;

          setScroll(
            new LocomotiveScroll({
              el: document.querySelector(`[data-scroll-container]`),
              smooth: true,
              direction: `vertical`,
            }),
          );
        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`);
        }
      })();
    }

    return () => {
      if (scroll) {
        (scroll as any)?.destroy();
      }
    };
  });

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on(`routeChangeComplete`, handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off(`routeChangeComplete`, handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
