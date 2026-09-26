import { Compass, ShieldCheck, Database } from "lucide-react";
export const AboutPage = ({ onNavigate }) => {
  return <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {
    /* Header */
  }
      <div className="border-b border-slate-800 pb-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Curatorial Manifesto</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          About Echoes of Space
        </h1>
        <p className="text-sm text-cyan-300 mt-2 italic max-w-xl mx-auto">
          “Every machine has a story. Every discovery has a legacy.”
        </p>
      </div>

      {
    /* Mission Statement */
  }
      <section className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
          Our Project Goal & Audience
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
          A Living Digital Museum for School-Age Explorers
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Echoes of Space was created to bridge high-level aerospace engineering and child-accessible storytelling. When space agencies talk about missions, the technical jargon of launch delta-v, entry decelerations, and spectrometer angstroms can feel distant.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Our platform reframes these machines as heroic characters with voices, journeys, and immortal resting sites. By giving each rover, descent stage, and interstellar probe its own first-person narrative, we inspire students to explore STEM, planetary geology, and robotics through the lens of compassion, curiosity, and preservation.
        </p>
      </section>

      {
    /* NASA Open Data Architecture */
  }
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
          <Database className="w-4 h-4" />
          <span>NASA Open Data & API Architecture</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
          Hybrid Data Pipeline
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          NASA’s open science initiative provides the empirical backbone of our museum. We combine NASA public APIs with a custom curated educational schema:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
              <span>NASA Image and Video Library API</span>
              <span className="text-[10px] font-mono text-slate-500">images.nasa.gov</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamically queries historical mission archives, Apollo surface photographs, and rover telemetry visual galleries directly on each machine’s detail page.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
              <span>Astronomy Picture of the Day (APOD)</span>
              <span className="text-[10px] font-mono text-slate-500">api.nasa.gov</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Supplies real-time daily astronomical context on our home screen, grounding historical exploration in ongoing cosmos discovery.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
              <span>Mars Rover Imagery & PDS</span>
              <span className="text-[10px] font-mono text-slate-500">Planetary Data System</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides raw surface panoramas, Pancam spectral calibration, and Rocker-Bogie traverse telemetry for Martian sites.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
              <span>Curated Educational JSON Dataset</span>
              <span className="text-[10px] font-mono text-slate-500">In-App Engine</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standardizes simplified first-person storytelling, child-friendly fun facts, coordinates, current status labels, and NGSS curriculum questions.
            </p>
          </div>

        </div>
      </section>

      {
    /* Planetary Heritage & Preservation Ethics */
  }
      <section className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/20 to-slate-900 border border-cyan-500/30 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
          <ShieldCheck className="w-4 h-4" />
          <span>SPACE ARCHAEOLOGY ETHICS</span>
        </div>
        <h3 className="text-lg font-bold text-slate-100">
          Protecting Extraterrestrial Cultural Heritage
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Under NASA guidelines and international space archaeology recommendations (such as the For All Moonkind initiative), Apollo landing sites and rover gravesites represent the first shared cultural heritage of humanity off Earth. When future astronauts return to Tranquility Base or Ares Vallis, these sites will be preserved as historic monuments.
        </p>
      </section>

      {
    /* Official Attribution Statement */
  }
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center text-xs text-slate-400 font-mono space-y-1">
        <p className="text-slate-300">
          “Built using NASA open data and educational storytelling principles.”
        </p>
        <p className="text-[11px] text-slate-500">
          Data, imagery, and mission information courtesy of NASA, Jet Propulsion Laboratory (JPL-Caltech), and the NASA Planetary Data System.
        </p>
      </div>

      {
    /* Back to Exploration CTA */
  }
      <div className="flex justify-center gap-4 pt-4">
        <button
    onClick={() => onNavigate("home")}
    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
  >
          Return to Home
        </button>
        <button
    onClick={() => onNavigate("explore")}
    className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
  >
          Launch Planetary Explorer
        </button>
      </div>

    </div>;
};
