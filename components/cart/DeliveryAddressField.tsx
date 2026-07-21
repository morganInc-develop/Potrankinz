'use client'

import { MapPin } from 'lucide-react'

interface DeliveryAddressFieldProps {
  address: string
  apartment: string
  onAddressChange: (value: string) => void
  onApartmentChange: (value: string) => void
}

export default function DeliveryAddressField({
  address,
  apartment,
  onAddressChange,
  onApartmentChange,
}: DeliveryAddressFieldProps) {
  return (
    <div className="mt-4 border border-white/14 bg-white/[0.035] p-4">
      <label
        htmlFor="delivery-address"
        className="font-ui text-[11px] font-bold uppercase tracking-[0.16em] text-[#F5C518]"
      >
        Delivery address
      </label>
      <p className="mt-2 text-xs leading-5 text-white/52">
        Enter the full street address, city, state, and ZIP code. We will
        confirm delivery details with you after checkout.
      </p>
      <div className="relative mt-3">
        <MapPin
          aria-hidden
          className="pointer-events-none absolute left-3 top-3.5 text-white/42"
          size={17}
        />
        <input
          id="delivery-address"
          type="text"
          autoComplete="street-address"
          value={address}
          onChange={(event) => onAddressChange(event.target.value)}
          maxLength={240}
          placeholder="123 Main St, Fort Pierce, FL 34945"
          className="w-full border border-white/18 bg-black py-3 pl-10 pr-3 text-sm text-white outline-none transition-colors placeholder:text-white/34 focus:border-[#F5C518]"
        />
      </div>

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
    </div>
  )
}
