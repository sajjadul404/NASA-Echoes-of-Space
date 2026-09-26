import { X, Award, ShieldCheck, Star, Trash2 } from "lucide-react";
export const PassportModal = ({
  isOpen,
  onClose,
  unlockedBadges,
  quizScore,
  visitedMachines,
  onResetProgress
}) => {
  if (!isOpen) return null;
  const totalScore = unlockedBadges.length * 20 + visitedMachines.length * 10 + quizScore * 15;
  let rank = "Apprentice Stargazer";
  let rankColor = "text-slate-300";
  let rankBorder = "border-slate-700";
  if (totalScore >= 200) {
    rank = "Master Space Archaeologist";
    rankColor = "text-amber-300";
    rankBorder = "border-amber-500/50";
  } else if (totalScore >= 120) {
    rank = "Planetary Historian";
    rankColor = "text-cyan-300";
    rankBorder = "border-cyan-500/50";
  } else if (totalScore >= 50) {
    rank = "Junior Space Explorer";
    rankColor = "text-emerald-300";
    rankBorder = "border-emerald-500/50";
  }
  const allPossibleBadges = [
    { id: "First Moon Touchdown", name: "First Moon Touchdown", desc: "Investigated Apollo 11 Lunar Module" },
    { id: "First Lunar Wheels", name: "First Lunar Wheels", desc: "Discovered the Apollo 15 Rover" },
    { id: "Pioneer of Wheels", name: "Pioneer of Wheels", desc: "Uncovered Sojourner on Ares Vallis" },
    { id: "Marathon Explorer", name: "Marathon Explorer", desc: "Tracked Opportunity\u2019s 15-year odyssey" },
    { id: "Heartbeat of Mars", name: "Heartbeat of Mars", desc: "Listened to InSight seismic station" },
    { id: "Interstellar Voyager", name: "Interstellar Voyager", desc: "Followed Voyager 1 into deep space" },
    { id: "Ares Vallis Scout", name: "Ares Vallis Scout", desc: "Completed Map Hunt Mission 1" },
    { id: "Tranquility Base Guardian", name: "Tranquility Base Guardian", desc: "Completed Map Hunt Mission 2" },
    { id: "Endurance Medal of Meridiani", name: "Endurance Medal of Meridiani", desc: "Completed Map Hunt Mission 3" },
    { id: "Master Matchmaker", name: "Master Matchmaker", desc: "Matched all hardware to scientific goals" },
    { id: "Timeline Architect", name: "Timeline Architect", desc: "Built the flawless 5-stage mission sequence" },
    { id: "Quiz Scholar", name: "Quiz Scholar", desc: "Scored high on the Science Quiz" }
  ];
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
    className="relative w-full max-w-2xl bg-[#0B0F19] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
    onClick={(e) => e.stopPropagation()}
  >
        {
    /* Header Ribbon */
  }
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090D15]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Space Archaeologist Passport</h2>
              <p className="text-xs text-slate-400">Official Galactic Artifact & Discovery Record</p>
            </div>
          </div>
          <button
    onClick={onClose}
    className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
    aria-label="Close passport"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        {
    /* Content Area */
  }
        <div className="p-6 overflow-y-auto space-y-6">
          
          {
    /* Rank Badge Card */
  }
          <div className={`p-4 rounded-xl bg-slate-900/80 border ${rankBorder} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Current Explorer Rank</div>
              <div className={`text-xl font-bold ${rankColor} mt-0.5 flex items-center gap-2`}>
                <ShieldCheck className="w-5 h-5" />
                <span>{rank}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Total Archaeology XP: <span className="font-mono text-cyan-400 tabular-nums">{totalScore}</span> pts
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
              <div>
                <div className="text-slate-500 text-[10px]">BADGES</div>
                <div className="text-slate-200 text-sm font-semibold tabular-nums">{unlockedBadges.length} / {allPossibleBadges.length}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">VISITED</div>
                <div className="text-slate-200 text-sm font-semibold tabular-nums">{visitedMachines.length} Craft</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">QUIZ</div>
                <div className="text-slate-200 text-sm font-semibold tabular-nums">{quizScore} pts</div>
              </div>
            </div>
          </div>

          {
    /* Badges Showcase */
  }
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                Unlocked Artifact Medals
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                {unlockedBadges.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {allPossibleBadges.map((badge) => {
    const isEarned = unlockedBadges.includes(badge.id);
    return <div
      key={badge.id}
      className={`p-3 rounded-lg border text-left flex items-start gap-3 transition-colors ${isEarned ? "bg-slate-900 border-amber-500/30" : "bg-slate-950/40 border-slate-800/60 opacity-50"}`}
    >
                    <div
      className={`w-7 h-7 rounded-md shrink-0 flex items-center justify-center mt-0.5 ${isEarned ? "bg-amber-400/20 text-amber-300 border border-amber-400/40" : "bg-slate-800 text-slate-600"}`}
    >
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-xs font-semibold ${isEarned ? "text-amber-200" : "text-slate-500"}`}>
                        {badge.name}
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        {badge.desc}
                      </div>
                    </div>
                  </div>;
  })}
            </div>
          </div>

          {
    /* Educational Note */
  }
          <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-900/30 text-xs text-cyan-300/90 leading-relaxed">
            Every badge in your passport honors a genuine historical milestone in human robotics and planetary science. As you explore craft, read story chapters, and complete mini-games, your discoveries are permanently recorded!
          </div>

        </div>

        {
    /* Footer actions */
  }
        <div className="px-6 py-3.5 border-t border-slate-800 bg-[#090D15] flex items-center justify-between text-xs">
          <button
    onClick={() => {
      if (window.confirm("Reset your passport progress?")) {
        onResetProgress();
      }
    }}
    className="flex items-center gap-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
  >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>

          <button
    onClick={onClose}
    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors cursor-pointer"
  >
            Close Passport
          </button>
        </div>
      </div>
    </div>;
};
