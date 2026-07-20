'use client'

import { useEffect, useId, useState } from 'react'
import { Check, LoaderCircle, MapPin, Search } from 'lucide-react'

import { formatMoney } from '@/lib/cart'
import type { DeliveryQuote, DeliverySuggestion } from '@/lib/delivery'

interface DeliveryAddressFieldProps {
  quote: DeliveryQuote | null
  apartment: string
  onApartmentChange: (value: string) => void
  onQuoteChange: (quote: DeliveryQuote | null) => void
}

export default function DeliveryAddressField({
  quote,
  apartment,
  onApartmentChange,
  onQuoteChange,
}: DeliveryAddressFieldProps) {
  const listboxId = useId()
  const [query, setQuery] = useState(quote?.address ?? '')
  const [suggestions, setSuggestions] = useState<DeliverySuggestion[]>([])
  const [status, setStatus] = useState<'idle' | 'searching' | 'quoting'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (quote || query.trim().length < 3) {
      setSuggestions([])
      return
    }

    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      setStatus('searching')
      setError('')

      try {
        const response = await fetch(
          `/api/delivery/autocomplete?q=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        )
        const payload = (await response.json()) as {
          suggestions?: DeliverySuggestion[]
          error?: string
        }

        if (!response.ok)
          throw new Error(payload.error ?? 'Address lookup failed.')
        setSuggestions(payload.suggestions ?? [])
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === 'AbortError'
        ) {
          return
        }
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Address lookup failed.',
        )
      } finally {
        if (!controller.signal.aborted) setStatus('idle')
      }
    }, 300)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [query, quote])

  const selectSuggestion = async (suggestion: DeliverySuggestion) => {
    setQuery(suggestion.label)
    setSuggestions([])
    setStatus('quoting')
    setError('')

    try {
      const response = await fetch('/api/delivery/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placeId: suggestion.placeId }),
      })
      const payload = (await response.json()) as {
        quote?: DeliveryQuote
        error?: string
      }

      if (!response.ok || !payload.quote) {
        throw new Error(payload.error ?? 'Delivery could not be calculated.')
      }

      setQuery(payload.quote.address)
      onQuoteChange(payload.quote)
    } catch (requestError) {
      onQuoteChange(null)
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Delivery could not be calculated.',
      )
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className="mt-4 border border-white/14 bg-white/[0.035] p-4">
      <label
        htmlFor="delivery-address"
        className="font-ui text-[11px] font-bold uppercase tracking-[0.16em] text-[#F5C518]"
      >
        Delivery address
      </label>
      <p className="mt-2 text-xs leading-5 text-white/52">
        Start typing, then select the verified address that appears.
      </p>
      <div className="relative mt-3">
        <span className="pointer-events-none absolute left-3 top-3.5 text-white/42">
          {status === 'searching' || status === 'quoting' ? (
            <LoaderCircle className="animate-spin" size={17} />
          ) : (
            <Search size={17} />
          )}
        </span>
        <input
          id="delivery-address"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={suggestions.length > 0}
          autoComplete="off"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            onQuoteChange(null)
            setError('')
          }}
          placeholder="Enter the delivery street address"
          className="w-full border border-white/18 bg-black py-3 pl-10 pr-3 text-sm text-white outline-none transition-colors placeholder:text-white/34 focus:border-[#F5C518]"
        />
        {suggestions.length > 0 && (
          <ul
            id={listboxId}
            role="listbox"
            className="absolute z-30 mt-1 max-h-64 w-full overflow-y-auto border border-[#F5C518]/45 bg-[#12100c] shadow-xl"
          >
            {suggestions.map((suggestion) => (
              <li key={suggestion.placeId} role="option" aria-selected="false">
                <button
                  type="button"
                  onClick={() => selectSuggestion(suggestion)}
                  className="flex w-full items-start gap-3 border-b border-white/8 px-3 py-3 text-left text-sm leading-5 text-white/78 transition-colors last:border-0 hover:bg-[#F5C518] hover:text-black"
                >
                  <MapPin className="mt-0.5 shrink-0" size={16} />
                  {suggestion.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p
        translate="no"
        className="mt-2 whitespace-nowrap font-sans text-xs font-normal tracking-normal text-white/62"
      >
        Google Maps
      </p>

      {quote && (
        <div className="mt-3 border border-[#4CAF50]/35 bg-[#4CAF50]/10 p-3">
          <p className="flex items-center gap-2 font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[#75d478]">
            <Check size={14} /> Verified delivery address
          </p>
          <p className="mt-2 text-sm leading-5 text-white/76">
            {quote.address}
          </p>
          <p className="mt-2 text-xs text-white/56">
            {quote.distanceMiles.toFixed(1)} driving miles × $0.85 ={' '}
            <strong className="text-[#F5C518]">
              {formatMoney(quote.feeCents)}
            </strong>
          </p>
        </div>
      )}

      <label
        htmlFor="delivery-unit"
        className="mt-4 block font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-white/54"
      >
        Apartment or unit{' '}
        <span className="normal-case tracking-normal">(optional)</span>
      </label>
      <input
        id="delivery-unit"
        type="text"
        value={apartment}
        onChange={(event) => onApartmentChange(event.target.value)}
        maxLength={80}
        autoComplete="address-line2"
        placeholder="Apt, suite, unit, building"
        className="mt-2 w-full border border-white/18 bg-black px-3 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/34 focus:border-[#F5C518]"
      />

      {error && (
        <p role="alert" className="mt-3 text-xs leading-5 text-[#ff8b9c]">
          {error}
        </p>
      )}
    </div>
  )
}
