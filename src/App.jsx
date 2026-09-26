/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { PassportModal } from "./components/PassportModal";
import { HomePage } from "./pages/HomePage";
import { ExplorePage } from "./pages/ExplorePage";
import { DetailPage } from "./pages/DetailPage";
import { StoryModePage } from "./pages/StoryModePage";
import { ScienceLabPage } from "./pages/ScienceLabPage";
import { TimelinePage } from "./pages/TimelinePage";
import { GameZonePage } from "./pages/GameZonePage";
import { AboutPage } from "./pages/AboutPage";
import { MACHINES_DATA } from "./data/machinesData";
import { Award, CheckCircle2 } from "lucide-react";
import { cosmicAudio } from "./utils/audioNarration";
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedMachine, setSelectedMachine] = useState(MACHINES_DATA[0]);
  const [exploreFilter, setExploreFilter] = useState("All");
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    try {
      const saved = localStorage.getItem("echoes_badges");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [quizScore, setQuizScore] = useState(() => {
    try {
      const saved = localStorage.getItem("echoes_quiz_score");
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });
  const [visitedMachines, setVisitedMachines] = useState(() => {
    try {
      const saved = localStorage.getItem("echoes_visited");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [recentBadgeToast, setRecentBadgeToast] = useState(null);
  useEffect(() => {
    try {
      localStorage.setItem("echoes_badges", JSON.stringify(unlockedBadges));
    } catch {
    }
  }, [unlockedBadges]);
  useEffect(() => {
    try {
      localStorage.setItem("echoes_quiz_score", String(quizScore));
    } catch {
    }
  }, [quizScore]);
  useEffect(() => {
    try {
      localStorage.setItem("echoes_visited", JSON.stringify(visitedMachines));
    } catch {
    }
  }, [visitedMachines]);
  const handleUnlockBadge = (badgeName) => {
    if (!unlockedBadges.includes(badgeName)) {
      const updated = [...unlockedBadges, badgeName];
      setUnlockedBadges(updated);
      setRecentBadgeToast(badgeName);
      cosmicAudio.playDiscoveryChime();
      setTimeout(() => {
        setRecentBadgeToast(null);
      }, 4500);
    }
  };
  const handleMarkVisited = (machineId) => {
    if (!visitedMachines.includes(machineId)) {
      setVisitedMachines((prev) => [...prev, machineId]);
    }
  };
  const handleResetProgress = () => {
    setUnlockedBadges([]);
    setQuizScore(0);
    setVisitedMachines([]);
    try {
      localStorage.removeItem("echoes_badges");
      localStorage.removeItem("echoes_quiz_score");
      localStorage.removeItem("echoes_visited");
    } catch {
    }
    setIsPassportOpen(false);
  };
  const handleNavigate = (page, machineId, filter) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (filter && (filter === "Moon" || filter === "Mars" || filter === "Deep Space")) {
      setExploreFilter(filter);
    } else if (page === "explore" && !filter) {
      setExploreFilter("All");
    }
    if (machineId) {
      const m = MACHINES_DATA.find((x) => x.id === machineId);
      if (m) setSelectedMachine(m);
    }
    setCurrentPage(page);
  };
  const handleSelectMachine = (machine) => {
    setSelectedMachine(machine);
    handleMarkVisited(machine.id);
    handleNavigate("detail", machine.id);
  };
  return <div className="min-h-screen flex flex-col bg-[#07090E] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {
    /* Navbar with 3-Zone contract */
  }
      <Navbar
    currentPage={currentPage}
    onNavigate={handleNavigate}
    onOpenPassport={() => setIsPassportOpen(true)}
    earnedBadgesCount={unlockedBadges.length}
  />

      {
    /* Main Content Area */
  }
      <main className="flex-1">
        {currentPage === "home" && <HomePage
    onNavigate={handleNavigate}
    onSelectMachine={handleSelectMachine}
  />}

        {currentPage === "explore" && <ExplorePage
    initialFilter={exploreFilter}
    onSelectMachine={handleSelectMachine}
    onNavigate={handleNavigate}
  />}

        {currentPage === "detail" && <DetailPage
    machine={selectedMachine}
    onBack={() => handleNavigate("explore")}
    onNavigate={handleNavigate}
    onMarkVisited={handleMarkVisited}
  />}

        {currentPage === "story" && <StoryModePage
    onNavigate={handleNavigate}
  />}

        {currentPage === "science" && <ScienceLabPage
    onNavigate={handleNavigate}
  />}

        {currentPage === "timeline" && <TimelinePage
    onNavigate={handleNavigate}
    onSelectMachineId={(id) => {
      const m = MACHINES_DATA.find((x) => x.id === id);
      if (m) setSelectedMachine(m);
    }}
  />}

        {currentPage === "games" && <GameZonePage
    unlockedBadges={unlockedBadges}
    onUnlockBadge={handleUnlockBadge}
    onUpdateQuizScore={(score) => setQuizScore(score)}
    onOpenPassport={() => setIsPassportOpen(true)}
    onNavigate={handleNavigate}
  />}

        {currentPage === "about" && <AboutPage
    onNavigate={handleNavigate}
  />}
      </main>

      {
    /* Space Archaeologist Passport Modal */
  }
      <PassportModal
    isOpen={isPassportOpen}
    onClose={() => setIsPassportOpen(false)}
    unlockedBadges={unlockedBadges}
    quizScore={quizScore}
    visitedMachines={visitedMachines}
    onResetProgress={handleResetProgress}
  />

      {
    /* Badge Unlock Celebration Toast */
  }
      {recentBadgeToast && <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#0F172A] border border-amber-500/50 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-amber-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ARTIFACT MEDAL EARNED!</span>
            </div>
            <div className="text-sm font-bold text-slate-100">{recentBadgeToast}</div>
            <div className="text-[11px] text-slate-400">Added to your Space Passport</div>
          </div>
        </div>}

      {
    /* Footer */
  }
      <Footer onNavigate={handleNavigate} />

    </div>;
}
