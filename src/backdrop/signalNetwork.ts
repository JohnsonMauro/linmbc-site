import { frameLoop } from './frameLoop';
import { anchorBox } from './offset';
import { lighten, readPalette, type Rgb } from './palette';
import { seededRandom } from './random';
import { glowSprite, keySprite, mouseSprite, rgba, stamp, type Sprite } from './sprites';

/**
 * Depth layers, far to near. Farther glyphs are smaller, dimmer, blurred and
 * drift and parallax less; links only join a layer to itself or a neighbour.
 */
const LAYERS = [
  {
    share: 0.45,
    size: 14,
    alpha: 0.4,
    blur: 1.4,
    glow: 0,
    speed: 4,
    parallax: 6,
    link: 150,
    line: 0.6,
  },
  {
    share: 0.35,
    size: 20,
    alpha: 0.7,
    blur: 0.3,
    glow: 6,
    speed: 7,
    parallax: 14,
    link: 190,
    line: 0.9,
  },
  {
    share: 0.2,
    size: 28,
    alpha: 0.95,
    blur: 0,
    glow: 12,
    speed: 10,
    parallax: 26,
    link: 230,
    line: 1.2,
  },
] as const;

/** Keys a mouse button is typically remapped to in an ARPG. */
const KEYS = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  '1',
  '2',
  '3',
  '4',
  '5',
  'F',
  'Tab',
  'Ctrl',
  'Shift',
  'Space',
];
/** Share of the glyphs that are mice; the rest are keys. */
const MOUSE_SHARE = 0.22;
const LABEL_FONT = '"JetBrains Mono", ui-monospace, monospace';

/** One glyph per this many CSS px² of hero, within the bounds below. */
const AREA_PER_NODE = 13000;
const MIN_NODES = 24;
const MAX_NODES = 100;
/** Nodes wrap this far outside the canvas, so they never pop in on screen. */
const WRAP_MARGIN = 60;
const MAX_DPR = 2;
/** Remap signals (mouse → key): spawn interval, cap, travel time. */
const PULSE_EVERY_MS = 700;
const MAX_PULSES = 7;
const PULSE_SECONDS = 1.5;
/** Signals fired by the visitor travel faster and may exceed the cap. */
const FIRED_SECONDS = 0.7;
const MAX_FIRED = 16;
/** How long a key stays lit after a signal reaches it. */
const FLASH_SECONDS = 0.9;
/** Reach of the cursor's own links, and of its highlight on nearby glyphs. */
const CURSOR_LINK = 170;
const CURSOR_GLOW = 220;
const POINTER_EASE = 0.06;
const SEED = 20261007;

/** Theme tokens in global.css (plain hex). */
const PALETTE = { blue: '--color-blue', gold: '--color-gold' };

type Layer = 0 | 1 | 2;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  layer: Layer;
  /** Index into KEYS, or -1 for a mouse. */
  key: number;
  phase: number;
  flash: number;
  /** Drawn position (after parallax) and visibility, refreshed every frame. */
  px: number;
  py: number;
  fade: number;
}

interface Point {
  px: number;
  py: number;
}

interface Pulse {
  from: Point;
  to: Node;
  t: number;
  seconds: number;
}

export interface SignalNetwork {
  /**
   * Sends signals from the viewport point (x, y) to keys: the `count` nearest
   * ones, or only those labelled `label`. Used by clicks and the side-button
   * easter egg. Returns how many keys were reached.
   */
  fire(x: number, y: number, options: { count?: number; label?: string }): number;
  stop(): void;
}

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

const isKey = (node: Node) => node.key >= 0;

/**
 * Starts the signal network on `canvas`: mice and keys in three depth layers
 * drift and link to their neighbours, and gold signals travel from mice to
 * keys, lighting them up — a remap, drawn. The cursor joins as one more node.
 * The area behind `anchor` (the hero copy) stays empty so the title reads
 * cleanly. The canvas gets `data-ready` after its first frame.
 */
export function mountSignalNetwork(canvas: HTMLCanvasElement, anchor: HTMLElement): SignalNetwork {
  const inert: SignalNetwork = { fire: () => 0, stop: () => undefined };
  const ctx = canvas.getContext('2d');
  const brand = readPalette(PALETTE);
  if (!ctx || !brand) return inert;
  // Glyphs and links read as light over the tide, a step above the logo blue.
  const colors: Record<'glint' | 'line' | 'gold' | 'goldGlow', Rgb> = {
    glint: lighten(brand.blue, 0.5),
    line: lighten(brand.blue, 0.25),
    gold: brand.gold,
    goldGlow: lighten(brand.gold, 0.35),
  };
  const random = seededRandom(SEED);

  let width = 0;
  let height = 0;
  let dpr = 0;
  let nodes: Node[] = [];
  let mice: (Sprite | null)[] = [];
  let keys: (Sprite | null)[][] = [];
  let litKeys: (Sprite | null)[][] = [];
  let signal: Sprite | null = null;
  let goldSignal: Sprite | null = null;
  const pool = { x: 0, y: 0, rx: 1, ry: 1 };
  const pulses: Pulse[] = [];
  const parallaxTarget = { x: 0, y: 0 };
  const parallax = { x: 0, y: 0 };
  const cursor = { x: 0, y: 0, active: false };
  let needsResize = true;
  let lastDraw = 0;
  let lastPulse = 0;

  const pickLayer = (): Layer => {
    const roll = random();
    if (roll < LAYERS[0].share) return 0;
    return roll < LAYERS[0].share + LAYERS[1].share ? 1 : 2;
  };

  const createNode = (): Node => {
    const layer = pickLayer();
    const angle = random() * Math.PI * 2;
    const speed = LAYERS[layer].speed * (0.6 + random() * 0.8);
    return {
      x: random() * width,
      y: random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      layer,
      key: random() < MOUSE_SHARE ? -1 : Math.floor(random() * KEYS.length),
      phase: random() * Math.PI * 2,
      flash: 0,
      px: 0,
      py: 0,
      fade: 1,
    };
  };

  const bake = () => {
    mice = LAYERS.map((layer) => mouseSprite({ ...layer, color: colors.glint }, dpr));
    keys = LAYERS.map((layer) =>
      KEYS.map((label) => keySprite(label, { ...layer, color: colors.glint }, LABEL_FONT, dpr)),
    );
    litKeys = LAYERS.map((layer) =>
      KEYS.map((label) =>
        keySprite(label, { ...layer, glow: layer.glow + 10, color: colors.gold }, LABEL_FONT, dpr),
      ),
    );
    signal = glowSprite(10, colors.glint, colors.line, dpr);
    goldSignal = glowSprite(11, colors.goldGlow, colors.gold, dpr);
  };

  const resize = () => {
    const nextWidth = canvas.clientWidth;
    const nextHeight = canvas.clientHeight;
    // A transient tiny layout (full-page captures pass through 1×1) would
    // reseed nothing useful and break the sprite maths: skip it.
    if (nextWidth < 32 || nextHeight < 32) return;
    const nextDpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    if (nextDpr !== dpr) {
      dpr = nextDpr;
      bake();
    }
    canvas.width = Math.floor(nextWidth * dpr);
    canvas.height = Math.floor(nextHeight * dpr);

    // Keep the glyphs already on screen: rescale their positions, then add or
    // drop some so the density holds.
    const sx = width ? nextWidth / width : 1;
    const sy = height ? nextHeight / height : 1;
    width = nextWidth;
    height = nextHeight;
    const count = Math.round(
      Math.min(MAX_NODES, Math.max(MIN_NODES, (width * height) / AREA_PER_NODE)),
    );
    nodes = nodes.slice(0, count).map((node) => ({ ...node, x: node.x * sx, y: node.y * sy }));
    while (nodes.length < count) nodes.push(createNode());
    nodes.sort((a, b) => a.layer - b.layer);
    pulses.length = 0;

    const box = anchorBox(anchor, canvas);
    pool.x = box.x + box.width / 2;
    pool.y = box.y + box.height / 2;
    pool.rx = Math.max(box.width * 0.55, 120) + 30;
    pool.ry = Math.max(box.height * 0.6, 60) + 40;
    needsResize = false;
  };

  const move = (dt: number, time: number) => {
    const ease = Math.min(1, dt * 60 * POINTER_EASE);
    parallax.x += (parallaxTarget.x - parallax.x) * ease;
    parallax.y += (parallaxTarget.y - parallax.y) * ease;
    for (const node of nodes) {
      const layer = LAYERS[node.layer];
      node.x += node.vx * dt;
      node.y += node.vy * dt;
      if (node.x < -WRAP_MARGIN) node.x += width + WRAP_MARGIN * 2;
      else if (node.x > width + WRAP_MARGIN) node.x -= width + WRAP_MARGIN * 2;
      if (node.y < -WRAP_MARGIN) node.y += height + WRAP_MARGIN * 2;
      else if (node.y > height + WRAP_MARGIN) node.y -= height + WRAP_MARGIN * 2;
      node.px = node.x - parallax.x * layer.parallax;
      node.py = node.y - parallax.y * layer.parallax;
      const dx = (node.px - pool.x) / pool.rx;
      const dy = (node.py - pool.y) / pool.ry;
      const twinkle = 0.85 + 0.15 * Math.sin(time * 0.8 + node.phase);
      node.fade = smoothstep(0.75, 1.35, Math.hypot(dx, dy)) * twinkle;
      node.flash = Math.max(0, node.flash - dt / FLASH_SECONDS);
    }
  };

  const cursorBoost = (node: Node) =>
    cursor.active
      ? 1 +
        0.8 * (1 - smoothstep(0, CURSOR_GLOW, Math.hypot(node.px - cursor.x, node.py - cursor.y)))
      : 1;

  /** Draws the links and returns the mouse → key ones, signals' candidate paths. */
  const drawLinks = () => {
    const remaps: [Node, Node][] = [];
    ctx.strokeStyle = rgba(colors.line, 1);
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      if (!a || a.fade <= 0) continue;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        if (!b || b.fade <= 0 || b.layer - a.layer > 1) continue;
        const layer = LAYERS[Math.min(a.layer, b.layer) as Layer];
        const distance = Math.hypot(a.px - b.px, a.py - b.py);
        if (distance >= layer.link) continue;
        const strength = (1 - distance / layer.link) ** 1.4;
        ctx.globalAlpha = Math.min(
          1,
          strength * layer.alpha * 0.6 * Math.min(a.fade, b.fade) * cursorBoost(a),
        );
        ctx.lineWidth = layer.line;
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.stroke();
        if (Math.max(a.layer, b.layer) === 0 || isKey(a) === isKey(b)) continue;
        remaps.push(isKey(a) ? [b, a] : [a, b]);
      }
    }
    return remaps;
  };

  const drawCursor = () => {
    if (!cursor.active) return;
    ctx.strokeStyle = rgba(colors.line, 1);
    ctx.lineWidth = 0.8;
    for (const node of nodes) {
      if (node.layer === 0 || node.fade <= 0 || !isKey(node)) continue;
      const distance = Math.hypot(node.px - cursor.x, node.py - cursor.y);
      if (distance >= CURSOR_LINK) continue;
      ctx.globalAlpha = (1 - distance / CURSOR_LINK) ** 1.3 * 0.5 * node.fade;
      ctx.beginPath();
      ctx.moveTo(cursor.x, cursor.y);
      ctx.lineTo(node.px, node.py);
      ctx.stroke();
    }
    if (signal) {
      ctx.globalAlpha = 0.7;
      stamp(ctx, signal, cursor.x, cursor.y);
    }
  };

  const drawPulses = (remaps: [Node, Node][], dt: number, now: number) => {
    const ambient = pulses.filter((pulse) => pulse.seconds === PULSE_SECONDS).length;
    if (dt > 0 && remaps.length > 0 && ambient < MAX_PULSES && now - lastPulse > PULSE_EVERY_MS) {
      const remap = remaps[Math.floor(random() * remaps.length)];
      if (remap) pulses.push({ from: remap[0], to: remap[1], t: 0, seconds: PULSE_SECONDS });
      lastPulse = now;
    }
    if (!goldSignal) return;
    ctx.globalCompositeOperation = 'lighter';
    for (let i = pulses.length - 1; i >= 0; i--) {
      const pulse = pulses[i];
      if (!pulse) continue;
      pulse.t += dt / pulse.seconds;
      const { from, to } = pulse;
      if (pulse.t >= 1) {
        to.flash = 1;
        pulses.splice(i, 1);
        continue;
      }
      const t = pulse.t * pulse.t * (3 - 2 * pulse.t);
      ctx.globalAlpha = Math.sin(Math.PI * pulse.t) * Math.max(0.35, to.fade);
      stamp(ctx, goldSignal, from.px + (to.px - from.px) * t, from.py + (to.py - from.py) * t);
    }
    ctx.globalCompositeOperation = 'source-over';
  };

  const drawGlyphs = () => {
    for (const node of nodes) {
      if (node.fade <= 0 && node.flash <= 0) continue;
      const layer = LAYERS[node.layer];
      const base = Math.min(1, layer.alpha * node.fade * cursorBoost(node));
      const sprite = isKey(node) ? keys[node.layer]?.[node.key] : mice[node.layer];
      if (sprite) {
        ctx.globalAlpha = base * (1 - node.flash);
        stamp(ctx, sprite, node.px, node.py);
      }
      const lit = isKey(node) && node.flash > 0 ? litKeys[node.layer]?.[node.key] : null;
      if (lit) {
        // A lit key shows even inside the calm pool: it answers the visitor.
        ctx.globalAlpha = Math.min(1, node.flash * Math.max(base, 0.6));
        stamp(ctx, lit, node.px, node.py);
      }
    }
  };

  const draw = (now: number, still: boolean) => {
    if (needsResize) resize();
    if (width === 0) return;
    // Still frames (reduced motion, paused): nothing moves, no signal starts.
    const dt = still || lastDraw === 0 ? 0 : Math.min(0.05, (now - lastDraw) / 1000);
    lastDraw = now;
    move(dt, still ? 0 : now / 1000);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const remaps = drawLinks();
    drawCursor();
    drawPulses(remaps, dt, now);
    drawGlyphs();
    ctx.globalAlpha = 1;
    canvas.dataset.ready = '';
  };

  const loop = frameLoop(canvas, draw);

  const fire: SignalNetwork['fire'] = (x, y, { count = 3, label }) => {
    const box = canvas.getBoundingClientRect();
    const origin = { px: x - box.left, py: y - box.top };
    const visible = nodes.filter((node) => isKey(node) && node.fade > 0.15);
    const targets = (
      label === undefined ? visible : visible.filter((node) => KEYS[node.key] === label)
    )
      .map((node) => ({ node, distance: Math.hypot(node.px - origin.px, node.py - origin.py) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, label === undefined ? count : MAX_FIRED)
      .map(({ node }) => node);
    if (loop.still) {
      // No travel without motion: light the keys at once, then let them go.
      for (const node of targets) node.flash = 1;
      loop.redraw();
      window.setTimeout(() => {
        for (const node of targets) node.flash = 0;
        loop.redraw();
      }, FLASH_SECONDS * 1000);
    } else {
      const room = Math.max(0, MAX_FIRED - pulses.length);
      for (const node of targets.slice(0, room)) {
        pulses.push({ from: origin, to: node, t: 0, seconds: FIRED_SECONDS });
      }
    }
    return targets.length;
  };

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch' || loop.still) return;
    parallaxTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
    parallaxTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
    const box = canvas.getBoundingClientRect();
    cursor.x = event.clientX - box.left;
    cursor.y = event.clientY - box.top;
    cursor.active =
      cursor.x >= 0 && cursor.y >= 0 && cursor.x <= box.width && cursor.y <= box.height;
  };

  const onPointerLeave = () => {
    cursor.active = false;
  };

  const resizeObserver = new ResizeObserver(() => {
    needsResize = true;
    loop.redraw();
  });
  resizeObserver.observe(canvas);
  resizeObserver.observe(anchor);

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onPointerLeave);

  return {
    fire,
    stop() {
      loop.stop();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    },
  };
}
