import { motion } from 'framer-motion';
import { BadgeCheck, ArrowUpRight } from 'lucide-react';
import { useGlowPointer } from '@/hooks/useGlowPointer';
import GlowOverlay from '@/components/ui/GlowOverlay';
import type { CertificationItem } from '@/types/portfolio';

interface Props {
  cert: CertificationItem;
  delay: number;
  onOpen: () => void;
}

export default function CertificationCard({ cert, delay, onOpen }: Props) {
  const { ref, pos, onMouseMove, onMouseLeave } = useGlowPointer<HTMLButtonElement>();

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onOpen}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -3 }}
      className="group relative flex items-start gap-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] transition-all hover:border-accent/40 hover:shadow-[0_10px_28px_-8px_rgba(233,30,140,0.25)]"
    >
      <GlowOverlay pos={pos} />
      <BadgeCheck size={20} className="relative mt-0.5 flex-shrink-0 text-accent" strokeWidth={1.75} />
      <div className="relative flex-1">
        <h3 className="font-body text-sm font-semibold text-neutral-900">{cert.name}</h3>
        <p className="mt-1 font-mono text-xs text-neutral-400">
          {cert.issuer} · {cert.status}
        </p>
      </div>
      <ArrowUpRight
        size={16}
        className="relative mt-0.5 flex-shrink-0 text-neutral-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
      />
    </motion.button>
  );
}
