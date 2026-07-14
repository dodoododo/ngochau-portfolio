import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- 🐰 BUNNY DATABASE (20 Species) ---
const BUNNY_DATABASE = [
  {
    id: "holland-lop",
    name: "Holland Lop",
    rarity: "★★★★☆",
    type: "Companion Bunny",
    personality: "Gentle, Curious, Affectionate",
    fortune: "Like a Holland Lop, you'll win people over simply by being yourself.",
    fact: "Holland Lops are one of the smallest lop-eared rabbit breeds, known for their massive 'crown' of fur.",
    stats: { power: 25, speed: 40, friendliness: 98, curiosity: 91, fluffiness: 100 },
    snack: "Banana Slices",
    habitat: "Cozy Living Rooms",
    ability: "Professional Couch Potato",
    color: "from-amber-200 to-orange-100",
    emoji: "🐰",
  },
  {
    id: "netherland-dwarf",
    name: "Netherland Dwarf",
    rarity: "★★★★★",
    type: "Pocket Rocket",
    personality: "Spirited, Sassy, Energetic",
    fortune: "A burst of unexpected energy will help you finish your tasks today.",
    fact: "They have a 'dwarf gene' that makes them extremely tiny with large eyes and short ears.",
    stats: { power: 90, speed: 100, friendliness: 60, curiosity: 95, fluffiness: 70 },
    snack: "Apple Skin",
    habitat: "Under the Sofa",
    ability: "Master of Zoomies",
    color: "from-slate-200 to-gray-100",
    emoji: "🐇",
  },
  {
    id: "lionhead",
    name: "Lionhead",
    rarity: "★★★★☆",
    type: "Royal Fluff",
    personality: "Majestic, Timid, Sweet",
    fortune: "Your hair might be messy today, but your spirit is majestic.",
    fact: "They possess a genetic mutation causing a wooly mane around their head, just like a male lion.",
    stats: { power: 40, speed: 50, friendliness: 85, curiosity: 75, fluffiness: 120 },
    snack: "Dandelion Greens",
    habitat: "Plush Rugs",
    ability: "Fluff Explosion",
    color: "from-yellow-200 to-amber-100",
    emoji: "🦁",
  },
  {
    id: "flemish-giant",
    name: "Flemish Giant",
    rarity: "★★★★★",
    type: "Gentle Giant",
    personality: "Docile, Patient, Lazy",
    fortune: "A good long nap may solve more of your problems than hard work today.",
    fact: "They are the largest breed of domestic rabbit, often weighing over 15 pounds!",
    stats: { power: 99, speed: 20, friendliness: 95, curiosity: 50, fluffiness: 80 },
    snack: "An Entire Carrot",
    habitat: "The Entire Bed",
    ability: "Unmovable Object",
    color: "from-stone-300 to-stone-100",
    emoji: "🏔️",
  },
  {
    id: "mini-rex",
    name: "Mini Rex",
    rarity: "★★★☆☆",
    type: "Velvet Bunny",
    personality: "Energetic, Friendly, Soft",
    fortune: "Things will go smoothly for you today, much like velvet.",
    fact: "Their fur lacks long guard hairs, making them feel exactly like crushed velvet.",
    stats: { power: 50, speed: 85, friendliness: 90, curiosity: 88, fluffiness: 95 },
    snack: "Papaya",
    habitat: "Sunny Window Sills",
    ability: "Velvet Touch",
    color: "from-red-200 to-rose-100",
    emoji: "🧸",
  },
  {
    id: "english-angora",
    name: "English Angora",
    rarity: "★★★★★",
    type: "Cloud Entity",
    personality: "Docile, High-Maintenance",
    fortune: "Expect a day filled with soft comforts and a little extra grooming.",
    fact: "They are the only rabbit breed with facial furnishings (wool covering their eyes).",
    stats: { power: 10, speed: 30, friendliness: 85, curiosity: 60, fluffiness: 999 },
    snack: "Specialty Pellets",
    habitat: "Grooming Table",
    ability: "Static Electricity Shield",
    color: "from-gray-100 to-white",
    emoji: "☁️",
  },
  {
    id: "dutch",
    name: "Dutch Rabbit",
    rarity: "★★★☆☆",
    type: "Classic Hop",
    personality: "Easygoing, Adaptable",
    fortune: "Balance is your strength today. Keep things split right down the middle.",
    fact: "They are easily identified by their strict tuxedo-like color pattern with a white blaze.",
    stats: { power: 60, speed: 70, friendliness: 90, curiosity: 80, fluffiness: 50 },
    snack: "Timothy Hay",
    habitat: "Cardboard Castles",
    ability: "Tuxedo Charm",
    color: "from-zinc-800 to-zinc-500",
    emoji: "🎩",
  },
  {
    id: "californian",
    name: "Californian",
    rarity: "★★★☆☆",
    type: "Shadow Point",
    personality: "Friendly, Mild-tempered",
    fortune: "You will leave a striking impression on someone new today.",
    fact: "They have white bodies with distinct dark markings on their nose, ears, feet, and tail.",
    stats: { power: 75, speed: 65, friendliness: 85, curiosity: 70, fluffiness: 60 },
    snack: "Parsley",
    habitat: "Shaded Gardens",
    ability: "Heat Sync (Dark Ears)",
    color: "from-slate-100 to-gray-300",
    emoji: "🌘",
  },
  {
    id: "harlequin",
    name: "Harlequin",
    rarity: "★★★★☆",
    type: "Jester Bunny",
    personality: "Clownish, Playful, Smart",
    fortune: "A sense of humor will get you out of a tricky situation today.",
    fact: "They are known as the clowns of the rabbit world, both for their split colors and goofy antics.",
    stats: { power: 55, speed: 80, friendliness: 95, curiosity: 100, fluffiness: 65 },
    snack: "Bell Peppers",
    habitat: "Obstacle Courses",
    ability: "Illusion Trick",
    color: "from-orange-300 to-slate-800",
    emoji: "🎭",
  },
  {
    id: "himalayan",
    name: "Himalayan",
    rarity: "★★★☆☆",
    type: "Zen Leaper",
    personality: "Calm, Patient, Gentle",
    fortune: "Take a deep breath. A calm approach will yield the best results.",
    fact: "They are one of the oldest and calmest rabbit breeds, known for their cylindrical bodies.",
    stats: { power: 30, speed: 60, friendliness: 100, curiosity: 50, fluffiness: 40 },
    snack: "Mint Leaves",
    habitat: "Meditation Cushions",
    ability: "Absolute Zen",
    color: "from-neutral-200 to-neutral-400",
    emoji: "🧘",
  },
  {
    id: "polish",
    name: "Polish Rabbit",
    rarity: "★★☆☆☆",
    type: "Magician's Assistant",
    personality: "Compact, Clever, Alert",
    fortune: "You may magically pull a solution out of thin air today.",
    fact: "Despite their name, they likely originated in England and were widely used by magicians.",
    stats: { power: 45, speed: 85, friendliness: 80, curiosity: 90, fluffiness: 45 },
    snack: "Cilantro",
    habitat: "Magic Hats",
    ability: "Disappearing Act",
    color: "from-stone-800 to-stone-900",
    emoji: "🎩",
  },
  {
    id: "satin",
    name: "Satin",
    rarity: "★★★☆☆",
    type: "Glossy Hopper",
    personality: "Shiny, Active, Good-natured",
    fortune: "You will outshine the competition today without even trying.",
    fact: "A genetic mutation gives their hair shafts a glass-like shell, making them incredibly shiny.",
    stats: { power: 65, speed: 75, friendliness: 88, curiosity: 75, fluffiness: 70 },
    snack: "Strawberries",
    habitat: "Red Carpets",
    ability: "Blinding Shine",
    color: "from-rose-300 to-orange-200",
    emoji: "✨",
  },
  {
    id: "silver-fox",
    name: "Silver Fox",
    rarity: "★★★★★",
    type: "Rare Legend",
    personality: "Docile, Adaptable, Rare",
    fortune: "A rare and unique opportunity is heading your way.",
    fact: "They are the only breed whose fur stands straight up when stroked backwards.",
    stats: { power: 85, speed: 50, friendliness: 92, curiosity: 80, fluffiness: 90 },
    snack: "Blueberries",
    habitat: "Hidden Burrows",
    ability: "Silver Camouflage",
    color: "from-slate-500 to-gray-800",
    emoji: "🦊",
  },
  {
    id: "blanc-de-hotot",
    name: "Blanc de Hotot",
    rarity: "★★★★☆",
    type: "Eyeliner Model",
    personality: "Sweet, Active, Dramatic",
    fortune: "Someone will appreciate your quiet kindness (and your style).",
    fact: "They are pure white except for thin, striking black bands around their eyes like mascara.",
    stats: { power: 50, speed: 70, friendliness: 90, curiosity: 85, fluffiness: 75 },
    snack: "Apple Cores",
    habitat: "Vanity Desks",
    ability: "Piercing Gaze",
    color: "from-white to-gray-200",
    emoji: "👁️",
  },
  {
    id: "mini-lop",
    name: "Mini Lop",
    rarity: "★★★☆☆",
    type: "Snuggle Bug",
    personality: "Playful, Cuddly, Chunky",
    fortune: "Unexpected snacks may find their way to you today.",
    fact: "They are stockier and slightly larger than Holland Lops, resembling tiny basketballs.",
    stats: { power: 60, speed: 45, friendliness: 100, curiosity: 85, fluffiness: 85 },
    snack: "Oatmeal Treats",
    habitat: "Pile of Pillows",
    ability: "Snack Detector",
    color: "from-orange-200 to-yellow-100",
    emoji: "🏀",
  },
  {
    id: "jersey-wooly",
    name: "Jersey Wooly",
    rarity: "★★★★☆",
    type: "Mug Bunny",
    personality: "Docile, Gentle, 'No-Kick'",
    fortune: "A peaceful resolution to a small conflict is in your future.",
    fact: "Bred specifically to be a small, easy-to-care-for pet bunny that never bites or kicks.",
    stats: { power: 15, speed: 35, friendliness: 99, curiosity: 70, fluffiness: 110 },
    snack: "Romaine Lettuce",
    habitat: "Large Teacups",
    ability: "Pacifist Aura",
    color: "from-blue-100 to-indigo-100",
    emoji: "☕",
  },
  {
    id: "american-fuzzy-lop",
    name: "American Fuzzy Lop",
    rarity: "★★★★☆",
    type: "Fuzz Ball",
    personality: "Active, Sweet, Social",
    fortune: "Your social energy will bring a smile to someone who needs it.",
    fact: "They look like a Holland Lop wearing an oversized fuzzy sweater.",
    stats: { power: 40, speed: 65, friendliness: 95, curiosity: 90, fluffiness: 115 },
    snack: "Kale Stems",
    habitat: "Laundry Baskets",
    ability: "Sweater Mimicry",
    color: "from-emerald-100 to-teal-100",
    emoji: "🧶",
  },
  {
    id: "checkered-giant",
    name: "Checkered Giant",
    rarity: "★★★★☆",
    type: "Speed Racer",
    personality: "Active, Independent",
    fortune: "You'll breeze through your tasks with impressive speed today.",
    fact: "Unlike other giant breeds, they have an arched back and are built for speed.",
    stats: { power: 85, speed: 95, friendliness: 60, curiosity: 85, fluffiness: 50 },
    snack: "Carrot Tops",
    habitat: "Running Tracks",
    ability: "Hit and Run",
    color: "from-gray-300 to-gray-500",
    emoji: "🏁",
  },
  {
    id: "havana",
    name: "Havana",
    rarity: "★★★☆☆",
    type: "Shadow Lurker",
    personality: "Relaxed, Mink-like, Quiet",
    fortune: "Sometimes fading into the background allows you to see the most.",
    fact: "Named for their rich chocolate color which resembled Havana cigars.",
    stats: { power: 55, speed: 60, friendliness: 85, curiosity: 65, fluffiness: 75 },
    snack: "Basil",
    habitat: "Dark Corners",
    ability: "Silent Judger",
    color: "from-amber-900 to-stone-800",
    emoji: "🍫",
  },
  {
    id: "tan",
    name: "Tan Rabbit",
    rarity: "★★★★☆",
    type: "Doberman Bunny",
    personality: "Energetic, Sleek, Alert",
    fortune: "Your sharp instincts will guide you to a clever solution.",
    fact: "They have a fully arched body type and striking black and tan markings like a Doberman dog.",
    stats: { power: 70, speed: 100, friendliness: 70, curiosity: 95, fluffiness: 40 },
    snack: "Blackberries",
    habitat: "High Shelves",
    ability: "Parkour Master",
    color: "from-orange-600 to-stone-900",
    emoji: "🐕",
  }
];

export default function BunnyGacha() {
  const [step, setStep] = useState<"idle" | "cranking" | "dropping" | "opening" | "result">("idle");
  const [result, setResult] = useState<typeof BUNNY_DATABASE[0] | null>(null);

  const handlePull = () => {
    if (step !== "idle") return;
    
    // 1. Crank the machine
    setStep("cranking");

    // 2. Capsule drops
    setTimeout(() => {
      setStep("dropping");
    }, 1000);

    // 3. Capsule opens with sparkles
    setTimeout(() => {
      setStep("opening");
    }, 1800);

    // 4. Reveal result!
    setTimeout(() => {
      const randomBunny = BUNNY_DATABASE[Math.floor(Math.random() * BUNNY_DATABASE.length)];
      setResult(randomBunny);
      setStep("result");
    }, 2800);
  };

  const resetGacha = () => {
    setStep("idle");
    setResult(null);
  };

  return (
    <section className="relative flex min-h-[900px] w-full items-center justify-center overflow-hidden bg-[#fdf6e3] px-6 py-20 font-sans text-[#3a2f2d]">
      
      {/* --- LEFT / CENTER AREA: GACHA MACHINE & TEXT --- */}
      <div className="z-10 flex w-full max-w-5xl flex-col items-center justify-center gap-16 md:flex-row md:items-start md:justify-between">
        
        {/* Text Area */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 className="mb-4 font-serif text-5xl italic tracking-tight md:text-7xl">
            Bunny Fortune<br />Gacha
          </h2>
          <p className="mb-8 max-w-sm text-sm font-medium leading-relaxed text-[#3a2f2d]/70 md:text-base">
            Every bunny has a different personality. Pull a capsule to discover which fluffy companion is watching over your day today.
          </p>
          <button
            onClick={handlePull}
            disabled={step !== "idle"}
            className="group relative overflow-hidden rounded-full bg-[#3a2f2d] px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#fdf6e3] transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <span className="relative z-10">{step === "idle" ? "Pull a Capsule" : "Machine is busy..."}</span>
            <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-[#d65d4b] transition-transform duration-300 group-hover:translate-y-0" />
          </button>
        </div>

        {/* 3D-ish HTML Gacha Machine */}
        <motion.div 
          className="relative mt-8 flex flex-col items-center md:mt-0"
          animate={step === "cranking" ? { x: [-2, 2, -2, 2, 0], y: [0, -2, 0, 2, 0] } : {}}
          transition={{ duration: 0.4, repeat: 2 }}
        >
          {/* Glass Globe */}
          <div className="relative z-20 h-64 w-64 overflow-hidden rounded-full border-4 border-white/60 bg-gradient-to-br from-white/40 to-blue-50/10 shadow-[inset_0_-20px_40px_rgba(0,0,0,0.1)] backdrop-blur-sm">
            {/* Gloss Highlight */}
            <div className="absolute left-[10%] top-[10%] h-20 w-32 rotate-[-25deg] rounded-full bg-white/40 blur-md" />
            
            {/* Colorful placeholder capsules inside the globe */}
            <motion.div 
               animate={step === "cranking" ? { y: [-5, 5, -5], rotate: [-5, 5, -5] } : {}} 
               transition={{ duration: 0.2, repeat: 4 }}
               className="absolute inset-0"
            >
              <div className="absolute bottom-10 left-12 h-16 w-16 rounded-full bg-rose-400 shadow-inner" />
              <div className="absolute bottom-8 right-16 h-16 w-16 rounded-full bg-amber-400 shadow-inner" />
              <div className="absolute bottom-20 left-24 h-16 w-16 rounded-full bg-teal-400 shadow-inner" />
              <div className="absolute bottom-14 right-8 h-16 w-16 rounded-full bg-indigo-400 shadow-inner" />
              <div className="absolute bottom-2 left-24 h-16 w-16 rounded-full bg-pink-400 shadow-inner" />
            </motion.div>
          </div>

          {/* Machine Body */}
          <div className="relative z-10 -mt-6 flex w-72 flex-col items-center rounded-t-2xl rounded-b-3xl bg-gradient-to-b from-[#e37263] to-[#c24b3c] p-6 shadow-2xl">
            {/* Coin Slot & Knob area */}
            <div className="flex w-full items-center justify-between px-4">
              <div className="h-10 w-4 rounded-full bg-black/20 shadow-inner" />
              {/* Rotating Knob */}
              <motion.div 
                animate={step === "cranking" ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-amber-300 shadow-lg"
              >
                <div className="h-2 w-10 rounded-full bg-amber-500" />
              </motion.div>
            </div>

            {/* Exit Slot */}
            <div className="relative mt-8 h-20 w-24 overflow-hidden rounded-xl bg-black/40 shadow-inner">
              <div className="absolute -top-2 left-0 h-4 w-full bg-black/60 shadow-lg" />
              
              {/* The Dropping Capsule */}
              <AnimatePresence>
                {(step === "dropping" || step === "opening") && (
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 20, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                    className="absolute left-1/2 top-0 h-12 w-12 -translate-x-1/2 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 shadow-lg"
                  >
                    {/* Top half flip animation when opening */}
                    <motion.div 
                      animate={step === "opening" ? { y: -20, rotate: -45, opacity: 0 } : {}}
                      className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-white/50" 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Exit Tray lip */}
            <div className="mt-2 h-4 w-32 rounded-full bg-[#a33729] shadow-md" />
          </div>
        </motion.div>
      </div>

      {/* --- RESULT MODAL OVERLAY --- */}
      <AnimatePresence>
        {step === "result" && result && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#3a2f2d]/60 p-4 backdrop-blur-md"
          >
            {/* Modal Container */}
            <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] bg-[#fdf6e3] shadow-2xl md:flex-row"
            >
              {/* Close Button */}
              <button onClick={resetGacha} className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#3a2f2d]/10 hover:bg-[#3a2f2d]/20 transition-colors">
                ✕
              </button>

              {/* LEFT COL: Info & Fortune */}
              <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#d65d4b]">
                  🎉 You Got
                </p>
                <h3 className="mt-2 font-serif text-4xl italic text-[#3a2f2d]">
                  {result.name}
                </h3>
                <p className="mt-1 text-lg text-amber-500">{result.rarity}</p>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#3a2f2d]/20 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-[#3a2f2d]">
                    {result.type}
                  </span>
                  <span className="rounded-full bg-[#3a2f2d]/5 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-[#3a2f2d]/60">
                    {result.personality}
                  </span>
                </div>

                <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm border border-[#3a2f2d]/5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#3a2f2d]/40">Today's Fortune</p>
                  <p className="mt-2 font-serif text-xl italic leading-snug text-[#3a2f2d]">"{result.fortune}"</p>
                </div>

                <div className="mt-6">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#3a2f2d]/40">Bunny Fact</p>
                  <p className="mt-1 text-sm text-[#3a2f2d]/70 leading-relaxed">{result.fact}</p>
                </div>
              </div>

              {/* RIGHT COL: Collectible Trading Card */}
              <div className="flex w-full items-center justify-center bg-black/5 p-8 md:w-[400px]">
                
                {/* The Card */}
                <motion.div 
                  whileHover={{ rotateY: 10, rotateX: 10, scale: 1.02 }}
                  className="group relative w-full max-w-[320px] overflow-hidden rounded-2xl border-[6px] border-white bg-white p-4 shadow-2xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Holographic Sheen Effect */}
                  <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Card Art Area */}
                  <div className={`flex h-48 w-full items-center justify-center rounded-xl bg-gradient-to-br ${result.color} shadow-inner`}>
                    <span className="text-8xl drop-shadow-lg filter">{result.emoji}</span>
                  </div>

                  {/* Card Header */}
                  <div className="mt-4 flex items-end justify-between border-b-2 border-black/5 pb-2">
                    <h4 className="font-serif text-xl font-bold">{result.name}</h4>
                    <span className="font-mono text-xs font-bold text-amber-500">{result.rarity}</span>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 space-y-2">
                    {Object.entries(result.stats).map(([stat, value]) => (
                      <div key={stat} className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-black/50">{stat}</span>
                        <div className="flex w-32 items-center gap-2">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full rounded-full bg-[#d65d4b]" 
                            />
                          </div>
                          <span className="w-6 text-right font-mono text-[10px] font-bold">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-black/5 p-3">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-widest text-black/40">Fav Snack</p>
                      <p className="text-xs font-bold">{result.snack}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-widest text-black/40">Habitat</p>
                      <p className="text-xs font-bold">{result.habitat}</p>
                    </div>
                  </div>

                  {/* Special Ability */}
                  <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-center">
                    <p className="font-mono text-[8px] uppercase tracking-widest text-amber-600">Special Ability</p>
                    <p className="font-serif text-sm font-bold text-amber-900">{result.ability}</p>
                  </div>

                </motion.div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}