import { motion } from 'framer-motion';
import { useCustomCursor } from '@/hooks/useCustomCursor';

export default function CustomCursor() {
  const { enabled, position, pointerType } = useCustomCursor();

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[90] rounded-full mix-blend-difference"
      animate={{
        x: position.x - (pointerType === 'link' ? 18 : 6),
        y: position.y - (pointerType === 'link' ? 18 : 6),
        width: pointerType === 'link' ? 36 : 12,
        height: pointerType === 'link' ? 36 : 12,
        backgroundColor: '#E91E8C',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.3 }}
    />
  );
}
