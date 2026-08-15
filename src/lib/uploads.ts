/**
 * Helper to resolve image URLs from backend uploads.
 * Defaults to relative '/uploads' so it adapts automatically to any domain
 * (localhost, staging v2, production) via Nginx or Next.js rewrites.
 */
const UPLOADS_BASE = (process.env.NEXT_PUBLIC_UPLOADS_URL || '/uploads').replace(/\/$/, '');

/**
 * Convert any image path to a properly formatted URL.
 *
 * Handles:
 *  - Already-absolute URLs (http/https) → returned as-is
 *  - /uploads/... paths → formatted with UPLOADS_BASE (or kept relative)
 *  - /images/... paths → rewritten to /uploads/ equivalent
 *  - /logo/... paths → rewritten to /uploads/logo/ equivalent
 *  - Empty / null → default fallback image
 */
export function getUploadUrl(path: string | undefined | null): string {
  if (!path) {
    return UPLOADS_BASE === '/uploads'
      ? '/uploads/gallery/pesantren1.png'
      : `${UPLOADS_BASE}/gallery/pesantren1.png`;
  }

  // Already absolute URL - return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If UPLOADS_BASE is relative '/uploads'
  if (UPLOADS_BASE === '/uploads') {
    if (path.startsWith('/uploads/')) return path;
    if (path.startsWith('/images/galery/')) return `/uploads/gallery/${path.slice('/images/galery/'.length)}`;
    if (path.startsWith('/images/')) return `/uploads/${path.slice('/images/'.length)}`;
    if (path.startsWith('/logo/')) return `/uploads/logo/${path.slice('/logo/'.length)}`;
    return `/uploads/${path.replace(/^\//, '')}`;
  }

  // If UPLOADS_BASE is an absolute URL or custom base
  if (path.startsWith('/uploads/')) {
    return `${UPLOADS_BASE}${path.slice('/uploads'.length)}`;
  }
  if (path.startsWith('/images/galery/')) {
    return `${UPLOADS_BASE}/gallery/${path.slice('/images/galery/'.length)}`;
  }
  if (path.startsWith('/images/')) {
    return `${UPLOADS_BASE}/${path.slice('/images/'.length)}`;
  }
  if (path.startsWith('/logo/')) {
    return `${UPLOADS_BASE}/logo/${path.slice('/logo/'.length)}`;
  }
  return `${UPLOADS_BASE}/${path.replace(/^\//, '')}`;
}

/**
 * Shorthand alias
 */
export const imgUrl = getUploadUrl;

