import type { Rgb } from './palette';

/** A pre-rendered image drawn centred on a point; `hw`/`hh` are its half-size in CSS px. */
export interface Sprite {
  image: HTMLCanvasElement;
  hw: number;
  hh: number;
}

export const rgba = ([r, g, b]: Rgb, alpha: number) => `rgba(${r}, ${g}, ${b}, ${alpha})`;

const canvasFor = (hw: number, hh: number, dpr: number) => {
  const image = document.createElement('canvas');
  image.width = Math.ceil(hw * 2 * dpr);
  image.height = Math.ceil(hh * 2 * dpr);
  const ctx = image.getContext('2d');
  if (!ctx) return null;
  ctx.scale(dpr, dpr);
  ctx.translate(hw, hh);
  return { image, ctx };
};

export interface GlyphStyle {
  /** Glyph height in CSS px. */
  size: number;
  /** Out-of-focus blur in CSS px (depth of field for the far layers). */
  blur: number;
  /** Glow radius in CSS px. */
  glow: number;
  color: Rgb;
}

/** Room around a glyph for its blur and glow. */
const bleed = ({ blur, glow }: GlyphStyle) => glow + blur * 2 + 2;

const prepare = (ctx: CanvasRenderingContext2D, style: GlyphStyle, dpr: number) => {
  if (style.blur > 0) ctx.filter = `blur(${style.blur}px)`;
  if (style.glow > 0) {
    ctx.shadowColor = rgba(style.color, 0.9);
    ctx.shadowBlur = style.glow * dpr;
  }
  ctx.strokeStyle = rgba(style.color, 1);
  ctx.fillStyle = rgba(style.color, 1);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
};

/**
 * Mouse glyph `size` px tall, drawn like the one in the logo: an outlined
 * body, the split between the two buttons, and the wheel. Blur and glow are
 * baked in once; every frame only stamps the result.
 */
export function mouseSprite(style: GlyphStyle, dpr: number): Sprite | null {
  const { size } = style;
  const w = 0.56 * size;
  const hw = w / 2 + bleed(style);
  const hh = size / 2 + bleed(style);
  const target = canvasFor(hw, hh, dpr);
  if (!target) return null;
  const { image, ctx } = target;
  prepare(ctx, style, dpr);
  ctx.lineWidth = Math.max(1, 0.085 * size);
  ctx.beginPath();
  ctx.roundRect(-w / 2, -size / 2, w, size, w / 2);
  ctx.moveTo(-w / 2, -0.08 * size);
  ctx.lineTo(w / 2, -0.08 * size);
  ctx.moveTo(0, -size / 2);
  ctx.lineTo(0, -0.08 * size);
  ctx.stroke();
  ctx.beginPath();
  ctx.roundRect(-0.06 * size, -0.36 * size, 0.12 * size, 0.2 * size, 0.06 * size);
  ctx.fill();
  return { image, hw, hh };
}

/**
 * Keycap glyph with its label: a rounded outline as tall as `size` and as
 * wide as the label needs. `font` is a CSS font family list; the label is
 * drawn with whatever face is loaded when this runs.
 */
export function keySprite(
  label: string,
  style: GlyphStyle,
  font: string,
  dpr: number,
): Sprite | null {
  const { size } = style;
  const measure = document.createElement('canvas').getContext('2d');
  if (!measure) return null;
  const fontSpec = `600 ${Math.round(0.46 * size)}px ${font}`;
  measure.font = fontSpec;
  const w = Math.max(size, measure.measureText(label).width + 0.6 * size);
  const hw = w / 2 + bleed(style);
  const hh = size / 2 + bleed(style);
  const target = canvasFor(hw, hh, dpr);
  if (!target) return null;
  const { image, ctx } = target;
  prepare(ctx, style, dpr);
  ctx.lineWidth = Math.max(1, 0.07 * size);
  ctx.beginPath();
  ctx.roundRect(-w / 2, -size / 2, w, size, 0.2 * size);
  ctx.stroke();
  ctx.font = fontSpec;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 0, 0.04 * size);
  return { image, hw, hh };
}

/** Soft round light for the signals travelling along the links, and the cursor. */
export function glowSprite(radius: number, core: Rgb, halo: Rgb, dpr: number): Sprite | null {
  const target = canvasFor(radius, radius, dpr);
  if (!target) return null;
  const { image, ctx } = target;
  const light = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
  light.addColorStop(0, rgba(core, 1));
  light.addColorStop(0.25, rgba(core, 0.8));
  light.addColorStop(1, rgba(halo, 0));
  ctx.fillStyle = light;
  ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
  return { image, hw: radius, hh: radius };
}

/** Stamps `sprite` centred on (x, y). */
export function stamp(ctx: CanvasRenderingContext2D, sprite: Sprite, x: number, y: number): void {
  ctx.drawImage(sprite.image, x - sprite.hw, y - sprite.hh, sprite.hw * 2, sprite.hh * 2);
}
