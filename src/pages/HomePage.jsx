import { useEffect, useState } from "react";
import { 
  Rocket, 
  BookOpen, 
  Award, 
  ChevronRight, 
  Search, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  X,
  Play,
  ArrowRight,
  Globe2,
  Compass
} from "lucide-react";
import { MACHINES_DATA } from "../data/machinesData";
import { fetchApod } from "../services/nasaService";
import { cosmicAudio } from "../utils/audioNarration";
import { AnimatedSpaceHero } from "../components/AnimatedSpaceHero";

export const HomePage = ({ onNavigate, onSelectMachine, onOpenHelp }) => {
  const [apod, setApod] = useState(null);
  const [destinationFilter, setDestinationFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [speakingMachineId, setSpeakingMachineId] = useState(null);

  useEffect(() => {
    fetchApod()
      .then((data) => setApod(data))
      .catch(() => {});
  }, []);

  // Filter machines
  const filteredMachines = MACHINES_DATA.filter((m) => {
    const matchesDest = destinationFilter === "All" || m.targetBody === destinationFilter;
    const matchesSearch = 
      !searchQuery.trim() ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.targetBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDest && matchesSearch;
  });

  const handleDestinationClick = (dest) => {
    cosmicAudio.playTelemetryPing(750, 0.1);
    setDestinationFilter(dest);
  };

  const handleToggleListen = (e, machine) => {
    e.stopPropagation();
    if (speakingMachineId === machine.id) {
      cosmicAudio.stopSpeaking();
      setSpeakingMachineId(null);
    } else {
      setSpeakingMachineId(machine.id);
      cosmicAudio.speak(
        machine.firstPersonStory,
        () => setSpeakingMachineId(machine.id),
        () => setSpeakingMachineId(null)
      );
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      
      {/* 1. Hero Section: Playful, Visual & Animated */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-800">
        
        {/* Animated Space Hero Background with Shooting Stars, Astronaut, Satellite & Twinkling Stars */}
        <AnimatedSpaceHero />

        {/* Ambient Dark Horizon Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          
          {/* Big Bold Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Meet NASA’s Greatest <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300">
              Space Robots!
            </span>
          </h1>
        </div>
      </section>

      {/* 2. Visual "3 Easy Things To Do" (Minimal Text) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div 
            onClick={() => {
              const el = document.getElementById("robots-grid");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="p-4 rounded-2xl bg-gradient-to-b from-cyan-950/20 to-slate-900 border border-cyan-500/30 hover:border-cyan-400 transition-all hover:scale-102 cursor-pointer flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🤖
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Step 1</div>
              <div className="text-sm font-black text-white">Pick a Robot</div>
              <div className="text-xs text-slate-400">See where they landed!</div>
            </div>
          </div>

          <div 
            onClick={() => onNavigate("story")}
            className="p-4 rounded-2xl bg-gradient-to-b from-amber-950/20 to-slate-900 border border-amber-500/30 hover:border-amber-400 transition-all hover:scale-102 cursor-pointer flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🎧
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">Step 2</div>
              <div className="text-sm font-black text-white">Press Play</div>
              <div className="text-xs text-slate-400">Hear their voices!</div>
            </div>
          </div>

          <div 
            onClick={() => onNavigate("games")}
            className="p-4 rounded-2xl bg-gradient-to-b from-emerald-950/20 to-slate-900 border border-emerald-500/30 hover:border-emerald-400 transition-all hover:scale-102 cursor-pointer flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🏆
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Step 3</div>
              <div className="text-sm font-black text-white">Win Medals</div>
              <div className="text-xs text-slate-400">Answer fun questions!</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Main Robot Explorer Grid with Instant Audio Play & Simple Cards */}
      <section id="robots-grid" className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Simple Bar: Tab selector & Quick Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <span>Choose Your Explorer</span>
              <span className="text-cyan-400 text-sm font-semibold">({filteredMachines.length} robots)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Click any card to explore its secret mission!
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
            {["All", "Moon", "Mars", "Deep Space"].map((dest) => (
              <button
                key={dest}
                onClick={() => handleDestinationClick(dest)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  destinationFilter === dest
                    ? "bg-cyan-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {dest === "All" ? "✨ All Robots" : dest}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Search */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type robot name (e.g. Sojourner, Apollo, water)..."
            className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-400 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Spacecraft Cards: Large, Colorful, Kid-Friendly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMachines.map((machine) => {
            const isSpeakingThis = speakingMachineId === machine.id;
            return (
              <div
                key={machine.id}
                onClick={() => onSelectMachine(machine)}
                className="group bg-slate-900/90 border border-slate-800 hover:border-cyan-400/80 rounded-3xl overflow-hidden shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
              >
                {/* Image Container with Planet Tag */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={machine.image}
                    alt={machine.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-transparent opacity-80" />
                  
                  {/* Planet Pill */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-slate-700/80 text-xs font-bold text-cyan-300 flex items-center gap-1.5 shadow">
                    <span>{machine.targetBody === "Mars" ? "🔴" : machine.targetBody === "Moon" ? "🌕" : "🌌"}</span>
                    <span>{machine.targetBody}</span>
                  </div>

                  {/* Year Tag */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-full text-xs font-mono font-bold text-amber-300 shadow">
                    {machine.year}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                      {machine.name}
                    </h3>
                    
                    {/* 1-Sentence Friendly Bubble */}
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed font-medium">
                      “{machine.whoAmI}”
                    </p>
                  </div>

                  {/* Actions: Big Play Sound & View Details */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    
                    {/* Speak Button */}
                    <button
                      onClick={(e) => handleToggleListen(e, machine)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow ${
                        isSpeakingThis
                          ? "bg-amber-400 text-slate-950 animate-pulse scale-105"
                          : "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950"
                      }`}
                      title={isSpeakingThis ? "Stop speaking" : "Listen to story"}
                    >
                      {isSpeakingThis ? (
                        <>
                          <VolumeX className="w-4 h-4" />
                          <span>Speaking...</span>
                          <span className="flex gap-0.5 items-end h-3">
                            <span className="soundwave-bar" style={{ animationDelay: "0s" }} />
                            <span className="soundwave-bar" style={{ animationDelay: "0.2s" }} />
                            <span className="soundwave-bar" style={{ animationDelay: "0.4s" }} />
                          </span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" />
                          <span>Hear Voice</span>
                        </>
                      )}
                    </button>

                    {/* View Details Link */}
                    <span className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Play Quiz Callout: Fun & Rewarding for Kids */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden bg-gradient-to-r from-cyan-900/30 via-slate-900 to-amber-900/30 border border-cyan-400/40 shadow-2xl">
          
          <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-3xl mx-auto mb-4 animate-float shadow-lg">
            🏆
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Can You Guess the Space Secrets?
          </h2>
          
          <p className="mt-2 text-sm sm:text-base text-slate-200 max-w-md mx-auto">
            Play our quick 4-question quiz, score points, and earn your official Archaeologist Passport medal!
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onNavigate("games")}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-5 h-5 text-slate-950" />
              <span>Play Space Quiz Now!</span>
            </button>
            
            <button
              onClick={() => onNavigate("explore")}
              className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all border border-slate-700 hover:border-slate-500 cursor-pointer"
            >
              View Full Planetary Radar
            </button>
          </div>
        </div>
      </section>

      {/* 5. Daily NASA Space Photo (Simple, visual) */}
      {apod && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-7 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-5/12 aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
              <img
                src={apod.url}
                alt={apod.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Today’s Real Space Picture (NASA APOD)</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {apod.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {apod.explanation}
              </p>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
