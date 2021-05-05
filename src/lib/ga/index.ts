import { hasWindow } from '@/helpers/next';

// log the pageview with their URL
export const pageview = (url) => {
  if (hasWindow()) {
    window.gtag(`config`, process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
  }
};

// log specific events happening.
export const event = ({ action, params }) => {
  if (hasWindow()) {
    window.gtag(`event`, action, params);
  }
};
