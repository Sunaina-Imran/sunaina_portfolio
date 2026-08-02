import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Capabilities', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { profile } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const targetId = href.replace('#', '');

    // Defer scroll so the mobile menu close animation (250ms) finishes
    // before we measure the element's position. Without this, getBoundingClientRect
    // returns an incorrect offset while the drawer is still collapsing.
    setTimeout(() => {
      const el = document.getElementById(targetId) || document.querySelector(href);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/85 backdrop-blur-xl border-b border-border/80 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Desktop nav — centered */}
      <nav className="mx-auto hidden max-w-7xl items-center justify-center px-4 sm:px-6 lg:flex lg:px-8">
        {/* Desktop Navigation Menu */}
        <div className="flex items-center gap-1 xl:gap-2">
          <ul className="flex items-center gap-1 rounded-full border border-border/60 bg-surface/40 p-1.5 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`relative z-10 block px-3 py-1.5 font-mono text-[11px] xl:text-xs uppercase tracking-wider transition-colors duration-200 ${
                      isActive
                        ? 'text-ink font-semibold'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </a>

                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 z-0 rounded-full border border-accent/40 bg-accent/15 shadow-sm shadow-accent/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Resume CTA Button */}
          <a
            href={profile.resumeUrl}
            download
            className="ml-3 inline-flex items-center gap-1.5 rounded-full bg-signature-gradient px-4 py-2 font-mono text-[11px] xl:text-xs uppercase tracking-widest text-ink font-medium shadow-md shadow-accent/20 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 active:scale-95"
          >
            <span>Resume</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
          </a>
        </div>
      </nav>

      {/* Mobile / Tablet header row */}
      <div className="mx-auto flex max-w-7xl items-center justify-end px-4 sm:px-6 lg:hidden">
        {/* Mobile Menu Button */}
        <button
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-surface/60 text-ink transition-colors hover:border-accent/50 hover:bg-surface focus:outline-none"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X className="h-5 w-5 text-accent" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile / Tablet Navigation Overlay & Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-border/80 bg-bg/95 backdrop-blur-2xl shadow-2xl lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-6 py-6">
              <ul className="flex flex-col space-y-1">
                {NAV_ITEMS.map((item) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;

                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-widest transition-all ${
                          isActive
                            ? 'bg-accent/15 border border-accent/30 text-accent font-semibold'
                            : 'text-ink-muted hover:bg-surface/60 hover:text-ink'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 pt-4 border-t border-border/60">
                <a
                  href={profile.resumeUrl}
                  download
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-signature-gradient py-3.5 font-mono text-xs uppercase tracking-widest text-ink font-semibold shadow-md shadow-accent/20 active:scale-98"
                >
                  <span>Download Resume</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
