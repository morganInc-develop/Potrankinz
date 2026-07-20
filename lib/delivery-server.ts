import 'server-only'

import {
  deliveryFeeCents,
  roundedDeliveryMiles,
  type DeliveryQuote,
} from '@/lib/delivery'

const DEFAULT_DELIVERY_ORIGIN =
  '11582 SW Village Parkway, Port Saint Lucie, FL 34987'

interface GooglePlaceDetails {
  formattedAddress?: string
}

interface GoogleRoutesResponse {
  routes?: Array<{ distanceMeters?: number }>
}

function mapsApiKey() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    throw new Error(
      'Delivery address lookup is not configured. Add GOOGLE_MAPS_API_KEY.',
    )
  }

  return apiKey
}

export async function getDeliveryQuote(
  placeId: string,
): Promise<DeliveryQuote> {
  if (!placeId.trim()) throw new Error('Select a verified delivery address.')

  const apiKey = mapsApiKey()
  const origin =
    process.env.DELIVERY_ORIGIN_ADDRESS?.trim() || DEFAULT_DELIVERY_ORIGIN

  const [placeResponse, routeResponse] = await Promise.all([
    fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'formattedAddress',
        },
        cache: 'no-store',
      },
    ),
    fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'routes.distanceMeters',
      },
      body: JSON.stringify({
        origin: { address: origin },
        destination: { placeId },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_AWARE',
      }),
      cache: 'no-store',
    }),
  ])

  if (!placeResponse.ok || !routeResponse.ok) {
    throw new Error('We could not verify a driving route to that address.')
  }

  const place = (await placeResponse.json()) as GooglePlaceDetails
  const route = (await routeResponse.json()) as GoogleRoutesResponse
  const distanceMeters = route.routes?.[0]?.distanceMeters

  if (!place.formattedAddress || !distanceMeters || distanceMeters <= 0) {
    throw new Error('We could not verify a driving route to that address.')
  }

  return {
    placeId,
    address: place.formattedAddress,
    distanceMeters,
    distanceMiles: roundedDeliveryMiles(distanceMeters),
    feeCents: deliveryFeeCents(distanceMeters),
  }
}
