import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/hooks/usePortfolio';
import CertificateModal from '@/components/ui/CertificateModal';
import CertificationCard from '@/components/ui/CertificationCard';
import type { CertificationItem } from '@/types/portfolio';

export default function CertificationsSection() {
  const { certifications } = usePortfolio();
  const [active, setActive] = useState<CertificationItem | null>(null);

  return (
    <section id="certifications" className="bg-white py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
        >
          Certifications
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-3 font-display text-3xl font-bold text-neutral-900 md:text-4xl"
        >
          Continuous learning, on record.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 font-body text-sm text-neutral-500"
        >
          Tap any certificate to view the details.
        </motion.p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <CertificationCard
              key={cert.id}
              cert={cert}
              delay={(i % 2) * 0.08}
              onOpen={() => setActive(cert)}
            />
          ))}
        </div>
      </div>

      <CertificateModal certificate={active} onClose={() => setActive(null)} />
    </section>
  );
}
