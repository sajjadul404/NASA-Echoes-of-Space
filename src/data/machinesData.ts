export interface Machine {
  id: string;
  name: string;
  mission: string;
  location: string;
  targetBody: 'Moon' | 'Mars' | 'Deep Space';
  year: number;
  status: 'resting' | 'inactive' | 'active' | 'still traveling';
  type: string;
  summary: string;
  whoAmI: string;
  myMission: {
    launchDate: string;
    arrivalDate: string;
    destination: string;
    objective: string;
  };
  whatIDiscovered: string[];
  whereAmINow: string;
  funFact: string;
  firstPersonStory: string;
  coordinates: {
    lat?: number;
    lng?: number;
    distanceAU?: number;
  };
  image: string;
  badge: string;
  scienceContribution: string;
  scienceCategory: 'water' | 'geology' | 'atmosphere' | 'communication' | 'robotics';
}

export const MACHINES_DATA: Machine[] = [
  {
    id: 'sojourner',
    name: 'Sojourner',
    mission: 'Mars Pathfinder',
    location: 'Ares Vallis, Mars',
    targetBody: 'Mars',
    year: 1997,
    status: 'resting',
    type: 'Microrover',
    summary: 'The very first robotic rover to roll across the surface of Mars.',
    whoAmI: 'I am Sojourner, named after civil rights champion Sojourner Truth. I proved that wheeled robots can explore another planet.',
    myMission: {
      launchDate: 'December 4, 1996',
      arrivalDate: 'July 4, 1997',
      destination: 'Ares Vallis flood plain, Mars',
      objective: 'Demonstrate roving mobility on Mars and analyze Martian rocks with an alpha proton X-ray spectrometer.'
    },
    whatIDiscovered: [
      'Discovered rounded rocks like "Yogi" and "Barnacle Bill", showing signs of ancient catastrophic water floods.',
      'Measured soil magnetic properties, proving Martian dust contains magnetic iron oxides.',
      'Collected atmospheric data that revealed sharp temperature swings between the ground and just one meter high.'
    ],
    whereAmINow: 'Resting quietly on the red plains of Ares Vallis near the Carl Sagan Memorial Station, preserved in the dry Martian air.',
    funFact: 'I was only the size of a microwave oven (11.5 kg / 25 lbs) and moved at a maximum speed of 1 centimeter per second!',
    firstPersonStory: 'Hello Explorer! I am Sojourner. When I rolled off my lander ramps on July 5, 1997, humans had never driven wheels on Mars before. For 83 days, I tapped rocks, survived icy nights, and sent back 550 pictures. I showed humanity that Mars was once wet, dynamic, and full of wonder.',
    coordinates: { lat: 19.13, lng: -33.22 },
    image: '/src/assets/images/sojourner_mars_rover_1790365426762.jpg',
    badge: 'Pioneer of Wheels',
    scienceContribution: 'Proved Martian soil is silica-rich and revealed signs of ancient catastrophic flooding on Mars.',
    scienceCategory: 'geology'
  },
  {
    id: 'opportunity',
    name: 'Opportunity (Oppy)',
    mission: 'Mars Exploration Rover (MER-B)',
    location: 'Endeavour Crater, Mars',
    targetBody: 'Mars',
    year: 2004,
    status: 'resting',
    type: 'Planetary Rover',
    summary: 'The record-breaking rover that confirmed Mars once had liquid, drinkable water.',
    whoAmI: 'I am Opportunity. Designed for a 90-day mission, I kept driving for nearly 15 years and covered over 45 kilometers.',
    myMission: {
      launchDate: 'July 7, 2003',
      arrivalDate: 'January 25, 2004',
      destination: 'Meridiani Planum, Mars',
      objective: 'Search for geological clues of past water activity and determine if Mars once supported habitable conditions.'
    },
    whatIDiscovered: [
      'Discovered microscopic hematite spherules nicknamed "blueberries" that formed in acidic groundwater.',
      'Found sulfate salts and clay minerals at Victoria and Endeavour craters, confirming ancient fresh water.',
      'Traveled 45.16 kilometers (28.06 miles), setting the off-world driving record for any spacecraft.'
    ],
    whereAmINow: 'Resting on the slopes of Perseverance Valley along the rim of Endeavour Crater after a historic global dust storm in 2018.',
    funFact: 'My final transmissions were translated by science writer Jacob Margolis as: "My battery is low and it is getting dark."',
    firstPersonStory: 'Greetings, Earthling! I bounced down inside Eagle Crater in 2004 inside giant airbags. What was supposed to be a three-month adventure became a fifteen-year odyssey across red sand dunes and giant craters. Whenever Martian winds blew dust off my solar panels, my team celebrated "cleaning events" that gave me new life!',
    coordinates: { lat: -2.28, lng: 354.47 },
    image: '/src/assets/images/opportunity_mars_crater_1790365458156.jpg',
    badge: 'Marathon Explorer',
    scienceContribution: 'First definitive proof that liquid groundwater once flowed across the surface of Mars.',
    scienceCategory: 'water'
  },
  {
    id: 'apollo11-descent',
    name: 'Apollo 11 Lunar Module Descent Stage',
    mission: 'Apollo 11',
    location: 'Sea of Tranquility, Moon',
    targetBody: 'Moon',
    year: 1969,
    status: 'resting',
    type: 'Lander Descent Stage',
    summary: 'The bottom half of the "Eagle" spacecraft that carried the first humans to land on the Moon.',
    whoAmI: 'I am the descent stage of the Lunar Module Eagle. I served as the launch pad when Neil Armstrong and Buzz Aldrin flew home.',
    myMission: {
      launchDate: 'July 16, 1969',
      arrivalDate: 'July 20, 1969',
      destination: 'Mare Tranquillitatis (Sea of Tranquility), Moon',
      objective: 'Safely brake from lunar orbit and perform the first human soft landing on an extraterrestrial world.'
    },
    whatIDiscovered: [
      'Proved humans could safely navigate lunar terrain, touchdown without tipping over, and blast off again.',
      'Left behind a retroreflector experiment that scientists still shoot lasers at from Earth to measure Moon distance to millimeter precision.',
      'Carried scientific sensors that analyzed the solar wind composition trapped on pure aluminum foil.'
    ],
    whereAmINow: 'Standing permanently at 0.67408° N, 23.47297° E on the Sea of Tranquility, bearing an immortal commemorative plaque.',
    funFact: 'On my leg sits a stainless steel plaque signed by three astronauts and President Nixon reading: "Here men from the planet Earth first set foot upon the Moon. We came in peace for all mankind."',
    firstPersonStory: 'I carried humanity into history. When Neil Armstrong piloted us over a boulder-strewn crater with only 25 seconds of fuel remaining, my rocket engine cushioned our descent until the blue contact light glowed. I stayed behind so my crew could return home safely.',
    coordinates: { lat: 0.67, lng: 23.47 },
    image: '/src/assets/images/apollo_lunar_module_1790365444466.jpg',
    badge: 'First Moon Touchdown',
    scienceContribution: 'Enabled lunar surface sample return and established laser lunar ranging still used today.',
    scienceCategory: 'geology'
  },
  {
    id: 'lunar-roving-vehicle',
    name: 'Lunar Roving Vehicle (LRV-1)',
    mission: 'Apollo 15',
    location: 'Hadley-Apennine, Moon',
    targetBody: 'Moon',
    year: 1971,
    status: 'resting',
    type: 'Manned Electric Rover',
    summary: 'The first electric car driven on another celestial body, known affectionately as the Moon Buggy.',
    whoAmI: 'I am the Apollo 15 Moon Buggy. I carried astronauts David Scott and James Irwin across lunar mountains and rilles.',
    myMission: {
      launchDate: 'July 26, 1971',
      arrivalDate: 'July 30, 1971',
      destination: 'Hadley-Apennine region, Moon',
      objective: 'Expand the exploration radius of Apollo astronauts from walking distance to dozens of kilometers.'
    },
    whatIDiscovered: [
      'Allowed astronauts to drive to Mount Hadley and discover the famous 4.1-billion-year-old "Genesis Rock".',
      'Tested wire-mesh wheels filled with titanium chevrons that navigated fine lunar regolith without flat tires.',
      'Equipped with a color television camera operated remotely from Houston Mission Control.'
    ],
    whereAmINow: 'Parked about 100 meters east of the Falcon descent stage near Hadley Rille, facing into the lunar sunrise.',
    funFact: 'My tires weren’t made of rubber! They were woven from zinc-coated piano wire with titanium treads so they wouldn’t freeze or burst in the vacuum of space.',
    firstPersonStory: 'Vroom! Or rather, silence — because with no air on the Moon, my four 1/4-horsepower electric motors ran completely silently. I bounced across lunar dust at 12 kilometers per hour, letting astronauts explore towering mountains and retrieve ancient rocks that unlocked Moon history.',
    coordinates: { lat: 26.13, lng: 3.63 },
    image: '/src/assets/images/apollo_lunar_module_1790365444466.jpg',
    badge: 'First Lunar Wheels',
    scienceContribution: 'Expanded human lunar exploration range by 500%, retrieving ancient primordial crust samples.',
    scienceCategory: 'geology'
  },
  {
    id: 'insight',
    name: 'InSight Lander',
    mission: 'Interior Exploration using Seismic Investigations (InSight)',
    location: 'Elysium Planitia, Mars',
    targetBody: 'Mars',
    year: 2018,
    status: 'resting',
    type: 'Geophysical Lander',
    summary: 'The robotic station that listened to the pulse and seismic heartbeats of Mars.',
    whoAmI: 'I am InSight. Unlike rovers that crawl, I sat in one quiet place and listened to the interior rumble of Marsquakes.',
    myMission: {
      launchDate: 'May 5, 2018',
      arrivalDate: 'November 26, 2018',
      destination: 'Elysium Planitia (a smooth, flat volcanic plain), Mars',
      objective: 'Map the crust thickness, mantle composition, and liquid core size of Mars using seismometers and heat flow probes.'
    },
    whatIDiscovered: [
      'Detected over 1,300 "Marsquakes", proving Mars is seismically active today.',
      'Measured the Martian core radius (approx. 1,830 km) and found it is liquid and surprisingly low in density.',
      'Recorded sounds of Martian wind and vibrations from meteorite impacts carving fresh craters.'
    ],
    whereAmINow: 'Resting on the flat volcanic sand of Elysium Planitia, Martian dust blanketing my solar arrays after four years of discoveries.',
    funFact: 'I carried a dome-shaped shield called the Wind and Thermal Shield to stop gusty Martian breezes from jiggling my hyper-sensitive seismometer!',
    firstPersonStory: 'I placed a French-built seismometer gently onto the Martian soil with my robotic arm. Then I stayed as still as a statue. When meteors smashed into the atmosphere or tectonic faults shifted deep underground, I felt every whisper and sent Mars’s heartbeat back home.',
    coordinates: { lat: 4.50, lng: 135.62 },
    image: '/src/assets/images/opportunity_mars_crater_1790365458156.jpg',
    badge: 'Heartbeat of Mars',
    scienceContribution: 'Created the first three-dimensional geological map of the internal crust, mantle, and molten core of Mars.',
    scienceCategory: 'geology'
  },
  {
    id: 'voyager1',
    name: 'Voyager 1',
    mission: 'Voyager Program',
    location: 'Interstellar Space',
    targetBody: 'Deep Space',
    year: 1977,
    status: 'still traveling',
    type: 'Interstellar Space Probe',
    summary: 'The farthest human-made object in the universe, sailing beyond our Sun’s protective bubble.',
    whoAmI: 'I am Voyager 1. I flew past Jupiter and Saturn, and in 2012, I became humanity’s first emissary to enter interstellar space.',
    myMission: {
      launchDate: 'September 5, 1977',
      arrivalDate: 'August 25, 2012 (Interstellar Crossing)',
      destination: 'Beyond the heliosphere, toward the constellation Ophiuchus',
      objective: 'Conduct close-up study of Jupiter and Saturn systems and explore the boundary where our Sun ends and deep space begins.'
    },
    whatIDiscovered: [
      'Discovered active volcanoes on Jupiter’s moon Io — the first active volcanoes seen outside Earth.',
      'Took the famous "Pale Blue Dot" photograph showing Earth as a fragile speck of dust in a sunbeam from 6 billion kilometers away.',
      'Crossed the heliopause in 2012, directly measuring interstellar cosmic rays and plasma density.'
    ],
    whereAmINow: 'Cruising over 24 billion kilometers (160+ AU) from Earth at 61,000 km/h in the silence of interstellar space.',
    funFact: 'I carry the famous Golden Record — a gold-plated copper phonograph record containing sounds of Earth, music by Bach and Chuck Berry, and greetings in 55 languages!',
    firstPersonStory: 'My signals travel at the speed of light, yet it takes more than 22 hours for a single message to reach my team on Earth. Powered by decaying plutonium heat, I have been voyaging for nearly half a century. I carry humanity’s story into the cosmic dark.',
    coordinates: { distanceAU: 163.2 },
    image: '/src/assets/images/voyager_interstellar_1790365471647.jpg',
    badge: 'Interstellar Voyager',
    scienceContribution: 'First direct in-situ measurements of interstellar matter and outer solar system planetary dynamics.',
    scienceCategory: 'communication'
  },
  {
    id: 'voyager2',
    name: 'Voyager 2',
    mission: 'Voyager Program',
    location: 'Interstellar Space',
    targetBody: 'Deep Space',
    year: 1977,
    status: 'still traveling',
    type: 'Interstellar Space Probe',
    summary: 'The only spacecraft to visit all four giant outer planets: Jupiter, Saturn, Uranus, and Neptune.',
    whoAmI: 'I am Voyager 2, twin to Voyager 1. I completed the "Grand Tour" of the outer planets, revealing blue Neptune and tipped-over Uranus.',
    myMission: {
      launchDate: 'August 20, 1977',
      arrivalDate: 'November 5, 2018 (Interstellar Crossing)',
      destination: 'Interstellar space, toward the constellation Pavo',
      objective: 'Study outer gas giants and ice giants using a rare planetary alignment that happens only once every 175 years.'
    },
    whatIDiscovered: [
      'Discovered the Great Dark Spot on Neptune and freezing nitrogen geysers on Neptune’s moon Triton.',
      'Discovered 10 new moons and two new rings around Uranus, discovering its tilted magnetic field.',
      'Confirmed the heliopause boundary in 2018 using working plasma instruments.'
    ],
    whereAmINow: 'More than 20 billion kilometers (136 AU) from Earth, traveling through interstellar plasma.',
    funFact: 'Because of my special working plasma sensor, I was able to take the first direct measurement of interstellar plasma temperature!',
    firstPersonStory: 'I launched two weeks before my twin brother Voyager 1! I took humanity to Uranus and Neptune — places no spacecraft had ever visited before, and none has returned to since. Like my twin, I carry a Golden Record for any cosmic civilization that may one day find me.',
    coordinates: { distanceAU: 136.5 },
    image: '/src/assets/images/voyager_interstellar_1790365471647.jpg',
    badge: 'Grand Tour Master',
    scienceContribution: 'Only in-situ data of Uranus and Neptune; mapped the southern interstellar boundary of the heliosphere.',
    scienceCategory: 'communication'
  },
  {
    id: 'spirit',
    name: 'Spirit (MER-A)',
    mission: 'Mars Exploration Rover',
    location: 'Gusev Crater, Mars',
    targetBody: 'Mars',
    year: 2004,
    status: 'resting',
    type: 'Planetary Rover',
    summary: 'The gritty twin rover that climbed Husband Hill and discovered evidence of ancient hot springs on Mars.',
    whoAmI: 'I am Spirit, twin to Opportunity. Despite a stuck front wheel, I dragged it backwards and accidentally dug up pure white silica!',
    myMission: {
      launchDate: 'June 10, 2003',
      arrivalDate: 'January 4, 2004',
      destination: 'Gusev Crater, Mars',
      objective: 'Determine if Gusev Crater once held an ancient lake and search for hydrothermal deposits.'
    },
    whatIDiscovered: [
      'Found 90% pure silica deposits at "Home Plate", indicating ancient volcanic fumaroles or hot springs.',
      'Recorded dozens of Martian dust devils spinning across the plains in real-time video clips.',
      'Climbed the summit of Husband Hill, providing the first panoramic summit view on Mars.'
    ],
    whereAmINow: 'Resting beside Home Plate in Gusev Crater, where my wheels last turned in 2010.',
    funFact: 'When my right-front wheel seized up, my engineers programmed me to drive backwards dragging the dead wheel. That dragging wheel scraped off the red topsoil and uncovered the pure silica proof of hot springs!',
    firstPersonStory: 'They called me the plucky twin. I fought rocky terrain, survived solar power crises, and climbed mountains. When my wheel failed, I turned a handicap into the greatest discovery of my mission — proving Mars once had warm, bubbling geothermal waters like Yellowstone!',
    coordinates: { lat: -14.57, lng: 175.47 },
    image: '/src/assets/images/sojourner_mars_rover_1790365426762.jpg',
    badge: 'The Unstoppable Climber',
    scienceContribution: 'Discovered Martian hydrothermal hot-spring deposits favorable for ancient microbial preservation.',
    scienceCategory: 'water'
  }
];
