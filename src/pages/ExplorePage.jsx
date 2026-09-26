import { useState } from "react";
import { Search, ChevronRight, Eye, Radio, Sparkles, Volume2, VolumeX, X, Play } from "lucide-react";
import { MACHINES_DATA } from "../data/machinesData";
import { cosmicAudio } from "../utils/audioNarration";

export const ExplorePage = ({
  initialFilter = "All",
  onSelectMachine,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMachine, setSelectedMachine] = useState(MACHINES_DATA[0]);
  const [hoveredMachine, setHoveredMachine] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const filteredMachines = MACHINES_DATA.filter((m) => {
    const matchesTab = activeTab === "All" || m.targetBody === activeTab;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.mission.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleMarkerClick = (machine) => {
    cosmicAudio.playTelemetryPing(840, 0.1);
    setSelectedMachine(machine);
  };

  const handleOpenDetail = (machine) => {
    cosmicAudio.playTelemetryPing(960, 0.15);
    onSelectMachine(machine);
    onNavigate("detail", machine.id);
  };

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      cosmicAudio.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      cosmicAudio.speak(
        selectedMachine.firstPersonStory,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  const getMapPosition = (machine) => {
    if (machine.targetBody === "Moon") {
      const lat = machine.coordinates.lat ?? 0;
      const lng = machine.coordinates.lng ?? 0;
      const x = 50 + (lng / 180) * 40;
      const y = 50 - (lat / 90) * 40;
      return { x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) };
    }
    if (machine.targetBody === "Mars") {
      const lat = machine.coordinates.lat ?? 0;
      const lng = machine.coordinates.lng ?? 0;
      const x = 50 + (lng / 360) * 80;
      const y = 50 - (lat / 90) * 40;
      return { x: Math.max(12, Math.min(88, x)), y: Math.max(12, Math.min(88, y)) };
    }
    if (machine.id === "voyager1") return { x: 78, y: 25 };
    if (machine.id === "voyager2") return { x: 82, y: 72 };
    return { x: 50, y: 50 };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20">
      
      {/* Top Header & Planet Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Planet Radar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
            Space Explorer Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Touch any glowing pin on the planet to meet that robot!
          </p>
        </div>

        {/* Big Planet Switch Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl self-start sm:self-auto overflow-x-auto">
          {[
            { id: "All", label: "✨ All", emoji: "" },
            { id: "Moon", label: "The Moon", emoji: "🌕" },
            { id: "Mars", label: "Mars", emoji: "🔴" },
            { id: "Deep Space", label: "Deep Space", emoji: "🌌" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                cosmicAudio.playTelemetryPing(600, 0.08);
                setActiveTab(tab.id);
              }}
              className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-slate-950 shadow-md scale-102"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.emoji && <span>{tab.emoji}</span>}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Screen Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[540px]">
        
        {/* Left Side: Radar Planet Stage (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
          
          <div className="px-4 py-2.5 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold text-slate-300">
                RADAR: {activeTab === "All" ? "SOLAR SYSTEM" : activeTab.toUpperCase()}
              </span>
            </div>
            <div className="text-[11px] font-bold text-cyan-400">
              TOUCH A PIN TO EXPLORE
            </div>
          </div>

          {/* Interactive Planet Globe Stage */}
          <div className="relative flex-1 min-h-[380px] bg-[#05070B] overflow-hidden flex items-center justify-center p-6">
            
            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: "radial-gradient(circle, #38bdf8 1px, transparent 1px)",
                  backgroundSize: "32px 32px"
                }}
              />
            </div>

            {/* Target Body Globe Graphic */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-slate-800 shadow-[inset_0_0_60px_rgba(0,0,0,0.85)] flex items-center justify-center overflow-hidden transition-all duration-700">
              
              {/* Planetary Shading */}
              {activeTab === "Moon" && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-800 to-slate-950 opacity-90 rounded-full">
                  <div className="absolute top-12 left-16 w-16 h-16 rounded-full border border-slate-600/40 bg-slate-700/20" />
                  <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full border border-slate-600/30 bg-slate-700/30" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-80" />
                </div>
              )}

              {activeTab === "Mars" && (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-800 via-amber-950 to-slate-950 opacity-90 rounded-full">
                  <div className="absolute top-8 left-14 w-28 h-20 rounded-full bg-orange-900/40 blur-xs" />
                  <div className="absolute bottom-16 right-16 w-32 h-24 rounded-full bg-amber-900/40 blur-xs" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-80" />
                </div>
              )}

              {activeTab === "Deep Space" && (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-black rounded-full border border-indigo-900/40">
                  <div className="absolute inset-4 rounded-full border border-indigo-800/20 border-dashed animate-spin duration-[120s]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-300 shadow-[0_0_20px_#f59e0b]" />
                </div>
              )}

              {activeTab === "All" && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#070B14] to-black rounded-full border border-slate-800">
                  <div className="absolute inset-8 rounded-full border border-slate-800/60 border-dashed" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
                </div>
              )}

              {/* Clickable Radar Pins */}
              {filteredMachines.map((machine) => {
                const pos = getMapPosition(machine);
                const isSelected = selectedMachine.id === machine.id;
                return (
                  <div
                    key={machine.id}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    <button
                      onClick={() => handleMarkerClick(machine)}
                      onMouseEnter={() => setHoveredMachine(machine)}
                      onMouseLeave={() => setHoveredMachine(null)}
                      className={`relative flex items-center justify-center cursor-pointer focus:outline-none transition-transform ${
                        isSelected ? "scale-130" : "hover:scale-120"
                      }`}
                      aria-label={`Select ${machine.name}`}
                    >
                      {/* Pulse */}
                      <span
                        className={`absolute w-7 h-7 rounded-full animate-ping opacity-70 ${
                          machine.targetBody === "Mars"
                            ? "bg-amber-400"
                            : machine.targetBody === "Moon"
                            ? "bg-cyan-300"
                            : "bg-indigo-400"
                        }`}
                      />

                      {/* Pin */}
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shadow-lg transition-colors ${
                          isSelected
                            ? "bg-white border-cyan-400 ring-4 ring-cyan-400/50"
                            : machine.targetBody === "Mars"
                            ? "bg-amber-500 border-amber-200"
                            : machine.targetBody === "Moon"
                            ? "bg-slate-200 border-cyan-400"
                            : "bg-indigo-400 border-indigo-200"
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                      </div>
                    </button>

                    {/* Marker Name */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                      <span className="px-2 py-0.5 rounded-md bg-black/85 border border-slate-700 text-[10px] font-bold text-white shadow">
                        {machine.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hover Floating Card */}
            {hoveredMachine && (
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs z-30 p-3 rounded-xl bg-slate-900/95 border border-cyan-400/50 shadow-2xl backdrop-blur-md pointer-events-none animate-in fade-in duration-150">
                <div className="text-[11px] font-bold text-cyan-400 mb-0.5">
                  {hoveredMachine.targetBody} · {hoveredMachine.year}
                </div>
                <h4 className="text-sm font-black text-white">{hoveredMachine.name}</h4>
                <p className="text-xs text-slate-300 mt-0.5">{hoveredMachine.location}</p>
              </div>
            )}

          </div>

          <div className="px-4 py-2.5 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div>
              SELECTED: <span className="text-cyan-400 font-bold">{selectedMachine.name}</span>
            </div>
            <div>
              {selectedMachine.location}
            </div>
          </div>
        </div>

        {/* Right Side: Selected Machine Profile (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search robot name..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Selected Machine Big Card */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            
            <div className="flex items-start gap-3.5">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-slate-700/60">
                <img
                  src={selectedMachine.image}
                  alt={selectedMachine.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold text-cyan-400 truncate">
                  {selectedMachine.targetBody} · {selectedMachine.year}
                </div>
                <h3 className="text-xl font-black text-white truncate mt-0.5">
                  {selectedMachine.name}
                </h3>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  {selectedMachine.location}
                </p>
                <div className="text-xs text-emerald-400 font-bold mt-1">
                  ● Status: {selectedMachine.status}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              “{selectedMachine.whoAmI}”
            </p>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Biggest Discovery:</span>
              </div>
              <div className="text-[11px] leading-relaxed">
                {selectedMachine.whatIDiscovered[0]}
              </div>
            </div>

            {/* Listen & Details Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleToggleSpeak}
                className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isSpeaking
                    ? "bg-amber-400 text-slate-950 animate-pulse"
                    : "bg-slate-800 text-cyan-300 hover:bg-slate-700"
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                <span>{isSpeaking ? "Pause Voice" : "Hear Voice"}</span>
              </button>

              <button
                onClick={() => handleOpenDetail(selectedMachine)}
                className="py-2.5 px-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-950/40 hover:scale-102 active:scale-95"
              >
                <Eye className="w-4 h-4" />
                <span>See Secrets</span>
              </button>
            </div>
          </div>

          {/* Quick List */}
          <div className="flex-1 space-y-2 overflow-y-auto max-h-[220px] pr-1">
            {filteredMachines.map((machine) => {
              const isSelected = selectedMachine.id === machine.id;
              return (
                <div
                  key={machine.id}
                  onClick={() => handleMarkerClick(machine)}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-400/60 shadow-md"
                      : "bg-slate-900/50 border-slate-800/80 hover:bg-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                      <img
                        src={machine.image}
                        alt={machine.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-white truncate">
                        {machine.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {machine.targetBody} · {machine.year}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0" />
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
