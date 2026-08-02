import { motion } from 'framer-motion';
import { usePortfolio } from '@/hooks/usePortfolio';

export default function ExperienceSection() {
  const { experience } = usePortfolio();

  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
      >
        Experience
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl"
      >
        Where I've worked so far.
      </motion.h2>

      <div className="mt-12 divide-y divide-border border-t border-border">
        {experience.map((item, i) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[80px_1fr]"
          >
            <span className="font-display text-3xl font-bold text-ink-faint">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {item.company} — {item.role}
                </h3>
                <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
                  {item.period}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-ink-faint">{item.location}</p>
              <p className="mt-4 max-w-2xl font-body text-ink-muted">{item.summary}</p>
              <ul className="mt-4 space-y-2">
                {item.highlights.map((h) => (
                  <li key={h} className="flex gap-3 font-body text-sm text-ink-muted">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
