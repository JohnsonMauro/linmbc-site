/**
 * Motion preference helpers. If the project already has these (a React hook
 * over the same media query, for example), import from there instead so the
 * query lives in one place.
 */
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/** Read at event time; never during a server render. */
export const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

/** Calls `onChange` whenever the preference flips; returns the unsubscribe. */
export const onReducedMotionChange = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
