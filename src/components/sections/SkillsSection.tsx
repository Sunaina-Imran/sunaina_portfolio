import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/hooks/usePortfolio';
import MarqueeRow from '@/components/ui/MarqueeRow';

export default function SkillsSection() {
  const { skills } = usePortfolio();

  // Flatten every category into one skill list, then split into two rows.
  // Content is untouched — only how it's presented changes.
  const { topRow, bottomRow } = useMemo(() => {
    const all = skills.categories.flatMap((c) => c.items);
    const mid = Math.ceil(all.length / 2);
    return { topRow: all.slice(0, mid), bottomRow: all.slice(mid) };
  }, [skills]);

  return (
    <section id="skills" className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
        >
          Skills
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl"
        >
          Tools of the system.
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-12 space-y-4"
      >
        <MarqueeRow items={topRow} direction="right" speed={38} />
        <MarqueeRow items={bottomRow} direction="left" speed={42} />
      </motion.div>
    </section>
  );
}
