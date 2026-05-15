interface TornEdgeProps {
  variant?: 1 | 2 | 3
  flip?: boolean
  fill?: string
  className?: string
}

// Three torn-paper profiles — varied tooth width/height for organic feel
const PATHS: Record<1 | 2 | 3, string> = {
  1: 'M0,0 L0,38 L30,25 L70,47 L100,28 L140,44 L180,22 L220,46 L255,30 L300,48 L330,24 L380,42 L415,28 L460,50 L495,26 L540,44 L575,28 L620,46 L660,24 L700,42 L740,30 L785,50 L820,26 L860,44 L900,28 L940,46 L975,24 L1020,42 L1060,30 L1100,48 L1140,26 L1200,40 L1200,0 Z',
  2: 'M0,0 L0,44 L40,30 L85,50 L120,26 L165,46 L200,28 L250,48 L285,24 L330,44 L370,28 L420,50 L455,26 L500,44 L540,30 L580,48 L620,22 L670,44 L710,28 L755,50 L790,26 L840,46 L875,28 L920,48 L960,24 L1005,44 L1050,28 L1090,50 L1130,28 L1175,44 L1200,32 L1200,0 Z',
  3: 'M0,0 L0,36 L50,24 L90,46 L125,26 L170,48 L210,28 L255,46 L295,22 L340,44 L380,28 L425,50 L465,26 L510,44 L550,28 L590,46 L635,24 L680,44 L715,28 L760,50 L800,24 L845,44 L885,28 L930,48 L970,26 L1010,44 L1055,28 L1100,48 L1140,26 L1185,44 L1200,36 L1200,0 Z',
}

export default function TornEdge({
  variant = 1,
  flip = false,
  fill = '#fbf8f5',
  className = '',
}: TornEdgeProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none relative z-10 w-full ${className}`}
      style={{ height: 52, marginBottom: -52 }}
    >
      <svg
        width="100%"
        height="52"
        viewBox="0 0 1200 52"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'block',
          transform: flip ? 'scaleY(-1)' : undefined,
          filter: 'drop-shadow(0 4px 5px rgba(0,0,0,0.09))',
        }}
      >
        <path d={PATHS[variant]} fill={fill} />
      </svg>
    </div>
  )
}
