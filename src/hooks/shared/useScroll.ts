import { useCallback } from 'react';

export function useScroll() {
  return useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const prefersMobilePosition = window.innerWidth < 768;

    element.scrollIntoView({
      behavior: 'smooth',
      block: prefersMobilePosition ? 'start' : 'center',
    });
  }, []);
}