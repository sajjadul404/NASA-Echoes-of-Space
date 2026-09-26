import React, { useState } from 'react';
import { Compass, Award, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { cosmicAudio } from '../utils/audioNarration';

export type PageId = 'home' | 'explore' | 'story' | 'games' | 'science' | 'timeline' | 'about' | 'detail';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, machineId?: string) => void;
  onOpenPassport: () => void;
  earnedBadgesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenPassport,
  earnedBadgesCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: 'story', label: 'Story Mode' },
    { id: 'games', label: 'Game Zone' },
    { id: 'science', label: 'Science Lab' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'about', label: 'About' }
  ];

  const handleLinkClick = (id: PageId) => {
    if (soundEnabled) cosmicAudio.playTelemetryPing(720, 0.1);
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    if (soundEnabled) {
      cosmicAudio.stopSpeaking();
      setSoundEnabled(false);
    } else {
      setSoundEnabled(true);
      cosmicAudio.playTelemetryPing(880, 0.15);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#07090E]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors">
            Echoes of Space
          </span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`py-1 relative transition-colors focus:outline-none cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions (Passport + Sound) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Audio Cues' : 'Enable Audio Cues'}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={() => {
              if (soundEnabled) cosmicAudio.playTelemetryPing(960, 0.12);
              onOpenPassport();
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 rounded-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Space Passport</span>
            {earnedBadgesCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-amber-400/20 text-amber-300 rounded text-[10px] font-mono tabular-nums">
                {earnedBadgesCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#07090E] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
