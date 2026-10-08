const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Path of a file in public/, under the site's base path. */
export function asset(path: string): string {
  return `${base}/${path.replace(/^\//, '')}`;
}
