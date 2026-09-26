export interface TimelineEvent {
  year: number;
  dateStr: string;
  title: string;
  machineId?: string;
  targetBody: 'Moon' | 'Mars' | 'Deep Space';
  summary: string;
  scientificImpact: string;
  hardwareDetail: string;
  legacyStatus: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: 1969,
    dateStr: 'July 20, 1969',
    title: 'Apollo 11 Lands on the Sea of Tranquility',
    machineId: 'apollo11-descent',
    targetBody: 'Moon',
    summary: 'The Apollo 11 Lunar Module Eagle touches down on the Moon. Humans walk on another celestial body for the first time.',
    scientificImpact: 'Returned 21.5 kg of lunar rock and soil; deployed the Laser Ranging Retroreflector (LRRR) still measuring Moon orbit distance today.',
    hardwareDetail: 'Descent Stage left permanently at Tranquility Base as a launch pad for the crew ascent stage.',
    legacyStatus: 'Permanent artifact standing quietly in the lunar vacuum.'
  },
  {
    year: 1971,
    dateStr: 'July 31, 1971',
    title: 'First Electric Car on the Moon: Apollo 15 LRV',
    machineId: 'lunar-roving-vehicle',
    targetBody: 'Moon',
    summary: 'Astronauts drive the Lunar Roving Vehicle across Hadley Rille, multiplying scientific sample collection tenfold.',
    scientificImpact: 'Discovery of the 4.1-billion-year-old Genesis Rock, confirming magma ocean theories of early Moon formation.',
    hardwareDetail: 'Woven piano-wire tires, four independent 0.25-hp hub motors, Boeing/Delco navigation system.',
    legacyStatus: 'Parked east of the landing module, cameras still aimed at the lunar horizon.'
  },
  {
    year: 1977,
    dateStr: 'August & September 1977',
    title: 'Twin Voyagers Embark on the Grand Tour',
    machineId: 'voyager1',
    targetBody: 'Deep Space',
    summary: 'Voyager 1 and 2 launch from Cape Canaveral to exploit a rare once-every-175-years planetary alignment.',
    scientificImpact: 'Revolutionized understanding of gas giants, discovered active sulfur volcanoes on Io, and deep rings of Uranus and Neptune.',
    hardwareDetail: 'Equipped with the Golden Record, 3.7-meter high-gain parabolic reflector, and Radioisotope Thermoelectric Generators (RTGs).',
    legacyStatus: 'Continuing active scientific transmission from beyond the solar system.'
  },
  {
    year: 1997,
    dateStr: 'July 4, 1997',
    title: 'Sojourner: The First Wheels on Mars',
    machineId: 'sojourner',
    targetBody: 'Mars',
    summary: 'Mars Pathfinder lands via airbags and deploys Sojourner, an 11.5 kg microrover that proved mobile planetary geology.',
    scientificImpact: 'Spectroscopic confirmation that Ares Vallis was carved by catastrophic liquid water flash floods in ancient Martian history.',
    hardwareDetail: 'Rocker-bogie suspension system designed by JPL that became the blueprint for all future Mars rovers.',
    legacyStatus: 'Stationary on the Ares Vallis plains beside the Sagan Station.'
  },
  {
    year: 2004,
    dateStr: 'January 2004',
    title: 'Spirit and Opportunity Touch Down on Opposite Sides of Mars',
    machineId: 'opportunity',
    targetBody: 'Mars',
    summary: 'The twin Mars Exploration Rovers land in Gusev Crater and Meridiani Planum, initiating a decade-and-a-half search for water.',
    scientificImpact: 'Confirmed acidic and neutral groundwater in Mars’s ancient past through hematite blueberries and clay sulfate minerals.',
    hardwareDetail: 'Solar-powered rovers equipped with rock abrasion tools, microscopic imagers, and Mössbauer spectrometers.',
    legacyStatus: 'Resting in Gusev Crater (Spirit, 2010) and Endeavour Crater (Opportunity, 2018).'
  },
  {
    year: 2012,
    dateStr: 'August 25, 2012',
    title: 'Voyager 1 Crosses into Interstellar Space',
    machineId: 'voyager1',
    targetBody: 'Deep Space',
    summary: 'Voyager 1 officially departs the heliosphere, becoming humanity’s first physical object to enter the medium between stars.',
    scientificImpact: 'Direct measurements of undisturbed interstellar magnetic field lines and galactic cosmic ray flux.',
    hardwareDetail: 'Powered by steadily decaying plutonium-238, instruments meticulously managed for power conservation.',
    legacyStatus: 'Over 160 astronomical units away, whispering across 22 light-hours.'
  },
  {
    year: 2018,
    dateStr: 'November 26, 2018',
    title: 'InSight Lander Listens to the Martian Interior',
    machineId: 'insight',
    targetBody: 'Mars',
    summary: 'InSight lands smoothly on Elysium Planitia and deploys SEIS, the most sensitive seismometer ever sent to another world.',
    scientificImpact: 'Detected 1,319+ Marsquakes, mapped the thickness of the Martian crust, and measured a liquid core of ~1,830 km radius.',
    hardwareDetail: 'Ultra-sensitive seismometer protected by vacuum enclosure and aerodynamic wind/thermal shield dome.',
    legacyStatus: 'Mission concluded in December 2022 after dust coated solar arrays; resting silently in Elysium.'
  }
];
