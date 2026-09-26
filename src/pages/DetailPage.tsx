import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowLeft, Sparkles, MapPin, Calendar, Compass, Shield, BookOpen, Layers } from 'lucide-react';
import { Machine } from '../data/machinesData';
import { cosmicAudio } from '../utils/audioNarration';
import { searchNasaImages, NasaImageResult } from '../services/nasaService';
import { PageId } from '../components/Navbar';

interface DetailPageProps {
  machine: Machine;
  onBack: () => void;
  onNavigate: (page: PageId, machineId?: string) => void;
  onMarkVisited?: (machineId: string) => void;
}

export const DetailPage: React.FC<DetailPageProps> = ({
  machine,
  onBack,
  onNavigate,
  onMarkVisited
}) => {
  const [isNarrating, setIsNarrating] = useState(false);
  const [nasaImages, setNasaImages] = useState<NasaImageResult[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    onMarkVisited?.(machine.id);

    // Search NASA image archive for this mission
    setLoadingImages(true);
    searchNasaImages(machine.name)
      .then(images => setNasaImages(images))
      .catch(() => {})
      .finally(() => setLoadingImages(false));

    return () => {
      cosmicAudio.stopSpeaking();
    };
  }, [machine, onMarkVisited]);

  const toggleNarration = () => {
    if (isNarrating) {
      cosmicAudio.stopSpeaking();
      setIsNarrating(false);
    } else {
      setIsNarrating(true);
      cosmicAudio.speak(
        machine.firstPersonStory,
        () => setIsNarrating(true),
        () => setIsNarrating(false)
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Back button and quick actions */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explorer</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('story')}
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer font-medium"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Story Mode</span>
          </button>
          <button
            onClick={() => onNavigate('science')}
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 cursor-pointer font-medium"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Science Lab</span>
          </button>
        </div>
      </div>

      {/* A. Header Section */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
          <span>{machine.targetBody.toUpperCase()}</span>
          <span aria-hidden="true">·</span>
          <span>{machine.mission}</span>
          <span aria-hidden="true">·</span>
          <span>LAUNCHED {machine.year}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
              {machine.name}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>{machine.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono capitalize text-slate-200">
              Type: {machine.type}
            </span>
            <span className="px-3 py-1 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-xs font-mono capitalize text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {machine.status}
            </span>
          </div>
        </div>
      </section>

      {/* Hero Visual & Audio Narration Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Machine Image */}
        <div className="lg:col-span-6 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl relative aspect-[4/3]">
          <img
            src={machine.image}
            alt={machine.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300">
            <span>OFFICIAL NASA ARTIFACT</span>
            <span>{machine.badge}</span>
          </div>
        </div>

        {/* B. "Who am I?" & G. "Listen to my story" */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Who Am I */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Section B · Who am I?
            </div>
            <p className="text-base text-slate-200 leading-relaxed font-medium">
              “{machine.whoAmI}”
            </p>
          </div>

          {/* G. Audio Narration Panel */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-slate-900/90 border border-cyan-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <Volume2 className="w-4 h-4" />
                <span>VOICE NARRATION</span>
              </div>
              {isNarrating && (
                <span className="text-[10px] font-mono text-cyan-400 animate-pulse">
                  TRANSMITTING AUDIO...
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 italic leading-relaxed">
              "{machine.firstPersonStory}"
            </p>

            <button
              onClick={toggleNarration}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                isNarrating
                  ? 'bg-rose-500 hover:bg-rose-400 text-white'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-950/50'
              }`}
            >
              {isNarrating ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Pause Machine Narration</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Listen to My Story (Voice Audio)</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* C. "My Mission" Section */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
          Section C · My Mission
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
          Mission Flight Objectives & Journey
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>LAUNCH DATE</span>
            </div>
            <div className="text-sm font-semibold text-slate-200">
              {machine.myMission.launchDate}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>ARRIVAL DATE</span>
            </div>
            <div className="text-sm font-semibold text-slate-200">
              {machine.myMission.arrivalDate}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>TOUCHDOWN TARGET</span>
            </div>
            <div className="text-sm font-semibold text-slate-200">
              {machine.myMission.destination}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-300 leading-relaxed mt-2">
          <span className="font-semibold text-slate-200">Primary Objective:</span> {machine.myMission.objective}
        </div>
      </section>

      {/* D. "What I Discovered" (Science Section in Simple Language) */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
          Section D · What I Discovered
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
          Scientific Discoveries Made Possible
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Explained in straightforward, school-friendly language for curious young minds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {machine.whatIDiscovered.map((discovery, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 text-xs font-bold font-mono">
                0{idx + 1}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {discovery}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* E. "Where am I now?" & F. "Fun Fact" */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* E. Where Am I Now */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            Section E · Where am I now?
          </div>
          <h3 className="text-lg font-bold text-slate-100">Present Condition</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {machine.whereAmINow}
          </p>
          <div className="pt-2 text-xs font-mono text-slate-400">
            Coordinates: {machine.coordinates.lat !== undefined 
              ? `${machine.coordinates.lat}° N/S, ${machine.coordinates.lng}° E/W` 
              : `${machine.coordinates.distanceAU} AU from Sun`}
          </div>
        </div>

        {/* F. Fun Fact */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 to-slate-900/90 border border-amber-500/30 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section F · Fun Fact</span>
          </div>
          <h3 className="text-lg font-bold text-slate-100">Child-Friendly Trivia</h3>
          <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
            {machine.funFact}
          </p>
        </div>

      </div>

      {/* NASA Open Image Gallery Section */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              NASA Planetary Archive Gallery
            </div>
            <h3 className="text-lg font-bold text-slate-100 mt-1">
              Historical Mission Imagery
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            via images.nasa.gov
          </span>
        </div>

        {loadingImages ? (
          <div className="py-12 text-center text-xs text-slate-500 font-mono animate-pulse">
            Searching NASA visual library for {machine.name}...
          </div>
        ) : nasaImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {nasaImages.map((img) => (
              <div
                key={img.nasa_id}
                className="group aspect-video rounded-lg overflow-hidden bg-slate-950 border border-slate-800 relative cursor-pointer"
                title={img.title}
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-end">
                  <p className="text-[10px] text-slate-200 line-clamp-2 leading-tight">
                    {img.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-slate-500">
            Primary archival photography loaded in main header.
          </div>
        )}
      </section>

      {/* Action Footer */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-slate-200">
            Test Your Knowledge of {machine.name}
          </div>
          <p className="text-xs text-slate-400">
            Visit the Game Zone to complete the map hunt and unlock the {machine.badge} medal!
          </p>
        </div>

        <button
          onClick={() => onNavigate('games')}
          className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0"
        >
          Play Game Zone
        </button>
      </div>

    </div>
  );
};
