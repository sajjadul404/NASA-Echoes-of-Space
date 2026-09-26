import { useState } from "react";
import { 
  Rocket, 
  Award, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles,
  BookOpen,
  Compass,
  HelpCircle
} from "lucide-react";
import { cosmicAudio } from "../utils/audioNarration";

export const Navbar = ({
  currentPage,
  onNavigate,
  onOpenPassport,
  onOpenHelp,
  earnedBadgesCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const navLinks = [
    { id: "home", label: "Home", icon: Rocket },
    { id: "explore", label: "Rovers & Map", icon: Compass },
    { id: "story", label: "Story Book", icon: BookOpen },
    { id: "games", label: "Play Quiz", icon: Sparkles },
    { id: "science", label: "Science Lab", icon: Sparkles },
    { id: "timeline", label: "Timeline", icon: Compass },
  ];

  const handleLinkClick = (id) => {
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
    <header className="sticky top-0 z-50 bg-[#07090E]/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo with Animated Rocket */}
        <button
          onClick={() => handleLinkClick("home")}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-300 transition-all shadow-sm">
            <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors block">
              Echoes of Space
            </span>
            <span className="text-[10px] text-cyan-400/90 font-medium block leading-none">
              Explore Moon & Mars!
            </span>
          </div>
        </button>

        {/* Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-300">
          {navLinks.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`py-1.5 px-2 relative transition-all rounded-lg cursor-pointer ${
                  isActive
                    ? "text-cyan-400 font-bold bg-cyan-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick 1-Min Tour / Help Button */}
          <button
            onClick={() => {
              if (soundEnabled) cosmicAudio.playTelemetryPing(800, 0.1);
              onOpenHelp?.();
            }}
            title="How to Play & Explore"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-cyan-300 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 rounded-xl transition-all hover:scale-105 cursor-pointer shadow-sm"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">How to Play</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Sound Effects ON" : "Sound Effects MUTED"}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Toggle Sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Space Passport Button with Badge Count */}
          <button
            onClick={() => {
              if (soundEnabled) cosmicAudio.playTelemetryPing(960, 0.12);
              onOpenPassport();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-400/40 hover:bg-amber-500/20 rounded-xl transition-all hover:scale-105 cursor-pointer shadow-sm"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">My Passport</span>
            {earnedBadgesCount > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-400 text-slate-950 font-black rounded-full text-[10px] animate-bounce-soft">
                {earnedBadgesCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Open Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#07090E] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full text-left px-3.5 py-3 text-sm rounded-xl font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 font-bold"
                    : "text-slate-300 hover:bg-slate-800/80"
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
