import React, { useEffect, useState } from 'react';
import { Compass, Sparkles, BookOpen, ChevronRight, Layers, Radio, Play } from 'lucide-react';
import { MACHINES_DATA, Machine } from '../data/machinesData';
import { fetchApod, ApodItem } from '../services/nasaService';
import { PageId } from '../components/Navbar';
import { cosmicAudio } from '../utils/audioNarration';

interface HomePageProps {
  onNavigate: (page: PageId, machineId?: string, filter?: string) => void;
  onSelectMachine: (machine: Machine) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectMachine }) => {
  const [apod, setApod] = useState<ApodItem | null>(null);
  const [loadingApod, setLoadingApod] = useState(true);

  // Featured 6 machines requested in spec
  const featuredIds = ['sojourner', 'opportunity', 'apollo11-descent', 'lunar-roving-vehicle', 'insight', 'voyager1'];
  const featuredMachines = MACHINES_DATA.filter(m => featuredIds.includes(m.id));

  useEffect(() => {
    fetchApod()
      .then(data => setApod(data))
      .catch(() => {})
      .finally(() => setLoadingApod(false));
  }, []);

  const handleStartStory = () => {
    cosmicAudio.playTelemetryPing(880, 0.15);
    onNavigate('story');
  };

  const handleExploreMoon = () => {
    cosmicAudio.playTelemetryPing(750, 0.12);
    onNavigate('explore', undefined, 'Moon');
  };

  const handleExploreMars = () => {
    cosmicAudio.playTelemetryPing(620, 0.12);
    onNavigate('explore', undefined, 'Mars');
  };

  return (
    <div className="space-y-24">

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-800/80">
        
        {/* Subtle background glow & celestial imagery */}
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
          <img
            src="/src/assets/images/hero_space_journey_1790365407516.jpg"
            alt="Deep space vista with Earth, Moon and Mars"
            className="w-full h-full object-cover object-center filter brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/80 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Quiet Subtitle Header */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Digital Museum of Space Archaeology</span>
          </div>

          {/* Main Title & Tagline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 max-w-4xl mx-auto leading-tight">
            Echoes of Space
          </h1>
          
          <p className="mt-3 text-lg sm:text-2xl font-light text-cyan-300 max-w-2xl mx-auto italic">
            “Every machine has a story. Every discovery has a legacy.”
          </p>

          {/* Short Intro */}
          <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore the forgotten NASA machines left on the Moon and Mars, and discover the groundbreaking science they made possible.
          </p>

          {/* 3 Main Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <button
              onClick={handleExploreMoon}
              className="px-6 py-3.5 text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-white rounded-xl shadow-lg shadow-slate-900/50 hover:shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Explore the Moon</span>
            </button>

            <button
              onClick={handleExploreMars}
              className="px-6 py-3.5 text-sm font-semibold text-amber-950 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl shadow-lg shadow-amber-950/40 hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-red-950" />
              <span>Explore Mars</span>
            </button>

            <button
              onClick={handleStartStory}
              className="px-6 py-3.5 text-sm font-semibold text-cyan-300 bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-400 hover:bg-slate-800 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/30" />
              <span>Start Story Mode</span>
            </button>
          </div>

          {/* Quiet Metadata Bar */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-400 font-mono">
            <span>6+ Historic Sites</span>
            <span aria-hidden="true">·</span>
            <span>45+ km Planetary Traverses</span>
            <span aria-hidden="true">·</span>
            <span>24 Billion km Interstellar Horizon</span>
          </div>

        </div>
      </section>

      {/* 2. Why This Matters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              The Philosophy of Space Archaeology
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Why These Forgotten Machines Matter
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              When a spacecraft completes its mission on another world, it doesn't get brought back to Earth. It remains where it touched down — frozen in the airless cold of the lunar plains or bathed in Martian red dust.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              These quiet sentinels are not space trash. They are humanity’s greatest scientific monuments. Every wheel tread, laser mirror, and robotic arm proved principles that paved the way for modern space telescopes, rover fleets, and the upcoming human return to the Moon and Mars.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('science')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>Discover the science they made possible</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-cyan-400">01. PROOF OF CONCEPT</div>
              <h3 className="text-base font-semibold text-slate-200">First Steps & Wheels</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Before Sojourner, many argued rovers could not survive Martian rocks. Before Apollo 11, some feared landers would sink into deep lunar dust.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-amber-400">02. WATER & HABITABILITY</div>
              <h3 className="text-base font-semibold text-slate-200">Rewriting Planetary Science</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Opportunity’s hematite blueberries and Spirit’s silica hot springs proved that ancient Mars once harbored drinkable, habitable liquid water.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-indigo-400">03. TIMELESS SENTINELS</div>
              <h3 className="text-base font-semibold text-slate-200">Millennial Preservation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                With no rain, plate tectonics, or liquid erosion, these craft and astronaut bootprints will endure virtually unchanged for thousands of years.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Featured Machines Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Curated Museum Collection
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
              Featured Machines of History
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Click any spacecraft to hear its story and examine its scientific legacy.
            </p>
          </div>

          <button
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All 8+ Explorers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMachines.map((machine) => (
            <div
              key={machine.id}
              onClick={() => onSelectMachine(machine)}
              className="group bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src={machine.image}
                  alt={machine.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                
                {/* Location indicator */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md border border-slate-700/60 text-[11px] font-mono text-cyan-300">
                  {machine.targetBody}
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] font-mono uppercase text-slate-300">
                  {machine.year}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {machine.mission}
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mt-0.5">
                    {machine.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {machine.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px] font-mono">
                    Status: <span className="text-slate-300 capitalize">{machine.status}</span>
                  </span>
                  <span className="text-cyan-400 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Explore <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Quick Start Pathways */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
          Interactive Experiences
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-8">
          Choose Your Path Through History
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div
            onClick={() => onNavigate('story')}
            className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0A0E18] border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:bg-cyan-500/20 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
              Story Mode
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Listen to the machines themselves speak in first-person narratives. Designed like an emotional, illustrated children’s book for young explorers.
            </p>
            <div className="mt-4 text-xs font-semibold text-cyan-400 flex items-center gap-1">
              Read stories <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('science')}
            className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0A0E18] border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-500/20 transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
              Science Lab
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Discover the exact science made possible by the hardware: water detection, lunar magma oceans, planetary atmospheres, and deep-space signals.
            </p>
            <div className="mt-4 text-xs font-semibold text-amber-400 flex items-center gap-1">
              Open laboratory <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('games')}
            className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0A0E18] border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:bg-emerald-500/20 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
              Game Zone
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Test your space knowledge! Search for hidden markers on Martian maps, match rovers to their discoveries, and earn official Archaeologist Badges.
            </p>
            <div className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1">
              Play mini-games <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* 5. Live NASA Daily Astronomy Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                NASA Open Data Integration
              </span>
            </div>
            {apod && (
              <span className="text-xs text-slate-500 font-mono">
                {apod.date}
              </span>
            )}
          </div>

          {loadingApod ? (
            <div className="py-12 text-center text-xs text-slate-500 font-mono animate-pulse">
              Querying NASA Astronomy Archive...
            </div>
          ) : apod ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={apod.url}
                  alt={apod.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lg:col-span-7 space-y-3">
                <h3 className="text-xl font-bold text-slate-100">
                  {apod.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                  {apod.explanation}
                </p>
                {apod.copyright && (
                  <div className="text-[11px] text-slate-500 font-mono">
                    Credit: {apod.copyright}
                  </div>
                )}
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('about')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
                  >
                    Learn more about our NASA API integration →
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden bg-gradient-to-r from-cyan-950/40 via-slate-900 to-amber-950/30 border border-slate-800">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 max-w-2xl mx-auto">
            Ready to Walk Among the Artifacts?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Choose a destination on the interactive surface map, examine coordinates, and earn your official Space Archaeologist credentials.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('explore')}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-950/50 cursor-pointer"
            >
              Launch Planetary Map
            </button>
            <button
              onClick={() => onNavigate('games')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-all border border-slate-700 cursor-pointer"
            >
              Play Archaeologist Quiz
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
