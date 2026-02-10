import React from 'react';

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
  // Props kept for compatibility with App.tsx,
  // but no longer used now that the background is pure video.
  sceneMode,
  hoverIntensity = 0.0,
  button1Bounds = { x: 0.5, y: 0.5, w: 0, h: 0 },
  button2Bounds = { x: 0.5, y: 0.5, w: 0, h: 0 }
}) => {
  return (
    <div className="fixed inset-0 w-full h-full bg-black z-0 pointer-events-none">
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
        src="/main-bg.mp4"
      />
    </div>
  );
};

export default LandingScene;