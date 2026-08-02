import { motion } from 'framer-motion';

interface Props {
  pos: { x: number; y: number } | null;
}

/**
 * Premium hover treatment used only on About stat cards and Certification cards.
 * Kept intentionally subtle: soft radial glow tracks the cursor, a thin shine
 * sweeps once per hover, and a hairline "glass" highlight traces the top edge.
 */
export default function GlowOverlay({ pos }: Props) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: pos ? 1 : 0,
          background: pos
            ? `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, rgba(233,30,140,0.16), rgba(124,58,237,0.09) 45%, transparent 70%)`
            : undefined,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[inherit] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
        animate={pos ? { x: ['-40%', '340%'] } : { x: '-40%' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
    </>
  );
}
