import React, { useState } from 'react';
import { SCIENCE_TOPICS, ScienceTopic } from '../data/scienceLabData';
import { Layers, Droplets, Moon, Wind, Radio, Bot, Play, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { cosmicAudio } from '../utils/audioNarration';
import { PageId } from '../components/Navbar';

interface ScienceLabPageProps {
  onNavigate: (page: PageId, machineId?: string) => void;
}

export const ScienceLabPage: React.FC<ScienceLabPageProps> = ({ onNavigate }) => {
  const [activeTopic, setActiveTopic] = useState<ScienceTopic>(SCIENCE_TOPICS[0]);
  
  // Interactive Simulator States
  // 1. Spectrometer state
  const [selectedMineral, setSelectedMineral] = useState<'hematite' | 'basalt' | 'clay' | 'silica'>('hematite');
  const [isScanning, setIsScanning] = useState(false);

  // 2. Light delay simulator state
  const [targetDestination, setTargetDestination] = useState<'moon' | 'mars-close' | 'mars-far' | 'voyager'>('mars-close');
  const [pingProgress, setPingProgress] = useState<number | null>(null);

  // 3. Rocker-Bogie Simulator state
  const [rockObstacleHeight, setRockObstacleHeight] = useState<number>(14);

  const getTopicIcon = (id: string) => {
    switch (id) {
      case 'water-on-mars': return <Droplets className="w-4 h-4 text-cyan-400" />;
      case 'lunar-geology': return <Moon className="w-4 h-4 text-slate-300" />;
      case 'planetary-atmosphere': return <Wind className="w-4 h-4 text-amber-400" />;
      case 'space-communication': return <Radio className="w-4 h-4 text-indigo-400" />;
      case 'robotic-exploration': return <Bot className="w-4 h-4 text-emerald-400" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  const handleScanMineral = (type: 'hematite' | 'basalt' | 'clay' | 'silica') => {
    cosmicAudio.playTelemetryPing(880, 0.1);
    setSelectedMineral(type);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      cosmicAudio.playDiscoveryChime();
    }, 600);
  };

  const handleSendRadioPing = () => {
    cosmicAudio.playTelemetryPing(1020, 0.15);
    setPingProgress(0);
    const interval = setInterval(() => {
      setPingProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          cosmicAudio.playDiscoveryChime();
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const delayDetails = {
    moon: { name: 'The Moon (Tranquility Base)', distance: '384,400 km', delay: '1.28 Seconds (Round-trip: 2.56s)' },
    'mars-close': { name: 'Mars at Closest Approach', distance: '54.6 Million km', delay: '3.03 Minutes (Round-trip: 6.06m)' },
    'mars-far': { name: 'Mars at Solar Conjunction', distance: '401 Million km', delay: '22.3 Minutes (Round-trip: 44.6m)' },
    voyager: { name: 'Voyager 1 in Interstellar Space', distance: '24.4 Billion km', delay: '22.6 Hours (Round-trip: 45.2h)' }
  };

  const mineralInfo = {
    hematite: {
      name: 'Hematite "Blueberries"',
      formula: 'Fe₂O₃ Spherules',
      waterVerdict: 'CONFIRMED WATER-FORMED',
      color: 'bg-indigo-500',
      description: 'Microscopic spherical concretion that precipitated out of ancient acidic standing groundwater on Mars.'
    },
    basalt: {
      name: 'Volcanic Basalt',
      formula: 'Pyroxene & Olivine',
      waterVerdict: 'DRY VOLCANIC ROCK',
      color: 'bg-stone-600',
      description: 'Dark, iron-rich igneous rock formed by cooling lava flows with zero water involvement.'
    },
    clay: {
      name: 'Smectite Clay Bedrock',
      formula: 'Hydrated Phyllosilicate',
      waterVerdict: 'CONFIRMED WATER-FORMED',
      color: 'bg-amber-600',
      description: 'Sediment that forms in neutral-pH, drinkable freshwater lakes over thousands of years.'
    },
    silica: {
      name: 'Opaline Silica',
      formula: 'SiO₂ · nH₂O (90% pure)',
      waterVerdict: 'CONFIRMED HOT SPRINGS',
      color: 'bg-cyan-400',
      description: 'Discovered by Spirit’s stuck wheel; proves ancient hydrothermal steam vents and boiling geysers.'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          <span>Interactive Educational Museum</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 mt-1">
          Science Lab: Discoveries in the Regolith
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          NASA’s rovers and landers didn’t just survive extraterrestrial extremes — they completely revolutionized our scientific understanding of planetary evolution and extraterrestrial habitability.
        </p>
      </div>

      {/* 5 Topic Category Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {SCIENCE_TOPICS.map((topic) => {
          const isActive = activeTopic.id === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => {
                cosmicAudio.playTelemetryPing(740, 0.08);
                setActiveTopic(topic);
              }}
              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/30'
                  : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/60'
              }`}
            >
              <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                {getTopicIcon(topic.id)}
              </div>
              <div className="truncate">
                <div className={`text-xs font-bold truncate ${isActive ? 'text-cyan-300' : 'text-slate-300'}`}>
                  {topic.title.split(':')[0]}
                </div>
                <div className="text-[10px] text-slate-500 uppercase font-mono">
                  {topic.targetBody}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Educational Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Q&A + In-depth explanation (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Core Question & Answer Card (Requested Hackathon Format) */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/20 via-slate-900 to-slate-900 border border-cyan-500/30 shadow-xl space-y-4">
            
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>STUDENT INQUIRY</span>
            </div>

            {/* Question */}
            <div>
              <div className="text-xs uppercase font-mono text-slate-400">Question:</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
                {activeTopic.keyQuestion}
              </h2>
            </div>

            {/* Answer */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-xs uppercase font-mono text-emerald-400 font-semibold">
                Direct Scientific Answer:
              </div>
              <p className="text-sm sm:text-base text-slate-200 mt-1 leading-relaxed font-medium">
                {activeTopic.simpleAnswer}
              </p>
            </div>
          </div>

          {/* In-depth Scientific Explanation */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase font-mono tracking-wider text-slate-400">
              Detailed Planetary Evidence
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeTopic.inDepthExplanation}
            </p>
          </div>

          {/* Key Evidences Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Key Artifact Discoveries
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {activeTopic.keyEvidences.map((evidence, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 text-xs font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{evidence.title}</div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{evidence.description}</p>
                    <div className="text-[11px] font-mono text-cyan-400 mt-1">
                      Discovered by: {evidence.discoveredBy}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Simulators (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* SIMULATOR 1: Virtual Rock Spectrometer */}
          {activeTopic.id === 'water-on-mars' && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  APXS SPECTROMETER PROBE
                </span>
                <span>NASA MER SENSOR</span>
              </div>

              <p className="text-xs text-slate-300">
                Select a rock sample to analyze with the rover’s Alpha Particle X-Ray Spectrometer:
              </p>

              {/* Sample Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {(['hematite', 'basalt', 'clay', 'silica'] as const).map((mineral) => (
                  <button
                    key={mineral}
                    onClick={() => handleScanMineral(mineral)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold capitalize transition-all cursor-pointer ${
                      selectedMineral === mineral
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {mineralInfo[mineral].name}
                  </button>
                ))}
              </div>

              {/* Spectral Reading Display */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden">
                {isScanning ? (
                  <div className="py-8 text-center text-xs font-mono text-cyan-400 animate-pulse">
                    EMITTING X-RAY CURVE... TAPPING MINERAL CORE...
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">TARGET:</span>
                      <span className="text-slate-100 font-bold">{mineralInfo[selectedMineral].name}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">CHEMICAL FORMULA:</span>
                      <span className="text-cyan-300">{mineralInfo[selectedMineral].formula}</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      {mineralInfo[selectedMineral].description}
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs font-mono">
                      <span className="text-slate-400">HABITABILITY:</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {mineralInfo[selectedMineral].waterVerdict}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SIMULATOR 2: Speed of Light Delay Calculator */}
          {activeTopic.id === 'space-communication' && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-indigo-500/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
                <span className="flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5" />
                  DSN 70-METER RADIO PROBE
                </span>
                <span>LIGHT SPEED: 300,000 km/s</span>
              </div>

              <p className="text-xs text-slate-300">
                Calculate radio packet transmission lag across interplanetary distances:
              </p>

              {/* Destination Selector */}
              <div className="space-y-2">
                {(['moon', 'mars-close', 'mars-far', 'voyager'] as const).map((dest) => (
                  <button
                    key={dest}
                    onClick={() => {
                      cosmicAudio.playTelemetryPing(720, 0.08);
                      setTargetDestination(dest);
                      setPingProgress(null);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      targetDestination === dest
                        ? 'bg-indigo-500/20 text-indigo-200 border-indigo-500/50'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-semibold">{delayDetails[dest].name}</span>
                    <span className="font-mono text-[11px] text-slate-500">{delayDetails[dest].distance}</span>
                  </button>
                ))}
              </div>

              {/* Send Ping Action */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">ONE-WAY DELAY:</span>
                  <span className="text-amber-300 font-bold">{delayDetails[targetDestination].delay}</span>
                </div>

                {pingProgress !== null && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>RADIO PACKET PROPAGATION</span>
                      <span>{pingProgress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 transition-all duration-150"
                        style={{ width: `${pingProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSendRadioPing}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Transmit Telemetry Ping to {delayDetails[targetDestination].name.split(' ')[0]}
                </button>
              </div>
            </div>
          )}

          {/* SIMULATOR 3: Rocker-Bogie Suspension Terrain Simulator */}
          {activeTopic.id === 'robotic-exploration' && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" />
                  ROCKER-BOGIE TERRAIN LAB
                </span>
                <span>NO SPRINGS SYSTEM</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Adjust obstacle height to observe how differential bogies pivot to maintain ground pressure without tipping:
              </p>

              {/* Slider Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">BOULDER HEIGHT:</span>
                  <span className="text-emerald-300 font-bold tabular-nums">{rockObstacleHeight} cm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={rockObstacleHeight}
                  onChange={(e) => setRockObstacleHeight(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Rover Schematic Diagram */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="h-28 relative flex items-center justify-center border-b border-slate-800/80">
                  {/* Ground Line */}
                  <div className="absolute bottom-4 left-4 right-4 h-1 bg-stone-700" />
                  
                  {/* Boulder Obstacle */}
                  <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-t-lg bg-amber-700 transition-all duration-200"
                    style={{
                      width: '36px',
                      height: `${Math.max(4, rockObstacleHeight * 2.2)}px`
                    }}
                  />

                  {/* Rover Wheels & Differential Bar */}
                  <div className="relative w-48 flex justify-between items-end pb-3 z-10">
                    <div className="w-5 h-5 rounded-full bg-slate-300 border-2 border-slate-950 shadow" />
                    <div
                      className="w-5 h-5 rounded-full bg-cyan-400 border-2 border-slate-950 shadow transition-all duration-200"
                      style={{ transform: `translateY(-${rockObstacleHeight * 1.4}px)` }}
                    />
                    <div className="w-5 h-5 rounded-full bg-slate-300 border-2 border-slate-950 shadow" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>WHEEL LOAD DISTRIBUTION:</span>
                  <span className="text-emerald-400 font-bold">100% NOMINAL CONTACT</span>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR 4 / FALLBACK FOR MOON & ATMOSPHERE */}
          {(activeTopic.id === 'lunar-geology' || activeTopic.id === 'planetary-atmosphere') && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                <span>SCIENTIFIC INSIGHT SUMMARY</span>
                <span>GRADE: CLASSROOM READY</span>
              </div>

              <h4 className="text-sm font-bold text-slate-100">
                Why Students Should Remember This:
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {activeTopic.whyItMatters}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
                <span className="text-cyan-400">KEY TAKEAWAY:</span>
                <p className="text-slate-300">
                  Every gram of rock collected on the Moon and every seismic pulse measured by InSight rewrote textbooks on how planets are born.
                </p>
              </div>

              <button
                onClick={() => onNavigate('games')}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Test This Science in Game Zone
              </button>
            </div>
          )}

          {/* Classroom Resource Download/Link Card */}
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400">Educational Curriculum Fit</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Aligns with STEM Next Generation Science Standards (NGSS) for Middle & High School astronomy, geology, and physical science.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
