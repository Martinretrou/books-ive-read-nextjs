import { useContext, useCallback } from 'react';
import { CursorContext } from '../providers/CursorContext';
import isTouchDevice from '../helpers/isTouchDevice';

const defaultOptions = {
  active: false,
  expand: false,
  previous: false,
  next: false,
};

const useCursorHandlers = (
  options: {
    onMouseEnter?: (event: any, eventOptions?: any) => void;
    onMouseLeave?: (event: any, eventOptions?: any) => void;
  } = {},
) => {
  if (typeof window !== `undefined` && document && isTouchDevice) {
    return options;
  }

  const [cursor, setCursor] = useContext(CursorContext);

  const toggleCursor = (eventOptions: any) => {
    setCursor({ ...defaultOptions, ...eventOptions });
  };

  const onMouseEnter = useCallback((event, eventOptions) => {
    if (options.onMouseEnter) {
      options.onMouseEnter(event);
    }
    toggleCursor(eventOptions);
  }, []);

  const onMouseLeave = useCallback((event, eventOptions) => {
    if (options.onMouseLeave) {
      options.onMouseLeave(event);
    }
    toggleCursor(eventOptions);
  }, []);

  return { onMouseEnter, onMouseLeave };
};

export default useCursorHandlers;
