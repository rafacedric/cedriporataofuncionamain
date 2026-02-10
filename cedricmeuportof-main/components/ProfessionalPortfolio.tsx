import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ProfessionalPortfolioProps {
  onBack: () => void;
}

const ProfessionalPortfolio: React.FC<ProfessionalPortfolioProps> = ({ onBack }) => {
  return (
    <div className="relative w-full min-h-screen z-20">
      {/* Sticky Header Area */}
      <div className="fixed top-0 left-0 w-full h-24 z-50 flex items-center px-8 md:px-12 pointer-events-none">
      <button 
          onClick={onBack}
          className="pointer-events-auto flex items-center text-black/70 hover:text-black transition-colors group"
        >
          <div className="p-4 rounded-full border border-black/10 group-hover:bg-black/5 transition-all hover:scale-110 bg-white/50">
            <ArrowLeft size={28} />
          </div>
        </button>
      </div>

      <div className="max-w-5xl mx-auto pt-40 px-6 pb-32">
        <div className="mb-16 animate-in slide-in-from-bottom-10 fade-in duration-1000">
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-400 tracking-tighter">
            EDUCATION<br />& EXPERIENCE
          </h2>
        </div>

        <div className="space-y-10">
          {/* EDUCATION */}
          <ScrollReveal className="relative rounded-3xl p-8 bg-white/10 border border-white/40 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-4 uppercase">
              Education
            </h3>

            <div className="space-y-4 text-sm md:text-base text-gray-700">
              <div>
                <p className="font-semibold text-gray-900">
                  University of Southern Denmark (SDU) — Sønderborg, Denmark
                </p>
                <p className="italic text-gray-600">
                  Bachelor of Science in Software Engineering &middot; 2024 – 2027 (Expected)
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Relevant coursework: Algorithms &amp; Data Structures, AI, Object-Oriented Programming.</li>
                  <li>Completed Google IT Automation with Python Professional Certificate, focusing on Python scripting, automation, and Linux systems administration.</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Federal University of Santa Catarina (UFSC) — Joinville, Brazil
                </p>
                <p className="italic text-gray-600">
                  Aerospace Engineering (Transferred/Paused) &middot; 2024
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Completed coursework in Calculus 1 and Physics foundation, relevant to fluid dynamics and mechanics.</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* RESEARCH & TECHNICAL EXPERIENCE */}
          <ScrollReveal className="relative rounded-3xl p-8 bg-white/10 border border-white/40 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-4 uppercase">
              Research &amp; Technical Experience
            </h3>

            <div className="space-y-4 text-sm md:text-base text-gray-700">
              <div>
                <p className="font-semibold text-gray-900">
                  ISO 6 and 7 Clean Room Implementation and Management
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Completed comprehensive training on ISO 6 and 7 cleanroom standards, focusing on contamination control and gowning protocols.</li>
                  <li>Acquired knowledge of safety procedures and environmental monitoring required for sensitive environments.</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Kosmos Rocketry (Experimental Probing Rocket Team of UFSC) — Joinville, Brazil
                </p>
                <p className="italic text-gray-600">Aerodynamic Analyst &middot; 2024</p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Conducted research and data analysis to model rocket aerodynamics, applicable to analyzing mechanical motion in physical systems.</li>
                  <li>Synthesized technical information to optimize design parameters for experimental projects.</li>
                </ul>
              </div>

              
            </div>
          </ScrollReveal>

          {/* HONORS & OLYMPIADS */}
          <ScrollReveal className="relative rounded-3xl p-8 bg-white/10 border border-white/40 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-4 uppercase">
              Honors &amp; Olympiads
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700">
              <li>Finalist, Brazilian Olympiad of Physics (OBF) &middot; 2023</li>
              <li>Gold Medal, Brazilian Mathematical Olympiad of Public Schools (OBMEP) &middot; 2023</li>
              <li>Honorable Mention, Brazilian Chemistry Olympiad (OBQ) &middot; 2022</li>
              <li>Gold Medal, Brazilian National Science Olympiad (ONC) &middot; 2022</li>
            </ul>
          </ScrollReveal>

          {/* TECHNICAL SKILLS */}
          <ScrollReveal className="relative rounded-3xl p-8 bg-white/10 border border-white/40 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-4 uppercase">
              Technical Skills
            </h3>
            <div className="space-y-3 text-sm md:text-base text-gray-700">
              <p>
                <span className="font-semibold">Data Analysis &amp; Programming:</span>{' '}
                Python (strong data processing capabilities), C++, C; experience with data management, web technologies,
                operating systems, algorithms &amp; data structures, and AI.
              </p>
              <p>
                <span className="font-semibold">Tools &amp; Platforms:</span>{' '}
                Git, GitHub, Docker, Linux, VS Code,local LLMs, LaTeX.
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{' '}
                English (C2 Proficient), Portuguese (Native), Spanish (B2), Danish (A2).
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalPortfolio;