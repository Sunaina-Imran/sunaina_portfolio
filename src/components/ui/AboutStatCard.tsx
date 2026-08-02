import { motion } from 'framer-motion';
import { useGlowPointer } from '@/hooks/useGlowPointer';
import GlowOverlay from '@/components/ui/GlowOverlay';

interface Props {
  label: string;
  value: string;
  delay: number;
}

export default function AboutStatCard({ label, value, delay }: Props) {
  const { ref, pos, onMouseMove, onMouseLeave } = useGlowPointer<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_-6px_rgba(233,30,140,0.25)]"
    >
      <GlowOverlay pos={pos} />
      <div className="relative">
        <span className="block h-1.5 w-1.5 rounded-full bg-signature-gradient" />
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          {label}
        </p>
        <p className="mt-1 font-body text-sm font-medium text-neutral-900">{value}</p>
      </div>
    </motion.div>
  );
}
