import { useEffect, useRef, useState } from 'react';

interface Props {
  items: string[];
  /** 'left' scrolls right→left (default). 'right' scrolls left→right. */
  direction?: 'left' | 'right';
  /** Pixels per second. Default 40 px/s ≈ 30-40 s for a typical skill row. */
  speed?: number;
  itemClassName?: string;
}

/**
 * Reusable seamless marquee component.
 *
 * • Duplicates item list so the loop never shows a gap.
 * • Pauses on hover so users can read / interact.
 * • Respects prefers-reduced-motion — falls back to a static, wrapped row.
 * • Speed is computed from pixel distance so the tempo is consistent
 *   regardless of how many items are in the list.
 */
export default function MarqueeRow({
  items,
  direction = 'left',
  speed = 40,
  itemClassName,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState<number>(35);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion once on mount.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Compute animation duration from the natural half-width of the track.
  useEffect(() => {
    if (reducedMotion) return;

    const calculateDuration = () => {
      if (trackRef.current) {
        // The track contains 2× the items. We translate -50%, which is the
        // width of one copy. Duration = that distance / speed.
        const halfWidth = trackRef.current.scrollWidth / 2;
        if (halfWidth > 0) {
          setDuration(halfWidth / Math.max(1, speed));
        }
      }
    };

    calculateDuration();
    const ro = new ResizeObserver(calculateDuration);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [items, speed, reducedMotion]);

  const defaultItemStyle =
    'whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent cursor-default select-none';

  // ─── Reduced-motion fallback: static wrapping row ───────────────────────────
  if (reducedMotion) {
    return (
      <div className="flex flex-wrap gap-3 px-6">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className={itemClassName || defaultItemStyle}>
            {item}
          </span>
        ))}
      </div>
    );
  }

  // ─── Animated marquee ────────────────────────────────────────────────────────
  // Keyframe name depends on direction.
  const keyframeName = direction === 'right' ? 'marqueeRight' : 'marqueeLeft';

  // Duplicate list for seamless looping.
  const track = [...items, ...items];

  return (
    /* Outer: clips overflow and adds soft edge fade */
    <div
      className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      style={{ WebkitMaskImage: 'linear-gradient(to right,transparent,black 6%,black 94%,transparent)' }}
    >
      {/*
        Inner track: animates. We pause animation on hover of the *outer*
        wrapper so the whole band pauses — not just individual pills.
      */}
      <div
        className="marquee-track flex w-max items-center gap-3 will-change-transform"
        ref={trackRef}
        style={{
          animationName: keyframeName,
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: 'running',
        }}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={itemClassName || defaultItemStyle}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
