import { isPossiblePhoneNumber } from 'libphonenumber-js/max'
import { z } from 'zod'

export const DELIVERY_RATE_CENTS_PER_MILE = 85

export const deliveryDetailsSchema = z.object({
  contactName: z
    .string()
    .trim()
    .min(2, 'Enter the delivery contact name.')
    .max(100, 'Keep the contact name under 100 characters.'),
  contactPhone: z
    .string()
    .trim()
    .min(1, 'Enter a phone number for the delivery driver.')
    .refine(
      (phone) => isPossiblePhoneNumber(phone, 'US'),
      'Enter a valid phone number, including the area code.',
    ),
  addressLine1: z
    .string()
    .trim()
    .min(5, 'Enter the street number and street name.')
    .max(160, 'Keep the street address under 160 characters.'),
  apartment: z
    .string()
    .trim()
    .max(80, 'Keep the apartment or unit under 80 characters.'),
  city: z
    .string()
    .trim()
    .min(2, 'Enter the city.')
    .max(80, 'Keep the city under 80 characters.'),
  state: z
    .string()
    .trim()
    .regex(/^[A-Za-z]{2}$/, 'Use the two-letter state abbreviation.'),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}(?:-\d{4})?$/, 'Enter a valid 5-digit ZIP code.'),
})

export const confirmedDeliverySchema = deliveryDetailsSchema.extend({
  confirmedAddress: z
    .string()
    .trim()
    .min(8, 'Confirm the matched delivery address.')
    .max(300, 'The confirmed address is too long.'),
})

export type DeliveryDetails = z.infer<typeof deliveryDetailsSchema>
export type ConfirmedDeliveryDetails = z.infer<typeof confirmedDeliverySchema>

export interface AddressVerificationResult {
  matchedAddress: string
  coordinates: {
    latitude: number
    longitude: number
  }
  distanceMiles?: number
  deliveryFeeCents?: number
}

export interface ConfirmedDelivery {
  details: DeliveryDetails
  verification: AddressVerificationResult
}

export function normalizeDeliveryDetails(
  details: DeliveryDetails,
): DeliveryDetails {
  return {
    contactName: details.contactName.trim(),
    contactPhone: details.contactPhone.trim(),
    addressLine1: details.addressLine1.trim(),
    apartment: details.apartment.trim(),
    city: details.city.trim(),
    state: details.state.trim().toUpperCase(),
    postalCode: details.postalCode.trim(),
  }
}

export function normalizeAddressForComparison(address: string) {
  return address.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

export function deliveryFeeCents(distanceMiles: number) {
  if (!Number.isFinite(distanceMiles) || distanceMiles < 0) return 0
  return Math.round(distanceMiles * DELIVERY_RATE_CENTS_PER_MILE)
}
