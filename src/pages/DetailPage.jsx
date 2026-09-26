import { useState, useEffect } from "react";
import { 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Compass, 
  BookOpen, 
  Layers,
  Award,
  CheckCircle2,
  Play
} from "lucide-react";
import { cosmicAudio } from "../utils/audioNarration";
import { searchNasaImages } from "../services/nasaService";

export const DetailPage = ({
  machine,
  onBack,
  onNavigate,
  onMarkVisited
}) => {
  const [isNarrating, setIsNarrating] = useState(false);
  const [nasaImages, setNasaImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    onMarkVisited?.(machine.id);
    setLoadingImages(true);
    searchNasaImages(machine.name)
      .then((images) => setNasaImages(images))
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 pb-20">
      
      {/* Top Bar: Back & Quick Jump */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-700 hover:border-cyan-400 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-sm hover:scale-102"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Back to All Robots</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("story")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 rounded-xl transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Story Book</span>
          </button>
          <button
            onClick={() => onNavigate("games")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/30 rounded-xl transition-colors cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Win Medal</span>
          </button>
        </div>
      </div>

      {/* Main Title & Destination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <span>{machine.targetBody === "Mars" ? "🔴 MARS" : machine.targetBody === "Moon" ? "🌕 THE MOON" : "🌌 DEEP SPACE"}</span>
            <span>·</span>
            <span>LAUNCHED IN {machine.year}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-0.5">
            {machine.name}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>{machine.location}</span>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 bg-emerald-950/40 border border-emerald-500/40 rounded-full text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Status: {machine.status}</span>
          </span>
        </div>
      </div>

      {/* Hero Visual & Big Read-To-Me Button */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        
        {/* Machine Image */}
        <div className="md:col-span-6 rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl relative aspect-[4/3]">
          <img
            src={machine.image}
            alt={machine.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-bold text-amber-300">
            <span>⭐ OFFICIAL NASA ARTIFACT</span>
            <span>{machine.badge}</span>
          </div>
        </div>

        {/* Read-To-Me Voice Card */}
        <div className="md:col-span-6 space-y-4">
          
          {/* Who am I bubble */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wide">
              Who Am I?
            </div>
            <p className="text-base text-white font-medium leading-relaxed">
              “{machine.whoAmI}”
            </p>
          </div>

          {/* Big Voice Player */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-400/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Listen to {machine.name}!</span>
              </span>
              {isNarrating && (
                <span className="flex gap-1 items-end h-4">
                  <span className="soundwave-bar" style={{ animationDelay: "0s" }} />
                  <span className="soundwave-bar" style={{ animationDelay: "0.2s" }} />
                  <span className="soundwave-bar" style={{ animationDelay: "0.4s" }} />
                  <span className="soundwave-bar" style={{ animationDelay: "0.6s" }} />
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 italic leading-relaxed">
              "{machine.firstPersonStory}"
            </p>

            <button
              onClick={toggleNarration}
              className={`w-full py-3.5 px-4 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-102 active:scale-95 ${
                isNarrating
                  ? "bg-rose-500 hover:bg-rose-400 text-white animate-pulse"
                  : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-cyan-500/30"
              }`}
            >
              {isNarrating ? (
                <>
                  <VolumeX className="w-5 h-5 text-white" />
                  <span>Pause Voice</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-slate-950" />
                  <span>Read Story Aloud to Me!</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 3 Short, Kid-Friendly Fact Cards (Minimal Text) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Mission Goal */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-xl">🎯</div>
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Main Goal</h3>
          <p className="text-xs text-slate-200 font-medium leading-relaxed">
            {machine.myMission.objective}
          </p>
        </div>

        {/* Where is it now? */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-xl">📍</div>
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wide">Where is it now?</h3>
          <p className="text-xs text-slate-200 font-medium leading-relaxed">
            {machine.whereAmINow}
          </p>
        </div>

        {/* Super Fun Fact */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-950/30 to-slate-900 border border-amber-400/40 space-y-1">
          <div className="text-xl">💡</div>
          <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wide">Fun Fact!</h3>
          <p className="text-xs text-amber-100 font-medium leading-relaxed">
            {machine.funFact}
          </p>
        </div>

      </div>

      {/* What Did I Find? (Short Bullet Cards) */}
      <section className="p-5 sm:p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
        <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <span>✨ 3 Great Discoveries I Made</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {machine.whatIDiscovered.map((discovery, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
              <span className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 font-black text-xs flex items-center justify-center">
                {idx + 1}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {discovery}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NASA Photos (Thumbnails) */}
      {nasaImages.length > 0 && (
        <section className="p-5 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            Real NASA Mission Photos
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {nasaImages.slice(0, 4).map((img) => (
              <div
                key={img.nasa_id}
                className="group aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative cursor-pointer"
                title={img.title}
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Play Quiz Footer */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-amber-950/40 border border-cyan-500/30 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-black text-white">
            Do you know {machine.name}'s secret?
          </div>
          <div className="text-xs text-slate-300">
            Answer quiz questions & unlock the {machine.badge} medal!
          </div>
        </div>

        <button
          onClick={() => onNavigate("games")}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md hover:scale-105 active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <Award className="w-4 h-4 text-slate-950" />
          <span>Play Quiz!</span>
        </button>
      </div>

    </div>
  );
};
