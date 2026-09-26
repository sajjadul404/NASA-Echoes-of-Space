import React from 'react';
import { Sparkles, Globe2, Compass } from 'lucide-react';
import { PageId } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-800 bg-[#06080D] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <span className="text-base font-bold text-slate-100">Echoes of Space</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Every machine has a story. Every discovery has a legacy. A space archaeology and educational museum dedicated to forgotten NASA exploratory craft resting on the Moon, Mars, and sailing through the interstellar void.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>NASA Open Data</span>
              <span>·</span>
              <span>Curated Educational Archive</span>
              <span>·</span>
              <span>Classroom Ready</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Museum Wings
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Interactive Planetary Explorer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Story Mode Chronicles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('science')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Science Lab & Simulators
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('timeline')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Historic Mission Timeline
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Activities & Sources
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('games')} className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Space Archaeologist Games
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5">
                  <Globe2 className="w-3 h-3 text-cyan-400" />
                  NASA Data Sources & Citations
                </button>
              </li>
              <li>
                <span className="text-slate-500">NASA Image & Video Library</span>
              </li>
              <li>
                <span className="text-slate-500">Mars Rover Planetary Archive</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Echoes of Space. Built for space enthusiasts, students, and curious explorers everywhere.</p>
          <p className="text-[11px] text-slate-500 font-mono">
            COSMIC HERITAGE PRESERVATION INITIATIVE
          </p>
        </div>
      </div>
    </footer>
  );
};
