import { isPaused, onPausedChange } from './motion';
import { onReducedMotionChange, prefersReducedMotion } from './reducedMotion';

export interface FrameLoop {
  /** True under reduced motion or while paused: only still frames are drawn. */
  readonly still: boolean;
  /** Draws one frame now if the loop is idle (still) and on screen. */
  redraw(): void;
  stop(): void;
}

/**
 * Animation loop for a hero backdrop layer. It runs only while `target` is on
 * screen and the tab is visible; under reduced motion, or while the visitor
 * has paused it, it draws a single still frame instead (`still` is true), and
 * follows both switches if they change. `frameMs` caps the frame rate (0 =
 * every animation frame). The first frame is drawn during this call, so `draw`
 * must not depend on the returned object.
 */
export function frameLoop(
  target: Element,
  draw: (now: number, still: boolean) => void,
  frameMs = 0,
): FrameLoop {
  let still = prefersReducedMotion() || isPaused();
  let visible = true;
  let lastFrame = 0;
  let raf = 0;

  const cancel = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    if (now - lastFrame < frameMs) return;
    lastFrame = now;
    draw(now, false);
  };

  const sync = () => {
    cancel();
    if (!visible || document.hidden) return;
    if (still) draw(performance.now(), true);
    else raf = requestAnimationFrame(loop);
  };

  const refresh = () => {
    still = prefersReducedMotion() || isPaused();
    sync();
  };

  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? false;
    sync();
  });
  intersection.observe(target);

  const offMotion = onReducedMotionChange(refresh);
  const offPause = onPausedChange(refresh);
  document.addEventListener('visibilitychange', sync);
  sync();

  return {
    get still() {
      return still;
    },
    redraw() {
      if (still && visible && !document.hidden) draw(performance.now(), true);
    },
    stop() {
      cancel();
      intersection.disconnect();
      offMotion();
      offPause();
      document.removeEventListener('visibilitychange', sync);
    },
  };
}
