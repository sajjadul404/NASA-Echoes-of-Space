import React from "react";
import { X, Rocket, BookOpen, Award, Sparkles, CheckCircle2 } from "lucide-react";

export const HelpGuideModal = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const handleQuickAction = (page) => {
    onNavigate(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#0D121F] border border-cyan-400/50 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-amber-400 to-purple-500" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          aria-label="Close Guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-2xl animate-float">
            🚀
          </div>
          <div>
            <h2 className="text-xl font-black text-white">How to Explore!</h2>
            <p className="text-xs text-cyan-300">Quick 3-step guide for young explorers</p>
          </div>
        </div>

        {/* 3 Visual Kid-Friendly Cards */}
        <div className="space-y-3 my-4">
          
          {/* Step 1 */}
          <div 
            onClick={() => handleQuickAction("explore")}
            className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              🌕
            </div>
            <div>
              <div className="text-xs font-black text-cyan-400">1. Pick Moon or Mars</div>
              <div className="text-xs text-slate-300 mt-0.5">Touch a planet button to see robot pictures!</div>
            </div>
          </div>

          {/* Step 2 */}
          <div 
            onClick={() => handleQuickAction("story")}
            className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400 transition-all cursor-pointer flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              🎧
            </div>
            <div>
              <div className="text-xs font-black text-amber-400">2. Press Play to Listen</div>
              <div className="text-xs text-slate-300 mt-0.5">Hear rovers tell stories in their own voice!</div>
            </div>
          </div>

          {/* Step 3 */}
          <div 
            onClick={() => handleQuickAction("games")}
            className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-400 transition-all cursor-pointer flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              🏆
            </div>
            <div>
              <div className="text-xs font-black text-emerald-400">3. Play & Win Medals</div>
              <div className="text-xs text-slate-300 mt-0.5">Answer 4 quick quiz questions to earn badges!</div>
            </div>
          </div>

        </div>

        {/* Start Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer mt-5"
        >
          <CheckCircle2 className="w-5 h-5 text-slate-950" />
          <span>Let's Start Exploring!</span>
        </button>
      </div>
    </div>
  );
};
