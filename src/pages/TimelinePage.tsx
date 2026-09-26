import React, { useState } from 'react';
import { TIMELINE_EVENTS, TimelineEvent } from '../data/timelineData';
import { MACHINES_DATA } from '../data/machinesData';
import { Calendar, ChevronRight, Compass, Eye, Sparkles } from 'lucide-react';
import { PageId } from '../components/Navbar';
import { cosmicAudio } from '../utils/audioNarration';

interface TimelinePageProps {
  onNavigate: (page: PageId, machineId?: string) => void;
  onSelectMachineId: (machineId: string) => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ onNavigate, onSelectMachineId }) => {
  const [targetFilter, setTargetFilter] = useState<'All' | 'Moon' | 'Mars' | 'Deep Space'>('All');

  const filteredEvents = TIMELINE_EVENTS.filter((e) => {
    if (targetFilter === 'All') return true;
    return e.targetBody === targetFilter;
  });

  const handleOpenMachine = (machineId: string) => {
    cosmicAudio.playTelemetryPing(880, 0.1);
    onSelectMachineId(machineId);
    onNavigate('detail', machineId);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Chronological Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">
            Historic Mission Timeline
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            From humanity’s first touchdown on lunar soil to the farthest reaches of interstellar space.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
          {(['All', 'Moon', 'Mars', 'Deep Space'] as const).map((dest) => (
            <button
              key={dest}
              onClick={() => {
                cosmicAudio.playTelemetryPing(660, 0.08);
                setTargetFilter(dest);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                targetFilter === dest
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {dest}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-12">
        {filteredEvents.map((evt, idx) => {
          const associatedMachine = MACHINES_DATA.find((m) => m.id === evt.machineId);

          return (
            <div key={idx} className="relative group">
              
              {/* Timeline Node Point */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-125 ${
                  evt.targetBody === 'Moon'
                    ? 'bg-slate-900 border-cyan-400 text-cyan-300'
                    : evt.targetBody === 'Mars'
                    ? 'bg-slate-900 border-amber-500 text-amber-400'
                    : 'bg-slate-900 border-indigo-400 text-indigo-300'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-current" />
              </div>

              {/* Event Content Card */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 group-hover:border-slate-700 transition-all shadow-xl space-y-4">
                
                {/* Year & Date Row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black font-mono text-cyan-400">
                      {evt.year}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      · {evt.dateStr}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono uppercase text-slate-300">
                    {evt.targetBody}
                  </span>
                </div>

                {/* Title & Summary */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {evt.summary}
                  </p>
                </div>

                {/* Science Impact & Hardware details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                    <div className="text-[11px] font-mono text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>SCIENTIFIC IMPACT</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {evt.scientificImpact}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-cyan-400" />
                      <span>HARDWARE INNOVATION</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {evt.hardwareDetail}
                    </p>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/80 text-xs font-mono">
                  <span className="text-slate-500">
                    PRESENT: <span className="text-slate-300">{evt.legacyStatus}</span>
                  </span>

                  {evt.machineId && (
                    <button
                      onClick={() => handleOpenMachine(evt.machineId!)}
                      className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect {associatedMachine?.name || 'Machine'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
