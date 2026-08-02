import { motion } from 'framer-motion';
import { usePortfolio } from '@/hooks/usePortfolio';
import AboutStatCard from '@/components/ui/AboutStatCard';

export default function AboutSection() {
  const { profile } = usePortfolio();

  return (
    <section id="about" className="bg-white py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
        >
          About
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-3 font-display text-3xl font-bold text-neutral-900 md:text-4xl"
        >
          Turning Ideas into Intelligent AI Systems.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-neutral-600"
          style={{ wordBreak: 'normal', overflowWrap: 'normal' }}
        >
          {profile.bio}
        </motion.p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Focus', value: profile.specialization },
            { label: 'Based in', value: profile.location },
            { label: 'Status', value: profile.yearsOfExperience },
            { label: 'Role', value: profile.role },
          ].map((item, i) => (
            <AboutStatCard key={item.label} label={item.label} value={item.value} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
