export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
  'https://potrankinz.vercel.app'

export function absoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }

  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE_URL}${path}`
}
