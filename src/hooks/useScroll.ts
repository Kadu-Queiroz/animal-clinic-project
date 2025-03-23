import { useCallback } from 'react';

export function useScroll() {
  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const isMobile = window.innerWidth < 768;

      section.scrollIntoView({
        behavior: 'smooth',
        block: isMobile ? 'start' : 'center',
      });
    }
  }, []);

  return scrollToSection;
}