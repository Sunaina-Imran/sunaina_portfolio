import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useResponsiveGridSize } from '@/hooks/useResponsiveGridSize';
import ProjectStack from '@/components/ui/ProjectStack';
import ProjectRepoModal from '@/components/ui/ProjectRepoModal';
import FilterPills from '@/components/ui/FilterPills';
import type { ProjectItem } from '@/types/portfolio';

function chunkIntoPages<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

export default function ProjectsSection() {
  const { projects } = usePortfolio();
  const [filter, setFilter] = useState('All');
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);
  const gridSize = useResponsiveGridSize();

  const filterOptions = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.stack.forEach((t) => tags.add(t)));
    const priority = ['Python', 'RAG', 'Computer Vision', 'FastAPI', 'React', 'TensorFlow', 'Scikit-learn', 'Streamlit'];
    const ordered = priority.filter((t) => tags.has(t));
    return ['All', ...ordered];
  }, [projects]);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.stack.includes(filter));

  // Pages auto-adjust to the current breakpoint: 3 cards/page on laptop &
  // desktop, 2 on tablet, 1 on mobile — recomputed live on resize.
  const pages = useMemo(() => chunkIntoPages(filtered, gridSize), [filtered, gridSize]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
      >
        Projects
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl"
      >
        Things I've built.
      </motion.h2>

      <div className="mt-8">
        <FilterPills options={filterOptions} active={filter} onSelect={setFilter} />
      </div>

      {/* Fanned card-deck: each page (3 cards desktop / 2 tablet / 1 mobile)
          gets one full turn at center stage while scrolling, and pages already
          passed stay visible, peeking above it in a shallow, receding stack. */}
      {pages.length > 0 ? (
        <div className="mt-10">
          <ProjectStack key={`${filter}-${gridSize}`} pages={pages} onOpenRepoModal={setModalProject} />
        </div>
      ) : (
        <p className="mt-10 font-body text-ink-muted">No projects match that filter yet.</p>
      )}

      <ProjectRepoModal project={modalProject} onClose={() => setModalProject(null)} />
    </section>
  );
}
