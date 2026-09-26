import React from "react";
import { Rocket, Compass, BookOpen, Award, Sparkles } from "lucide-react";
import { cosmicAudio } from "../utils/audioNarration";

export const MobileBottomNav = ({ currentPage, onNavigate, onOpenPassport, earnedBadgesCount = 0 }) => {
  const handleNav = (page) => {
    cosmicAudio.playTelemetryPing(720, 0.1);
    onNavigate(page);
  };

  const navItems = [
    { id: "home", label: "Home", icon: Rocket },
    { id: "explore", label: "Rovers", icon: Compass },
    { id: "story", label: "Stories", icon: BookOpen },
    { id: "games", label: "Quiz", icon: Sparkles },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07090E]/95 backdrop-blur-md border-t border-slate-800 px-3 py-1.5 flex items-center justify-around safe-area-bottom shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
              isActive
                ? "text-cyan-400 font-bold bg-cyan-500/10 scale-105"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}

      {/* Passport Tab */}
      <button
        onClick={() => {
          cosmicAudio.playTelemetryPing(880, 0.1);
          onOpenPassport();
        }}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-amber-400 hover:text-amber-300 transition-colors cursor-pointer relative"
      >
        <div className="relative">
          <Award className="w-5 h-5 mb-0.5" />
          {earnedBadgesCount > 0 && (
            <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-amber-400 text-slate-950 font-black rounded-full text-[9px] leading-tight">
              {earnedBadgesCount}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-tight font-bold">Passport</span>
      </button>
    </div>
  );
};
