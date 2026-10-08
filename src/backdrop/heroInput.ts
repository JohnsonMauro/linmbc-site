import type { SignalNetwork } from './signalNetwork';

/** MouseEvent.button for the side buttons (the browser's Back and Forward). */
const REAR = 3;
const FRONT = 4;
/** The front button's loop, as in the screenshots' game profile. */
const LOOP_LABELS = ['Ctrl', '2'];
const LOOP_EVERY_MS = 420;
/** A forgotten loop stops by itself (and keeps the animation rule of thumb). */
const LOOP_MAX_MS = 12000;
const TOAST_MS = 2600;

export interface HeroCopy {
  rear: string;
  front: string;
  frontOff: string;
}

const isControl = (target: EventTarget | null) =>
  target instanceof Element &&
  target.closest('a, button, summary, input, select, textarea') !== null;

/**
 * Makes the hero answer the visitor's own mouse: a click sends signals from
 * the cursor to the nearest keys; the rear side button sends Q; the front
 * side button starts and stops a Ctrl+2 loop — the remaps the screenshots
 * show. The side buttons are the browser's Back and Forward, so their default
 * action is cancelled while the pointer is over the hero (verified in
 * Chromium: preventDefault on the pointer events keeps the page; not
 * verifiable headless in Firefox). Returns the teardown.
 */
export function mountHeroInput(
  hero: HTMLElement,
  network: SignalNetwork,
  toast: HTMLElement,
  copy: HeroCopy,
): () => void {
  let loopTimer = 0;
  let loopStop = 0;
  let toastTimer = 0;
  const pointer = { x: 0, y: 0 };

  const say = (text: string) => {
    toast.textContent = text;
    toast.dataset.shown = '';
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => delete toast.dataset.shown, TOAST_MS);
  };

  const fireLoop = () => {
    for (const label of LOOP_LABELS) network.fire(pointer.x, pointer.y, { label });
  };

  const stopLoop = () => {
    window.clearInterval(loopTimer);
    window.clearTimeout(loopStop);
    loopTimer = 0;
  };

  const toggleLoop = () => {
    if (loopTimer) {
      stopLoop();
      say(copy.frontOff);
      return;
    }
    fireLoop();
    loopTimer = window.setInterval(fireLoop, LOOP_EVERY_MS);
    loopStop = window.setTimeout(stopLoop, LOOP_MAX_MS);
    say(copy.front);
  };

  const onPointerDown = (event: PointerEvent) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    if (event.button === REAR || event.button === FRONT) {
      event.preventDefault();
      if (event.button === REAR) {
        // No Q in view (small screens): answer with the nearest keys instead.
        if (network.fire(event.clientX, event.clientY, { label: 'Q' }) === 0) {
          network.fire(event.clientX, event.clientY, { count: 3 });
        }
        say(copy.rear);
      } else {
        toggleLoop();
      }
      return;
    }
    if (event.button === 0 && event.pointerType === 'mouse' && !isControl(event.target)) {
      network.fire(event.clientX, event.clientY, { count: 3 });
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  };

  // Back/Forward navigate on release; cancel every event of the press.
  const cancelSide = (event: MouseEvent) => {
    if (event.button === REAR || event.button === FRONT) event.preventDefault();
  };

  hero.addEventListener('pointerdown', onPointerDown);
  hero.addEventListener('pointermove', onPointerMove, { passive: true });
  for (const type of ['pointerup', 'mousedown', 'mouseup', 'auxclick'] as const) {
    hero.addEventListener(type, cancelSide);
  }

  return () => {
    stopLoop();
    window.clearTimeout(toastTimer);
    hero.removeEventListener('pointerdown', onPointerDown);
    hero.removeEventListener('pointermove', onPointerMove);
    for (const type of ['pointerup', 'mousedown', 'mouseup', 'auxclick'] as const) {
      hero.removeEventListener(type, cancelSide);
    }
  };
}
