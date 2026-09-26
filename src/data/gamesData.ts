export interface MapClueMission {
  id: string;
  targetBody: 'Moon' | 'Mars';
  clue: string;
  hint: string;
  correctMachineId: string;
  badgeReward: string;
  storyReveal: string;
}

export const MAP_MISSIONS: MapClueMission[] = [
  {
    id: 'mission-1',
    targetBody: 'Mars',
    clue: 'Locate the tiny 25-pound microwave-sized pioneer that proved six wheels can survive the rocky plains of Ares Vallis.',
    hint: 'Launched in 1996 with Mars Pathfinder and rolled down twin ramps on July 5, 1997.',
    correctMachineId: 'sojourner',
    badgeReward: 'Ares Vallis Scout',
    storyReveal: 'You found Sojourner! It tapped rocks Barnacle Bill and Yogi, showing Mars had giant floods in its ancient past.'
  },
  {
    id: 'mission-2',
    targetBody: 'Moon',
    clue: 'Find the permanent landing base where human astronauts first set foot on an extraterrestrial world in July 1969.',
    hint: 'Neil Armstrong reported: "Houston, Tranquility Base here. The Eagle has landed."',
    correctMachineId: 'apollo11-descent',
    badgeReward: 'Tranquility Base Guardian',
    storyReveal: 'You found Apollo 11’s Eagle Descent Stage! Its laser reflector is still targeted by observatories on Earth today.'
  },
  {
    id: 'mission-3',
    targetBody: 'Mars',
    clue: 'Locate the marathon rover that investigated Victoria and Endeavour craters and discovered microscopic hematite blueberries.',
    hint: 'Traveled over 45 kilometers on Meridiani Planum, operating for nearly 15 years!',
    correctMachineId: 'opportunity',
    badgeReward: 'Endurance Medal of Meridiani',
    storyReveal: 'You found Opportunity! Those hematite blueberries settled out of ancient liquid groundwater billions of years ago.'
  },
  {
    id: 'mission-4',
    targetBody: 'Moon',
    clue: 'Find the electric vehicle with piano-wire tires that drove astronauts near Hadley Rille to collect the Genesis Rock.',
    hint: 'Apollo 15 carried this first rover, allowing astronauts to explore kilometers beyond walking range.',
    correctMachineId: 'lunar-roving-vehicle',
    badgeReward: 'Lunar Driver Certificate',
    storyReveal: 'You found the Lunar Roving Vehicle! It still sits on Hadley plains, facing the sunrise with zero flat tires.'
  },
  {
    id: 'mission-5',
    targetBody: 'Mars',
    clue: 'Find the stationary scientific lander that placed a dome-shielded seismometer onto Elysium Planitia to listen for Marsquakes.',
    hint: 'Measured the Martian liquid core and detected over 1,300 tectonic and impact rumbles.',
    correctMachineId: 'insight',
    badgeReward: 'Seismic Detective',
    storyReveal: 'You found InSight! It proved Mars is alive with subtle tremors and mapped the planet’s internal molten core.'
  }
];

export interface MatchPair {
  id: string;
  machineName: string;
  sciencePurpose: string;
  hint: string;
}

export const MATCH_PAIRS: MatchPair[] = [
  {
    id: 'sojourner-match',
    machineName: 'Sojourner Rover',
    sciencePurpose: 'Discovered water-rounded flood rocks & proved wheeled planetary mobility',
    hint: 'First rover on Mars'
  },
  {
    id: 'oppy-match',
    machineName: 'Opportunity Rover',
    sciencePurpose: 'Discovered hematite blueberries proving ancient standing liquid water',
    hint: '45+ km marathon rover'
  },
  {
    id: 'apollo11-match',
    machineName: 'Apollo 11 Eagle Stage',
    sciencePurpose: 'Established lunar laser ranging reflector & first human surface base',
    hint: 'Sea of Tranquility'
  },
  {
    id: 'lrv-match',
    machineName: 'Lunar Roving Vehicle (LRV)',
    sciencePurpose: 'Retrieved 4.1-billion-year-old Genesis Rock proving lunar magma ocean',
    hint: 'Apollo 15 Moon Buggy'
  },
  {
    id: 'insight-match',
    machineName: 'InSight Lander',
    sciencePurpose: 'Detected 1,300+ Marsquakes & mapped internal molten core boundary',
    hint: 'Seismic dome station'
  },
  {
    id: 'voyager-match',
    machineName: 'Voyager 1 & 2',
    sciencePurpose: 'Entered interstellar space & mapped outer gas giants and heliopause',
    hint: 'Golden Record probes'
  }
];

export interface TimelineStage {
  id: string;
  title: string;
  description: string;
  correctStep: number;
}

export const MISSION_STAGES: TimelineStage[] = [
  {
    id: 'stage-launch',
    title: 'Launch & Escape Burn',
    description: 'A multi-stage rocket accelerates through Earth’s atmosphere and fires a Trans-Planetary Injection burn.',
    correctStep: 1
  },
  {
    id: 'stage-cruise',
    title: 'Interplanetary Cruise',
    description: 'The spacecraft navigates for months across millions of miles, firing trajectory trim thrusters and checking systems.',
    correctStep: 2
  },
  {
    id: 'stage-edl',
    title: 'Entry, Descent & Landing (EDL)',
    description: 'Heat shield endures thousands of degrees, supersonic parachutes unfurl, and airbags or sky cranes cushion touchdown.',
    correctStep: 3
  },
  {
    id: 'stage-science',
    title: 'Surface Exploration & Sampling',
    description: 'Robotic arms deploy spectrometers, drill into bedrock, and transmit discoveries back across millions of kilometers.',
    correctStep: 4
  },
  {
    id: 'stage-legacy',
    title: 'Enduring Monument & Scientific Legacy',
    description: 'Having completed its mission, the machine rests on the alien plains, preserved forever as a historic extraterrestrial monument.',
    correctStep: 5
  }
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  targetTopic: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which machine was the very first robotic rover to ever roll across Mars?',
    options: ['Curiosity', 'Sojourner', 'Opportunity', 'Perseverance'],
    correctIndex: 1,
    explanation: 'Sojourner landed with Mars Pathfinder on July 4, 1997, rolling onto Martian soil the next day!',
    targetTopic: 'Robotics'
  },
  {
    id: 'q2',
    question: 'What microscopic geological feature did rover Opportunity find that proved Mars once had liquid water?',
    options: ['Frozen polar crystals', 'Hematite "blueberries"', 'Volcanic obsidian shards', 'Fossilized coral'],
    correctIndex: 1,
    explanation: 'Opportunity found tiny spherical mineral nodules nicknamed "blueberries" that precipitated out of ancient acidic groundwater.',
    targetTopic: 'Water on Mars'
  },
  {
    id: 'q3',
    question: 'Why didn’t the Apollo Lunar Roving Vehicle use rubber inflatable tires?',
    options: [
      'Rubber would melt or freeze/shatter in the extreme vacuum of space',
      'Rubber was too heavy for the Saturn V',
      'The tires had to float on lunar lakes',
      'Astronauts wanted wooden wheels'
    ],
    correctIndex: 0,
    explanation: 'Rubber tires would easily puncture or become brittle and shatter in the lunar temperature extremes (-170°C to +120°C). Engineers used woven piano wire instead!',
    targetTopic: 'Lunar Geology'
  },
  {
    id: 'q4',
    question: 'What primary scientific phenomenon did the InSight lander study on Mars?',
    options: [
      'Alien plant growth',
      'Interior structure and Marsquakes',
      'Atmospheric cloud speeds',
      'Comet orbits'
    ],
    correctIndex: 1,
    explanation: 'InSight deployed the SEIS seismometer under a protective wind dome to detect over 1,300 marsquakes and measure the core of Mars.',
    targetTopic: 'Geology'
  },
  {
    id: 'q5',
    question: 'Which spacecraft is currently the farthest human-made object from Earth, traveling in interstellar space?',
    options: ['Hubble Space Telescope', 'Apollo 11', 'Voyager 1', 'New Horizons'],
    correctIndex: 2,
    explanation: 'Voyager 1 is over 24 billion kilometers (163 AU) from Earth and crossed into interstellar space in August 2012.',
    targetTopic: 'Deep Space'
  },
  {
    id: 'q6',
    question: 'What special item is mounted to the Voyagers for any extraterrestrial civilization that might find them?',
    options: ['A library of printed books', 'The Golden Record', 'A solar telescope', 'A container of Earth water'],
    correctIndex: 1,
    explanation: 'The 12-inch gold-plated copper Golden Record contains sounds of Earth, 115 photographs, music from diverse cultures, and greetings in 55 languages.',
    targetTopic: 'Communication'
  },
  {
    id: 'q7',
    question: 'How do scientists still measure the exact distance between Earth and the Moon with millimeter precision?',
    options: [
      'By pulling a very long cable',
      'By bouncing laser pulses off retroreflectors left by Apollo missions',
      'By estimating using telescope lenses',
      'By measuring gravity changes'
    ],
    correctIndex: 1,
    explanation: 'Laser ranging stations on Earth shoot focused laser pulses at corner-cube retroreflectors left on the Moon by Apollo 11, 14, and 15.',
    targetTopic: 'Lunar Science'
  }
];
