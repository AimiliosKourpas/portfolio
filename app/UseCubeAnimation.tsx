import { useEffect } from 'react';

export default function useCubeAnimation() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const cubes = document.querySelectorAll<HTMLLIElement>('.cubes li');

      cubes.forEach((cube, index) => {
        const baseSpeed = (index + 1) * 10; // Base speed multiplier
        const speed = baseSpeed + scrollPosition / 50; // Adjust speed based on scroll
        cube.style.animationDuration = `${speed}s`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
