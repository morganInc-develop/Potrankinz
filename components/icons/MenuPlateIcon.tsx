interface MenuPlateIconProps {
  className?: string
  size?: number
}

export default function MenuPlateIcon({
  className,
  size = 20,
}: MenuPlateIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        pathLength="100"
        stroke="#C41E3A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="29 71"
        transform="rotate(-90 12 12)"
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        pathLength="100"
        stroke="#F5C518"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="29 71"
        strokeDashoffset="-33.5"
        transform="rotate(-90 12 12)"
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        pathLength="100"
        stroke="#4CAF50"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="29 71"
        strokeDashoffset="-67"
        transform="rotate(-90 12 12)"
      />
      <circle cx="12" cy="12" r="4.4" stroke="white" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1.2" fill="#F5C518" />
    </svg>
  )
}
