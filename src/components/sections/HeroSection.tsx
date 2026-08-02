import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';
import SocialLinks from '@/components/SocialLinks';
import NodeGraphBackground from '@/components/ui/NodeGraphBackground';
import MarqueeRow from '@/components/ui/MarqueeRow';

function usePhotoParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  // Smooth, elegant easing — never snappy or excessive
  const springConfig = { stiffness: 120, damping: 18, mass: 0.6 };
  const springX = useSpring(mvX, springConfig);
  const springY = useSpring(mvY, springConfig);

  // Photo itself: subtle shift, standing in for "eyes/head following cursor"
  const photoX = useTransform(springX, [-1, 1], [-10, 10]);
  const photoY = useTransform(springY, [-1, 1], [-8, 8]);
  // Glow drifts a touch further for a soft parallax depth cue
  const glowX = useTransform(springX, [-1, 1], [-18, 18]);
  const glowY = useTransform(springY, [-1, 1], [-14, 14]);
  // Tiny rotation reads as a head-tilt-toward-cursor effect
  const rotate = useTransform(springX, [-1, 1], [-3, 3]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const el = ref.current;
    if (!el || mq.matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      mvX.set(Math.max(-1, Math.min(1, dx)));
      mvY.set(Math.max(-1, Math.min(1, dy)));
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, reducedMotion, photoX, photoY, glowX, glowY, rotate };
}

export default function HeroSection() {
  const { profile } = usePortfolio();
  const { ref: photoRef, reducedMotion, photoX, photoY, glowX, glowY, rotate } = usePhotoParallax();

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pb-10 pt-24 md:pt-28"
    >
      {/* Ambient signature background */}
      <NodeGraphBackground className="absolute -right-10 top-20 w-[340px] opacity-35 md:w-[500px] lg:w-[600px]" />
      <div className="pointer-events-none absolute inset-0 bg-glow-radial opacity-15" />

      {/* Eyebrow — roles, sliding marquee confined to center band */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 w-full md:mb-8"
      >
        {/* Fixed-width centered window — text slides inside, never escapes */}
        <div
          className="mx-auto overflow-hidden"
          style={{
            width: 'min(480px, 90vw)',
            maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 'max-content',
              animation: 'heroRoleSlide 6s linear infinite',
            }}
          >
            {/* Original + duplicate for seamless loop */}
            {[0, 1].map((copy) => (
              <span key={copy} className="flex items-center gap-4 pr-12">
                {profile.roles.map((role, i) => (
                  <span key={`${copy}-${role}`} className="flex items-center gap-4">
                    <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.35em] text-accent md:text-xs">
                      {role}
                    </span>
                    {i < profile.roles.length - 1 && (
                      <span className="font-mono text-[10px] text-accent/50 md:text-xs">·</span>
                    )}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main content: headline + photo side by side */}
      <div className="flex w-full max-w-6xl flex-1 flex-col items-center gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16">

        {/* Left: Text content */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hero-heading font-display font-bold leading-[0.92] tracking-tight"
            style={{ fontSize: 'clamp(2.6rem, 7.5vw, 5.2rem)' }}
          >
            Hi, I'm {profile.shortName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 max-w-[42ch] font-body text-base leading-relaxed text-ink-muted md:text-lg"
            style={{ wordBreak: 'normal', overflowWrap: 'normal' }}
          >
            {profile.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start md:gap-4"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-full bg-signature-gradient px-7 py-3 font-mono text-[11px] uppercase tracking-widest text-ink shadow-md shadow-accent/25 transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/35 md:px-8 md:py-3.5"
            >
              View Projects
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="rounded-full border border-border/80 bg-surface/40 px-7 py-3 font-mono text-[11px] uppercase tracking-widest text-ink-muted backdrop-blur-sm transition-all hover:border-accent/60 hover:text-accent md:px-8 md:py-3.5"
            >
              Download Resume
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <SocialLinks
              social={profile.social}
              className="mt-8 justify-center md:justify-start"
            />
          </motion.div>
        </div>

        {/* Right: Profile Photo */}
        <motion.div
          ref={photoRef}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="relative shrink-0"
          style={{ width: 'clamp(220px, 28vw, 380px)' }}
        >
          {/* Pink glow ring behind photo */}
          <motion.div
            style={reducedMotion ? undefined : { x: glowX, y: glowY }}
            className="absolute inset-[-12%] -z-10 animate-pulseGlow rounded-full bg-glow-radial blur-3xl"
          />

          <motion.div
            animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
            transition={
              reducedMotion
                ? undefined
                : { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }
            }
            className="will-change-transform"
          >
            <motion.div
              style={reducedMotion ? undefined : { x: photoX, y: photoY, rotate }}
              className="will-change-transform"
            >
              <img
                src="/src/assets/img/profile.jpg"
                alt={profile.name}
                className="w-full rounded-full object-cover shadow-[0_0_80px_-8px_rgba(233,30,140,0.55)]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Location / education row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-8 flex items-center gap-2.5 font-mono text-[11px] text-ink-faint md:mt-10"
      >
        <span className="text-ink-muted/70">{profile.location}</span>
        <span className="h-1 w-1 rounded-full bg-accent/60" />
        <span className="text-accent/80">Undergraduate</span>
        <span className="h-1 w-1 rounded-full bg-accent/60" />
        <span className="text-ink-muted/70">BSc Artificial Intelligence</span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="mt-8 md:mt-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown size={18} className="text-ink-faint" />
      </motion.div>
    </section>
  );
}
