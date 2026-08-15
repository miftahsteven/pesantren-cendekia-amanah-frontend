/**
 * Helper to resolve image URLs from backend uploads.
 * All images previously in /public/images/ are now served by the backend
 * under /uploads/. This function converts relative /images/ and /uploads/
 * paths to full backend URLs.
 */

const UPLOADS_BASE = process.env.NEXT_PUBLIC_UPLOADS_URL ?? 'http://localhost:3001/uploads';

/**
 * Convert any image path to a full URL served by the backend.
 *
 * Handles:
 *  - Already-absolute URLs (http/https) → returned as-is
 *  - /uploads/... paths → prefixed with backend uploads base URL
 *  - /images/... paths → rewritten to /uploads/ equivalent
 *  - Empty / null → empty string
 */
export function getUploadUrl(path: string | undefined | null): string {
  if (!path) return `${UPLOADS_BASE}/gallery/pesantren1.png`;

  // Already absolute URL - return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Already using /uploads/ prefix
  if (path.startsWith('/uploads/')) {
    return `${UPLOADS_BASE}${path.slice('/uploads'.length)}`;
  }

  // Legacy /images/galery/ → /uploads/gallery/ (note: frontend used 'galery' typo)
  if (path.startsWith('/images/galery/')) {
    const rest = path.slice('/images/galery/'.length);
    return `${UPLOADS_BASE}/gallery/${rest}`;
  }

  // Legacy /images/<category>/... → /uploads/<category>/...
  if (path.startsWith('/images/')) {
    const rest = path.slice('/images/'.length);
    return `${UPLOADS_BASE}/${rest}`;
  }

  // Legacy /logo/ paths
  if (path.startsWith('/logo/')) {
    const rest = path.slice('/logo/'.length);
    return `${UPLOADS_BASE}/logo/${rest}`;
  }

  // Relative path without leading slash
  return `${UPLOADS_BASE}/${path}`;
}

/**
 * Shorthand alias
 */
export const imgUrl = getUploadUrl;
