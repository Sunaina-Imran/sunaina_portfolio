import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';

export function useGlowPointer<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    setFine(window.matchMedia('(pointer: fine)').matches);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!fine || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [fine],
  );

  const onMouseLeave = useCallback(() => setPos(null), []);

  return { ref, pos, fine, onMouseMove, onMouseLeave };
}
