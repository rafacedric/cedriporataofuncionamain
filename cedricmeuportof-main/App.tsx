import React, { useState, useEffect, useRef } from 'react';
import LandingScene, { SceneMode, ButtonBounds } from './components/LandingScene';
import ArtPortfolio from './components/ArtPortfolio';
import ProfessionalPortfolio from './components/ProfessionalPortfolio';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<SceneMode>('index');
  const [button1Bounds, setButton1Bounds] = useState<ButtonBounds>({ x:0, y:0, w:0, h:0 });
  const [button2Bounds, setButton2Bounds] = useState<ButtonBounds>({ x:0, y:0, w:0, h:0 });
  
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);

  // Track Button Positions for Shader Masking
  useEffect(() => {
    const updateBounds = () => {
      // Only update if elements exist (they might not in non-index views)
      if (btn1Ref.current && btn2Ref.current) {
        const rect1 = btn1Ref.current.getBoundingClientRect();
        const rect2 = btn2Ref.current.getBoundingClientRect();
        
        // Convert to Normalized Coordinates (0-1)
        setButton1Bounds({
          x: (rect1.left + rect1.width / 2) / window.innerWidth,
          y: (rect1.top + rect1.height / 2) / window.innerHeight,
          w: (rect1.width / 2) / window.innerWidth,
          h: (rect1.height / 2) / window.innerHeight
        });
        
        setButton2Bounds({
          x: (rect2.left + rect2.width / 2) / window.innerWidth,
          y: (rect2.top + rect2.height / 2) / window.innerHeight,
          w: (rect2.width / 2) / window.innerWidth,
          h: (rect2.height / 2) / window.innerHeight
        });
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    const timer = setTimeout(updateBounds, 100);
    return () => {
      window.removeEventListener('resize', updateBounds);
      clearTimeout(timer);
    }
  }, [currentView]);

  const navigateTo = (view: SceneMode) => {
    window.scrollTo(0, 0);
    setCurrentView(view);
  };

  return (
    <main className={`relative w-full min-h-screen font-sans bg-white text-black transition-colors duration-700 ${currentView === 'index' ? 'overflow-hidden h-screen' : ''}`}>
      
      {/* 
        Custom Cursor Logic: 
        Only show the outline (outer circle) when on the index page.
        Otherwise, pass showOutline={false} to keep it minimal (dot only).
      */}
      <CustomCursor showOutline={currentView === 'index'} />

      {/* Background WebGL Layer */}
      <LandingScene 
        sceneMode={currentView} 
        button1Bounds={button1Bounds}
        button2Bounds={button2Bounds}
      />

      {/* Index View */}
      {currentView === 'index' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center animate-in fade-in duration-1000">
          
          {/* Centered Buttons at ~65% Height */}
          <div className="absolute top-[65%] w-full flex flex-col md:flex-row items-center justify-center gap-8 -translate-y-1/2">
            
            {/* Button 1 */}
            <button 
              ref={btn1Ref}
              onClick={() => navigateTo('art')}
              className="group relative w-64 h-20 rounded-full flex items-center justify-center transition-transform duration-500 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 font-bold text-lg tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 group-hover:from-black group-hover:to-black transition-all duration-300">
                Art Portfolio
              </span>
            </button>
            
            {/* Button 2 */}
            <button 
              ref={btn2Ref}
              onClick={() => navigateTo('professional')}
              className="group relative w-64 h-20 rounded-full flex items-center justify-center transition-transform duration-500 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 font-bold text-lg tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 group-hover:from-black group-hover:to-black transition-all duration-300">
                Professional
              </span>
            </button>
          </div>

          {/* Name in Bottom Right */}
          <div className="fixed bottom-0 right-0 p-8 md:p-16 z-30 pointer-events-none">
            <h1 className="font-black text-4xl md:text-6xl tracking-tighter leading-none text-right text-transparent bg-clip-text bg-gradient-to-br from-gray-700 via-gray-500 to-gray-300">
              RAFAEL<br />CEDRIC
            </h1>
          </div>
        </div>
      )}

      {/* Art Portfolio View */}
      {currentView === 'art' && (
        <div className="animate-in fade-in duration-700">
           <ArtPortfolio 
              onBack={() => navigateTo('index')} 
              onHoverChange={() => {}}
           />
        </div>
      )}

      {/* Professional Portfolio View */}
      {currentView === 'professional' && (
         <div className="animate-in fade-in duration-700">
            <ProfessionalPortfolio 
              onBack={() => navigateTo('index')}
            />
         </div>
      )}

    </main>
  );
};

export default App;