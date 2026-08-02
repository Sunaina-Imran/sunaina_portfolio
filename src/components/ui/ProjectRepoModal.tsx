import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, GraduationCap, Linkedin } from 'lucide-react';
import type { ProjectItem } from '@/types/portfolio';

interface Props {
  project: ProjectItem | null;
  onClose: () => void;
}

// Simple Colab mark rendered as inline SVG — no external asset dependency.
function ColabMark() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <circle cx="8" cy="12" r="5.5" stroke="#F9AB00" strokeWidth="1.6" />
      <circle cx="16" cy="12" r="5.5" stroke="#E8710A" strokeWidth="1.6" />
    </svg>
  );
}

export default function ProjectRepoModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;
  const { repo } = project;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-bg hover:text-accent"
            >
              <X size={16} />
            </button>

            <h3 className="font-display text-lg font-semibold text-ink">{project.title}</h3>
            <p className="mt-1 font-mono text-xs text-ink-faint">{project.subtitle}</p>

            {repo.type === 'multi' && (
              <div className="mt-6 space-y-3">
                {repo.repos.map((r) => (
                  <a
                    key={r.label}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-border bg-bg px-4 py-3 font-body text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    <span className="flex items-center gap-2">
                      <Github size={16} />
                      {r.label}
                    </span>
                    <ExternalLink size={14} className="text-ink-faint" />
                  </a>
                ))}
              </div>
            )}

            {repo.type === 'colab' && (
              <div className="mt-6">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-bg p-4">
                  <ColabMark />
                  <p className="font-body text-sm leading-relaxed text-ink-muted">{repo.note}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Deep Learning Model', 'CNN Architecture', 'Academic Project'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-4 font-mono text-xs text-ink-faint">
                  Project showcased on my LinkedIn profile.
                </p>
              </div>
            )}

            {repo.type === 'academic' && (
              <div className="mt-6">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-bg p-4">
                  <GraduationCap size={22} className="flex-shrink-0 text-accent" strokeWidth={1.75} />
                  <p className="font-body text-sm leading-relaxed text-ink-muted">{repo.note}</p>
                </div>
                {repo.linkedinUrl && (
                  <a
                    href={repo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline"
                  >
                    <Linkedin size={14} />
                    Learn more about this project on my LinkedIn profile
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
