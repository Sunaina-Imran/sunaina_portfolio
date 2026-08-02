import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function BackToTop() {
  const progress = useScrollProgress();
  const visible = progress > 15;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-signature-gradient text-ink shadow-lg transition-transform hover:scale-110"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
