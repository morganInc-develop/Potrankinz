import { NextResponse } from 'next/server'

import type { DeliverySuggestion } from '@/lib/delivery'

interface GoogleAutocompleteResponse {
  suggestions?: Array<{
    placePrediction?: {
      placeId?: string
      text?: { text?: string }
    }
  }>
}

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q')?.trim() ?? ''
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (query.length < 3) return NextResponse.json({ suggestions: [] })

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Delivery address lookup is not configured yet.' },
      { status: 503 },
    )
  }

  const response = await fetch(
    'https://places.googleapis.com/v1/places:autocomplete',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask':
          'suggestions.placePrediction.placeId,suggestions.placePrediction.text.text',
      },
      body: JSON.stringify({
        input: query,
        includedRegionCodes: ['us'],
        includedPrimaryTypes: ['street_address', 'premise', 'subpremise'],
      }),
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Address suggestions are temporarily unavailable.' },
      { status: 502 },
    )
  }

  const payload = (await response.json()) as GoogleAutocompleteResponse
  const suggestions: DeliverySuggestion[] = (payload.suggestions ?? [])
    .map((suggestion) => suggestion.placePrediction)
    .filter((prediction): prediction is NonNullable<typeof prediction> =>
      Boolean(prediction?.placeId && prediction.text?.text),
    )
    .map((prediction) => ({
      placeId: prediction.placeId as string,
      label: prediction.text?.text as string,
    }))

  return NextResponse.json({ suggestions })
}
