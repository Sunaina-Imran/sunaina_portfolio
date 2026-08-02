import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import type { ProjectItem } from '@/types/portfolio';

interface Props {
  project: ProjectItem;
  index: number;
  onOpenRepoModal: (project: ProjectItem) => void;
}

export default function ProjectCard({ project, index, onOpenRepoModal }: Props) {
  const { repo } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent/50 hover:shadow-[0_16px_40px_-16px_rgba(233,30,140,0.35)]"
    >
      <span className="font-mono text-xs text-ink-faint">
        {String(index + 1).padStart(2, '0')} · {project.year}
      </span>

      <h3 className="mt-3 font-display text-xl font-semibold text-ink">{project.title}</h3>
      <p className="mt-1 font-mono text-xs text-accent">{project.subtitle}</p>
      <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">{project.description}</p>

      {/* flex-1 pushes stack + actions to a consistent position, keeping every card the same height */}
      <div className="mt-4 flex flex-1 flex-col justify-end">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-ink-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            {project.role}
          </span>
          <div className="flex items-center gap-4">
            {repo.type === 'single' && (
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                className="flex items-center gap-1.5 font-mono text-xs text-ink transition-colors hover:text-accent"
              >
                <Github size={14} />
                Code
              </a>
            )}
            {(repo.type === 'multi' || repo.type === 'colab' || repo.type === 'academic') && (
              <button
                onClick={() => onOpenRepoModal(project)}
                aria-label={`View source info for ${project.title}`}
                className="flex items-center gap-1.5 font-mono text-xs text-ink transition-colors hover:text-accent"
              >
                <Github size={14} />
                Code
              </button>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.title}`}
                className="flex items-center gap-1.5 font-mono text-xs text-ink transition-colors hover:text-accent"
              >
                Live Demo
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
