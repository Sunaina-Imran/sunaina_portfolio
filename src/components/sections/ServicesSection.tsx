import { motion } from 'framer-motion';

// TODO: move this to src/data/portfolio.json once service offerings are finalized —
// hardcoded here per the original architecture note, since this is a fixed,
// non-resume-derived capability list rather than resume-extracted content.
const CAPABILITIES = [
  {
    title: 'Generative AI & LLM Systems',
    description:
      'Build AI applications using LLMs, Multi-Agent Systems, RAG, AI Agents, prompt engineering, semantic search, and enterprise knowledge platforms.',
  },
  {
    title: 'Backend Engineering',
    description:
      'Develop scalable backends with FastAPI, Flask, REST APIs, JWT Authentication, SQLAlchemy, PostgreSQL, SQLite, and workflow automation.',
  },
  {
    title: 'Full-Stack AI Development',
    description:
      'Create modern AI web applications using React, TypeScript, Tailwind CSS, Python, APIs, and cloud-ready architectures.',
  },
  {
    title: 'Computer Vision',
    description:
      'Develop real-time AI vision solutions using OpenCV, MediaPipe, deep learning, image processing, and gesture recognition.',
  },
];

const MORE_CAPABILITIES = [
  {
    emoji: '🤖',
    title: 'Multi-Agent AI',
    description: 'Design collaborative AI agent systems with orchestration, shared memory, reasoning, and task automation.',
  },
  {
    emoji: '🧠',
    title: 'Enterprise AI & RAG',
    description: 'Build enterprise knowledge platforms with semantic search, vector databases, embeddings, document intelligence, and grounded AI.',
  },
  {
    emoji: '⚙️',
    title: 'AI Workflow Automation',
    description: 'Automate document processing, AI pipelines, agent workflows, and business operations.',
  },
  {
    emoji: '💻',
    title: 'AI Software Engineering',
    description: 'Develop AI tools for repository analysis, architecture review, security auditing, code quality, testing, and documentation.',
  },
  {
    emoji: '📊',
    title: 'Machine Learning',
    description: 'Build end-to-end ML solutions for data preprocessing, model training, evaluation, deployment, and predictive analytics.',
  },
  {
    emoji: '🌐',
    title: 'Intelligent AI Platforms',
    description: 'Engineer scalable AI products by integrating modern frontend technologies, backend services, databases, APIs, and LLM infrastructure.',
  },
  {
    emoji: '🛠',
    title: 'AI Developer Tools',
    description: 'Create prompt engineering, model evaluation, AI observability, and agent monitoring tools.',
  },
  {
    emoji: '🏗',
    title: 'Scalable Backend Systems',
    description: 'Design secure, production-ready backend architectures with authentication, database optimization, REST APIs, and cloud integration.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-5xl px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
      >
        Capabilities
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl"
      >
        What I Can Build
      </motion.h2>

      <div className="mt-12 max-w-4xl divide-y divide-border border-t border-border">
        {CAPABILITIES.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[80px_1fr]"
          >
            <span className="font-display text-3xl font-bold text-ink-faint">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 max-w-xl font-body text-ink-muted">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mt-20 font-display text-2xl font-bold text-ink md:text-3xl"
      >
        More Capabilities
      </motion.h3>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MORE_CAPABILITIES.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/50"
          >
            <span className="text-2xl" aria-hidden="true">
              {item.emoji}
            </span>
            <h4 className="mt-3 font-display text-sm font-semibold text-ink">{item.title}</h4>
            <p className="mt-2 font-body text-xs leading-relaxed text-ink-muted">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
