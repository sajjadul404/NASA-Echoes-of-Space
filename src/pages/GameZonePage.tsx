import React, { useState } from 'react';
import { Award, Compass, Sparkles, CheckCircle2, XCircle, RotateCcw, ChevronRight, HelpCircle, Trophy, Shuffle } from 'lucide-react';
import { MAP_MISSIONS, MATCH_PAIRS, MISSION_STAGES, QUIZ_QUESTIONS, MapClueMission, MatchPair, TimelineStage } from '../data/gamesData';
import { MACHINES_DATA, Machine } from '../data/machinesData';
import { cosmicAudio } from '../utils/audioNarration';
import { PageId } from '../components/Navbar';

interface GameZonePageProps {
  unlockedBadges: string[];
  onUnlockBadge: (badge: string) => void;
  onUpdateQuizScore: (score: number) => void;
  onOpenPassport: () => void;
  onNavigate: (page: PageId, machineId?: string) => void;
}

export const GameZonePage: React.FC<GameZonePageProps> = ({
  unlockedBadges,
  onUnlockBadge,
  onUpdateQuizScore,
  onOpenPassport,
  onNavigate
}) => {
  const [activeGame, setActiveGame] = useState<'map' | 'match' | 'sequence' | 'quiz'>('map');

  // --- GAME 1: Map Hunt States ---
  const [mapMissionIndex, setMapMissionIndex] = useState(0);
  const [mapSelectedMachineId, setMapSelectedMachineId] = useState<string | null>(null);
  const [mapFeedback, setMapFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const currentMapMission: MapClueMission = MAP_MISSIONS[mapMissionIndex];

  const handleMapSubmit = (machineId: string) => {
    setMapSelectedMachineId(machineId);
    if (machineId === currentMapMission.correctMachineId) {
      cosmicAudio.playDiscoveryChime();
      setMapFeedback({ isCorrect: true, message: currentMapMission.storyReveal });
      onUnlockBadge(currentMapMission.badgeReward);
    } else {
      cosmicAudio.playTelemetryPing(420, 0.2);
      setMapFeedback({ isCorrect: false, message: `Not quite! Hint: ${currentMapMission.hint}` });
    }
  };

  const handleNextMapMission = () => {
    setMapFeedback(null);
    setMapSelectedMachineId(null);
    if (mapMissionIndex < MAP_MISSIONS.length - 1) {
      setMapMissionIndex(mapMissionIndex + 1);
    } else {
      setMapMissionIndex(0);
    }
  };

  // --- GAME 2: Match the Machine States ---
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedMachineCard, setSelectedMachineCard] = useState<MatchPair | null>(null);
  const [selectedPurposeCard, setSelectedPurposeCard] = useState<MatchPair | null>(null);

  const handleMachineCardClick = (pair: MatchPair) => {
    if (matchedPairs.includes(pair.id)) return;
    cosmicAudio.playTelemetryPing(720, 0.08);
    setSelectedMachineCard(pair);

    if (selectedPurposeCard) {
      checkMatch(pair, selectedPurposeCard);
    }
  };

  const handlePurposeCardClick = (pair: MatchPair) => {
    if (matchedPairs.includes(pair.id)) return;
    cosmicAudio.playTelemetryPing(720, 0.08);
    setSelectedPurposeCard(pair);

    if (selectedMachineCard) {
      checkMatch(selectedMachineCard, pair);
    }
  };

  const checkMatch = (card1: MatchPair, card2: MatchPair) => {
    if (card1.id === card2.id) {
      cosmicAudio.playDiscoveryChime();
      const updated = [...matchedPairs, card1.id];
      setMatchedPairs(updated);
      setSelectedMachineCard(null);
      setSelectedPurposeCard(null);

      if (updated.length === MATCH_PAIRS.length) {
        onUnlockBadge('Master Matchmaker');
      }
    } else {
      cosmicAudio.playTelemetryPing(400, 0.2);
      setTimeout(() => {
        setSelectedMachineCard(null);
        setSelectedPurposeCard(null);
      }, 500);
    }
  };

  const handleResetMatchGame = () => {
    setMatchedPairs([]);
    setSelectedMachineCard(null);
    setSelectedPurposeCard(null);
  };

  // --- GAME 3: Timeline Sequence Builder States ---
  const [sequenceOrder, setSequenceOrder] = useState<TimelineStage[]>([
    MISSION_STAGES[2],
    MISSION_STAGES[0],
    MISSION_STAGES[4],
    MISSION_STAGES[1],
    MISSION_STAGES[3]
  ]);
  const [sequenceVerdict, setSequenceVerdict] = useState<boolean | null>(null);

  const moveStage = (index: number, direction: 'up' | 'down') => {
    cosmicAudio.playTelemetryPing(600, 0.05);
    const newOrder = [...sequenceOrder];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;
    setSequenceOrder(newOrder);
    setSequenceVerdict(null);
  };

  const testSequence = () => {
    const isCorrect = sequenceOrder.every((st, idx) => st.correctStep === idx + 1);
    if (isCorrect) {
      cosmicAudio.playDiscoveryChime();
      setSequenceVerdict(true);
      onUnlockBadge('Timeline Architect');
    } else {
      cosmicAudio.playTelemetryPing(440, 0.2);
      setSequenceVerdict(false);
    }
  };

  // --- GAME 4: Science Quiz States ---
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[quizIndex];

  const handleQuizAnswer = (optIndex: number) => {
    setSelectedQuizOption(optIndex);
    const isRight = optIndex === currentQuestion.correctIndex;
    if (isRight) {
      cosmicAudio.playTelemetryPing(940, 0.1);
    } else {
      cosmicAudio.playTelemetryPing(460, 0.15);
    }
  };

  const handleNextQuizQuestion = () => {
    if (selectedQuizOption === null) return;
    const nextAnswers = [...quizAnswers, selectedQuizOption];
    setQuizAnswers(nextAnswers);
    setSelectedQuizOption(null);

    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      // Finished
      setQuizFinished(true);
      const score = nextAnswers.reduce((acc, ans, idx) => {
        return ans === QUIZ_QUESTIONS[idx].correctIndex ? acc + 1 : acc;
      }, 0);
      onUpdateQuizScore(score);
      if (score >= 5) {
        cosmicAudio.playDiscoveryChime();
        onUnlockBadge('Quiz Scholar');
      }
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setQuizAnswers([]);
    setSelectedQuizOption(null);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Badges Callout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            <span>Interactive Academy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">
            Space Archaeologist Game Zone
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Become a certified Space Archaeologist! Complete training missions and collect artifact medals for your passport.
          </p>
        </div>

        <button
          onClick={onOpenPassport}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/40 text-amber-300 rounded-xl hover:bg-amber-500/20 transition-colors text-xs font-semibold self-start sm:self-auto cursor-pointer"
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>View Passport ({unlockedBadges.length} Medals)</span>
        </button>
      </div>

      {/* Game Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => {
            cosmicAudio.playTelemetryPing(720, 0.08);
            setActiveGame('map');
          }}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            activeGame === 'map'
              ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/40'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-slate-400">Game 1</div>
          <div className={`text-xs font-bold mt-0.5 ${activeGame === 'map' ? 'text-cyan-300' : 'text-slate-200'}`}>
            Find the Explorer
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Map search clues</div>
        </button>

        <button
          onClick={() => {
            cosmicAudio.playTelemetryPing(720, 0.08);
            setActiveGame('match');
          }}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            activeGame === 'match'
              ? 'bg-amber-500/10 border-amber-500/50 shadow-md ring-1 ring-amber-500/40'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-slate-400">Game 2</div>
          <div className={`text-xs font-bold mt-0.5 ${activeGame === 'match' ? 'text-amber-300' : 'text-slate-200'}`}>
            Match the Machine
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Science purpose pairs</div>
        </button>

        <button
          onClick={() => {
            cosmicAudio.playTelemetryPing(720, 0.08);
            setActiveGame('sequence');
          }}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            activeGame === 'sequence'
              ? 'bg-emerald-500/10 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/40'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-slate-400">Game 3</div>
          <div className={`text-xs font-bold mt-0.5 ${activeGame === 'sequence' ? 'text-emerald-300' : 'text-slate-200'}`}>
            Timeline Builder
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Order mission steps</div>
        </button>

        <button
          onClick={() => {
            cosmicAudio.playTelemetryPing(720, 0.08);
            setActiveGame('quiz');
          }}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            activeGame === 'quiz'
              ? 'bg-indigo-500/10 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/40'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-slate-400">Game 4</div>
          <div className={`text-xs font-bold mt-0.5 ${activeGame === 'quiz' ? 'text-indigo-300' : 'text-slate-200'}`}>
            Science Quiz
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Earn Archaeologist rank</div>
        </button>
      </div>

      {/* ===================== GAME 1: FIND THE FORGOTTEN EXPLORER ===================== */}
      {activeGame === 'map' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-cyan-400 uppercase">
                MISSION {mapMissionIndex + 1} OF {MAP_MISSIONS.length}: {currentMapMission.targetBody.toUpperCase()} RADAR
              </span>
            </div>
            <span className="text-xs font-mono text-amber-300">
              Reward: {currentMapMission.badgeReward}
            </span>
          </div>

          {/* Clue Box */}
          <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase">Mission Objective Clue:</div>
            <p className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
              “{currentMapMission.clue}”
            </p>
          </div>

          {/* Candidate Machine Options to Click */}
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase mb-3">
              Click the correct machine to identify the site:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MACHINES_DATA.filter(m => m.targetBody === currentMapMission.targetBody).map((machine) => {
                const isSelected = mapSelectedMachineId === machine.id;
                return (
                  <button
                    key={machine.id}
                    onClick={() => handleMapSubmit(machine.id)}
                    className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 ring-2 ring-cyan-400/30'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                      <img
                        src={machine.image}
                        alt={machine.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-100 truncate">{machine.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{machine.location}</div>
                      <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{machine.year}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Result Reveal */}
          {mapFeedback && (
            <div
              className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200 ${
                mapFeedback.isCorrect
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {mapFeedback.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-bold font-mono uppercase">
                    {mapFeedback.isCorrect ? 'Target Verified! Medal Unlocked!' : 'Incorrect Coordinates'}
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {mapFeedback.message}
                  </p>
                </div>
              </div>

              {mapFeedback.isCorrect && (
                <button
                  onClick={handleNextMapMission}
                  className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
                >
                  Next Target →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ===================== GAME 2: MATCH THE MACHINE ===================== */}
      {activeGame === 'match' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-amber-400 uppercase">
                MATCH HARDWARE TO SCIENTIFIC DISCOVERY
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">
                Matched: <span className="text-amber-400 font-bold">{matchedPairs.length}</span> / {MATCH_PAIRS.length}
              </span>
              <button
                onClick={handleResetMatchGame}
                className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg cursor-pointer"
                title="Reset game"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-300">
            Click a machine on the left, then click its scientific discovery on the right:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Machine Cards */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono text-slate-400 uppercase">1. Spacecraft Hardware</div>
              {MATCH_PAIRS.map((pair) => {
                const isMatched = matchedPairs.includes(pair.id);
                const isSelected = selectedMachineCard?.id === pair.id;

                return (
                  <button
                    key={pair.id}
                    onClick={() => handleMachineCardClick(pair)}
                    disabled={isMatched}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isMatched
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 opacity-60'
                        : isSelected
                        ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30'
                        : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-100">{pair.machineName}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{pair.hint}</div>
                    </div>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            {/* Right: Scientific Purpose Cards (Scrambled) */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono text-slate-400 uppercase">2. Scientific Contribution</div>
              {[...MATCH_PAIRS].reverse().map((pair) => {
                const isMatched = matchedPairs.includes(pair.id);
                const isSelected = selectedPurposeCard?.id === pair.id;

                return (
                  <button
                    key={pair.id}
                    onClick={() => handlePurposeCardClick(pair)}
                    disabled={isMatched}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isMatched
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 opacity-60'
                        : isSelected
                        ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30'
                        : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs text-slate-200 leading-snug">
                      {pair.sciencePurpose}
                    </div>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

          </div>

          {matchedPairs.length === MATCH_PAIRS.length && (
            <div className="p-4 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>All Pairs Matched! "Master Matchmaker" Medal Unlocked!</span>
              </div>
              <button
                onClick={onOpenPassport}
                className="text-xs underline font-semibold text-amber-200 hover:text-white cursor-pointer"
              >
                Inspect Passport
              </button>
            </div>
          )}
        </div>
      )}

      {/* ===================== GAME 3: MISSION TIMELINE BUILDER ===================== */}
      {activeGame === 'sequence' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Shuffle className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-emerald-400 uppercase">
                ARRANGE THE 5 PHASES OF A PLANETARY MISSION
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Reward: Timeline Architect
            </span>
          </div>

          <p className="text-xs text-slate-300">
            Use the arrow buttons to arrange the mission steps in proper chronological order from launch to monument:
          </p>

          <div className="space-y-3">
            {sequenceOrder.map((stage, idx) => (
              <div
                key={stage.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-mono font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">{stage.title}</div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{stage.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => moveStage(idx, 'up')}
                    disabled={idx === 0}
                    className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveStage(idx, 'down')}
                    disabled={idx === sequenceOrder.length - 1}
                    className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={testSequence}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-950/50"
            >
              Verify Mission Sequence
            </button>

            {sequenceVerdict !== null && (
              <div className="text-xs font-mono font-semibold">
                {sequenceVerdict ? (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Perfect Sequence! Mission Accomplished!
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Steps are out of order! Check flight phases.
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== GAME 4: SCIENCE QUIZ ===================== */}
      {activeGame === 'quiz' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6">
          
          {!quizFinished ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-mono text-indigo-400 uppercase">
                    QUESTION {quizIndex + 1} OF {QUIZ_QUESTIONS.length}: {currentQuestion.targetTopic}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Passing Score: 5 / 7
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                {currentQuestion.question}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedQuizOption === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      className={`p-4 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200 ring-2 ring-indigo-400/30'
                          : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span>{option}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {selectedQuizOption !== null && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-cyan-400 font-mono uppercase text-[11px]">
                    {selectedQuizOption === currentQuestion.correctIndex ? 'Correct!' : 'Scientific Insight:'}
                  </div>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}

              <div className="flex justify-end pt-3">
                <button
                  onClick={handleNextQuizQuestion}
                  disabled={selectedQuizOption === null}
                  className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>{quizIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Complete Quiz'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400 mx-auto">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-100">
                  Quiz Completed!
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  You scored {quizAnswers.filter((a, i) => a === QUIZ_QUESTIONS[i].correctIndex).length} out of {QUIZ_QUESTIONS.length} points!
                </p>
              </div>

              <div className="p-4 max-w-sm mx-auto rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                Official Certification Level: <span className="font-bold text-cyan-400">Junior Space Archaeologist</span>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleRestartQuiz}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Retry Quiz
                </button>
                <button
                  onClick={onOpenPassport}
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  Open Passport
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
