import { Github, Linkedin, Instagram, Mail, Phone, Globe } from 'lucide-react';
import type { SocialLinks as SocialLinksType } from '@/types/portfolio';

interface Props {
  social: SocialLinksType;
  className?: string;
  variant?: 'pill' | 'plain';
}

const LINK_CONFIG: Array<{
  key: keyof SocialLinksType;
  icon: typeof Github;
  label: string;
  href: (value: string) => string;
  external: boolean;
}> = [
  { key: 'github', icon: Github, label: 'GitHub', href: (v) => v, external: true },
  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: (v) => v, external: true },
  { key: 'instagram', icon: Instagram, label: 'Instagram', href: (v) => v, external: true },
  // Email icon scrolls to the Contact section instead of opening a mail client.
  { key: 'email', icon: Mail, label: 'Email — go to Contact', href: () => '#contact', external: false },
  { key: 'phone', icon: Phone, label: 'Phone', href: (v) => `tel:${v.replace(/\s+/g, '')}`, external: false },
  { key: 'website', icon: Globe, label: 'Website', href: (v) => v, external: true },
];

export default function SocialLinks({ social, className = '', variant = 'pill' }: Props) {
  const activeLinks = LINK_CONFIG.filter((item) => social[item.key] && social[item.key].trim() !== '');

  if (activeLinks.length === 0) return null;

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {activeLinks.map(({ key, icon: Icon, label, href, external }) => (
        <a
          key={key}
          href={href(social[key])}
          onClick={key === 'email' ? handleEmailClick : undefined}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          aria-label={label}
          className={
            variant === 'pill'
              ? 'flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink-muted transition-colors hover:border-accent hover:text-accent'
              : 'text-ink-muted transition-colors hover:text-accent'
          }
        >
          <Icon size={18} strokeWidth={1.75} />
        </a>
      ))}
    </div>
  );
}
