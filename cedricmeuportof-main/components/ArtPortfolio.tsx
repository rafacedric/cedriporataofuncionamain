import React, { useState } from 'react';

import { ArrowLeft, ArrowRight, X } from 'lucide-react';

import ScrollReveal from './ScrollReveal';


interface ArtPortfolioProps {

  onBack: () => void;

  onHoverChange: (isHovering: boolean) => void;

}


const GALLERY_ITEMS = [
  { id: 8, src: `${import.meta.env.BASE_URL}macas.jpg`, title: "Maçãs " },
  { id: 1, src: `${import.meta.env.BASE_URL}porco.jpg`, title: "Porco" },
  { id: 2, src: `${import.meta.env.BASE_URL}ponte.jpg`, title: "Ponte de Sonderborg" },
  { id: 3, src: `${import.meta.env.BASE_URL}limoes.jpg`, title: "Limões" },
  { id: 4, src: `${import.meta.env.BASE_URL}cristo.jpg`, title: "Cristo Redentor" },
  { id: 5, src: `${import.meta.env.BASE_URL}santaceia.jpg`, title: "Santa Ceia" },
  { id: 6, src: `${import.meta.env.BASE_URL}cereja.jpg`, title: "Cerejas" },
  { id: 7, src: `${import.meta.env.BASE_URL}abstrato.jpg`, title: "Abstrato" }
  
];


const ArtPortfolio: React.FC<ArtPortfolioProps> = ({ onBack, onHoverChange }) => {

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);


  const navigateImage = (direction: 'next' | 'prev') => {

    if (selectedImageIndex === null) return;

    if (direction === 'next') {

      setSelectedImageIndex((selectedImageIndex + 1) % GALLERY_ITEMS.length);

    } else {

      setSelectedImageIndex((selectedImageIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);

    }

  };


  const selectedImage = selectedImageIndex !== null ? GALLERY_ITEMS[selectedImageIndex] : null;


  return (

    <div className="relative w-full min-h-screen z-20 bg-white">

     

      {/* Header */}

      <div className="fixed top-0 left-0 w-full h-24 z-50 flex items-center justify-between px-8 md:px-12 pointer-events-none">

        <button

          onClick={onBack}

          className="pointer-events-auto flex items-center text-black/70 hover:text-black transition-colors group"

        >

          <div className="p-4 rounded-full border border-black/5 group-hover:bg-black/5 transition-all hover:scale-110">

            <ArrowLeft size={28} />

          </div>

        </button>

      </div>


      <div className="w-full max-w-7xl mx-auto pt-32 pb-20 px-4 md:px-8">

        <div className="mb-16">

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">

            ART&nbsp;GALLERY

          </h2>

        </div>


        {/* Grid: Removed auto-rows to allow natural heights or kept contained */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {GALLERY_ITEMS.map((art, index) => (

            <ScrollReveal key={art.id} delay={index * 50}>

              <div

                className="relative group cursor-pointer"

                onMouseEnter={() => onHoverChange(true)}

                onMouseLeave={() => onHoverChange(false)}

                onClick={() => setSelectedImageIndex(index)}

              >

                {/* Image Container: Removed border, background, and padding */}

                <div className="relative  overflow-hidden mb-4 bg-gray-50 flex items-center justify-center">

                  <img

                    src={art.src}

                    alt={art.title}

                    // Changed object-cover to object-contain to show full image

                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"

                    loading="lazy"

                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-300" />

                </div>


                <div className="text-left px-1">

                  <h3 className="text-sm md:text-base font-bold tracking-tight text-gray-900 uppercase">

                    {art.title}

                  </h3>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">

                    Oil on canvas

                  </p>

                </div>

              </div>

            </ScrollReveal>

          ))}

        </div>

      </div>


      {/* Expanded Image View */}

      {selectedImage && (

        <div

          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-white animate-in fade-in duration-300"

          onClick={() => setSelectedImageIndex(null)}

        >

          {/* Controls */}

          <div className="absolute top-0 left-0 w-full p-8 flex justify-start ">

             <button

              className="p-3 rounded-full hover:bg-black/5 transition-colors z-[110]"

              onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}

            >

              <X size={32} className="text-black" />

            </button>

          </div>


          <button

            className="absolute left-4 md:left-8 p-4 rounded-full hover:bg-black/5 transition-all z-[110] hover:scale-110"

            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}

          >

            <ArrowLeft size={32} className="text-black" />

          </button>


          <button

            className="absolute right-4 md:right-8 p-4 rounded-full hover:bg-black/5 transition-all z-[110] hover:scale-110"

            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}

          >

            <ArrowRight size={32} className="text-black" />

          </button>

         

          <div

            className="relative max-w-6xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center"

            onClick={(e) => e.stopPropagation()}

          >

            <img

              src={selectedImage.src}

              alt={selectedImage.title}

              className="w-full h-full object-contain animate-in zoom-in-95 duration-500"

            />

            <div className="mt-8 text-center">

              <h3 className="text-2xl font-black tracking-tight text-gray-900 uppercase">{selectedImage.title}</h3>

              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mt-2 font-bold">Oil on canvas</p>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};


export default ArtPortfolio; 