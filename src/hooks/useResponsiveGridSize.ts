import { useEffect, useState } from 'react';

const TABLET_QUERY = '(min-width: 768px)';
const DESKTOP_QUERY = '(min-width: 1024px)';

function computeGridSize(): number {
  if (typeof window === 'undefined') return 3;
  if (window.matchMedia(DESKTOP_QUERY).matches) return 3;
  if (window.matchMedia(TABLET_QUERY).matches) return 2;
  return 1;
}

/**
 * Number of project cards shown per "page" of the stack, matching how many
 * columns are actually on screen: 3 on laptop/desktop, 2 on tablet, 1 on
 * mobile. Updates live if the viewport is resized or rotated.
 */
export function useResponsiveGridSize(): number {
  const [gridSize, setGridSize] = useState<number>(computeGridSize);

  useEffect(() => {
    const tabletMql = window.matchMedia(TABLET_QUERY);
    const desktopMql = window.matchMedia(DESKTOP_QUERY);
    const update = () => setGridSize(computeGridSize());

    update();
    tabletMql.addEventListener('change', update);
    desktopMql.addEventListener('change', update);
    return () => {
      tabletMql.removeEventListener('change', update);
      desktopMql.removeEventListener('change', update);
    };
  }, []);

  return gridSize;
}
