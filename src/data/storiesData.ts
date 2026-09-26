export interface StorySlide {
  slideNumber: number;
  stageTitle: 'Meet the Machine' | 'The Launch' | 'The Arrival' | 'Mission Work' | 'The Great Discovery' | 'Final Resting Place / Current Journey' | 'The Eternal Legacy';
  headline: string;
  firstPersonText: string;
  narratorNote: string;
  image: string;
  soundCue?: string;
  telemetrySnippet?: {
    label: string;
    value: string;
  };
}

export interface StoryArc {
  id: string;
  title: string;
  subtitle: string;
  targetBody: 'Moon' | 'Mars' | 'Deep Space' | 'All';
  narratorMachine: string;
  durationMin: number;
  slides: StorySlide[];
}

export const STORIES_DATA: StoryArc[] = [
  {
    id: 'mars-story',
    title: 'The Brave Little Rovers of Mars',
    subtitle: 'From a microwave-sized pioneer to a 15-year marathon across the red desert.',
    targetBody: 'Mars',
    narratorMachine: 'Sojourner & Opportunity',
    durationMin: 5,
    slides: [
      {
        slideNumber: 1,
        stageTitle: 'Meet the Machine',
        headline: 'Hello Explorer, I am Sojourner.',
        firstPersonText: 'I am the very first rover humanity ever rolled across the surface of Mars. My creators at NASA built me small — only 25 pounds, roughly the size of a kitchen microwave oven. Many scientists doubted that wheels could survive the sharp, frozen rocks of the Red Planet. But I carried six aluminum wheels and a dream to prove them wrong.',
        narratorNote: 'Mars Pathfinder launched in 1996 to prove a cheap, fast way to land on Mars.',
        image: '/src/assets/images/sojourner_mars_rover_1790365426762.jpg',
        telemetrySnippet: { label: 'VEHICLE MASS', value: '11.5 kg (25.4 lbs)' }
      },
      {
        slideNumber: 2,
        stageTitle: 'The Launch',
        headline: 'Riding a Column of Fire into the Black.',
        firstPersonText: 'On December 4, 1996, a Delta II rocket shook the Florida coast and hurled me into the dark ocean of space. I was tucked tightly inside the Pathfinder lander, folding my six wheels like an origami beetle. For seven long months, we coasted across 300 million miles of freezing vacuum toward a faint red dot.',
        narratorNote: 'During cruise, engineers checked the rover battery and memory systems weekly.',
        image: '/src/assets/images/hero_space_journey_1790365407516.jpg',
        telemetrySnippet: { label: 'CRUISE SPEED', value: '27,000 km/h' }
      },
      {
        slideNumber: 3,
        stageTitle: 'The Arrival',
        headline: 'Bouncing Down in Giant Airbags!',
        firstPersonText: 'On the 4th of July, 1997, our heat shield slammed into Mars’s thin atmosphere. Parachutes opened, retro-rockets fired, and giant bouncy airbags inflated around us like a giant beach ball! We bounced 15 times, soaring three stories high into the Martian sky before rolling to a stop on the ancient flood plains of Ares Vallis.',
        narratorNote: 'Airbag landings eliminated the need for heavy descent engines, revolutionizing planetary access.',
        image: '/src/assets/images/sojourner_mars_rover_1790365426762.jpg',
        telemetrySnippet: { label: 'IMPACT DECELERATION', value: '18 Gs peak' }
      },
      {
        slideNumber: 4,
        stageTitle: 'Mission Work',
        headline: 'First Tracks in the Red Dust.',
        firstPersonText: 'The lander petals unfolded and ramps deployed. At 1 centimeter every second, my metal treads gripped the reddish dirt. I sniffed rocks named Barnacle Bill and Yogi with my Alpha Proton X-Ray Spectrometer. Millions of people on Earth opened their web browsers to see my photos — crashing early internet servers!',
        narratorNote: 'Pathfinder was one of the first global viral internet sensations in 1997.',
        image: '/src/assets/images/sojourner_mars_rover_1790365426762.jpg',
        telemetrySnippet: { label: 'MAX SPEED', value: '1.0 cm / sec' }
      },
      {
        slideNumber: 5,
        stageTitle: 'The Great Discovery',
        headline: 'Mars Was Once Swept by Ancient Floods.',
        firstPersonText: 'Every boulder I inspected told a secret: they were rounded, stacked, and oriented in the direction of catastrophic water floods that raced across this valley billions of years ago. Years later, my bigger sister Opportunity landed and discovered hematite "blueberries" that formed inside standing liquid groundwater! We proved Mars was once wet.',
        narratorNote: 'These discoveries transformed our search for ancient microbial life on other worlds.',
        image: '/src/assets/images/opportunity_mars_crater_1790365458156.jpg',
        telemetrySnippet: { label: 'MINERAL DETECTED', value: 'High Silica & Hematite' }
      },
      {
        slideNumber: 6,
        stageTitle: 'Final Resting Place / Current Journey',
        headline: 'A Quiet Sleep Under the Martian Sun.',
        firstPersonText: 'I was designed to last only 7 days, but I worked for 83 days until our batteries grew cold. Today, I sit peacefully near the Carl Sagan Memorial Station on Ares Vallis. My sister Opportunity rests 2,000 kilometers away on the rim of Endeavour Crater after 15 glorious years. The red dust blankets us, but no rain will ever wash away our treads.',
        narratorNote: 'Because Mars has no rain, hardware remains preserved for thousands of years.',
        image: '/src/assets/images/opportunity_mars_crater_1790365458156.jpg',
        telemetrySnippet: { label: 'MISSION DURATION', value: '83 Days (Goal: 7 Days)' }
      },
      {
        slideNumber: 7,
        stageTitle: 'The Eternal Legacy',
        headline: 'We Opened the Gates for Humanity.',
        firstPersonText: 'Without my small six wheels, there would be no Spirit, no Opportunity, no Curiosity, and no Perseverance. I proved that human curiosity could reach across the solar system, touch the red sand, and feel the heartbeat of another world. Whenever you look up at Mars in the night sky, know that we are waiting for you.',
        narratorNote: 'Every Mars rover built today uses the Rocker-Bogie suspension pioneered on Sojourner.',
        image: '/src/assets/images/sojourner_mars_rover_1790365426762.jpg',
        telemetrySnippet: { label: 'LEGACY STATUS', value: 'Pathfinder for Future Astronauts' }
      }
    ]
  },
  {
    id: 'moon-story',
    title: 'The Silent Sentinels of the Moon',
    subtitle: 'How Apollo 11’s Eagle and Apollo 15’s Moon Buggy left humanity’s first extraterrestrial footprints.',
    targetBody: 'Moon',
    narratorMachine: 'Apollo 11 Eagle & Lunar Rover',
    durationMin: 5,
    slides: [
      {
        slideNumber: 1,
        stageTitle: 'Meet the Machine',
        headline: 'Greetings from the Sea of Tranquility. I am Eagle.',
        firstPersonText: 'I was not sleek or aerodynamic. In the airless void of the Moon, beauty doesn’t matter — function does. I was covered in sheets of thin aluminum and gold foil. My four spider-like legs carried shock absorbers filled with crushable honeycomb metal to cushion humanity’s first touchdown.',
        narratorNote: 'The Apollo Lunar Module was the first true spacecraft designed solely to operate in vacuum.',
        image: '/src/assets/images/apollo_lunar_module_1790365444466.jpg',
        telemetrySnippet: { label: 'LANDING CRAFT', value: 'Apollo 11 LM-5' }
      },
      {
        slideNumber: 2,
        stageTitle: 'The Launch',
        headline: 'Riding the Mighty Saturn V.',
        firstPersonText: 'On July 16, 1969, the 363-foot-tall Saturn V ignited 7.5 million pounds of thrust. The roar could be felt 30 miles away in Florida. Packed inside the nose of the third stage, I flew toward lunar orbit alongside the Command Module Columbia with Neil, Buzz, and Michael.',
        narratorNote: 'Saturn V remains one of the most powerful launch vehicles ever flown successfully.',
        image: '/src/assets/images/hero_space_journey_1790365407516.jpg',
        telemetrySnippet: { label: 'ROCKET THRUST', value: '34.5 Million Newtons' }
      },
      {
        slideNumber: 3,
        stageTitle: 'The Arrival',
        headline: '“Houston, Tranquility Base Here. The Eagle Has Landed.”',
        firstPersonText: 'Our descent engine roared as Neil steered me away from a field of car-sized boulders. The fuel gauge was reading critical — less than 30 seconds of descent propellant remaining! At 20:17 UTC on July 20, 1969, my contact probe brushed the lunar dust. Blue light flashed in the cockpit. We were down.',
        narratorNote: 'The landing site was chosen for its flatness in the Mare Tranquillitatis basin.',
        image: '/src/assets/images/apollo_lunar_module_1790365444466.jpg',
        telemetrySnippet: { label: 'REMAINING FUEL', value: '25 Seconds at Touchdown' }
      },
      {
        slideNumber: 4,
        stageTitle: 'Mission Work',
        headline: 'The Moon Buggy Joins the Journey.',
        firstPersonText: 'Two years later on Apollo 15, my cousin — the Lunar Roving Vehicle — was unpacked from the side of Falcon. It had no steering wheel, just a T-shaped hand controller between the two seats. With four electric hub motors and wire-mesh wheels, it let astronauts drive 17 miles to the edge of the towering Apennine mountains!',
        narratorNote: 'The rover allowed astronauts to collect samples far beyond walking distance.',
        image: '/src/assets/images/apollo_lunar_module_1790365444466.jpg',
        telemetrySnippet: { label: 'TOTAL DISTANCE', value: '27.76 km (Apollo 15)' }
      },
      {
        slideNumber: 5,
        stageTitle: 'The Great Discovery',
        headline: 'Unlocking the Genesis Rock and Moon Origins.',
        firstPersonText: 'High on the slopes of Mons Hadley, the rover crew spotted a white crystalline stone sitting on a dark rock pedestal: the famous 4.1-billion-year-old Genesis Rock! Back on Earth, it proved the Moon had once been completely covered by an ocean of glowing liquid magma.',
        narratorNote: 'The rock is anorthosite, composed almost entirely of calcium-rich feldspar.',
        image: '/src/assets/images/apollo_lunar_module_1790365444466.jpg',
        telemetrySnippet: { label: 'SAMPLE AGE', value: '4.1 Billion Years' }
      },
      {
        slideNumber: 6,
        stageTitle: 'Final Resting Place / Current Journey',
        headline: 'Standing as an Eternal Monument.',
        firstPersonText: 'When Neil and Buzz blasted back to Earth in the Ascent Stage, my Descent Stage remained behind as their launch pad. I am still here on the Sea of Tranquility. There is no wind to blow away Neil’s bootprints, and no rain to tarnish my commemorative plaque: "We came in peace for all mankind."',
        narratorNote: 'Laser stations on Earth still bounce pulses off retroreflectors left beside Eagle.',
        image: '/src/assets/images/apollo_lunar_module_1790365444466.jpg',
        telemetrySnippet: { label: 'ENVIRONMENT', value: 'Vacuum, -170°C to +120°C' }
      },
      {
        slideNumber: 7,
        stageTitle: 'The Eternal Legacy',
        headline: 'A Stepping Stone to the Stars.',
        firstPersonText: 'Our shiny legs and empty rover seats await future explorers. When NASA’s Artemis astronauts return to the Moon, they will stand where we stood, knowing that human courage first turned the Moon from a distant light into a home for explorers.',
        narratorNote: 'NASA’s Artemis program aims to establish sustainable human exploration at the Lunar South Pole.',
        image: '/src/assets/images/apollo_lunar_module_1790365444466.jpg',
        telemetrySnippet: { label: 'STATUS', value: 'Extraterrestrial Historic Landmark' }
      }
    ]
  },
  {
    id: 'deep-space-story',
    title: 'A Message to Eternity: The Voyagers',
    subtitle: 'How two robotic probes left the solar system carrying the sights, sounds, and music of Earth.',
    targetBody: 'Deep Space',
    narratorMachine: 'Voyager 1 & Voyager 2',
    durationMin: 6,
    slides: [
      {
        slideNumber: 1,
        stageTitle: 'Meet the Machine',
        headline: 'I am Voyager. Humanity’s Messenger in the Dark.',
        firstPersonText: 'I carry no wheels and no landing gear. I was built to fly — endlessly, silently, forever. My prominent 12-foot dish antenna points back toward the faint yellow star you call the Sun. Bolted to my flank is a 12-inch gold-plated phonograph record, carrying greetings in 55 languages and the laughter of human children.',
        narratorNote: 'The Golden Record was curated by a committee chaired by astronomer Carl Sagan.',
        image: '/src/assets/images/voyager_interstellar_1790365471647.jpg',
        telemetrySnippet: { label: 'GOLDEN RECORD', value: '115 Images, 90m Music' }
      },
      {
        slideNumber: 2,
        stageTitle: 'The Launch',
        headline: 'The Grand Tour Begins.',
        firstPersonText: 'In late summer 1977, a rare cosmic alignment occurred — once every 175 years, Jupiter, Saturn, Uranus, and Neptune lined up like pearls on a string. Titan-Centaur rockets blasted my twin and me into orbit, using the intense gravity of each planet to catapult us like slingshots to the next!',
        narratorNote: 'Gravity assists allowed the probes to cut travel time to Neptune from 30 years to 12.',
        image: '/src/assets/images/hero_space_journey_1790365407516.jpg',
        telemetrySnippet: { label: 'TRAJECTORY', value: 'Planetary Slingshot Assist' }
      },
      {
        slideNumber: 3,
        stageTitle: 'The Arrival',
        headline: 'Witnessing Worlds Never Before Imagined.',
        firstPersonText: 'When I swept past Jupiter, I discovered active sulfur volcanoes erupting on its moon Io — the first active volcanoes ever seen beyond Earth! I flew through Saturn’s intricate rings of ice, while my twin Voyager 2 visited Uranus and Neptune, revealing glowing azure storms and frozen nitrogen geysers.',
        narratorNote: 'Voyager 2 remains the only spacecraft ever to visit Uranus and Neptune.',
        image: '/src/assets/images/voyager_interstellar_1790365471647.jpg',
        telemetrySnippet: { label: 'DISCOVERIES', value: '33 New Moons & Volcanism' }
      },
      {
        slideNumber: 4,
        stageTitle: 'Mission Work',
        headline: 'Looking Back: The Pale Blue Dot.',
        firstPersonText: 'On Valentine’s Day in 1990, four billion miles from home, Carl Sagan asked my team to turn my camera around one final time. I snapped 60 photos of our Solar System. In that portrait was Earth: a single pixel of pale blue light suspended in a sunbeam. Everything humans had ever loved or fought for existed on that tiny speck.',
        narratorNote: 'The Pale Blue Dot image remains one of the most profound philosophical images in history.',
        image: '/src/assets/images/hero_space_journey_1790365407516.jpg',
        telemetrySnippet: { label: 'DISTANCE OF PHOTO', value: '6 Billion Kilometers' }
      },
      {
        slideNumber: 5,
        stageTitle: 'The Great Discovery',
        headline: 'Crossing into the Interstellar Ocean.',
        firstPersonText: 'In August 2012, my plasma detector registered a sudden spike in dense galactic gas. The solar wind from our Sun dropped to zero. For the first time in history, a human artifact had crossed the heliopause and entered interstellar space — the cosmic ocean between the stars!',
        narratorNote: 'Voyager 1 officially crossed the heliopause on August 25, 2012.',
        image: '/src/assets/images/voyager_interstellar_1790365471647.jpg',
        telemetrySnippet: { label: 'COSMIC REGION', value: 'Interstellar Medium' }
      },
      {
        slideNumber: 6,
        stageTitle: 'Final Resting Place / Current Journey',
        headline: 'Whispering Across 22 Light-Hours.',
        firstPersonText: 'I am not resting. I am cruising at 38,000 miles per hour into the interstellar night. My nuclear generators are fading by about 4 watts each year, and my engineers carefully power down instruments to keep my heart beating. When I send a signal, it takes nearly an entire day for my radio wave to reach Earth at the speed of light.',
        narratorNote: 'NASA Deep Space Network antennas still communicate with both Voyagers regularly.',
        image: '/src/assets/images/voyager_interstellar_1790365471647.jpg',
        telemetrySnippet: { label: 'CURRENT DISTANCE', value: '163+ AU (24+ Billion km)' }
      },
      {
        slideNumber: 7,
        stageTitle: 'The Eternal Legacy',
        headline: 'A Billion Years in the Cosmic Ocean.',
        firstPersonText: 'Long after our Sun turns into a red giant and the oceans of Earth evaporate, my Golden Record and I will still be sailing through the Milky Way. Even if my electronics fall silent, I will carry your music, your poetry, and your greeting to whoever may look up in the stars and wonder: "Are we alone?"',
        narratorNote: 'The golden records will remain legible for over one billion years in interstellar space.',
        image: '/src/assets/images/voyager_interstellar_1790365471647.jpg',
        telemetrySnippet: { label: 'EXPECTED LIFESPAN', value: '> 1 Billion Years' }
      }
    ]
  }
];
