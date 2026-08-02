import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import type { ProjectItem } from '@/types/portfolio';

interface StackPageProps {
  page: ProjectItem[];
  pageIndex: number;
  startIndex: number;
  continuousIndex: MotionValue<number>;
  onOpenRepoModal: (project: ProjectItem) => void;
}

/**
 * One "page" of the stack — 3 cards on desktop, 2 on tablet, 1 on mobile,
 * whatever actually fits a row at the current breakpoint. `continuousIndex`
 * is a single spring-smoothed value shared by every page (0 at the top of
 * the section, pageCount-1 at the bottom); this page's distance from it
 * ("depth") drives its own transform:
 *   depth < 0   → hasn't arrived yet, waiting below, invisible
 *   depth = 0   → the active page: full size, full opacity, clickable
 *   depth > 0   → already passed, peeking above the active page as a thin,
 *                 progressively smaller/fainter layer
 *
 * Because the driving value is spring-smoothed (see ProjectStack below)
 * instead of following raw scroll pixels 1:1, fast or jumpy scrolling
 * (trackpad flicks, PageDown, momentum scroll) eases into the transition
 * instead of snapping — this is what makes it feel smooth rather than janky.
 */
function StackPage({ page, pageIndex, startIndex, continuousIndex, onOpenRepoModal }: StackPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const depth = useTransform(continuousIndex, (v) => v - pageIndex);

  const y = useTransform(depth, [-1, 0, 1, 2, 3, 4], ['10%', '0%', '-5%', '-9%', '-12%', '-14%']);
  const scale = useTransform(depth, [-1, 0, 1, 2, 3, 4], [0.95, 1, 0.97, 0.945, 0.92, 0.9]);
  const opacity = useTransform(depth, [-1, -0.001, 0, 2, 3, 4], [0, 1, 1, 0.7, 0.4, 0]);
  const pointerEvents = useTransform(depth, (d) => (d > -0.5 && d < 0.5 ? 'auto' : 'none'));

  return (
    <motion.div
      style={
        prefersReducedMotion
          ? { zIndex: pageIndex + 1 }
          : { zIndex: pageIndex + 1, y, scale, opacity, pointerEvents }
      }
      className="col-start-1 row-start-1 w-full origin-top transform-gpu will-change-transform"
    >
      <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {page.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={startIndex + i}
            onOpenRepoModal={onOpenRepoModal}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface ProjectStackProps {
  pages: ProjectItem[][];
  onOpenRepoModal: (project: ProjectItem) => void;
}

/**
 * The whole deck. One long scroll track (pageCount × viewport height) with a
 * single sticky "stage" pinned inside it. A spring-smoothed scroll value
 * sweeps 0 → pageCount-1 across that track, and each page reacts to its own
 * distance from that value — one shared scroll listener, no per-page
 * IntersectionObservers, no React re-renders while scrolling.
 */
export default function ProjectStack({ pages, onOpenRepoModal }: ProjectStackProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pageCount = pages.length;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Spring-smoothed so the stack eases toward the scroll position rather than
  // snapping to it every frame — this is the key fix for jittery motion.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    mass: 0.9,
    restDelta: 0.0005,
  });

  const continuousIndex = useTransform(smoothProgress, [0, 1], [0, Math.max(pageCount - 1, 0)]);

  if (pageCount === 0) return null;

  let runningIndex = 0;

  return (
    <div ref={wrapperRef} className="relative" style={{ height: `${pageCount * 100}vh` }}>
      <div className="sticky top-24 flex h-[calc(100vh-9rem)] items-center justify-center">
        <div className="grid w-full">
          {pages.map((page, pageIndex) => {
            const startIndex = runningIndex;
            runningIndex += page.length;
            return (
              <StackPage
                key={page.map((p) => p.id).join('-')}
                page={page}
                pageIndex={pageIndex}
                startIndex={startIndex}
                continuousIndex={continuousIndex}
                onOpenRepoModal={onOpenRepoModal}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
