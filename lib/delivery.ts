export const DELIVERY_RATE_CENTS_PER_MILE = 85
export const METERS_PER_MILE = 1609.344

export interface DeliverySuggestion {
  placeId: string
  label: string
}

export interface DeliveryQuote {
  placeId: string
  address: string
  distanceMeters: number
  distanceMiles: number
  feeCents: number
}

export function deliveryFeeCents(distanceMeters: number) {
  const distanceMiles = distanceMeters / METERS_PER_MILE
  return Math.round(distanceMiles * DELIVERY_RATE_CENTS_PER_MILE)
}

export function roundedDeliveryMiles(distanceMeters: number) {
  return Math.round((distanceMeters / METERS_PER_MILE) * 10) / 10
}
