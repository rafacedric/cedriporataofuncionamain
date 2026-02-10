import React, { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  showOutline?: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ showOutline = true }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  
  // Use refs for mutable values to avoid re-renders on every frame
  const mouse = useRef({ x: -100, y: -100 });
  const outline = useRef({ x: -100, y: -100 });
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // 1. Mouse Movement Tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Update dot immediately for responsiveness
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      
      if (!isVisible) setIsVisible(true);
    };

    // 2. Visibility Handling
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // 3. Hover Detection (Event Delegation)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for common interactive elements or the specific utility class
      if (target.closest('button, a, input, textarea, select, .cursor-pointer')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
       const target = e.target as HTMLElement;
       if (target.closest('button, a, input, textarea, select, .cursor-pointer')) {
         setIsHovering(false);
       }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isVisible]);

  // 4. Animation Loop for Smooth Inertia (The "Lag" Effect)
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      // Lerp factor (0.15 gives a nice premium weight)
      outline.current.x += (mouse.current.x - outline.current.x) * 0.15;
      outline.current.y += (mouse.current.y - outline.current.y) * 0.15;

      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate(${outline.current.x}px, ${outline.current.y}px) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <>
      {/* Inner Dot */}
      <div 
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      />
      {/* Outer Circle - only visible if showOutline is true */}
      <div 
        ref={outlineRef}
        className={`fixed top-0 left-0 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-300 ease-out ${isVisible && showOutline ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          width: isHovering ? '60px' : '40px', 
          height: isHovering ? '60px' : '40px',
          willChange: 'transform, width, height' 
        }}
      />
    </>
  );
};

export default CustomCursor;