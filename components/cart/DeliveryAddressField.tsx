'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Check,
  CircleAlert,
  LoaderCircle,
  MapPin,
  Phone,
  UserRound,
} from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
  deliveryDetailsSchema,
  normalizeDeliveryDetails,
  type AddressVerificationResult,
  type ConfirmedDelivery,
  type DeliveryDetails,
} from '@/lib/delivery'

interface DeliveryAddressFieldProps {
  onVerificationChange: (delivery: ConfirmedDelivery | null) => void
}

const US_STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
  'DC',
] as const

const INPUT_CLASS =
  'mt-2 w-full border border-white/18 bg-black px-3 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/34 focus:border-[#F5C518] aria-[invalid=true]:border-[#C41E3A]'

function FieldError({ message }: { message?: string }) {
  if (!message) return null

  return (
    <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-5 text-[#ff8b9d]">
      <CircleAlert aria-hidden className="mt-0.5 shrink-0" size={13} />
      {message}
    </p>
  )
}

export default function DeliveryAddressField({
  onVerificationChange,
}: DeliveryAddressFieldProps) {
  const [candidate, setCandidate] = useState<AddressVerificationResult | null>(
    null,
  )
  const [confirmed, setConfirmed] = useState(false)
  const [requestState, setRequestState] = useState<'idle' | 'checking'>('idle')
  const [requestError, setRequestError] = useState('')
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<DeliveryDetails>({
    resolver: zodResolver(deliveryDetailsSchema),
    defaultValues: {
      contactName: '',
      contactPhone: '',
      addressLine1: '',
      apartment: '',
      city: '',
      state: 'FL',
      postalCode: '',
    },
    mode: 'onBlur',
  })

  const invalidateVerification = () => {
    if (candidate || confirmed) {
      setCandidate(null)
      setConfirmed(false)
      onVerificationChange(null)
    }
    setRequestError('')
  }

  const checkAddress = handleSubmit(async (details) => {
    setRequestState('checking')
    setRequestError('')
    setCandidate(null)
    setConfirmed(false)
    onVerificationChange(null)

    try {
      const response = await fetch('/api/address/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalizeDeliveryDetails(details)),
      })
      const payload = (await response.json()) as AddressVerificationResult & {
        error?: string
      }

      if (!response.ok || !payload.matchedAddress) {
        throw new Error(
          payload.error ?? 'The delivery address could not be checked.',
        )
      }

      setCandidate(payload)
    } catch (error) {
      setRequestError(
        error instanceof Error
          ? error.message
          : 'The delivery address could not be checked.',
      )
    } finally {
      setRequestState('idle')
    }
  })

  const confirmAddress = () => {
    if (!candidate || candidate.withinDeliveryArea === false) return

    setConfirmed(true)
    onVerificationChange({
      details: normalizeDeliveryDetails(getValues()),
      verification: candidate,
    })
  }

  const registerWithInvalidation = (
    field: keyof DeliveryDetails,
  ): ReturnType<typeof register> =>
    register(field, {
      onChange: invalidateVerification,
    })

  return (
    <form
      onSubmit={checkAddress}
      noValidate
      className="mt-4 border border-white/14 bg-white/[0.035] p-4"
    >
      <div className="flex items-start gap-3">
        <MapPin
          aria-hidden
          className="mt-0.5 shrink-0 text-[#F5C518]"
          size={18}
        />
        <div>
          <p className="font-ui text-[11px] font-bold uppercase tracking-[0.16em] text-[#F5C518]">
            Delivery details
          </p>
          <p className="mt-2 text-xs leading-5 text-white/52">
            Add a driver contact and complete address. We will match the address
            before payment and ask you to confirm it.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-white/62">
          Contact name
          <span className="relative block">
            <UserRound
              aria-hidden
              className="pointer-events-none absolute left-3 top-[1.05rem] text-white/42"
              size={16}
            />
            <input
              type="text"
              autoComplete="name"
              maxLength={100}
              placeholder="Full name"
              aria-invalid={Boolean(errors.contactName)}
              className={`${INPUT_CLASS} pl-10`}
              {...registerWithInvalidation('contactName')}
            />
          </span>
          <FieldError message={errors.contactName?.message} />
        </label>

        <label className="block font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-white/62">
          Contact phone
          <span className="relative block">
            <Phone
              aria-hidden
              className="pointer-events-none absolute left-3 top-[1.05rem] text-white/42"
              size={16}
            />
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={30}
              placeholder="(772) 555-0123"
              aria-invalid={Boolean(errors.contactPhone)}
              className={`${INPUT_CLASS} pl-10`}
              {...registerWithInvalidation('contactPhone')}
            />
          </span>
          <FieldError message={errors.contactPhone?.message} />
        </label>
      </div>

      <label className="mt-4 block font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-white/62">
        Street address
        <input
          type="text"
          autoComplete="address-line1"
          maxLength={160}
          placeholder="123 Main Street"
          aria-invalid={Boolean(errors.addressLine1)}
          className={INPUT_CLASS}
          {...registerWithInvalidation('addressLine1')}
        />
        <FieldError message={errors.addressLine1?.message} />
      </label>

      <label className="mt-4 block font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-white/62">
        Apartment or unit{' '}
        <span className="normal-case tracking-normal text-white/42">
          (optional)
        </span>
        <input
          type="text"
          autoComplete="address-line2"
          maxLength={80}
          placeholder="Apt, suite, unit, or building"
          aria-invalid={Boolean(errors.apartment)}
          className={INPUT_CLASS}
          {...registerWithInvalidation('apartment')}
        />
        <FieldError message={errors.apartment?.message} />
      </label>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_5.5rem_7.5rem]">
        <label className="block font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-white/62">
          City
          <input
            type="text"
            autoComplete="address-level2"
            maxLength={80}
            placeholder="Fort Pierce"
            aria-invalid={Boolean(errors.city)}
            className={INPUT_CLASS}
            {...registerWithInvalidation('city')}
          />
          <FieldError message={errors.city?.message} />
        </label>

        <label className="block font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-white/62">
          State
          <select
            autoComplete="address-level1"
            aria-invalid={Boolean(errors.state)}
            className={INPUT_CLASS}
            {...registerWithInvalidation('state')}
          >
            {US_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <FieldError message={errors.state?.message} />
        </label>

        <label className="block font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-white/62">
          ZIP code
          <input
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={10}
            placeholder="34945"
            aria-invalid={Boolean(errors.postalCode)}
            className={INPUT_CLASS}
            {...registerWithInvalidation('postalCode')}
          />
          <FieldError message={errors.postalCode?.message} />
        </label>
      </div>

      <button
        type="submit"
        disabled={requestState === 'checking'}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 border border-[#F5C518] bg-[#F5C518] px-4 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-black hover:text-[#F5C518] disabled:cursor-wait disabled:opacity-60"
      >
        {requestState === 'checking' ? (
          <>
            <LoaderCircle aria-hidden className="animate-spin" size={15} />
            Checking address
          </>
        ) : (
          <>
            <MapPin aria-hidden size={15} />
            Check delivery address
          </>
        )}
      </button>

      {requestError && (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 border border-[#C41E3A]/55 bg-[#C41E3A]/12 p-3 text-sm leading-6 text-white/78"
        >
          <CircleAlert
            aria-hidden
            className="mt-1 shrink-0 text-[#ff8b9d]"
            size={16}
          />
          {requestError}
        </p>
      )}

      {candidate && (
        <div
          className={`mt-4 border p-4 ${
            candidate.withinDeliveryArea === false
              ? 'border-[#C41E3A]/60 bg-[#C41E3A]/10'
              : confirmed
                ? 'border-[#4CAF50] bg-[#4CAF50]/12'
                : 'border-[#F5C518]/60 bg-[#F5C518]/8'
          }`}
        >
          <p className="font-ui text-[10px] font-bold uppercase tracking-[0.16em] text-white/52">
            {confirmed ? 'Confirmed address' : 'We found this address'}
          </p>
          <p className="mt-2 font-ui text-sm font-bold leading-6 text-white">
            {candidate.matchedAddress}
          </p>
          {candidate.distanceMiles !== undefined && (
            <p className="mt-2 text-xs leading-5 text-white/58">
              Approximately {candidate.distanceMiles.toFixed(1)} straight-line
              miles from the delivery origin.
            </p>
          )}

          {candidate.withinDeliveryArea === false ? (
            <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-[#ffb2bd]">
              <CircleAlert aria-hidden className="mt-1 shrink-0" size={15} />
              This address is outside the {candidate.maxDistanceMiles}-mile
              delivery area. Please choose pickup or use another address.
            </p>
          ) : confirmed ? (
            <p className="mt-3 flex items-center gap-2 font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-[#77d67a]">
              <Check aria-hidden size={15} />
              Ready for delivery checkout
            </p>
          ) : (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={confirmAddress}
                className="inline-flex items-center justify-center gap-2 bg-[#4CAF50] px-4 py-3 font-ui text-[10px] font-bold uppercase tracking-[0.12em] text-black"
              >
                <Check aria-hidden size={14} />
                Yes, use this address
              </button>
              <button
                type="button"
                onClick={() => {
                  setCandidate(null)
                  onVerificationChange(null)
                }}
                className="border border-white/22 px-4 py-3 font-ui text-[10px] font-bold uppercase tracking-[0.12em] text-white/72"
              >
                Edit the address
              </button>
            </div>
          )}
        </div>
      )}

      <p className="mt-4 text-[11px] leading-5 text-white/38">
        Address matching uses the key-free U.S. Census Geocoder. Apartment and
        unit details are preserved but are not independently verified.
      </p>
    </form>
  )
}
