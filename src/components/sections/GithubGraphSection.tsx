import { motion } from 'framer-motion';
import { usePortfolio } from '@/hooks/usePortfolio';
import StatCounter from '@/components/ui/StatCounter';

export default function GithubGraphSection() {
  const { projects, certifications, experience, skills, profile } = usePortfolio();

  const totalSkills = skills.categories.reduce((sum, c) => sum + c.items.length, 0);
  const githubUsername = profile.social.github.split('/').filter(Boolean).pop() ?? '';

  const stats = [
    { value: projects.length, label: 'Projects Built' },
    { value: certifications.length, label: 'Certifications' },
    { value: experience.length, label: 'Internships / Programs' },
    { value: totalSkills, label: 'Tools & Technologies' },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-28">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => (
          <StatCounter key={stat.label} value={stat.value} label={stat.label} suffix="+" />
        ))}
      </div>

      {githubUsername && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-2xl border border-border bg-surface p-6 md:p-8"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink">GitHub Activity</h3>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-ink-muted hover:text-accent"
            >
              @{githubUsername}
            </a>
          </div>
          <div className="mt-6 overflow-x-auto">
            <img
              src={`https://ghchart.rshah.org/E91E8C/${githubUsername}`}
              alt={`${profile.name} GitHub contribution graph`}
              className="min-w-[600px] w-full"
              loading="lazy"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
