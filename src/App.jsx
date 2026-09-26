/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { PassportModal } from "./components/PassportModal";
import { HelpGuideModal } from "./components/HelpGuideModal";
import { MobileBottomNav } from "./components/MobileBottomNav";
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

  // Modals
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Gamification & Badges
  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    try {
      const saved = localStorage.getItem("echoes_badges");
      return saved ? JSON.parse(saved) : ["Pathfinder Pioneer"];
    } catch {
      return ["Pathfinder Pioneer"];
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
      return saved ? JSON.parse(saved) : ["sojourner"];
    } catch {
      return ["sojourner"];
    }
  });

  const [recentBadgeToast, setRecentBadgeToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("echoes_badges", JSON.stringify(unlockedBadges));
    } catch {}
  }, [unlockedBadges]);

  useEffect(() => {
    try {
      localStorage.setItem("echoes_quiz_score", String(quizScore));
    } catch {}
  }, [quizScore]);

  useEffect(() => {
    try {
      localStorage.setItem("echoes_visited", JSON.stringify(visitedMachines));
    } catch {}
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
    setUnlockedBadges(["Pathfinder Pioneer"]);
    setQuizScore(0);
    setVisitedMachines(["sojourner"]);
    try {
      localStorage.removeItem("echoes_badges");
      localStorage.removeItem("echoes_quiz_score");
      localStorage.removeItem("echoes_visited");
    } catch {}
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

  return (
    <div className="min-h-screen flex flex-col bg-[#07090E] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        earnedBadgesCount={unlockedBadges.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 lg:pb-0">
        {currentPage === "home" && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectMachine={handleSelectMachine}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        )}

        {currentPage === "explore" && (
          <ExplorePage
            initialFilter={exploreFilter}
            onSelectMachine={handleSelectMachine}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "detail" && (
          <DetailPage
            machine={selectedMachine}
            onBack={() => handleNavigate("explore")}
            onNavigate={handleNavigate}
            onMarkVisited={handleMarkVisited}
          />
        )}

        {currentPage === "story" && (
          <StoryModePage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "science" && (
          <ScienceLabPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "timeline" && (
          <TimelinePage
            onNavigate={handleNavigate}
            onSelectMachineId={(id) => {
              const m = MACHINES_DATA.find((x) => x.id === id);
              if (m) setSelectedMachine(m);
            }}
          />
        )}

        {currentPage === "games" && (
          <GameZonePage
            unlockedBadges={unlockedBadges}
            onUnlockBadge={handleUnlockBadge}
            onUpdateQuizScore={(score) => setQuizScore(score)}
            onOpenPassport={() => setIsPassportOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "about" && (
          <AboutPage
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Easy for kids to browse with thumb) */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenPassport={() => setIsPassportOpen(true)}
        earnedBadgesCount={unlockedBadges.length}
      />

      {/* Quick Visual 1-Minute Guide Modal */}
      <HelpGuideModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Space Archaeologist Passport Modal */}
      <PassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        unlockedBadges={unlockedBadges}
        quizScore={quizScore}
        visitedMachines={visitedMachines}
        onResetProgress={handleResetProgress}
      />

      {/* Badge Unlock Celebration Toast */}
      {recentBadgeToast && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 p-4 rounded-2xl bg-[#0F172A] border border-amber-400 shadow-2xl flex items-center gap-3 animate-bounce-soft max-w-sm">
          <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-2xl shrink-0">
            🏆
          </div>
          <div>
            <div className="text-[11px] font-black uppercase text-amber-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>SPACE MEDAL UNLOCKED!</span>
            </div>
            <div className="text-sm font-black text-white">{recentBadgeToast}</div>
            <div className="text-[11px] text-slate-300">
              Added to your Space Passport!
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
