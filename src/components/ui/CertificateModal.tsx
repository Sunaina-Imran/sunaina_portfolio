import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BadgeCheck, ExternalLink, Calendar, GraduationCap, Linkedin } from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';
import type { CertificationItem } from '@/types/portfolio';

interface Props {
  certificate: CertificationItem | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: Props) {
  const { profile } = usePortfolio();

  useEffect(() => {
    if (!certificate) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [certificate, onClose]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
          >
            <button
              onClick={onClose}
              aria-label="Close certificate details"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-600 shadow-md transition-colors hover:bg-neutral-100 hover:text-accent"
            >
              <X size={18} />
            </button>

            {certificate.available ? (
              <>
                {/* Case 1: real certificate file — large preview, zoom-in entrance */}
                <motion.div
                  initial={{ scale: 1.04, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="bg-neutral-100"
                >
                  {certificate.fileType === 'pdf' ? (
                    <iframe
                      src={certificate.image}
                      title={certificate.name}
                      loading="lazy"
                      className="h-[420px] w-full"
                    />
                  ) : (
                    <img
                      src={certificate.image}
                      alt={certificate.name}
                      loading="lazy"
                      className="w-full object-contain"
                    />
                  )}
                </motion.div>

                <div className="p-6 md:p-8">
                  <h3 id="cert-modal-title" className="font-display text-2xl font-bold text-neutral-900">
                    {certificate.name}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-accent">{certificate.issuer}</p>

                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-6 sm:grid-cols-3">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                        Status
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 font-body text-sm font-medium text-neutral-900">
                        <BadgeCheck size={15} className="text-accent" />
                        {certificate.status}
                      </p>
                    </div>
                    {certificate.issueDate && (
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                          Issued
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 font-body text-sm font-medium text-neutral-900">
                          <Calendar size={15} className="text-accent" />
                          {certificate.issueDate}
                        </p>
                      </div>
                    )}
                    {certificate.instructor && (
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                          Instructor
                        </p>
                        <p className="mt-1 font-body text-sm font-medium text-neutral-900">
                          {certificate.instructor}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-2 rounded-xl bg-neutral-50 p-4">
                    {certificate.credentialId && (
                      <p className="font-mono text-xs text-neutral-500">
                        Credential ID: <span className="text-neutral-800">{certificate.credentialId}</span>
                      </p>
                    )}
                    {certificate.credentialUrl && (
                      <a
                        href={certificate.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline"
                      >
                        Verify this certificate
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </>
            ) : (
              // Case 2: no file on record — professional Credential Information Card
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-signature-gradient">
                    <GraduationCap size={22} className="text-white" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 id="cert-modal-title" className="font-display text-xl font-bold text-neutral-900 md:text-2xl">
                      {certificate.name}
                    </h3>
                    <p className="mt-1 font-mono text-sm text-accent">{certificate.issuer}</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                      Status
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 font-body text-sm font-medium text-neutral-900">
                      <BadgeCheck size={15} className="text-accent" />
                      {certificate.status}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                      Verification
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 font-body text-sm font-medium text-neutral-900">
                      <Linkedin size={15} className="text-accent" />
                      Verified on LinkedIn
                    </p>
                  </div>
                </div>

                {certificate.skills.length > 0 && (
                  <div className="mt-6 border-t border-neutral-200 pt-6">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                      Skills Covered
                    </p>
                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {certificate.skills.map((skill) => (
                        <li key={skill} className="flex items-center gap-2 font-body text-sm text-neutral-700">
                          <span className="h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {profile.social.linkedin && (
                  <div className="mt-8 border-t border-neutral-200 pt-6">
                    <a
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-signature-gradient px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-transform hover:scale-105"
                    >
                      <Linkedin size={14} />
                      View on LinkedIn
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
