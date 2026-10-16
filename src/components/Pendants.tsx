import { motion } from 'framer-motion'
import { useLight } from '../lib/light'

// The clear glass globe pendants that hang in clusters over LYNN's tables.
// Off by day, filament glowing once the evening comes in.
const globes = [
  { x: 12, len: 22, r: 8 },
  { x: 35, len: 33, r: 9 },
  { x: 58, len: 17, r: 7 },
]

export function Pendants() {
  const { night } = useLight()
  return (
    <svg className="pendants" viewBox="0 0 70 58" aria-hidden="true">
      <defs>
        <radialGradient id="globe-glow">
          <stop offset="0" stopColor="#f2b15c" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f2b15c" stopOpacity="0" />
        </radialGradient>
      </defs>
      {globes.map((g, i) => {
        const cy = g.len + g.r
        return (
          <motion.g
            key={g.x}
            style={{ originX: `${g.x}px`, originY: '0px' }}
            animate={night ? { rotate: [0, i % 2 ? 3 : -3, 0] } : { rotate: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut', delay: i * 0.12 }}
          >
            <line x1={g.x} y1={0} x2={g.x} y2={g.len - 2} stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <rect x={g.x - 2.5} y={g.len - 3} width="5" height="4" fill="currentColor" opacity="0.8" />
            <motion.circle
              cx={g.x}
              cy={cy}
              r={g.r * 2.4}
              fill="url(#globe-glow)"
              initial={false}
              animate={{ opacity: night ? 1 : 0 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12 }}
            />
            <circle cx={g.x} cy={cy} r={g.r} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
            <motion.path
              d={`M${g.x - 2} ${cy - g.r + 2} L${g.x - 2} ${cy + 1} Q${g.x} ${cy - 4} ${g.x + 2} ${cy + 1} L${g.x + 2} ${cy - g.r + 2}`}
              fill="none"
              strokeWidth="1.1"
              strokeLinejoin="round"
              initial={false}
              animate={{ stroke: night ? '#ffd28a' : 'currentColor', opacity: night ? 1 : 0.5 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12 }}
            />
          </motion.g>
        )
      })}
    </svg>
  )
}
