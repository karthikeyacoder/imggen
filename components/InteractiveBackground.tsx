
import React, { useState, useEffect, useRef } from 'react';

interface Circle {
  id: number;
  x: number;
  y: number;
  initialX: number; // For reduced motion
  initialY: number; // For reduced motion
  size: number;
  baseColor: [number, number, number]; // RGB
  speedFactor: number;
  opacity: number;
}

const NUM_CIRCLES = 5;
const MIN_SIZE = 150;
const MAX_SIZE = 450; // Slightly increased max size
const MIN_SPEED = 0.01;
const MAX_SPEED = 0.04; // Slightly reduced max speed for softer movement

export const InteractiveBackground: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const mousePosition = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    const initialCircles: Circle[] = [];
    const { innerWidth, innerHeight } = window;
    for (let i = 0; i < NUM_CIRCLES; i++) {
      const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
      const initialX = Math.random() * innerWidth;
      const initialY = Math.random() * innerHeight;
      initialCircles.push({
        id: i,
        x: initialX,
        y: initialY,
        initialX: initialX,
        initialY: initialY,
        size: size,
        baseColor: i % 3 === 0 ? [0, 123, 255] : (i % 3 === 1 ? [111, 66, 193] : [233, 30, 99]), // Blue, Purple, Pink
        speedFactor: MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
        opacity: 0.1 + Math.random() * 0.1, // Opacity between 0.1 and 0.2
      });
    }
    setCircles(initialCircles);

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = { x: event.clientX, y: event.clientY };
    };
    if (!isReducedMotion) {
        window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (!isReducedMotion) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isReducedMotion]); // Re-initialize if reduced motion preference changes

  useEffect(() => {
    if (isReducedMotion || circles.length === 0) {
      // For reduced motion, ensure circles are at their initial static positions
      if (isReducedMotion) {
        setCircles(prevCircles => 
            prevCircles.map(c => ({ ...c, x: c.initialX, y: c.initialY }))
        );
      }
      return;
    }

    let animationFrameId: number;
    const updateCirclesPosition = () => {
      setCircles(prevCircles =>
        prevCircles.map(circle => {
          const dx = mousePosition.current.x - circle.x;
          const dy = mousePosition.current.y - circle.y;
          const newX = circle.x + dx * circle.speedFactor;
          const newY = circle.y + dy * circle.speedFactor;
          return { ...circle, x: newX, y: newY };
        })
      );
      animationFrameId = requestAnimationFrame(updateCirclesPosition);
    };

    animationFrameId = requestAnimationFrame(updateCirclesPosition);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [circles.length, isReducedMotion]); // Effect depends on circles being initialized and motion preference

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {circles.map(circle => (
        <div
          key={circle.id}
          className="absolute rounded-full"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: '0px',
            top: '0px',
            transform: `translate3d(${circle.x}px, ${circle.y}px, 0) translate3d(-50%, -50%, 0)`,
            background: `radial-gradient(circle, rgba(${circle.baseColor.join(',')}, 0.4) 0%, rgba(${circle.baseColor.join(',')}, 0) 70%)`,
            opacity: circle.opacity,
            willChange: 'transform', // Hint for browser optimization
          }}
        />
      ))}
    </div>
  );
};
