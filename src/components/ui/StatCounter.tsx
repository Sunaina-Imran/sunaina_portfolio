import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

interface Props {
  value: number;
  label: string;
  suffix?: string;
}

export default function StatCounter({ value, label, suffix = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <span ref={ref} className="font-display text-4xl font-bold text-ink md:text-5xl">
        {display}
        {suffix}
      </span>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ink-muted">{label}</p>
    </motion.div>
  );
}
