import { useEffect, useState } from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';
import SocialLinks from '@/components/SocialLinks';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const { profile } = usePortfolio();
  const year = new Date().getFullYear();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = QUICK_LINKS.map((item) => item.href.replace('#', ''));
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
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId) || document.querySelector(href);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-border/80 bg-gradient-to-b from-bg via-surface/30 to-bg text-ink overflow-hidden">
      {/* Top Border Glow Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Background Ambient Glow Effects */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/3 h-64 w-64 rounded-full bg-accent-violet/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:gap-12">
          
          {/* Left Section: Name, Specialization, Location & Animated Status Indicator */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              {/* Name with subtle ambient glow behind */}
              <div className="relative inline-block">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-accent/25 via-accent-violet/20 to-transparent blur-xl opacity-70 pointer-events-none" />
                <h3 className="relative font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                  <span className="hero-heading">{profile.name}</span>
                </h3>
              </div>

              {/* Specialization */}
              <p className="mt-2.5 font-mono text-xs uppercase tracking-wider text-ink-muted">
                {profile.specialization}
              </p>
              
              {/* Location */}
              <p className="mt-1.5 font-mono text-xs text-ink-faint flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-accent/80 shrink-0" />
                <span>{profile.location}</span>
              </p>
            </div>

            {/* Small Animated Status Indicator */}
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 backdrop-blur-md w-fit shadow-sm shadow-emerald-500/10 transition-all duration-300 hover:border-emerald-500/50">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] sm:text-xs font-medium tracking-wide text-emerald-400">
                Available for AI/ML Engineering Opportunities
              </span>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="md:col-span-4">
            <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Quick Links
            </h4>

            <ul className="mt-4 flex flex-col space-y-2.5">
              {QUICK_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={`group relative inline-flex items-center gap-1.5 py-1 font-body text-sm transition-all duration-300 ${
                        isActive
                          ? 'text-accent font-medium'
                          : 'text-ink-muted hover:text-ink'
                      }`}
                    >
                      {/* Small Arrow Icon on Hover / Active */}
                      <ArrowRight
                        className={`h-3.5 w-3.5 shrink-0 transition-all duration-300 ease-out ${
                          isActive
                            ? 'text-accent translate-x-0 opacity-100'
                            : '-translate-x-2 opacity-0 text-accent group-hover:translate-x-0 group-hover:opacity-100'
                        }`}
                      />

                      <span className="relative">
                        <span
                          className={`transition-transform duration-300 ease-out inline-block ${
                            isActive ? 'translate-x-0' : 'group-hover:translate-x-0.5'
                          }`}
                        >
                          {link.label}
                        </span>

                        {/* Animated Underline */}
                        <span
                          className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-accent to-accent-violet transition-all duration-300 ease-out ${
                            isActive
                              ? 'w-full opacity-100'
                              : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                          }`}
                        />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Section: Reach Out */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-violet" />
                Reach Out
              </h4>

              <div className="mt-4 space-y-2.5">
                <a
                  href={`mailto:${profile.social.email}`}
                  className="group flex items-center gap-2.5 font-body text-sm text-ink-muted transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4 text-ink-faint transition-colors group-hover:text-accent shrink-0" />
                  <span className="truncate">{profile.social.email}</span>
                </a>

                {profile.social.phone && (
                  <div className="flex items-center gap-2.5 font-body text-sm text-ink-muted">
                    <Phone className="h-4 w-4 text-ink-faint shrink-0" />
                    <span>{profile.social.phone}</span>
                  </div>
                )}
              </div>

              <div className="mt-5">
                <SocialLinks social={profile.social} variant="plain" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Credit Bar */}
      <div className="border-t border-border/60 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 font-mono text-[11px] text-ink-faint sm:flex-row">
          <span>© {year} {profile.name}. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Built with React, TypeScript &amp; Tailwind
          </span>
        </div>
      </div>
    </footer>
  );
}
