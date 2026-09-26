import React from "react";

export const AnimatedSpaceHero = () => {
  // Pre-calculated star coordinates to keep rendering deterministic and performant
  const stars = [
    { top: "8%", left: "12%", size: 3, delay: "0.2s", color: "bg-cyan-300" },
    { top: "15%", left: "28%", size: 2, delay: "1.4s", color: "bg-white" },
    { top: "6%", left: "55%", size: 2.5, delay: "0.8s", color: "bg-amber-200" },
    { top: "18%", left: "75%", size: 3, delay: "2.1s", color: "bg-cyan-200" },
    { top: "12%", left: "88%", size: 2, delay: "1.0s", color: "bg-white" },
    { top: "28%", left: "8%", size: 2, delay: "2.5s", color: "bg-amber-300" },
    { top: "35%", left: "22%", size: 1.5, delay: "0.5s", color: "bg-white" },
    { top: "32%", left: "85%", size: 2.5, delay: "1.7s", color: "bg-cyan-300" },
    { top: "45%", left: "5%", size: 3, delay: "0.9s", color: "bg-white" },
    { top: "52%", left: "15%", size: 2, delay: "2.3s", color: "bg-cyan-400" },
    { top: "58%", left: "92%", size: 2, delay: "0.4s", color: "bg-amber-200" },
    { top: "65%", left: "80%", size: 3, delay: "1.8s", color: "bg-white" },
    { top: "72%", left: "10%", size: 2.5, delay: "1.2s", color: "bg-cyan-200" },
    { top: "80%", left: "25%", size: 2, delay: "0.7s", color: "bg-white" },
    { top: "75%", left: "70%", size: 2, delay: "2.0s", color: "bg-amber-300" },
    { top: "88%", left: "85%", size: 3, delay: "1.5s", color: "bg-cyan-300" },
    { top: "22%", left: "45%", size: 2, delay: "2.8s", color: "bg-white" },
    { top: "78%", left: "48%", size: 2.5, delay: "1.1s", color: "bg-cyan-200" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      
      {/* 1. Nebula Atmospheric Glow Clouds */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute top-10 -right-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2.5s" }} />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-700/10 rounded-full blur-3xl" />

      {/* 2. Shooting Stars (Meteors) Streaking Across the Sky */}
      {/* Meteor 1 (Top Right to Center) */}
      <div 
        className="absolute top-[8%] right-[15%] w-32 h-[2px] bg-gradient-to-l from-transparent via-cyan-300 to-white shadow-[0_0_8px_#38bdf8] shooting-star-1 opacity-0"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] absolute left-0 -top-[2px]" />
      </div>

      {/* Meteor 2 (Delayed top center) */}
      <div 
        className="absolute top-[20%] right-[35%] w-40 h-[2px] bg-gradient-to-l from-transparent via-amber-200 to-white shadow-[0_0_8px_#fde68a] shooting-star-2 opacity-0"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] absolute left-0 -top-[2px]" />
      </div>

      {/* Meteor 3 (Delayed lower right) */}
      <div 
        className="absolute top-[35%] right-[8%] w-28 h-[2px] bg-gradient-to-l from-transparent via-sky-300 to-white shadow-[0_0_8px_#38bdf8] shooting-star-3 opacity-0"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] absolute left-0 -top-[2px]" />
      </div>

      {/* 3. Twinkling Stars */}
      {stars.map((star, idx) => (
        <div
          key={idx}
          className={`absolute rounded-full ${star.color} animate-twinkle shadow-[0_0_6px_rgba(255,255,255,0.7)]`}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
          }}
        />
      ))}

      {/* 4. Cute Floating Mini Astronaut (Top Right) */}
      <div 
        className="absolute top-12 right-6 sm:top-14 sm:right-16 md:right-28 animate-float opacity-85 hover:opacity-100 transition-opacity"
        title="Spacewalk Astronaut"
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16">
          {/* Astronaut Helmet & Suit SVG */}
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(56,189,248,0.4)]">
            {/* Safety Tether Line */}
            <path d="M12 48 Q 2 54 -6 68" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
            
            {/* Backpack / Life Support */}
            <rect x="18" y="24" width="28" height="24" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="24" cy="30" r="2" fill="#ef4444" className="animate-ping" />
            <circle cx="24" cy="30" r="1.5" fill="#ef4444" />
            <circle cx="40" cy="30" r="1.5" fill="#22c55e" />

            {/* Body */}
            <rect x="22" y="26" width="20" height="22" rx="5" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Astronaut Helmet */}
            <circle cx="32" cy="18" r="12" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Golden Reflective Visor */}
            <ellipse cx="32" cy="18" rx="8" ry="6" fill="url(#visorGradient)" stroke="#f59e0b" strokeWidth="1" />
            
            {/* Visor Glint / Reflection */}
            <path d="M28 15 Q 32 14 34 16" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

            {/* Arms Floating */}
            <path d="M22 28 Q 14 30 16 38" stroke="#f1f5f9" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="16" cy="38" r="2.5" fill="#94a3b8" />
            <path d="M42 28 Q 50 24 52 30" stroke="#f1f5f9" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="52" cy="30" r="2.5" fill="#94a3b8" />

            {/* Legs */}
            <path d="M26 48 L 24 56" stroke="#f1f5f9" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="20" y="55" width="6" height="3" rx="1.5" fill="#64748b" />
            <path d="M38 48 L 40 56" stroke="#f1f5f9" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="38" y="55" width="6" height="3" rx="1.5" fill="#64748b" />

            <defs>
              <linearGradient id="visorGradient" x1="24" y1="12" x2="40" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbbf24" />
                <stop offset="1" stopColor="#d97706" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 5. Floating Space Satellite Probe (Top Left) */}
      <div 
        className="absolute top-14 left-6 sm:top-20 sm:left-14 md:left-24 animate-float-delayed opacity-80 hover:opacity-100 transition-opacity"
        title="Orbital Space Probe"
      >
        <div className="relative w-16 h-12">
          <svg viewBox="0 0 64 48" fill="none" className="w-full h-full filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.3)]">
            {/* Left Solar Panel */}
            <rect x="4" y="16" width="18" height="16" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
            <line x1="10" y1="16" x2="10" y2="32" stroke="#bae6fd" strokeWidth="0.8" opacity="0.7" />
            <line x1="16" y1="16" x2="16" y2="32" stroke="#bae6fd" strokeWidth="0.8" opacity="0.7" />
            <line x1="4" y1="24" x2="22" y2="24" stroke="#bae6fd" strokeWidth="0.8" opacity="0.7" />
            
            {/* Connector arm left */}
            <line x1="22" y1="24" x2="26" y2="24" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Central Satellite Body */}
            <rect x="26" y="18" width="12" height="12" rx="3" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.2" />
            
            {/* Antenna Dish */}
            <path d="M32 18 L 32 10" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M28 10 Q 32 6 36 10" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
            {/* Blinking Signal Beacon */}
            <circle cx="32" cy="7" r="2" fill="#22c55e" className="animate-ping" />
            <circle cx="32" cy="7" r="1.5" fill="#22c55e" />

            {/* Connector arm right */}
            <line x1="38" y1="24" x2="42" y2="24" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Right Solar Panel */}
            <rect x="42" y="16" width="18" height="16" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
            <line x1="48" y1="16" x2="48" y2="32" stroke="#bae6fd" strokeWidth="0.8" opacity="0.7" />
            <line x1="54" y1="16" x2="54" y2="32" stroke="#bae6fd" strokeWidth="0.8" opacity="0.7" />
            <line x1="42" y1="24" x2="60" y2="24" stroke="#bae6fd" strokeWidth="0.8" opacity="0.7" />
          </svg>
        </div>
      </div>

      {/* 6. Distant Ringed Planet (Far Right Middle) */}
      <div 
        className="absolute top-1/2 -right-8 sm:right-4 w-20 h-20 sm:w-24 sm:h-24 opacity-60 pointer-events-none"
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* Back of ring */}
          <ellipse cx="50" cy="50" rx="44" ry="14" stroke="#f59e0b" strokeWidth="2.5" opacity="0.35" transform="rotate(-25 50 50)" />
          <ellipse cx="50" cy="50" rx="38" ry="11" stroke="#38bdf8" strokeWidth="1.5" opacity="0.4" transform="rotate(-25 50 50)" />
          
          {/* Planet Sphere */}
          <circle cx="50" cy="50" r="20" fill="url(#planetGrad)" />
          <circle cx="50" cy="50" r="20" fill="url(#planetShadow)" />

          {/* Front of ring */}
          <path d="M 12 66 Q 50 82 88 34" stroke="#f59e0b" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
          <path d="M 17 64 Q 50 78 83 36" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />

          <defs>
            <linearGradient id="planetGrad" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f59e0b" />
              <stop offset="0.5" stopColor="#ea580c" />
              <stop offset="1" stopColor="#431407" />
            </linearGradient>
            <radialGradient id="planetShadow" cx="40%" cy="40%" r="60%">
              <stop offset="50%" stopColor="transparent" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.75" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* 7. Tiny Rotating Space Rock / Asteroid */}
      <div className="absolute bottom-12 left-10 sm:left-24 w-6 h-6 opacity-40 animate-spin-slow">
        <svg viewBox="0 0 24 24" fill="#475569" stroke="#64748b" strokeWidth="1">
          <polygon points="12,2 19,7 22,15 17,21 7,22 2,15 4,7" />
          <circle cx="9" cy="11" r="1.5" fill="#334155" />
          <circle cx="15" cy="14" r="1" fill="#334155" />
        </svg>
      </div>

    </div>
  );
};
