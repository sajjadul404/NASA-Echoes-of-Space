import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Sparkles, BookOpen, Radio } from "lucide-react";
import { STORIES_DATA } from "../data/storiesData";
import { cosmicAudio } from "../utils/audioNarration";
export const StoryModePage = ({ onNavigate }) => {
  const [selectedStory, setSelectedStory] = useState(STORIES_DATA[0]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const currentSlide = selectedStory.slides[currentSlideIndex];
  useEffect(() => {
    cosmicAudio.stopSpeaking();
    setIsReadingAloud(false);
    return () => {
      cosmicAudio.stopSpeaking();
    };
  }, [selectedStory, currentSlideIndex]);
  const handleNextSlide = () => {
    if (currentSlideIndex < selectedStory.slides.length - 1) {
      cosmicAudio.playTelemetryPing(880, 0.08);
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };
  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      cosmicAudio.playTelemetryPing(660, 0.08);
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };
  const toggleReadAloud = () => {
    if (isReadingAloud) {
      cosmicAudio.stopSpeaking();
      setIsReadingAloud(false);
    } else {
      setIsReadingAloud(true);
      const textToRead = `${currentSlide.headline}. ${currentSlide.firstPersonText}`;
      cosmicAudio.speak(
        textToRead,
        () => setIsReadingAloud(true),
        () => setIsReadingAloud(false)
      );
    }
  };
  const selectStoryArc = (story) => {
    cosmicAudio.playTelemetryPing(720, 0.1);
    setSelectedStory(story);
    setCurrentSlideIndex(0);
  };
  const stagesList = [
    "Meet the Machine",
    "The Launch",
    "The Arrival",
    "Mission Work",
    "The Great Discovery",
    "Final Resting Place / Current Journey",
    "The Eternal Legacy"
  ];
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {
    /* Page Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interactive Storybook Museum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">
            Story Mode Chronicles
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Listen as humanity’s robotic pioneers recount their journeys across time and space in first-person voices.
          </p>
        </div>

        {
    /* Story Selector Buttons */
  }
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
          {STORIES_DATA.map((story) => <button
    key={story.id}
    onClick={() => selectStoryArc(story)}
    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${selectedStory.id === story.id ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
  >
              {story.title}
            </button>)}
        </div>
      </div>

      {
    /* Story Arc Breadcrumbs & Progress */
  }
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="text-cyan-400 font-bold">
            CHAPTER {currentSlideIndex + 1} OF {selectedStory.slides.length}: {currentSlide.stageTitle.toUpperCase()}
          </span>
          <span>Narrated by {selectedStory.narratorMachine}</span>
        </div>

        {
    /* Step Progression Bar */
  }
        <div className="grid grid-cols-7 gap-1.5">
          {stagesList.map((stage, idx) => {
    const isCurrent = idx === currentSlideIndex;
    const isCompleted = idx < currentSlideIndex;
    return <button
      key={stage}
      onClick={() => {
        cosmicAudio.playTelemetryPing(700, 0.05);
        setCurrentSlideIndex(idx);
      }}
      className={`h-1.5 rounded-full transition-all cursor-pointer ${isCurrent ? "bg-cyan-400 ring-2 ring-cyan-400/40" : isCompleted ? "bg-slate-500" : "bg-slate-800"}`}
      title={`Jump to ${stage}`}
      aria-label={`Jump to stage ${idx + 1}: ${stage}`}
    />;
  })}
        </div>
      </div>

      {
    /* Main Storybook Canvas Stage */
  }
      <div className="rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col justify-between">
        
        {
    /* Top Story Frame Bar */
  }
        <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>TRANSMISSION CHANNEL: {selectedStory.targetBody.toUpperCase()} RELAY</span>
          </div>

          <button
    onClick={toggleReadAloud}
    className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${isReadingAloud ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : "bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/30"}`}
  >
            {isReadingAloud ? <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Mute Voice Narration</span>
              </> : <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen to Voice Audio</span>
              </>}
          </button>
        </div>

        {
    /* Story Slide Body (2 columns: Visual + First-person Prose) */
  }
        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
          
          {
    /* Visual Presentation */
  }
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
            <img
    src={currentSlide.image}
    alt={currentSlide.headline}
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {
    /* Stage Stamp */
  }
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono text-cyan-300 uppercase">
              {currentSlide.stageTitle}
            </div>

            {
    /* Telemetry snippet */
  }
            {currentSlide.telemetrySnippet && <div className="absolute bottom-4 left-4 right-4 p-2.5 rounded-lg bg-black/70 backdrop-blur-md border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{currentSlide.telemetrySnippet.label}</span>
                <span className="text-cyan-300 font-bold">{currentSlide.telemetrySnippet.value}</span>
              </div>}
          </div>

          {
    /* First-person Speech Narrative */
  }
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-1">
                Step 0{currentSlide.slideNumber} · {currentSlide.stageTitle}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 leading-snug">
                {currentSlide.headline}
              </h2>
            </div>

            {
    /* First-Person Quote Block */
  }
            <div className="relative pl-4 border-l-2 border-cyan-400/60 py-1">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light italic">
                “{currentSlide.firstPersonText}”
              </p>
            </div>

            {
    /* Historical Narrator Annotation */
  }
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 space-y-1">
              <span className="font-semibold text-slate-300">Historical Context:</span>
              <p className="leading-relaxed">
                {currentSlide.narratorNote}
              </p>
            </div>
          </div>

        </div>

        {
    /* Slide Bottom Controls */
  }
        <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-900/80 flex items-center justify-between">
          <button
    onClick={handlePrevSlide}
    disabled={currentSlideIndex === 0}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${currentSlideIndex === 0 ? "opacity-30 cursor-not-allowed text-slate-600" : "text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"}`}
  >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Chapter</span>
          </button>

          <span className="text-xs font-mono text-slate-400">
            {currentSlideIndex + 1} / {selectedStory.slides.length}
          </span>

          {currentSlideIndex < selectedStory.slides.length - 1 ? <button
    onClick={handleNextSlide}
    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-950/40 transition-all cursor-pointer"
  >
              <span>Next Chapter</span>
              <ChevronRight className="w-4 h-4" />
            </button> : <button
    onClick={() => onNavigate("science")}
    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-md transition-all cursor-pointer"
  >
              <Sparkles className="w-4 h-4" />
              <span>Explore The Science Lab</span>
            </button>}
        </div>

      </div>

      {
    /* Suggested next steps */
  }
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-200">
            Enjoyed this story chapter?
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Test what you learned in the Game Zone matching quiz or inspect the machine's scientific discoveries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
    onClick={() => onNavigate("games")}
    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
  >
            Play Quiz
          </button>
          <button
    onClick={() => onNavigate("explore")}
    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
  >
            View on Map
          </button>
        </div>
      </div>

    </div>;
};
