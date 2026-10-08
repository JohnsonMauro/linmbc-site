/** Layout position of `el` from the document origin, summed over its offset parents. */
const pageOffset = (el: HTMLElement) => {
  let x = 0;
  let y = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    x += node.offsetLeft;
    y += node.offsetTop;
  }
  return { x, y };
};

/**
 * Box of `anchor` in `canvas` coordinates. Offsets, not client rects: they
 * ignore transforms, so the hero's scroll-linked exit does not drag the calm
 * area along, and they work across different offset parents.
 */
export function anchorBox(anchor: HTMLElement, canvas: HTMLElement) {
  const a = pageOffset(anchor);
  const c = pageOffset(canvas);
  return { x: a.x - c.x, y: a.y - c.y, width: anchor.offsetWidth, height: anchor.offsetHeight };
}
