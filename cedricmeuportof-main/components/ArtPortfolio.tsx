import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ArtPortfolioProps {
  onBack: () => void;
  onHoverChange: (isHovering: boolean) => void;
}

// Mock data with varying aspect ratios simulated by Unsplash dimensions
const GALLERY_ITEMS = [
  { id: 1, src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80", title: "Chromodynamics", aspect: "aspect-[3/4]" },
  { id: 2, src: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80", title: "Rose Gold Noise", aspect: "aspect-square" },
  { id: 3, src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80", title: "Liquid State", aspect: "aspect-[4/3]" },
  { id: 4, src: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80", title: "Mathematical Beauty", aspect: "aspect-[2/3]" },
  { id: 5, src: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=800&q=80", title: "Glacial Form", aspect: "aspect-[3/2]" },
  { id: 6, src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", title: "Oil & Water", aspect: "aspect-[3/4]" },
  { id: 7, src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80", title: "Neon Smoke", aspect: "aspect-square" },
  { id: 8, src: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=800&q=80", title: "Cyber Punk", aspect: "aspect-[16/9]" },
  { id: 9, src: "https://images.unsplash.com/photo-1550059550-e8869c938d22?auto=format&fit=crop&w=800&q=80", title: "Refraction", aspect: "aspect-[9/16]" },
];

const ArtPortfolio: React.FC<ArtPortfolioProps> = ({ onBack, onHoverChange }) => {
  return (
    <div className="relative w-full min-h-screen z-20">
      
      {/* Header */}
      <div className="fixed top-0 left-0 w-full h-24 z-50 flex items-center justify-between px-8 md:px-12 pointer-events-none bg-gradient-to-b from-white/80 to-transparent backdrop-blur-[2px]">
        <button 
          onClick={onBack}
          className="pointer-events-auto flex items-center text-black/70 hover:text-black transition-colors group"
        >
          <div className="p-4 rounded-full border border-black/10 group-hover:bg-black/5 transition-all hover:scale-110 bg-white/50">
            <ArrowLeft size={28} />
          </div>
        </button>

        <div className="hidden md:block pointer-events-none text-xs md:text-sm tracking-[0.3em] uppercase font-semibold text-black/40">
          RAFAEL&nbsp;CEDRIC
        </div>
      </div>

      {/* Grid of works - same feel as ProfessionalPortfolio */}
      <div className="w-full max-w-6xl mx-auto pt-32 pb-20 px-4 md:px-8">
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-400 tracking-tighter">
            ART&nbsp;GALLERY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          {GALLERY_ITEMS.map((art, index) => (
            <ScrollReveal
              key={art.id}
              delay={index * 80}
              className="h-full"
            >
              <div
                className="relative group h-full rounded-3xl p-4 bg-white/10 border border-white/40 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.22)] flex flex-col cursor-pointer"
                onMouseEnter={() => onHoverChange(true)}
                onMouseLeave={() => onHoverChange(false)}
              >
                <div className="relative rounded-2xl overflow-hidden mb-4 flex-1">
                  <img
                    src={art.src}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                </div>

                <div className="mt-1">
                  <h3 className="text-sm md:text-base font-semibold tracking-tight text-gray-900">
                    {art.title}
                  </h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                    Digital composition
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtPortfolio;