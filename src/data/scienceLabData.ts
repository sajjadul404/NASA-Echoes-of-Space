export interface ScienceTopic {
  id: string;
  title: string;
  category: string;
  targetBody: 'Mars' | 'Moon' | 'Deep Space' | 'General';
  keyQuestion: string;
  simpleAnswer: string;
  inDepthExplanation: string;
  keyEvidences: {
    title: string;
    description: string;
    discoveredBy: string;
  }[];
  studentExperiment: {
    type: 'spectrometer' | 'light-delay' | 'core-sample' | 'seismograph' | 'suspension';
    title: string;
    instructions: string;
  };
  whyItMatters: string;
}

export const SCIENCE_TOPICS: ScienceTopic[] = [
  {
    id: 'water-on-mars',
    title: 'Water on Mars: Oceans in the Dust',
    category: 'Astrobiology & Hydrology',
    targetBody: 'Mars',
    keyQuestion: 'How do scientists know Mars was once wet and watery?',
    simpleAnswer: 'Rovers studied rocks and minerals that can only form when liquid water is present, such as hematite berries, clays, and gypsum veins.',
    inDepthExplanation: 'Today Mars is a freezing desert, but 3.8 billion years ago it possessed rivers, lakes, and perhaps an ocean. When rover Opportunity ground into Martian bedrock, it discovered tiny sphere-shaped nodules made of hematite (nicknamed "blueberries"). On Earth, hematite spheres crystallize when mineral-rich groundwater percolates through porous sedimentary rock. Curiosity and Spirit also uncovered ancient lakebed mudstones and volcanic hot-spring silica.',
    keyEvidences: [
      {
        title: 'Hematite "Blueberries"',
        description: 'Microscopic mineral spheres that precipitate out of standing or circulating liquid water.',
        discoveredBy: 'Opportunity Rover (2004)'
      },
      {
        title: 'Silica Hot Spring Deposits',
        description: 'High-purity opal silica formed by hydrothermal steam vents, showing Mars once had geothermal springs like Yellowstone.',
        discoveredBy: 'Spirit Rover (2007)'
      },
      {
        title: 'River Delta Sediments',
        description: 'Layered riverbed fans in Jezero and Gale craters carrying rounded pebbles washed down by ancient Martian torrents.',
        discoveredBy: 'Curiosity & Perseverance'
      }
    ],
    studentExperiment: {
      type: 'spectrometer',
      title: 'Virtual Rock Spectrometer',
      instructions: 'Aim the rover’s Alpha Particle X-Ray Spectrometer at 4 Martian mineral samples to reveal their chemical signature and detect water-formed compounds.'
    },
    whyItMatters: 'Finding where liquid water lingered tells us where microbial life could have emerged, and where future human astronauts might extract water.'
  },
  {
    id: 'lunar-geology',
    title: 'Lunar Geology: The Magma Ocean & Moonquakes',
    category: 'Planetary Geology & Geophysics',
    targetBody: 'Moon',
    keyQuestion: 'How was the Moon formed, and does the ground ever shake there?',
    simpleAnswer: 'Apollo astronauts and seismometers revealed that the early Moon was covered in a deep ocean of molten rock (magma), and tidal gravity from Earth causes real moonquakes!',
    inDepthExplanation: 'When the Apollo 15 astronauts picked up the "Genesis Rock" (anorthosite), laboratory analysis on Earth dated it to 4.1 billion years old. Because light feldspar minerals float to the top of molten liquid while heavy iron sinks, this proved the infant Moon was once melted completely into a giant magma ocean. The ALSEP instruments left on the surface also measured deep moonquakes caused by Earth’s gravitational tug.',
    keyEvidences: [
      {
        title: 'The Genesis Rock (Anorthosite)',
        description: 'Plagioclase-rich rock showing early Moon crust crystallization from a molten magma ocean 4+ billion years ago.',
        discoveredBy: 'Apollo 15 Lunar Roving Vehicle Crew'
      },
      {
        title: 'Laser Distance Ranging',
        description: 'Reflective corner mirrors that prove the Moon is drifting away from Earth at a rate of 3.8 cm per year.',
        discoveredBy: 'Apollo 11 & 14 Retroreflectors'
      },
      {
        title: 'Deep Moonquakes',
        description: 'Seismic tremors up to magnitude 5 occurring 800 km below the lunar surface caused by Earth’s tidal pull.',
        discoveredBy: 'Apollo ALSEP Seismometers'
      }
    ],
    studentExperiment: {
      type: 'core-sample',
      title: 'Lunar Soil Stratigraphy Probe',
      instructions: 'Dig down through the lunar regolith to inspect micrometeorite glass, solar wind gas layers, and primordial anorthosite crust.'
    },
    whyItMatters: 'The Moon has no wind or rain, making its rocks a pristine time capsule of the early Solar System when Earth was just forming.'
  },
  {
    id: 'planetary-atmosphere',
    title: 'Planetary Atmospheres: Martian Thin Air & Dust Storms',
    category: 'Atmospheric Physics',
    targetBody: 'Mars',
    keyQuestion: 'Why is Mars so cold, and how can such thin air whip up giant global dust storms?',
    simpleAnswer: 'Mars has an atmosphere less than 1% as thick as Earth’s, made mostly of carbon dioxide, so it cannot hold heat. Yet low gravity lets dust stay aloft for months.',
    inDepthExplanation: 'Mars’s atmospheric surface pressure is only ~6 millibars (equivalent to 35 kilometers high in Earth’s stratosphere). Without a strong magnetic shield, the Sun’s solar wind stripped away the ancient atmosphere over billions of years. During Martian spring and summer, intense sunlight warms dust particles near the ground, sparking thermal updrafts that grow from swirling dust devils into planet-encircling storms that can dim the sun by 99%.',
    keyEvidences: [
      {
        title: 'Dust Devil Movie Sequences',
        description: 'First live videos of towering vortexes of spinning red sand vacuuming the Martian plains.',
        discoveredBy: 'Spirit and Opportunity Rovers'
      },
      {
        title: 'Atmospheric Pressure Oscillations',
        description: 'Seasonal carbon dioxide freezing into polar dry ice caps, causing the entire planet’s air pressure to drop by 25%.',
        discoveredBy: 'Viking, Pathfinder & InSight'
      },
      {
        title: 'Sound of Martian Wind',
        description: 'First acoustic recordings of low-frequency gusts whistling past lander sensors on another world.',
        discoveredBy: 'InSight Lander & Perseverance'
      }
    ],
    studentExperiment: {
      type: 'seismograph',
      title: 'InSight Seismic & Wind Tracker',
      instructions: 'Analyze real seismic signatures to differentiate between atmospheric wind noise, meteorite impacts, and deep Marsquakes.'
    },
    whyItMatters: 'Understanding atmospheric thinness and dust mechanics is vital for designing parachute retro-rockets and breathing systems for human crews.'
  },
  {
    id: 'space-communication',
    title: 'Interstellar Signals: The Deep Space Network',
    category: 'Radio Communications & Physics',
    targetBody: 'Deep Space',
    keyQuestion: 'How does NASA talk to spacecraft that are 24 billion kilometers away in interstellar space?',
    simpleAnswer: 'NASA uses giant 70-meter parabolic dish antennas around the world and ultra-sensitive cryogenic receivers to catch radio whispers with the power of a refrigerator light bulb.',
    inDepthExplanation: 'When Voyager 1 broadcasts from beyond our Solar System, its 23-watt transmitter signal weakens over 24 billion kilometers. By the time the radio wave arrives at Earth, its power is less than a billionth of a trillionth of a watt (0.000000000000000001 W)! The Deep Space Network (DSN) arrays 70-meter dish antennas in California, Spain, and Australia, and because radio signals travel at light speed, a round-trip command takes nearly 45 hours.',
    keyEvidences: [
      {
        title: 'Interstellar Crossing Signal',
        description: 'Density spike in ambient interstellar plasma recorded by Voyager 1’s plasma wave antenna in 2012.',
        discoveredBy: 'Voyager 1'
      },
      {
        title: 'Atomic Battery Power Decay',
        description: 'Radioisotope Thermoelectric Generators (RTGs) converting plutonium-238 heat into electricity for over 48 continuous years.',
        discoveredBy: 'Voyager 1 & 2'
      },
      {
        title: 'Pale Blue Dot Photograph',
        description: 'Narrow-angle camera frame transmitted line by line across 6 billion km showing Earth in a sunbeam.',
        discoveredBy: 'Voyager 1 (1990)'
      }
    ],
    studentExperiment: {
      type: 'light-delay',
      title: 'Cosmic Light-Delay Radio Simulator',
      instructions: 'Send a command ping to the Moon, Mars at closest/furthest approach, and Voyager in interstellar space, and observe the speed-of-light lag in real time.'
    },
    whyItMatters: 'Every image, telemetry heartbeat, and science reading from humanity’s robots depends on these razor-thin radio bridges spanning cosmic distances.'
  },
  {
    id: 'robotic-exploration',
    title: 'Robotic Engineering: Surviving Extraterrestrial Terrain',
    category: 'Space Robotics & Autonomy',
    targetBody: 'General',
    keyQuestion: 'Why don’t Mars rovers tip over or get flat tires on sharp rocks?',
    simpleAnswer: 'Engineers invented the "Rocker-Bogie" suspension system, which has no springs and allows all six wheels to touch uneven ground even when climbing rocks taller than the wheel!',
    inDepthExplanation: 'Ordinary cars use springs that can bounce or cause one wheel to lose contact. The Rocker-Bogie system connects two sides of a rover through a differential rocker arm. When one wheel goes over a boulder, the bogie pivots, transferring the weight to the other five wheels. Combined with cleated aluminum or woven wire wheels, rovers maintain traction across soft sands and jagged volcanic shards without needing rubber tires that would freeze and crack in deep space.',
    keyEvidences: [
      {
        title: 'First Rocker-Bogie Test',
        description: 'Sojourner rover climbed over rocks twice its wheel diameter without tipping during the 1997 Pathfinder mission.',
        discoveredBy: 'Sojourner Microrover'
      },
      {
        title: 'Piano-Wire Spring Wheels',
        description: 'Apollo 15 Lunar Roving Vehicle drove 27 km across lunar dust without a single puncture using woven steel/zinc wire mesh.',
        discoveredBy: 'Boeing & GM Lunar Rover Team'
      },
      {
        title: 'Autonomous Hazard Avoidance',
        description: 'Stereoscopic hazard cameras that calculate safe paths without waiting for human commands from Earth.',
        discoveredBy: 'Spirit, Opportunity & Curiosity'
      }
    ],
    studentExperiment: {
      type: 'suspension',
      title: 'Rocker-Bogie Terrain Climber',
      instructions: 'Drive a virtual 6-wheel rover over varying boulder heights and observe how the differential rocker pivots to maintain equal wheel ground pressure.'
    },
    whyItMatters: 'Designing self-reliant, durable robots is the only way humans can explore places too extreme, too cold, or too radioactive for biological bodies.'
  }
];
