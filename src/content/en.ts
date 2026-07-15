export const en = {
  meta: {
    name: "Tang Ngoc Hau",
    wordmark: "NgocHau",
    location: "Đà Nẵng, Việt Nam",
    role: "Aspiring Fullstack Developer",
    availability: "Available for new projects",
  },
  nav: {
    introduction: "Introduction",
    projects: "Projects",
    skills: "Skills",
    achievements: "Achievements",
    personal: "Personal",
    contact: "Contact",
    },
    intro: {
      kicker: "Aspiring Fullstack Developer",
      headline: ["Building with", "purpose in", "Đà Nẵng."],
      bio: "I build software with a simple goal: making everyday routines lighter and lives a little easier. But beyond just solving problems, I design cool, visually striking websites that please the eye and enrich the soul through thoughtful aesthetics. It’s a practice rooted in technical logic, but driven entirely by human empathy and a love for beautiful design.",
      portraitAlt: "Portrait of Hau, a young developer in soft natural light",
      deckHint: "View deck",
      hintNext: "Projects",
    },
  projects: {
    eyebrow: "Selected work",
    heading: "Things I've built recently.",
    subheading: "A showcase of full-stack systems, Web3 integrations, and mobile applications.",
    openSite: "Open site",
    items: [
      {
        title: "AnimeLearn",
        description:
          "An advanced Japanese learning platform powered by a custom AI pipeline utilizing OpenAI's Whisper for precise audio-to-text extraction and SudachiPy for accurate morphological analysis. The platform features an interactive dual-subtitle video player that allows users to perform real-time dictionary lookups and save words directly while watching. Extracted vocabulary and Kanji are comprehensively categorized and sorted by real-world frequency and JLPT levels, seamlessly integrating with a Spaced Repetition System to maximize study efficiency.",
        stack: [
          "React", 
          "TypeScript", 
          "Node.js", 
          "Express", 
          "MongoDB", 
          "Python (Whisper, SudachiPy)"
        ],
        url: "https://anime-learn.vercel.app",
        github: "https://github.com/dodoododo/AnimeLearn",
        image: "project-1",
      },
      {
          title: "OurNote",
          description: "An all-in-one productivity workspace for groups, lovers, friends featuring real-time chat, intuitive Kanban task management, interactive Leaflet map events, note taking, collaborative live whiteboarding, and robust security through JWT authentication and Bcrypt hashing.",
          stack: ["React", "TypeScript", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS", "shadcn/ui", "OpenStreetMap"],
          url: "https://our-note-ten.vercel.app/",
          github: "https://github.com/dodoododo/our-note",
          image: "project-2",
      },
      {
        title: "ShopTalk (Convo AI Hackathon 2026)",
        description:
          "A full-stack AI commerce platform that automates online sales using conversational AI and blockchain payments. ShopTalk leverages Groq Llama 3.3 with Agora Conversational AI to handle natural-language customer interactions, perform inventory lookup and order creation through tool calling, generate Solana Pay USDC payment requests, verify on-chain transactions with multi-layer validation, and deliver real-time dashboard updates via WebSockets.",
        stack: [
          "React",
          "Node.js",
          "PostgreSQL",
          "Socket.io",
          "Solana Web3.js",
          "Solana Pay",
          "Groq Llama 3.3 API",
          "Agora Conversational AI",
          "Agora RTC"
        ],
        url: "https://shop-talk-eta.vercel.app/",
        github: "https://github.com/dodoododo/shoptalk",
        image: "project-3",
      },
      {
        title: "FreshFruit Smart Scale",
        description:
          "An end-to-end IoT smart retail platform that integrates computer vision, embedded hardware, and a real-time point-of-sale dashboard. The system streams weight data from a smart scale, detects fruit using a YOLOv8-powered AI model, automatically calculates pricing, manages transactions, and synchronizes sales data through a FastAPI backend with MySQL. Built with React, TypeScript, and Tailwind CSS, the frontend delivers a responsive dashboard for live weighing, AI recognition, transaction history, and store analytics.",
        stack: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "FastAPI",
          "Python",
          "YOLOv8",
          "WebSocket",
          "MySQL",
          "SQLAlchemy",
          "Hardware/IoT"
        ],
        url: "",
        github: "https://github.com/dodoododo/pbl4-freshfruit-smart-scale-frontend",
        image: "project-4",
      },
      {
        title: "Locket Beta",
        description:
          "A cross-platform social media platform engineered with Flutter and a scalable Node.js/Express backend. Implements JWT-based authentication, real-time WebSocket messaging with typing indicators and presence synchronization, Cloudinary-backed media storage, friend recommendation algorithms, and MongoDB data modeling. The frontend leverages the BLoC architecture for predictable state management alongside custom camera integration and on-device image compression for responsive mobile performance.",
        stack: [
          "Flutter",
          "Dart",
          "BLoC Pattern",
          "Node.js",
          "Express",
          "MongoDB",
          "WebSocket",
          "Cloudinary"
        ],
        url: "",
        github: "https://github.com/dodoododo/locketBeta",
        image: "project-5",
      },
      {
        title: "Medicine Distribution System",
        description:
          "A secure B2C pharmaceutical e-commerce platform built entirely without frameworks to master core web principles. Architected using a strict MVC design pattern with Java Servlets and JSP, backed by a fully normalized MySQL relational database with complex foreign key constraints.",
        stack: ["Java Servlet", "JSP", "MySQL", "MVC Architecture", "Bootstrap"],
        url: "",
        github: "https://github.com/dodoododo/medicine-distribution-system",
        image: "project-6",
      },
      {
        title: "Japanese Dictionary",
        description:
          "A comprehensive JLPT study toolkit featuring advanced word/kanji lookups, customizable flashcard generation, and PDF exports. Ensures a seamless user experience with secure JWT authentication and strict client-server data validation.",
        stack: ["React", "Java Spring Boot", "Microsoft SQL Server", "Tailwind CSS"],
        url: "",
        github: "https://github.com/dodoododo/PBL3-Japanese-Dictionary",
        image: "project-7",
      },
      {
        title: "Flight Booking Management",
        description:
          "A robust console-based application demonstrating advanced Object-Oriented Programming concepts. Utilizes C++ STL Vectors for dynamic memory management and implements custom text-file I/O parsing for persistent, database-free data storage.",
        stack: ["C++", "OOP", "File I/O Persistence"],
        url: "",
        github: "https://github.com/dodoododo/Book-Flight-Console-App-C-",
        image: "project-8",
      }
    ],
  },
  skills: {
    eyebrow: "Skills",
    heading: "Tools for my craft.",
    techHeading: "Technical",
    languagesHeading: "Language proficiency",
    tech: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Python",
      "Go",
      "Git",
      "Figma",
      "Vite",
      "Docker",
    ],
    "categories": [
      {
        "name": "Primary Stack (MERN)",
        "items": [
          "JavaScript", 
          "TypeScript", 
          "React", 
          "Node.js", 
          "Express", 
          "MongoDB", 
        ]
      },
      {
        "name": "Mobile & Software",
        "items": [
          "Flutter", 
          "C++", 
          "C", 
          "Python", 
          "Java",
          "Spring Boot",
          "C#", 
          ".NET",
          "PHP",
        ]
      },
      {
        "name": "Databases",
        "items": [
          "PostgreSQL", 
          "MySQL", 
          "SQLite", 
          "Microsoft SQL Server"
        ]
      },
      {
        "name": "Cloud & DevOps",
        "items": [
          "AWS", 
          "Firebase", 
          "Docker", 
          "Vercel",
          "Render",
          "Supabase"
        ]
      },
      {
        "name": "IoT & Hardware",
        "items": [
          "Arduino", 
          "ESP8266", 
          "Raspberry Pi",
          "Cisco Packet Tracer"
        ]
      },
      {
        "name": "Tools & Workflows",
        "items": [
          "GitHub", 
          "GitLab", 
          "Jira", 
          "Postman", 
          "VS Code", 
          "Android Studio"
        ]
      }
    ],
    languages: {
      vi: { name: "Tiếng Việt", proficiency: "Native speaker" },
      en: { name: "English", proficiency: "IELTS 7.5 — Fluent" },
      ja: { name: "日本語", proficiency: "JLPT N3 — Conversational" },
    },
  },
  achievements: {
    eyebrow: "Achievements",
    heading: "A few moments I'm proud of.",
    items: [
      {
        tag: "Hackathon · 2026",
        title: "Top 10 finalist — CONVO AI HACKATHON DANANG UNIVERSITY 2026",
        body: "Built a Solana-integrated conversational agent with a small team at DUT. #DUT #ConversationalAI #convoai #DSUC #Agora #Solana #Hackathon",
      },
      {
        tag: "Speech contest · Japanese",
        title: "1st Prize — Japanese speech contest",
        body: "Attended by the Japanese Consul General in Da Nang, Takero Mori.",
      },
      {
        tag: "Speech contest · English",
        title: "3rd Prize — University English speech contest",
        body: "Đà Nẵng University of Science and Technology (“Bách Khoa” Đà Nẵng).",
      },
    ],
  },
  personal: {
    eyebrow: "Personal",
    personalTitle: ["WHO I AM", "WHEN I'M NOT CODING."],
    personalDescription: "I didn't want this portfolio to be another page where I take five minutes of your time to explain how passionate I am about technology. I  want this portfolio to exist not only for people in tech. Of course, it's here to showcase my work, but I also wanted it to reach anyone who happens to stumble across it, future friends, curious strangers, or simply people who resonate with the things I care about. So I'd use this space to tell you about things I love.",
    personalDrag: "Get to know me",
    chapter1: {
      label: "Chapter 01 — Curiosity for the world",
      intro:
        "I have an interest for culture, history and geography of countries I've never set foot in. I read about them, watch documentaries about them, and keep a slowly-growing list of places I want to see in person.",
      cityInteractHint: "Click to see my travel letters from each city.",
      moduleHeading: "Countries I Want To Step Foot To",
      selectPrompt: "Select a country to fly the globe there.",
    },
    chapter2: {
      label: "Love of Music",
      heading: "The Order of the Melody",
      body: "I love music and ever since i was a kid, I've spent most of my free time listening to music. I loved it so much i started music production by making rap beats and then i started to play guitar. I listen to all genres of music as long as it is interesting and unique. I have a spotify playlist with 1400 songs. Here are a few of my favorite songs from various genres and languages.",
      footnote: "If I'm not coding, I'm probably deep in an obscure music rabbit hole. It's fine. It's fine.",
      tags: ["Beat Production", "Fretboard Calluses", "Global Frequencies"],
    },
    scrapbook: {
      spine: "Vol. 04 — Personal Manifesto — Printed Quarterly — Est. 2019",
      heroEyebrow: "My Obsession for Bunnies",
      heroTitleLine1: "Absolute",
      heroTitleLine2: "Bunny Maniac",
      heroBoldLead: "I am completely obsessed.",
      heroBody:
        "I think they're ridiculously cute. They're quiet, a little awkward, and only really trust the people they're comfortable with. Honestly that's pretty relatable. If reincarnation is real, I'd like to come back as a well-loved house bunny. So there's an entire rabbit magazine hidden inside my portfolio. I hope you have fun exploring it and maybe you'll end up learning something about them too.",
      essayLabel: "PERSONAL ESSAY ABOUT BUNNIES",
      essayAuthor: "Written by Ngọc Hậu",
      article: {
        kicker: "Master of Survival",
        dropCapLetter: "F",
        paragraph1Pre:
          "orget the old fairy tales of the fragile little prey trembling in the bushes. In reality, bunnies are nature's bravest survival warriors. Bunnies are built for one thing:",
        paragraph1Bold: "explosive survival",
        paragraph1Post:
          ". A frightened hare doesn't just run, it launches like a coiled spring, hitting 70 km/h and pulling off hairpin turns that leave predators completely eating dust.",
        paragraph2Pre:
          "And when they are safe and happy? They perform a gravity-defying, mid-air twist called a",
        paragraph2Highlight: "BINKY",
        paragraph2Post: "It is pure, unfiltered joy in motion.",
        airborne: "Airborne!",
        binky: "Binky!",
        radarLabel: "270° Radar",
        quoteLine1: "Their 270° ears are always spinning.",
        quoteHighlight: "They hear the threat",
        quoteLine2: "before you even know it's there.",
        globalDominationHeading: "Global Domination",
        globalDominationBody:
          "From freezing tundras to scorching deserts, rabbits have conquered almost every continent. They rely on those highly sensitive whiskers to map out the width of a tunnel before their body even commits to entering it. They are incredibly adaptable. They are basically unstoppable!!",
        fact1: "Front teeth grow continuously, up to 12cm a year! They need tough fiber to grind them down.",
        fact2: "A single bun mom can become pregnant again just hours after giving birth, theoretically turning a single pair into over 3,000 descendants in just one year!",
        fact3: "They sleep about 8 hours a day, but only in quick 5 to 25 minute mini-naps. Even crazier? They often sleep with their eyes wide open to watch for danger!",
      },
      stats: {
        heading: "BUNNY STATS",
        sprintValue: "70",
        sprintLabel: "km/h top sprint",
        hearingValue: "3",
        hearingLabel: "km hearing range",
        speciesValue: "30+",
        speciesLabel: "rabbit species",
        populationValue: "700m+",
        populationLabel: "estimated bunnies worldwide",
      },
      pullQuote: {
        text: "The rabbit thinks his paradise is a place full of carrots, until he finds a place full of carrots! A place filled with the things you love so much that you get tired of them would not be heaven, but hell at best!",
        attribution: "― Mehmet Murat İldan",
      },
      credits: {
        label: "PAID ACTORS (DO NOT ATTEMPT STUNTS AT HOME)",
        specimens: [
          "Lily, Hero",
          "Kiwi, Resting",
          "Holland Lop",
          "Mid-Hop",
          "Alert Stance",
          "Foraging",
          "Specimen No. 8",
        ],
      },
      foldHere: "✂ Fold Here — Part II Continues",
      sonicRadar: {
        heading1: "The Sonic",
        heading2: "Radar",
        paragraph1Pre:
          "A rabbit's hearing is its ultimate early-warning system. In a silent meadow, a predator's misplaced step — a single",
        paragraph1Bold1: "sharp snap",
        paragraph1Mid: "of a twig — travels through the air to be picked up by the rabbit from up to",
        paragraph1Bold2: "3 kilometers away",
        paragraph2Pre: "To grasp this distance: imagine stacking",
        paragraph2Bold: "3.5 Burj Khalifas",
        paragraph2Post:
          "end-to-end. That is the radius of the rabbit's radar. Long before the wolf is even a visible threat, the bunny has already pinpointed the danger, calculated its path, and prepared to bolt.",
        heightReferenceLabel: "Height Reference",
        burjLabel: "Burj Khalifa(830m)",
        eiffelLabel: "Eiffel (330m)",
        libertyLabel: "Liberty (93m)",
        bunnyLabel: "The Bunny",
        wolfLabel: "The Wolf",
        snap: "SNAP!",
        scaleCaptionPre: "3.5 × Burj Khalifa ≈",
        scaleCaptionHighlight: "3 Kilometers",
      },
      goldenRule: {
        huntsLine1: "Eyes in",
        huntsLine2: "the front,",
        huntsHighlight: "the animal",
        huntsLine3: "hunts.",
        hidesLine1: "Eyes on",
        hidesLine2: "the side,",
        hidesHighlight: "the animal",
        hidesLine3: "hides.",
      },
      blueprint: {
        fovLabel: "Field of View",
        blindLabel: "Blind Spot",
        predatorHeading1: "Binocular",
        predatorHeading2: "Predators",
        predatorFovValue: "~120°",
        predatorBlindValue: "Rear",
        predatorBody:
          "Forward-facing eyes overlap into a single, sharply focused field. Lions, wolves, and owls trade peripheral awareness for intense depth perception, calculating the exact distance to strike. Vision built exclusively for the chase.",
        preyHeading1: "Monocular",
        preyHeading2: "Prey",
        preyFovValue: "~360°",
        preyBlindValue: "Direct Front",
        preyBody:
          "Side-set eyes operate independently, providing an almost perfect wraparound view. Rabbits, deer, and horses sacrifice depth perception to constantly scan the horizon. It is a biological early warning system built for one purpose: escape.",
      },
      bunnyLens: {
        heading1: "Bunny",
        heading2: "Vision",
        paragraph1:
          "As we established, prey animals trade depth perception for a wider field of view. But the rabbit takes this biological blueprint to its absolute extreme.",
        paragraph2Pre:
          "By positioning its large eyes exceptionally high and wide on its skull, a rabbit merges two separate optical feeds into a seamless,",
        paragraph2Bold: "near-360° visual radar",
        paragraph2Post:
          ". Unlike predators that must turn their heads to scan their surroundings, the rabbit's hardware is designed for constant, passive surveillance.",
        paragraph3:
          "It can watch the sky for circling hawks while its nose is buried in the grass, or detect a coyote creeping up from directly behind, all without moving a single muscle in its neck.",
        tooltipMonoTitle: "Monocular Field",
        tooltipMonoBody: "Independent eye scan providing near 360° motion detection.",
        tooltipBinoFrontTitle: "Front Binocular",
        tooltipBinoFrontBody: "Overlapping vision grants precise depth perception for striking.",
        tooltipBinoRearTitle: "Rear Binocular",
        tooltipBinoRearBody: "Tracks pursuing predators right behind the head.",
        tooltipBlindFrontTitle: "Nose Blindspot",
        tooltipBlindFrontBody:
          "Right in front of their face is a total blind spot. They literally can't see what they're eating, so they use their whiskers to feel around instead.",
        tooltipBlindRearTitle: "Rear Blindspot",
        tooltipBlindRearBody: "Blocked by own body mass.",
        legendMono: "Monocular Field",
        legendBino: "Binocular Overlap",
        legendBlind: "Blind Spot",
      },
      footer: "BREAKING BUNNY NEWS",
    },
    bunnyGacha: {
      moduleLabel: "Bunny Gacha",
      moduleHeading: "Pull a Bunny, Get a Fortune",
      pullButton: "Pull",
      natureSuffix: "Nature",
      rarityLabel: "Rarity",
      blurbPrefix: "Today's Fortune",
      factLabel: "Fun Fact",
      stats: {
        curiosity: "Curiosity",
        fluffiness: "Fluffiness",
        energy: "Energy",
        speed: "Speed",
        friendliness: "Friendliness",
        totalPower: "Total Power",
      },
      ui: {
        title: "BUNNY GACHA",
        subtitle: "Capsule Fortune Machine",
        machineNo: "Capsule Machine No. 07",
        dept: "Animal Research Dept.",
        specs: {
          heading: "Specifications",
          dailyLimitLabel: "Daily Limit",
          dailyLimitValue: "1 Pull / Day",
          capsuleRateLabel: "Capsule Rate",
          capsuleRateValue: "100% Organic",
          visualOutputLabel: "Visual Output",
          visualOutputValue: "3D Rendered",
          powerSourceLabel: "Power Source",
          powerSourceValue: "Curiosity",
        },
        warning: {
          heading: "Warning",
          body: "Extreme fluffiness detected. Proceed with caution. Do not feed the capsules.",
        },
        machineActive: "Machine Active",
        machineCode: "BNUY-01",
        turnHandle: "Turn The Handle",
        pullIdle: "Pull Gacha",
        pullProcessing: "Processing...",
        pullAgain: "Pull Again",
        contentsTicket: {
          heading: "Today's Fortune Includes",
          species: "Bunny Species",
          fortune: "Daily Fortune",
          personality: "Personality Profile",
          fact: "Scientific Fun Fact",
        },
        stamp: {
          inspected: "Inspected",
          passed: "PASSED",
          dept: "Dept. of Luck",
        },
        collectAll: "Collect Them All",
      },
      bunnies: {
        hollandLop: {
          name: "Holland Lop",
          blurb: "Like a Holland Lop, you'll win people over just by being yourself.",
          type: "Companion",
          personality: "Sweet",
          ability: "Ear Flop Charm",
          fact: "They are frequently described as being among the most laid-back and easygoing of the rabbit breeds, making them particularly suitable for first-time owners.",
        },
        netherlandDwarf: {
          name: "Netherland Dwarf",
          blurb: "A burst of unexpected energy helps you finish what you start today.",
          type: "Speedster",
          personality: "Spicy",
          ability: "Zoomie Tornado",
          fact: "Despite weighing only around 1 kilo, they possess the energy and attitude of a rabbit ten times their size.",
        },
        lionhead: {
          name: "Lionhead",
          blurb: "Your hair might be messy today, but your spirit is majestic.",
          type: "Majestic",
          personality: "Proud",
          ability: "Mane Defense",
          fact: "Their unique mane is caused by a dominant genetic mutation that first appeared in Belgium.",
        },
        flemishGiant: {
          name: "Flemish Giant",
          blurb: "A good long nap solves more problems than hard work today.",
          type: "Titan",
          personality: "Gentle",
          ability: "Professional Napper",
          fact: "Known as the 'Gentle Giants,' they can weigh up to 10 kilograms and are as large as some dogs.",
        },
        miniRex: {
          name: "Mini Rex",
          blurb: "Things go smoothly for you today, much like velvet.",
          type: "Companion",
          personality: "Placid",
          ability: "Velvet Touch",
          fact: "Their fur lacks long guard hairs, giving them a unique texture that feels exactly like plush velvet.",
        },
        englishAngora: {
          name: "English Angora",
          blurb: "Expect a day filled with soft comforts and a little extra grooming.",
          type: "Divine",
          personality: "Pampered",
          ability: "Cloud Camouflage",
          fact: "They are the only rabbit breed covered entirely in wool, including their face and ears, requiring daily grooming.",
        },
        dutch: {
          name: "Dutch Rabbit",
          blurb: "Balance is your strength today. Keep things split right down the middle.",
          type: "Classic",
          personality: "Balanced",
          ability: "Tuxedo Elegance",
          fact: "One of the oldest known rabbit breeds, recognized immediately by their striking two-tone color pattern.",
        },
        californian: {
          name: "Californian",
          blurb: "You will leave a striking impression on someone new today.",
          type: "Classic",
          personality: "Chill",
          ability: "Thermal Adaptation",
          fact: "Their dark markings on their ears and nose are temperature-sensitive and will get darker in colder weather.",
        },
        harlequin: {
          name: "Harlequin",
          blurb: "A sense of humor will get you out of a tricky situation today.",
          type: "Trickster",
          personality: "Playful",
          ability: "Split Persona",
          fact: "They are sometimes called the 'clown of the rabbits' due to their checkerboard-like coloring.",
        },
        himalayan: {
          name: "Himalayan",
          blurb: "Take a deep breath. A calm approach will yield the best results.",
          type: "Zen",
          personality: "Calm",
          ability: "Cylinder Stretch",
          fact: "They have a unique cylindrical body shape and are one of the calmest rabbit breeds in existence.",
        },
        polish: {
          name: "Polish Rabbit",
          blurb: "You may magically pull a solution out of thin air today.",
          type: "Magical",
          personality: "Alert",
          ability: "Hat Trick",
          fact: "Historically popular with magicians, they are small, highly intelligent, and very attentive to their surroundings.",
        },
        satin: {
          name: "Satin",
          blurb: "You will outshine the competition today without even trying.",
          type: "Radiant",
          personality: "Diva",
          ability: "Light Refraction",
          fact: "A genetic mutation causes their hair shafts to be translucent, making their coat incredibly shiny and reflective.",
        },
        silverFox: {
          name: "Silver Fox",
          blurb: "A rare and unique opportunity is heading your way.",
          type: "Rare",
          personality: "Mysterious",
          ability: "Stand-Up Fur",
          fact: "They are the only breed whose fur will stand straight up on end when stroked backwards until stroked forwards again.",
        },
        blancDeHotot: {
          name: "Blanc de Hotot",
          blurb: "Someone will appreciate your quiet kindness (and your style).",
          type: "Classic",
          personality: "Observer",
          ability: "Eyeliner Gaze",
          fact: "They are completely snow-white except for a distinct, thick black ring around their eyes, resembling eyeliner.",
        },
        miniLop: {
          name: "Mini Lop",
          blurb: "Unexpected snacks may find their way to you today.",
          type: "Companion",
          personality: "Cuddly",
          ability: "Basketball Roll",
          fact: "Their bodies are described by breeders as resembling a basketball with a head attached.",
        },
        jerseyWooly: {
          name: "Jersey Wooly",
          blurb: "A peaceful resolution to a small conflict is in your future.",
          type: "Divine",
          personality: "Mug-Sized",
          ability: "No-Kick Zone",
          fact: "Originally bred to be a low-maintenance wool rabbit, they are famously known as 'the no-kick bunny' for their docility.",
        },
        americanFuzzyLop: {
          name: "American Fuzzy Lop",
          blurb: "Your social energy will bring a smile to someone who needs it.",
          type: "Companion",
          personality: "Social",
          ability: "Wool Blanket",
          fact: "They look like a Holland Lop wearing a wool sweater, resulting from a recessive wool gene in their lineage.",
        },
        checkeredGiant: {
          name: "Checkered Giant",
          blurb: "You'll breeze through your tasks with impressive speed today.",
          type: "Speedster",
          personality: "Active",
          ability: "Racing Stripes",
          fact: "One of the few breeds recognized without a maximum weight limit, known for their distinct butterfly-shaped nose marking.",
        },
        havana: {
          name: "Havana",
          blurb: "Sometimes fading into the background allows you to see the most.",
          type: "Rare",
          personality: "Smooth",
          ability: "Shadow Blend",
          fact: "Named for their rich, chocolate-colored fur, which was said to resemble the color of Havana cigars.",
        },
        tan: {
          name: "Tan Rabbit",
          blurb: "Your sharp instincts will guide you to a clever solution.",
          type: "Speedster",
          personality: "Alert",
          ability: "Doberman Stance",
          fact: "Often called the 'Doberman of rabbits' due to their arched back, striking black-and-tan color, and high intelligence.",
        },
      },
    },
    outdoors: {
      label: "Chapter 03 — Time outdoors",
      heading: "And when I can, I'm outside.",
      body: "Long walks, small hills, cold rivers, warm coffee held in both hands. It resets me.",

      spreadOne: {
        titleLine1: "OUTSIDE",
        titleMid: "is where",
        titleLine2: "You",
        titleHighlight: "will",
        titleLine3: "Find Me.",
        body: "I spend most of my time outside. There is something about being surrounded by people, places, and small moments of everyday life that keeps my mind active. My laptop usually ends up on a café table or a library, my headphones come with me, and inspirations somehow flow better when I'm not staring at the same four walls. This paragraph is actually being written while I'm at a coffee shop. I simply enjoy spending my time out in the world, whether I'm working, wandering, or doing absolutely nothing.",
        altHopscotch: "A sunny day in the park",
        altHorizontalShip: "Grass blowing in the wind",
      },

      spreadTwo: {
        altPanorama: "Sunny beach landscape",
        quote: "The Tide Never Seems to Hurry.",
        body: "One thing I always notice at the beach is how the waves erase footprints in the sand. Every mark belonged to someone who was there just moments ago, someone walking, laughing, thinking, living their own little story. Then the tide comes in, as it always does, leaving the shore untouched again before the next footsteps arrive.",
        altTerraGate: "Water washing over sand",
        altBuddhaBeach: "Rocks by the sea",
      },

      spreadThree: {
        heading: "The Walk.",
        subheading: "No destination in mind. Just collecting little moments along the way.",
        altCurrency: "Sunlight shining through green leaves",
        altGoose: "Shadows on a textured wall",
        altFireworks: "A quiet street",
      },

      spreadFour: {
        altCoffeeHill: "Mountain forest trees",
        note: "altitude shift.",
        body: "Driving up into the hills clears my head faster than anything else. The air drops a few degrees, the city noise fades out, and you get this massive, uninterrupted view. It's the perfect place to sit and do absolutely nothing for hours.",
        altHillTop: "Looking down at the winding road",
        altHillSea: "Mountain view",
      },

      spreadFive: {
        heading: "Coffee First.",
        body: "I spend a lot of time in coffee shops. Usually with my laptop or whatever I happen to be studying or reading that week. Just ambient noise, good light and cool people surrounding me.",
        altRaspCafe: "Iced coffee on a table",
        altNiuFish: "A book, coffee, and sketching materials",
        altShiba: "A cafe table detail",
        altNckh: "A cafe table detail",
      },

      spreadSix: {
        altRockCactus: "A small detail from a park",
        quote: "The weather was just too nice to stay inside.",
        caption: "Another good day.",
        altSanrio: "Beautiful sunset over a quiet road",
      },
    },
  },
  contact: {
    eyebrow: "Contact",
    heading: "Thanks for making it this far.",
    body: "If any of this resonates with you, let's connect! Whether you want to discuss a role or talk about work, or just have a chat about bunnies, my inbox is always open. Drop me a message on any of my socials, and I'll make sure to get back to you.",
    links: {
      email: "tn.hau1115@gmail.com",
      linkedin: "linkedin.com/in/ngọc-hậu-a98337299",
      instagram: "instagram.com/n.hau1115",
      facebook: "facebook.com/narwhal333",
      github: "github.com/dodoododo",
    },
  },
  countries: {
    Turkey: {
      name: "Türkiye",
      flag: "tr",
      caption:
        "Istanbul sits on two continents at once, a city where empires have layered on top of each other for 1,600 years.",
      cities: ["Istanbul", "Cappadocia", "Antalya", "Adana"],
      letters: {
        "Istanbul": {
          title: "Crossing the Bosphorus",
          body: "Few cities occupy two continents at once. Istanbul is essentially a massive, living cross-section of history where Roman, Byzantine, and Ottoman legacies are stacked right on top of one another. I’ve been fascinated by Istanbul not just for the landmarks, but to feel the spirit where great empires have once stood.",
          signature: "Soon to be there"
        },
        "Cappadocia": {
          title: "Valley of Chimneys",
          body: "There’s something surreal about a landscape formed by volcanic erosion that looks like it belongs on another planet. It’s not just the balloons that draw me in; it’s the idea of an entire civilization that carved homes and subterranean cities directly into the soft stone to survive.",
          signature: "A dream to chase"
        },
        "Antalya": {
          title: "The Turquoise Coast",
          body: "Most people look for beaches, but I’m drawn to how the Lycian Way connects the mountains to the sea. Finding Roman ruins that have spent centuries slowly crumbling into the Mediterranean seems like a humbling way to understand how time and nature eventually reclaim everything humans leave behind.",
          signature: "Looking forward"
        },
        "Adana": {
          title: "Adana Kebab isn't just any kebab",
          body: "My love for Türkiye was sparked thousands of miles away by someone who brought their hometown to life for me. I found my heart still captivated by the warmth of the locals and a culture that treats even distant strangers like brothers. It was the spirit of those unseen people that permanently anchored me to a country I am now counting the days to finally breathe in. I sometimes imagine myself in that sun-drenched city, enjoying an Adana kebab while walking beside the Seyhan River.",
          signature: "A future journey"
        }
      }
    },
    Lebanon: {
      name: "Lebanon",
      flag: "lb",
      caption: "A tiny country on the Mediterranean where thousands of years of trade, conflict, and culture have left incredible marks.",
      cities: ["Beirut", "Byblos", "Baalbek", "Tripoli"],
      letters: {
        "Beirut": {
          title: "Seven Times Rebuilt",
          body: "It’s hard not to respect a city that has been destroyed and rebuilt seven times. Beirut sits right on the Mediterranean, balancing a chaotic modern energy with visible scars from its past. I’m fascinated by that kind of stubborn resilience and how people continue to thrive there regardless.",
          signature: "Hoping to visit"
        },
        "Byblos": {
          title: "The Roots of Writing",
          body: "Have you ever wondered where the alphabet actually came from? This port city is one of the oldest continuously inhabited places on Earth, and it’s where the Phoenicians developed the letters we rely on today. Walking through a town that literally shaped human communication just sounds mind-bending to me.",
          signature: "A historical dream"
        },
        "Baalbek": {
          title: "Impossible Scale",
          body: "Rome usually gets all the attention for ancient architecture, but some of the most massive Roman temples ever built are actually hidden here. The stones used in the foundations weigh hundreds of tons. It is an engineering mystery that makes you question how much we really understand about the past.",
          signature: "Someday soon"
        },
        "Tripoli": {
          title: "The Living Souk",
          body: "While most historical centers feel like curated museums, this northern city still functions exactly as it did centuries ago. The old Mamluk-era architecture isn't cordoned off; it's where daily life, tailoring, and trading actually happen. I love the idea of experiencing history that is still actively being used.",
          signature: "On my bucket list"
        }
      }
    },
    Nepal: {
      name: "Nepal",
      flag: "np",
      caption: "A country defined by its vertical landscape, where ancient spiritual traditions exist right in the shadow of the Himalayas.",
      cities: ["Kathmandu", "Pokhara", "Namche", "Bhaktapur"],
      letters: {
        "Kathmandu": {
          title: "A Living Museum",
          body: "The line between daily life and ancient religion barely exists here. Instead of locking artifacts behind glass, the locals still actively worship at centuries-old shrines right in the middle of chaotic traffic. I find that constant intersection of loud modern life and quiet spiritual tradition incredibly interesting.",
          signature: "A spiritual goal"
        },
        "Pokhara": {
          title: "Beneath the Peaks",
          body: "After the intensity of the capital, this lakeside town seems like the ultimate psychological reset. The massive, snow-capped Himalayas sit so close that they reflect perfectly in the water below. It simply looks like one of the most peaceful environments on the planet to sit and clear your head.",
          signature: "Waiting for the day"
        },
        "Namche": {
          title: "The Final Outpost",
          body: "You can only reach this village by walking for days through steep mountain valleys. As the main trading hub for Sherpas before the final push into the high Himalayas, it has a completely unique frontier atmosphere. I am fascinated by isolated communities that thrive in such extreme altitudes.",
          signature: "A high altitude dream"
        },
        "Bhaktapur": {
          title: "Pausing Time",
          body: "Cars are banned from the center of this city, which completely changes how a place feels. Because the traditional brick and carved-wood architecture has been preserved for hundreds of years, walking the streets is probably the closest thing we have to actual time travel.",
          signature: "A timeless wish"
        }
      }
    },
Spain: {
      name: "Spain",
      flag: "es",
      caption: "A peninsula where centuries of Catholic and Moorish history created a remarkably intense, artistic culture.",
      cities: ["Barcelona", "Sevilla", "Granada", "Madrid"],
      letters: {
        "Barcelona": {
          title: "The Grid and the Curve",
          body: "It’s hard to wrap my head around a city laid out in a perfectly rigid grid, yet defined by an architect who completely ignored straight lines. I’d love to walk through the Gothic Quarter just to see how that heavy medieval history sits right next to Gaudí’s surrealist imagination.",
          signature: "A future memory"
        },
        "Sevilla": {
          title: "Layered Centuries",
          body: "Southern Spain has this deep, intense energy that I find really compelling. The Moorish architecture of the Alcázar shows how different cultures can physically blend over centuries, and I'm curious to experience a place where art, history, and daily life seem so loudly intertwined.",
          signature: "Hoping to go"
        },
        "Granada": {
          title: "The Last Stronghold",
          body: "This was the last Muslim stronghold in Western Europe, and you can still feel that historical weight in the city. The Alhambra isn't just a beautiful palace to me; it's a physical reminder of a completely different era of European history that quietly survived in the mountains.",
          signature: "A Moorish dream"
        },
        "Madrid": {
          title: "The Cultural Gravity",
          body: "Being the geographical center of the peninsula gives this city a massive, undeniable gravity. I’m mostly drawn to the sheer volume of art housed there. Standing in front of Velázquez's work in person seems like a necessary pilgrimage for anyone who appreciates European history.",
          signature: "On my itinerary"
        }
      }
    },
    Morocco: {
      name: "Morocco",
      flag: "ma",
      caption: "A crossroads of African, Arab, and Berber cultures with incredibly distinct urban environments.",
      cities: ["Marrakech", "Chefchaouen", "Fez", "Essaouira"],
      letters: {
        "Marrakech": {
          title: "Chaos and Silence",
          body: "The contrast here is what gets my attention. The medina is famous for being this overwhelmingly chaotic, loud maze, but the traditional riads are designed to be completely silent, inward-facing sanctuaries. I really want to experience how those two extremes exist side by side.",
          signature: "A future adventure"
        },
        "Chefchaouen": {
          title: "More Than a Color",
          body: "It’s easy to just look at the blue walls and see a nice photograph, but the history is what actually pulls me in. It was heavily shaped by Jewish and Moorish refugees fleeing Spain, turning an isolated mountain outpost into a beautiful, enduring refuge.",
          signature: "Lost in imagination"
        },
        "Fez": {
          title: "The Medieval Maze",
          body: "This is one of the largest car-free urban areas on the planet. The idea of navigating a medieval maze of thousands of alleys where modern infrastructure basically doesn't apply is fascinating to me. It feels like a rare chance to see a major city functioning almost exactly as it did centuries ago.",
          signature: "A goal to explore"
        },
        "Essaouira": {
          title: "The Unhurried Port",
          body: "Unlike the intense desert cities, this coastal fortress has a reputation for a much slower, artistic rhythm. It was a major trading hub where European and North African architecture collided, creating a relaxed port town that feels historically heavy but completely unhurried.",
          signature: "Waiting to visit"
        }
      }
    },
    China: {
      name: "China",
      flag: "cn",
      caption: "The scale is difficult to grasp, a country rushing into the future while standing on an immense ancient foundation.",
      cities: ["Beijing", "Shanghai", "Chengdu", "Lijiang"],
      letters: {
        "Beijing": {
          title: "The Imperial Weight",
          body: "The sheer scale of power embedded in the architecture here is hard to comprehend. The Forbidden City was designed to make you feel incredibly small. I’m fascinated by how those massive imperial structures sit right alongside the narrow hutongs where normal people have lived for generations.",
          signature: "A historical journey"
        },
        "Shanghai": {
          title: "Borders of Time",
          body: "Nowhere else shows the friction between the past and the hyper-future quite like this. You have heavy, European-style colonial banking buildings on one side of the river, staring directly at a sci-fi skyline on the other. It’s like standing on the border of two different centuries.",
          signature: "City of lights"
        },
        "Chengdu": {
          title: "Protecting the Pace",
          body: "Despite being a massive, rapidly growing tech hub, this city is famous for fiercely protecting its relaxed teahouse culture. I respect a place that refuses to sacrifice its slow, deliberate pace of life, even while the rest of the country is rushing forward.",
          signature: "Spicy and relaxed"
        },
        "Lijiang": {
          title: "Shaped by Snowmelt",
          body: "The indigenous Naxi people built this town without a traditional city wall, relying instead on a brilliant network of stone canals fed by mountain snowmelt. I love the idea of a place shaped entirely by its geography and water, surviving centuries of change in the Himalayan foothills.",
          signature: "A peaceful wish"
        }
      }
    },
    Georgia: {
      name: "Georgia",
      flag: "ge",
      caption: "A rugged nation wedged in the Caucasus mountains, holding onto a unique alphabet and ancient traditions.",
      cities: ["Tbilisi", "Kazbegi", "Mestia", "Batumi"],
      letters: {
        "Tbilisi": {
          title: "The Historic Intersection",
          body: "Geographically and culturally, this city has always been wedged directly between empires. You can see it in the architecture, where carved wooden balconies are mixed with Soviet brutalism and ancient churches. I’m drawn to places that are forced to weave completely different worlds together.",
          signature: "Heart of the Caucasus"
        },
        "Kazbegi": {
          title: "A Statement in Stone",
          body: "Placing a small, stone church alone on a steep peak surrounded by the massive Caucasus mountains is such a bold statement of isolation. It looks less like a destination and more like a physical test to prove how much you want to be there.",
          signature: "A mountain dream"
        },
        "Mestia": {
          title: "Valleys of Towers",
          body: "For centuries, the Svan people lived in such deep mountain isolation that every family essentially had to build their own stone watchtower for defense. Exploring a region that developed its own distinct language and survival culture completely cut off from the rest of the world sounds incredible.",
          signature: "High in the valleys"
        },
        "Batumi": {
          title: "The Coastal Contradiction",
          body: "It has this bizarre reputation as an eccentric resort town on the Black Sea, filled with strange, futuristic skyscrapers sitting right next to old Soviet blocks. I’m mostly just curious to see how such a contradictory, experimental coastal city actually functions in real life.",
          signature: "Coastal curiosity"
        }
      }
    },
    Greece: {
      name: "Greece",
      flag: "gr",
      caption: "White cubes stepping down cliffs, olive light on the Aegean, and 3,000 years of philosophy layered underneath it.",
      cities: ["Athens", "Santorini", "Crete", "Meteora"],
      letters: {
        "Athens": {
          title: "Marble and Graffiti",
          body: "I want to walk through the Plaka district and feel the worn marble paving stones beneath my feet. Seeing the Acropolis glowing over a sprawling, chaotic modern city is something I have to witness.",
          signature: "Under the Parthenon"
        },
        "Santorini": {
          title: "The Edge of the Caldera",
          body: "It might be a cliché, but seeing those blue domes matching the exact color of the Aegean Sea is a dream. I want to stand on the volcanic cliffside and watch that world-famous sunset.",
          signature: "An Aegean dream"
        },
        "Crete": {
          title: "The Wild Island",
          body: "I want to wander the ancient ruins of Knossos and try to imagine the Minoan labyrinth. The combination of rugged gorges, endless olive groves, and deep history pulls me in.",
          signature: "A myth waiting to be explored"
        },
        "Meteora": {
          title: "Suspended in Air",
          body: "The idea of monasteries perched impossibly on top of massive sandstone pillars feels like fantasy. I want to climb those stone-carved steps as the morning mist wraps around the rocks.",
          signature: "Touching the sky"
        }
      }
    },
Norway: {
      name: "Norway",
      flag: "no",
      caption: "A rugged landscape defined by water and ice, where modern design quietly respects extreme geography.",
      cities: ["Oslo", "Bergen", "Lofoten", "Tromsø"],
      letters: {
        "Oslo": {
          title: "Building With the Forest",
          body: "Most capital cities pave over their natural surroundings, but Oslo seems to have built right into the forest and the water. As a developer, I really appreciate when modern, functional design doesn't try to dominate nature, but actually complements it.",
          signature: "A Nordic goal"
        },
        "Bergen": {
          title: "Embracing the Rain",
          body: "It rains here over two hundred days a year, yet it's still considered one of the most beautiful cities in Europe. There is something incredibly cozy about a coastal town that fully embraces its harsh weather rather than trying to hide from it.",
          signature: "Between seven mountains"
        },
        "Lofoten": {
          title: "The Jagged Edge",
          body: "Geographically, this archipelago barely makes sense. Massive, jagged mountains jut straight out of the freezing ocean, with tiny fishing villages squeezed onto whatever flat rock is left. It looks like the absolute edge of the habitable world, which is exactly why I need to see it.",
          signature: "Above the Arctic Circle"
        },
        "Tromsø": {
          title: "Living in the Dark",
          body: "Being this far north fundamentally changes how you experience time and light. I’m fascinated by the psychology of a community that lives a significant chunk of the year in total polar darkness, waiting for the sky to catch fire with the aurora.",
          signature: "Under the Aurora"
        }
      }
    },
    Iran: {
      name: "Iran",
      flag: "ir",
      caption: "A massive, ancient civilization where the architecture feels like visual mathematics.",
      cities: ["Isfahan", "Tehran", "Shiraz", "Yazd"],
      letters: {
        "Isfahan": {
          title: "Visual Mathematics",
          body: "The architecture here is basically visual mathematics. I've stared at pictures of the tiled ceilings in the main squares, and the geometric precision is so complex it almost looks digital. I need to stand inside those domes to see if human hands actually built them.",
          signature: "Mesmerized by history"
        },
        "Tehran": {
          title: "The Mountain Metropolis",
          body: "What fascinates me here is the sheer scale. You have this massive, congested, heavily sanctioned metropolis of millions of people sitting directly at the base of snow-capped mountains. It feels like a city of heavy contradictions that you can only understand by actually being on the ground.",
          signature: "A future exploration"
        },
        "Shiraz": {
          title: "Reverence for Words",
          body: "It is incredibly rare to find a culture where classical poets are treated like modern rockstars. I'm drawn to the idea that people still gather at tombs of writers who died centuries ago just to recite verses. It shows a deep societal respect for art and language.",
          signature: "In the gardens"
        },
        "Yazd": {
          title: "Ancient Engineering",
          body: "Long before air conditioning, the people here engineered massive windcatchers to pull cool breezes down into mud-brick buildings. As someone interested in how systems work, seeing a desert city that figured out sustainable climate control thousands of years ago is incredibly cool to me.",
          signature: "Oasis in the sand"
        }
      }
    },
    India: {
      name: "India",
      flag: "in",
      caption: "A sensory overload where multiple distinct centuries seem to be occurring at the exact same time.",
      cities: ["Delhi", "Varanasi", "Jaipur", "Kochi"],
      letters: {
        "Delhi": {
          title: "Seven Cities Deep",
          body: "They say this place is actually seven different historical cities built directly on top of each other. I'm drawn to that kind of dense, chaotic history where you can step out of a hyper-modern metro station and immediately trip over a centuries-old Mughal tomb.",
          signature: "Amidst the noise"
        },
        "Varanasi": {
          title: "The Honest River",
          body: "Few places on earth treat mortality as openly as this city. The spiritual intensity of people coming to the river to bathe, pray, and cremate their dead all in the same space feels overwhelming. It’s the kind of culture shock that forces you to change your perspective.",
          signature: "By the holy river"
        },
        "Jaipur": {
          title: "Design and Hospitality",
          body: "The entire core of the city was painted pink in the 1800s just to welcome a foreign king, and they simply kept it that way. I love how deeply aesthetics and hospitality are baked into the city's identity, especially the intricate facades designed just to manipulate the wind.",
          signature: "Rajasthan diaries"
        },
        "Kochi": {
          title: "The Quiet Crossroads",
          body: "Because of the ancient spice trade, this southern coast became a magnet for completely different worlds. You can find Portuguese churches, Chinese fishing nets, and a Jewish synagogue all in the same tropical neighborhood. It’s a fascinating, quiet crossroads of global history.",
          signature: "Southern breeze"
        }
      }
    },
    Malaysia: {
      name: "Malaysia",
      flag: "my",
      caption: "A masterclass in cultural blending, where heavy jungle constantly threatens to swallow the skyscrapers.",
      cities: ["Kuala Lumpur", "Penang", "Malacca", "Kota Kinabalu"],
      letters: {
        "Kuala Lumpur": {
          title: "The Rapid Ascent",
          body: "This city went from a muddy tin-mining town to a futuristic skyline in practically a blink of an eye. The speed of its development is staggering, yet it still retains pockets of deep jungle and old colonial architecture right beneath the massive towers.",
          signature: "In the urban jungle"
        },
        "Penang": {
          title: "History Through Food",
          body: "If you want to understand how migration shapes culture, you look at the food. Here, Malay, Chinese, and Indian influences have been cross-pollinating for generations in a decaying colonial port town. I'd go just to experience what that kind of deep cultural mixing actually tastes like.",
          signature: "A culinary pilgrimage"
        },
        "Malacca": {
          title: "The Maritime Chokepoint",
          body: "For centuries, whoever controlled this narrow strait basically controlled global trade. Walking through the town means seeing the architectural scars left behind by the Portuguese, Dutch, and British empires who all fought to hold this tiny, strategic piece of land.",
          signature: "By the straits"
        },
        "Kota Kinabalu": {
          title: "The Urban Wild",
          body: "It’s rare to find a modern city that feels like it’s merely tolerating the jungle around it. The fact that you can be standing in a busy urban center and still see one of the highest peaks in Southeast Asia looming in the background gives the place a very wild edge.",
          signature: "Island time"
        }
      }
    },
    Japan: {
      name: "Japan",
      flag: "jp",
      caption: "The ultimate intersection of deep historical preservation and relentless technological momentum.",
      cities: ["Kyoto", "Tokyo", "Kanazawa", "Osaka"],
      letters: {
        "Kyoto": {
          title: "The Language Goal",
          body: "I’ve spent years studying Japanese, aiming for a career bridging tech between Vietnam and Japan. To finally walk through a preserved capital that survived centuries of war, and actually be able to read the signs and speak with the locals naturally, would be the realization of a massive personal goal.",
          signature: "A dream to realize"
        },
        "Tokyo": {
          title: "The Engineering Miracle",
          body: "As a software developer, this city represents the pinnacle of complex systems working flawlessly. Moving thirty million people a day without the infrastructure collapsing is a miracle. I want to experience that relentless momentum firsthand before I eventually start working there.",
          signature: "A goal of mine"
        },
        "Kanazawa": {
          title: "The Untouched Era",
          body: "Because it was largely spared from bombing in the war, this is one of the few places where entire samurai and geisha districts remain completely intact. I’m a huge history nerd, so the idea of walking down streets that haven’t changed layout since the Edo period is incredibly appealing.",
          signature: "From the old districts"
        },
        "Osaka": {
          title: "The Loud Sibling",
          body: "Everything I’ve read says the culture here is the complete opposite of Tokyo’s polite reserve. It’s loud, food-obsessed, and fiercely independent. I'm really curious to experience that stark contrast in regional personality within a country that outsiders often assume is completely uniform.",
          signature: "Kuidaore (Eat till you drop)"
        }
      }
    },
    Mexico: {
      name: "Mexico",
      flag: "mx",
      caption: "A vibrant collision of indigenous roots and colonial history, built over jungles and sinking lakes.",
      cities: ["Mexico City", "Oaxaca", "Mérida", "Tulum"],
      letters: {
        "Mexico City": {
          title: "The Sinking Megalopolis",
          body: "The Spanish literally paved over an Aztec island capital sitting in the middle of a massive lake to build this place. Because of that, the entire metropolis is slowly sinking. I am fascinated by how a city with that much historical and geographical baggage manages to be so culturally dominant.",
          signature: "CDMX Calling"
        },
        "Oaxaca": {
          title: "The Cultural Anchor",
          body: "Southern Mexico feels like the cultural anchor of the country. The indigenous traditions here weren't erased; they evolved and heavily influenced the art and the incredibly complex food systems. It feels like a place where you can learn a lot just by paying attention to what people are cooking.",
          signature: "Heart of the South"
        },
        "Mérida": {
          title: "Civilization on Limestone",
          body: "The geography of the Yucatán is entirely porous limestone, meaning there are no rivers—just thousands of underground sinkholes holding freshwater. The Maya built their civilization around them. I'm drawn to how completely dependent the history and the people are on this bizarre, fragile geology.",
          signature: "Yucatán heat"
        },
        "Tulum": {
          title: "Fortress on the Cliff",
          body: "Most ancient ruins are buried deep in jungles or mountains, but the Maya built a massive stone fortress right on the edge of a cliff facing the Caribbean Sea. I'm curious to see what a powerful ancient trading hub actually looks like when it's placed in paradise.",
          signature: "By the Caribbean"
        }
      }
    },
    Colombia: {
      name: "Colombia",
      flag: "co",
      caption: "A country of extreme topographical shifts, where the Andes drop sharply into the Caribbean.",
      cities: ["Bogotá", "Medellín", "Cartagena", "Salento"],
      letters: {
        "Bogotá": {
          title: "Life at 8,000 Feet",
          body: "Sitting over eight thousand feet up in the Andes, this capital is higher than most ski resorts. I’m really curious about how an entire society functions at that extreme altitude, blending dense, modern urban brickwork with the freezing, thin mountain air.",
          signature: "High in the Andes"
        },
        "Medellín": {
          title: "The Civic Turnaround",
          body: "Thirty years ago, this was considered one of the most dangerous cities on the planet. Today, it’s celebrated for using innovative public transit to connect its poorest mountain neighborhoods to the center. As someone who appreciates problem-solving, that kind of civic turnaround is incredibly inspiring.",
          signature: "Valley views"
        },
        "Cartagena": {
          title: "The Imperial Vault",
          body: "This was the primary port where the Spanish stockpiled their plundered gold before shipping it back to Europe. The massive stone walls built to repel pirates are still standing. I love the idea of exploring a Caribbean city that was essentially designed as an impenetrable bank vault.",
          signature: "Caribbean magic"
        },
        "Salento": {
          title: "The Giant Palms",
          body: "The landscape here messes with your sense of scale. It’s a high-altitude cloud forest filled with the tallest palm trees in the world, stretching almost two hundred feet into the fog. It looks like a glitch in nature, which makes me really want to hike through it.",
          signature: "With a warm cup"
        }
      }
    },
    Egypt: {
      name: "Egypt",
      flag: "eg",
      caption: "A monumental civilization carved entirely from the desert, completely dependent on the pulse of the Nile.",
      cities: ["Cairo", "Luxor", "Alexandria", "Aswan"],
      letters: {
        "Cairo": {
          title: "Pressing Against Antiquity",
          body: "What blows my mind is that the Pyramids aren't in the middle of a remote desert; the sprawl of a twenty-million-person metropolis reaches right up to their base. The friction of the chaotic, modern world pressing directly against ancient tombs is exactly what I want to see.",
          signature: "Drawn to the desert"
        },
        "Luxor": {
          title: "The Open-Air Museum",
          body: "Roughly a third of the world's ancient monuments are concentrated around this single bend in the river. It’s essentially an open-air museum the size of a city. The idea that you can casually walk past massive columns that have been standing for millennia is hard to comprehend.",
          signature: "Fascinated by the past"
        },
        "Alexandria": {
          title: "The Lost Brain",
          body: "This used to be the intellectual center of the ancient world, home to the Great Library. Even though the old monuments are gone, I am drawn to the Mediterranean atmosphere of a place that spent centuries serving as the brain of human civilization.",
          signature: "A historical wish"
        },
        "Aswan": {
          title: "The Sharp Boundary",
          body: "Geography dictates everything here. You can stand on the banks of the Nile and see the exact line where the lush green vegetation abruptly stops and the brutal, endless Sahara begins. I want to experience that stark physical boundary of where life is possible.",
          signature: "Waiting for the river"
        }
      }
    },
    Russia: {
      name: "Russia",
      flag: "ru",
      caption: "A vast, enigmatic land that uses sheer physical scale and brutal winters to project power.",
      cities: ["Moscow", "Saint Petersburg", "Dagestan", "Vladivostok"],
      letters: {
        "Moscow": {
          title: "The Weight of the State",
          body: "The architecture here is designed to make you feel the weight of the state. Even the subway stations were built to look like underground palaces. I'm fascinated by places that use their infrastructure and physical scale to project power and history so aggressively.",
          signature: "A winter dream"
        },
        "Saint Petersburg": {
          title: "The Forced Capital",
          body: "Peter the Great basically forced a European-style capital out of a freezing, uninhabitable swamp just to prove a point. Because it was so planned, the city has a haunting, unnatural symmetry to it, especially during the summer when the sun never fully sets.",
          signature: "Drawn to the arts"
        },
        "Dagestan": {
          title: "Hidden Diversity",
          body: "Most people don't realize that the Caucasus mountains hide dozens of distinct ethnic groups and languages in a very small area. The isolation of these steep villages has preserved ancient ways of life that I’d love to learn about directly, far away from typical tourist routes.",
          signature: "Into the mountains"
        },
        "Vladivostok": {
          title: "Edge of the Continent",
          body: "It takes seven days on a train from Moscow just to get here. The idea of a major European-style naval city perched on the absolute edge of Asia, overlooking the Pacific Ocean, is a geographical anomaly that I find incredibly curious.",
          signature: "A journey's end"
        }
      }
    },
    Czechia: {
      name: "Czechia",
      flag: "cz",
      caption: "A dense architectural archive in the heart of Europe that somehow survived centuries of conflict.",
      cities: ["Prague", "Český Krumlov", "Mariánské Lázně", "Brno"],
      letters: {
        "Prague": {
          title: "The Unbroken Timeline",
          body: "Unlike many European capitals, this city mostly survived the world wars intact. Walking around means actually seeing a genuine, unbroken timeline of Gothic, Renaissance, and Baroque architecture. It’s essentially a massive architectural archive that hasn't been bombed or rebuilt.",
          signature: "A Bohemian dream"
        },
        "Český Krumlov": {
          title: "Preserved by Neglect",
          body: "Because it was ignored and largely forgotten during the Cold War, this town accidentally preserved its medieval layout perfectly. It’s fascinating how being entirely neglected by modern development can eventually become a place's greatest historical asset.",
          signature: "Lost in a fairy tale"
        },
        "Mariánské Lázně": {
          title: "The Aristocratic Retreat",
          body: "I’m intrigued by the strange, lavish 19th-century culture where European elites would travel to remote forested valleys just to drink mineral water. The town is basically a perfectly preserved monument to historical wellness and the old aristocratic way of taking a break.",
          signature: "Seeking tranquility"
        },
        "Brno": {
          title: "Function Over Fairy Tales",
          body: "While the capital gets all the attention for looking like a fairy tale, this city is famous for raw modernist architecture and massive underground tunnel systems. I always prefer visiting the secondary cities that actually feel lived-in and prioritize function over catering to crowds.",
          signature: "Off the beaten path"
        }
      }
    }
  }
};