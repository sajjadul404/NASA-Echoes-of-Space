import { useState } from "react";
import { Search, ChevronRight, Eye, Radio, Sparkles } from "lucide-react";
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
  const filteredMachines = MACHINES_DATA.filter((m) => {
    const matchesTab = activeTab === "All" || m.targetBody === activeTab;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.mission.toLowerCase().includes(searchQuery.toLowerCase()) || m.location.toLowerCase().includes(searchQuery.toLowerCase()) || m.type.toLowerCase().includes(searchQuery.toLowerCase());
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
  const getMapPosition = (machine) => {
    if (machine.targetBody === "Moon") {
      const lat = machine.coordinates.lat ?? 0;
      const lng = machine.coordinates.lng ?? 0;
      const x = 50 + lng / 180 * 40;
      const y = 50 - lat / 90 * 40;
      return { x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) };
    }
    if (machine.targetBody === "Mars") {
      const lat = machine.coordinates.lat ?? 0;
      const lng = machine.coordinates.lng ?? 0;
      const x = 50 + lng / 360 * 80;
      const y = 50 - lat / 90 * 40;
      return { x: Math.max(12, Math.min(88, x)), y: Math.max(12, Math.min(88, y)) };
    }
    if (machine.id === "voyager1") return { x: 78, y: 25 };
    if (machine.id === "voyager2") return { x: 82, y: 72 };
    return { x: 50, y: 50 };
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {
    /* Top Header & Tab Controls */
  }
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5" />
            <span>Interactive Space Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">
            Planetary Archaeology Explorer
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Locate silent robotic hardware resting across extraterrestrial terrain.
          </p>
        </div>

        {
    /* Destination Filter Tabs (Interactive Segmented Control) */
  }
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
          {["All", "Moon", "Mars", "Deep Space"].map((tab) => <button
    key={tab}
    onClick={() => {
      cosmicAudio.playTelemetryPing(600, 0.08);
      setActiveTab(tab);
    }}
    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${activeTab === tab ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
  >
              {tab === "All" ? "All Sites" : tab}
            </button>)}
        </div>
      </div>

      {
    /* Main Split Screen Area */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[620px]">
        
        {
    /* Left Side: Map / Planet View (7 cols) */
  }
        <div className="lg:col-span-7 flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
          
          {
    /* Map Top Bar */
  }
          <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-slate-300">
                RADAR: {activeTab === "All" ? "SOLAR SYSTEM OVERVIEW" : `${activeTab.toUpperCase()} QUADRANT`}
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
              CLICK PIN TO INSPECT · HOVER FOR TELEMETRY
            </div>
          </div>

          {
    /* Interactive Map Canvas Stage */
  }
          <div className="relative flex-1 min-h-[420px] bg-[#05070B] overflow-hidden flex items-center justify-center p-6">
            
            {
    /* Background Grid & Astrometry Circles */
  }
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div
    className="w-full h-full"
    style={{
      backgroundImage: "radial-gradient(circle, #38bdf8 1px, transparent 1px)",
      backgroundSize: "32px 32px"
    }}
  />
            </div>

            {
    /* Target Body Globe Graphic / Terrain Backdrop */
  }
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-slate-800/80 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden transition-all duration-700">
              
              {
    /* Planetary Shading */
  }
              {activeTab === "Moon" && <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-800 to-slate-950 opacity-90 rounded-full">
                  {
    /* Subtle Moon Craters */
  }
                  <div className="absolute top-12 left-16 w-16 h-16 rounded-full border border-slate-600/40 bg-slate-700/20" />
                  <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full border border-slate-600/30 bg-slate-700/30" />
                  <div className="absolute top-36 right-24 w-10 h-10 rounded-full border border-slate-500/20 bg-slate-700/20" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-80" />
                </div>}

              {activeTab === "Mars" && <div className="absolute inset-0 bg-gradient-to-br from-orange-800 via-amber-950 to-slate-950 opacity-90 rounded-full">
                  {
    /* Martian Plains & Craters */
  }
                  <div className="absolute top-8 left-14 w-28 h-20 rounded-full bg-orange-900/40 blur-xs" />
                  <div className="absolute bottom-16 right-16 w-32 h-24 rounded-full bg-amber-900/40 blur-xs" />
                  <div className="absolute top-28 right-16 w-12 h-12 rounded-full border border-amber-700/30" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-80" />
                </div>}

              {activeTab === "Deep Space" && <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-black rounded-full border border-indigo-900/40">
                  {
    /* Heliosphere concentric rings */
  }
                  <div className="absolute inset-4 rounded-full border border-indigo-800/20 border-dashed animate-spin duration-[120s]" />
                  <div className="absolute inset-16 rounded-full border border-indigo-700/30" />
                  <div className="absolute inset-28 rounded-full border border-cyan-800/20 border-dashed" />
                  {
    /* Center Sun */
  }
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-300 shadow-[0_0_20px_#f59e0b]" />
                </div>}

              {activeTab === "All" && <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#070B14] to-black rounded-full border border-slate-800">
                  <div className="absolute inset-8 rounded-full border border-slate-800/60 border-dashed" />
                  <div className="absolute inset-20 rounded-full border border-slate-700/40" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
                </div>}

              {
    /* Orbital Lines and Coordinates Overlay */
  }
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-full h-[1px] bg-slate-800/50" />
                <div className="h-full w-[1px] bg-slate-800/50 absolute" />
              </div>

              {
    /* Object Clickable Markers */
  }
              {filteredMachines.map((machine) => {
    const pos = getMapPosition(machine);
    const isSelected = selectedMachine.id === machine.id;
    const isHovered = hoveredMachine?.id === machine.id;
    return <div
      key={machine.id}
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
    >
                    <button
      onClick={() => handleMarkerClick(machine)}
      onMouseEnter={() => setHoveredMachine(machine)}
      onMouseLeave={() => setHoveredMachine(null)}
      className={`relative flex items-center justify-center cursor-pointer focus:outline-none transition-transform ${isSelected ? "scale-125" : "hover:scale-115"}`}
      aria-label={`Select ${machine.name}`}
    >
                      {
      /* Pulse Ring */
    }
                      <span
      className={`absolute w-7 h-7 rounded-full animate-ping opacity-60 ${machine.targetBody === "Mars" ? "bg-amber-400" : machine.targetBody === "Moon" ? "bg-cyan-300" : "bg-indigo-400"}`}
    />

                      {
      /* Radar Pin */
    }
                      <div
      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shadow-lg transition-colors ${isSelected ? "bg-white border-cyan-400 ring-4 ring-cyan-400/30" : machine.targetBody === "Mars" ? "bg-amber-500 border-amber-200" : machine.targetBody === "Moon" ? "bg-slate-200 border-cyan-400" : "bg-indigo-400 border-indigo-200"}`}
    >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                      </div>
                    </button>

                    {
      /* Quick Marker Label */
    }
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                      <span className="px-1.5 py-0.5 rounded bg-black/80 border border-slate-700/60 text-[10px] font-mono text-slate-200">
                        {machine.name}
                      </span>
                    </div>
                  </div>;
  })}

            </div>

            {
    /* Hover Floating Card */
  }
            {hoveredMachine && <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs z-30 p-3.5 rounded-xl bg-slate-900/95 border border-cyan-500/50 shadow-2xl backdrop-blur-md pointer-events-none animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-1">
                  <span>{hoveredMachine.targetBody.toUpperCase()}</span>
                  <span>{hoveredMachine.year}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-100">{hoveredMachine.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{hoveredMachine.location}</p>
                <div className="mt-2 text-[11px] text-slate-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="capitalize">Status: {hoveredMachine.status}</span>
                </div>
              </div>}

          </div>

          {
    /* Map Footer Bar with Active Coordinates */
  }
          <div className="px-4 py-2.5 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div>
              SELECTED: <span className="text-cyan-400 font-semibold">{selectedMachine.name}</span>
            </div>
            <div>
              {selectedMachine.coordinates.lat !== void 0 ? <span>
                  LAT {selectedMachine.coordinates.lat}° / LNG {selectedMachine.coordinates.lng}°
                </span> : <span>
                  DISTANCE: {selectedMachine.coordinates.distanceAU ?? 160} AU FROM SUN
                </span>}
            </div>
          </div>
        </div>

        {
    /* Right Side: Object List & Detail Preview (5 cols) */
  }
        <div className="lg:col-span-5 flex flex-col space-y-4">
          
          {
    /* Search Box */
  }
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search by rover name, mission, location..."
    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
  />
          </div>

          {
    /* Quick Details of Currently Selected Machine */
  }
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-700/60">
                <img
    src={selectedMachine.image}
    alt={selectedMachine.name}
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-mono text-cyan-400 truncate">
                  {selectedMachine.mission} · {selectedMachine.year}
                </div>
                <h3 className="text-lg font-bold text-slate-100 truncate mt-0.5">
                  {selectedMachine.name}
                </h3>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  {selectedMachine.location}
                </p>
                <div className="flex items-center gap-2 mt-2 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {selectedMachine.type}
                  </span>
                  <span className="text-emerald-400 capitalize">
                    ● {selectedMachine.status}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedMachine.summary}
            </p>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Science Breakthrough:
              </div>
              <div className="text-[11px] leading-relaxed">
                {selectedMachine.scienceContribution}
              </div>
            </div>

            <button
    onClick={() => handleOpenDetail(selectedMachine)}
    className="w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/40"
  >
              <Eye className="w-4 h-4" />
              <span>Open Full Machine Dossier</span>
            </button>
          </div>

          {
    /* Scrollable Object List */
  }
          <div className="flex-1 space-y-2 overflow-y-auto max-h-[300px] pr-1">
            <div className="text-xs font-mono uppercase text-slate-400 px-1">
              All Matching Objects ({filteredMachines.length})
            </div>

            {filteredMachines.map((machine) => {
    const isSelected = selectedMachine.id === machine.id;
    return <div
      key={machine.id}
      onClick={() => handleMarkerClick(machine)}
      className={`p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${isSelected ? "bg-cyan-500/10 border-cyan-500/50 shadow-md" : "bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700"}`}
    >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                      <img
      src={machine.image}
      alt={machine.name}
      className="w-full h-full object-cover"
      referrerPolicy="no-referrer"
    />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-200 truncate">
                        {machine.name}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {machine.targetBody} · {machine.mission}
                      </div>
                    </div>
                  </div>

                  <button
      onClick={(e) => {
        e.stopPropagation();
        handleOpenDetail(machine);
      }}
      className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
      title="View Details"
    >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>;
  })}
          </div>

        </div>

      </div>

    </div>;
};
