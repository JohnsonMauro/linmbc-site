/**
 * The visitor's pause switch for the hero animation (WCAG 2.2.2: moving
 * content that starts by itself and lasts more than 5 s needs a way to stop
 * it). Both backdrop layers follow it; it lives for the page view only.
 */
let paused = false;
const listeners = new Set<() => void>();

export const isPaused = () => paused;

export function setPaused(next: boolean): void {
  paused = next;
  for (const listener of listeners) listener();
}

/** Calls `onChange` whenever the switch flips; returns the unsubscribe. */
export function onPausedChange(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}
