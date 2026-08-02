import { motion } from 'framer-motion';

/**
 * Signature visual motif: an ambient animated node/connection graph,
 * standing in for "designing intelligent systems" — nodes pulse and
 * connections draw themselves in, echoing a RAG/knowledge-graph pipeline
 * rather than a generic gradient blob.
 */
export default function NodeGraphBackground({ className = '' }: { className?: string }) {
  const nodes = [
    { x: 60, y: 80 }, { x: 220, y: 40 }, { x: 380, y: 110 },
    { x: 140, y: 220 }, { x: 320, y: 260 }, { x: 480, y: 190 },
    { x: 60, y: 340 }, { x: 440, y: 340 },
  ];
  const edges = [
    [0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [2, 5], [3, 6], [4, 7], [0, 3],
  ];

  return (
    <svg
      viewBox="0 0 520 400"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nodeGraphStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="55%" stopColor="#E91E8C" />
          <stop offset="100%" stopColor="#FF7A45" />
        </linearGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <motion.line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#nodeGraphStroke)"
          strokeWidth={1}
          strokeOpacity={0.35}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.4 + i * 0.12, ease: 'easeInOut' }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={4}
          fill="url(#nodeGraphStroke)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.4, 1, 0.4], scale: 1 }}
          transition={{
            opacity: { duration: 3.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' },
            scale: { duration: 0.4, delay: 0.3 + i * 0.12 },
          }}
        />
      ))}
    </svg>
  );
}
