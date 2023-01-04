import isTouchDevice from '@/helpers/isTouchDevice';
import useMousePosition from '@/hooks/useMousePosition';
import { CursorContext } from '@/providers/CursorContext';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import styles from '../../styles/Cursor.module.css';

const Cursor = () => {
  if (typeof window !== `undefined` && document && isTouchDevice) {
    return null;
  }

  const { clientX, clientY } = useMousePosition();
  const [cursor] = useContext(CursorContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    if (typeof window !== `undefined`) {
      document.body.addEventListener(`mouseenter`, handleMouseEnter);
      document.body.addEventListener(`mouseleave`, handleMouseLeave);
    }

    return () => {
      if (typeof window !== `undefined`) {
        document.body.removeEventListener(`mouseenter`, handleMouseEnter);
        document.body.removeEventListener(`mouseleave`, handleMouseLeave);
      }
    };
  }, []);

  const displayArrow = useMemo(
    () =>
      cursor.active && (!!cursor.expand || !!cursor.previous || !!cursor.next),
    [cursor],
  );

  const allowedKeys = ['expand', 'previous', 'next'];

  const arrowClass = useMemo(() => {
    if (displayArrow) {
      return Object.entries(cursor).filter(
        (e) => !!e[1] && allowedKeys.includes(e[0]),
      )[0][0];
    }
    return null;
  }, [displayArrow, cursor]);

  return (
    <div className={styles.cursor}>
      {displayArrow && (
        <svg
          className={`cursor-${arrowClass}`}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          style={{
            position: `absolute`,
            pointerEvents: `none`,
            left: clientX,
            top: clientY,
            transition: `transform .2s ease-in-out`,
          }}
        >
          <path
            vectorEffect="non-scaling-stroke"
            d="M18.25 15.5a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h7.19L6.22 16.72a.75.75 0 1 0 1.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"
          />
        </svg>
      )}
      <svg
        width={50}
        height={50}
        viewBox="0 0 50 50"
        style={{
          position: `absolute`,
          pointerEvents: `none`,
          left: clientX,
          top: clientY,
          transform: `translate(-50%, -50%) scale(${cursor.active ? 3.5 : 2})`,
          stroke: cursor.active ? `#d74528` : `white`,
          strokeWidth: 1,
          fill: 'transparent',
          transition: `transform .2s ease-in-out`,
          opacity: isVisible && clientX > 1 ? 1 : 0,
        }}
      >
        <circle cx="25" cy="25" r="8" />
      </svg>
    </div>
  );
};

export default Cursor;
