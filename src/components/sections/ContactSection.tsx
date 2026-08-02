import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactSection() {
  const { profile } = usePortfolio();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formState, setFormState] = useState<FormState>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!accessKey) {
      console.error(
        '[ContactSection] VITE_WEB3FORMS_ACCESS_KEY is not defined. ' +
        'Add it to your .env file locally and to the Vercel Environment Variables dashboard for production.'
      );
      setFormState('error');
      return;
    }

    setFormState('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: '🚀 New Portfolio Inquiry | Sunaina Khan',
          from_name: 'Sunaina Portfolio',
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data: { success: boolean; message?: string } = await response.json();

      if (data.success) {
        setFormState('success');
        setForm({ name: '', email: '', message: '' });
        formRef.current?.reset();
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
      >
        Contact
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl"
      >
        Let's build something together.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 max-w-lg font-body text-ink-muted"
      >
        Open to internships, freelance opportunities, AI projects, startup collaborations,
        and software development work. Send a message and it opens straight in your email client.
      </motion.p>

      <div className="mt-12 grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <a
            href={`mailto:${profile.social.email}`}
            className="flex items-center gap-3 font-body text-ink-muted transition-colors hover:text-accent"
          >
            <Mail size={18} className="text-accent" />
            {profile.social.email}
          </a>
          <a
            href={`tel:${profile.social.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-3 font-body text-ink-muted transition-colors hover:text-accent"
          >
            <Phone size={18} className="text-accent" />
            {profile.social.phone}
          </a>
          <p className="flex items-center gap-3 font-body text-ink-muted">
            <MapPin size={18} className="text-accent" />
            {profile.location}
          </p>
        </motion.div>

        <motion.form
          ref={formRef}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 font-body text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 font-body text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="What are you building?"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 font-body text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
          />

          {/* Success / Error feedback */}
          {formState === 'success' && (
            <p className="font-body text-sm text-green-400">
              ✓ Message sent successfully!
            </p>
          )}
          {formState === 'error' && (
            <p className="font-body text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={formState === 'loading'}
            className="flex items-center gap-2 rounded-full bg-signature-gradient px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {formState === 'loading' ? 'Sending...' : 'Send Message'}
            {formState !== 'loading' && <Send size={14} />}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
