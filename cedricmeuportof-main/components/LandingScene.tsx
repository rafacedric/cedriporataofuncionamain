import React, { useState, useEffect } from 'react';

export type SceneMode = 'index' | 'art' | 'professional';

export interface ButtonBounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface LandingSceneProps {
  sceneMode: SceneMode;
  hoverIntensity?: number;
  button1Bounds?: ButtonBounds;
  button2Bounds?: ButtonBounds;
}

const LandingScene: React.FC<LandingSceneProps> = ({ 
  // Props kept for compatibility with App.tsx
  sceneMode,
  hoverIntensity = 0.0,
  button1Bounds = { x: 0.5, y: 0.5, w: 0, h: 0 },
  button2Bounds = { x: 0.5, y: 0.5, w: 0, h: 0 }
}) => {
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    // Function to check aspect ratio
    const handleResize = () => {
      setIsVertical(window.innerWidth < window.innerHeight);
    };

    // Run on mount
    handleResize();

    // Listen for window resizing
    window.addEventListener('resize', handleResize);
    
    // Clean up listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-black z-0 pointer-events-none">
      <video
        // The 'key' forces React to re-render the tag when switching sources,
        // which ensures the new video starts playing immediately.
        key={isVertical ? 'portrait' : 'landscape'}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
        // Ensure you have a 'main-bg-vertical.mp4' in your public folder
        src={isVertical 
          ? `${import.meta.env.BASE_URL}main-bg-vertical.webm` 
          : `${import.meta.env.BASE_URL}main-bg.webm`
        }
      />
    </div>
  );
};

export default LandingScene;