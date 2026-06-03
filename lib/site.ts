const VERCEL_SITE_URL = 'https://potrankinz.vercel.app'

function normalizeUrl(url: string) {
  return url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `https://${url}`
}

export const SITE_URL = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
    VERCEL_SITE_URL,
)

export const EMAIL_ASSET_URL = normalizeUrl(
  process.env.NEXT_PUBLIC_EMAIL_ASSET_URL ?? VERCEL_SITE_URL,
)

export function absoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }

  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE_URL}${path}`
}

export function absoluteAssetUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }

  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${EMAIL_ASSET_URL}${path}`
}
