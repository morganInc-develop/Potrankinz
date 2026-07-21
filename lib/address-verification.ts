import 'server-only'

import { distance } from '@turf/distance'

import {
  normalizeDeliveryDetails,
  type AddressVerificationResult,
  type DeliveryDetails,
} from '@/lib/delivery'

const CENSUS_GEOCODER_URL =
  'https://geocoding.geo.census.gov/geocoder/locations/address'
const DEFAULT_DELIVERY_ORIGIN = {
  // The Pot Rankinz address already published in the website's map link.
  latitude: 27.425721338173,
  longitude: -80.400530314313,
}

interface CensusAddressMatch {
  matchedAddress?: string
  coordinates?: {
    x?: number
    y?: number
  }
}

interface CensusGeocoderResponse {
  result?: {
    addressMatches?: CensusAddressMatch[]
  }
}

interface DeliveryDistanceConfig {
  latitude: number
  longitude: number
  maxDistanceMiles?: number
}

export class AddressVerificationUnavailableError extends Error {
  constructor(message = 'The address checker is temporarily unavailable.') {
    super(message)
    this.name = 'AddressVerificationUnavailableError'
  }
}

export class DeliveryConfigurationError extends Error {
  constructor() {
    super(
      'Check the delivery settings. Override both origin coordinates together and use a positive maximum distance.',
    )
    this.name = 'DeliveryConfigurationError'
  }
}

function finiteNumber(value: string | undefined) {
  if (!value?.trim()) return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function deliveryDistanceConfig(): DeliveryDistanceConfig {
  const rawLatitude = process.env.DELIVERY_ORIGIN_LATITUDE
  const rawLongitude = process.env.DELIVERY_ORIGIN_LONGITUDE
  const rawMaxDistance = process.env.DELIVERY_MAX_DISTANCE_MILES
  const hasLatitude = Boolean(rawLatitude?.trim())
  const hasLongitude = Boolean(rawLongitude?.trim())
  const hasMaxDistance = Boolean(rawMaxDistance?.trim())
  const configuredLatitude = finiteNumber(rawLatitude)
  const configuredLongitude = finiteNumber(rawLongitude)
  const maxDistanceMiles = finiteNumber(rawMaxDistance)

  if (
    hasLatitude !== hasLongitude ||
    (hasLatitude && configuredLatitude === undefined) ||
    (hasLongitude && configuredLongitude === undefined) ||
    (hasMaxDistance && maxDistanceMiles === undefined) ||
    (hasMaxDistance && (maxDistanceMiles ?? 0) <= 0)
  ) {
    throw new DeliveryConfigurationError()
  }

  const latitude = configuredLatitude ?? DEFAULT_DELIVERY_ORIGIN.latitude
  const longitude = configuredLongitude ?? DEFAULT_DELIVERY_ORIGIN.longitude

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    throw new DeliveryConfigurationError()
  }

  return { latitude, longitude, maxDistanceMiles }
}

export async function verifyDeliveryAddress(
  input: DeliveryDetails,
): Promise<AddressVerificationResult | null> {
  const details = normalizeDeliveryDetails(input)
  const query = new URLSearchParams({
    street: details.addressLine1,
    city: details.city,
    state: details.state,
    zip: details.postalCode,
    benchmark: 'Public_AR_Current',
    format: 'json',
  })

  let response: Response

  try {
    response = await fetch(`${CENSUS_GEOCODER_URL}?${query}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })
  } catch {
    throw new AddressVerificationUnavailableError()
  }

  if (!response.ok) {
    throw new AddressVerificationUnavailableError()
  }

  let payload: CensusGeocoderResponse

  try {
    payload = (await response.json()) as CensusGeocoderResponse
  } catch {
    throw new AddressVerificationUnavailableError()
  }

  const match = payload.result?.addressMatches?.[0]
  const latitude = match?.coordinates?.y
  const longitude = match?.coordinates?.x

  if (
    !match?.matchedAddress ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    return null
  }

  const verified: AddressVerificationResult = {
    matchedAddress: match.matchedAddress,
    coordinates: {
      latitude: latitude as number,
      longitude: longitude as number,
    },
  }
  const deliveryConfig = deliveryDistanceConfig()
  const distanceMiles = distance(
    [deliveryConfig.longitude, deliveryConfig.latitude],
    [longitude as number, latitude as number],
    { units: 'miles' },
  )

  verified.distanceMiles = Math.round(distanceMiles * 100) / 100

  if (deliveryConfig.maxDistanceMiles !== undefined) {
    verified.maxDistanceMiles = deliveryConfig.maxDistanceMiles
    verified.withinDeliveryArea =
      distanceMiles <= deliveryConfig.maxDistanceMiles
  }

  return verified
}
