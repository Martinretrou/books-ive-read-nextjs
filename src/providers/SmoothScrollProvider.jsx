import React, { createContext, useEffect, useState } from 'react';

export const SmoothScrollContext = createContext({
  scroll: null,
});

export const SmoothScrollProvider = ({ children, options }) => {
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    if (!scroll) {
      (async () => {
        try {
          /*eslint-disable */

          const LocomotiveScroll = (await import('locomotive-scroll')).default;
          const dataScrollContainer = document.querySelector(
            '[data-scroll-container]',
          );

          if (!dataScrollContainer) {
            console.warn(
              'locomotive-scroll: [data-scroll-container] dataset was not found. You likely forgot to add it which will prevent Locomotive Scroll to work.',
            );
          }
          setScroll(
            new LocomotiveScroll({
              el: dataScrollContainer ?? undefined,
              ...options,
            }),
          );
        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`);
        }
      })();
    }

    return () => {
      scroll && scroll.destroy();
    };
  }, [scroll]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SmoothScrollContext.Provider value={{ scroll }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

SmoothScrollContext.displayName = 'SmoothScrollContext';
SmoothScrollProvider.displayName = 'SmoothScrollProvider';
