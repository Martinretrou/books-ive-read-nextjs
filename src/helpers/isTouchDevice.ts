const isTouchDevice =
  (typeof window !== `undefined` && `ontouchstart` in window) ||
  (typeof navigator !== `undefined` && (navigator as any).MaxTouchPoints > 0) ||
  (typeof navigator !== `undefined` && (navigator as any).msMaxTouchPoints > 0);

export default isTouchDevice;
