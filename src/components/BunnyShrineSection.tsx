"use client";

import React, {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  Sparkles,
  PerspectiveCamera,
  RoundedBox,
  Text,
  PresentationControls,
} from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";
import { Physics, RigidBody, CuboidCollider, BallCollider, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/content/i18n";
import { createPortal as createDomPortal } from "react-dom";

/* ============================================================================
 * TYPES & TIMING
 * ==========================================================================*/
type Step =
  | "idle"
  | "cranking"
  | "settling"
  | "dropping"
  | "levitating"
  | "opening"
  | "result";

export interface BunnyProfile {
  id: string;
  name: string;
  rarity: number; // 1-5
  emoji: string;
  blurb: string;
  colorA: string;
  colorB: string;
  imageUrl: string;
  type: string;
  personality: string;
  ability: string;
  fact: string;
  stats: {
    power: number;
    speed: number;
    friendliness: number;
    curiosity: number;
    fluffiness: number;
  };
}

type SoundEvent =
  | "coinInsert"
  | "crankTurn"
  | "capsuleShake"
  | "capsuleDrop"
  | "capsulePop"
  | "cardReveal";

const PHASE_DURATIONS: Record<Step, number> = {
  idle: Infinity,
  cranking: 0.8,
  settling: 0.3,
  dropping: 0.8,
  levitating: 1.5,
  opening: 1.6,
  result: Infinity,
};

// Animation timings (Make sure these match your GachaContext)
const DURATIONS = {
  cranking: 0.8,
  settling: 0.3,
  dropping: 0.8,
  levitating: 1.5,
  opening: 1.6,
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeInOutCubic = (x: number) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeOutBack = (x: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
function easeRatchet(t: number, steps = 8): number {
  const x = clamp01(t);
  const stepT = x * steps;
  const stepIndex = Math.min(steps - 1, Math.floor(stepT));
  const stepProgress = stepT - stepIndex;
  return (stepIndex + easeOutBack(stepProgress)) / steps;
}

/* ============================================================================
 * BUNNY DATABASE (Full 20 Bunnies)
 * ==========================================================================*/
export const BUNNY_DATABASE: BunnyProfile[] = [
  {
    id: "holland-lop",
    name: "Holland Lop",
    rarity: 4,
    emoji: "🐰",
    blurb: "Like a Holland Lop, you'll win people over just by being yourself.",
    colorA: "#f7cd8e",
    colorB: "#fbe6c8",
    imageUrl: "src/assets/bunnyGacha/holland-lop.jpg",
    type: "Companion",
    personality: "Sweet",
    ability: "Ear Flop Charm",
    fact: "They are frequently described as being among the most laid-back and easygoing of the rabbit breeds, making them particularly suitable for first-time owners",
    stats: { power: 30, speed: 45, friendliness: 95, curiosity: 70, fluffiness: 85 }
  },
  {
    id: "netherland-dwarf",
    name: "Netherland Dwarf",
    rarity: 5,
    emoji: "🐇",
    blurb: "A burst of unexpected energy helps you finish what you start today.",
    colorA: "#cbd3d8",
    colorB: "#eef0f1",
    imageUrl: "src/assets/bunnyGacha/netherland-dwarf.jpg",
    type: "Speedster",
    personality: "Spicy",
    ability: "Zoomie Tornado",
    fact: "Despite weighing only around 1 kilo, they possess the energy and attitude of a rabbit ten times their size.",
    stats: { power: 85, speed: 95, friendliness: 50, curiosity: 98, fluffiness: 60 }
  },
  {
    id: "lionhead",
    name: "Lionhead",
    rarity: 4,
    emoji: "🦁",
    blurb: "Your hair might be messy today, but your spirit is majestic.",
    colorA: "#f4d873",
    colorB: "#fbeec2",
    imageUrl: "src/assets/bunnyGacha/lionhead.jpg",
    type: "Majestic",
    personality: "Proud",
    ability: "Mane Defense",
    fact: "Their unique mane is caused by a dominant genetic mutation that first appeared in Belgium.",
    stats: { power: 65, speed: 55, friendliness: 75, curiosity: 80, fluffiness: 100 }
  },
  {
    id: "flemish-giant",
    name: "Flemish Giant",
    rarity: 5,
    emoji: "🏔️",
    blurb: "A good long nap solves more problems than hard work today.",
    colorA: "#c9c2b6",
    colorB: "#ece7dd",
    imageUrl: "src/assets/bunnyGacha/flemish-giant.jpg",
    type: "Titan",
    personality: "Gentle",
    ability: "Professional Napper",
    fact: "Known as the 'Gentle Giants,' they can weigh up to 10 kilograms and are as large as some dogs.",
    stats: { power: 90, speed: 20, friendliness: 100, curiosity: 40, fluffiness: 75 }
  },
  {
    id: "mini-rex",
    name: "Mini Rex",
    rarity: 3,
    emoji: "🧸",
    blurb: "Things go smoothly for you today, much like velvet.",
    colorA: "#f0a7a0",
    colorB: "#fbdcd8",
    imageUrl: "src/assets/bunnyGacha/mini-rex.jpg",
    type: "Companion",
    personality: "Placid",
    ability: "Velvet Touch",
    fact: "Their fur lacks long guard hairs, giving them a unique texture that feels exactly like plush velvet.",
    stats: { power: 40, speed: 60, friendliness: 85, curiosity: 75, fluffiness: 90 }
  },
  {
    id: "english-angora",
    name: "English Angora",
    rarity: 5,
    emoji: "☁️",
    blurb: "Expect a day filled with soft comforts and a little extra grooming.",
    colorA: "#e2e8f0",
    colorB: "#ffffff",
    imageUrl: "src/assets/bunnyGacha/english-angora.jpg",
    type: "Divine",
    personality: "Pampered",
    ability: "Cloud Camouflage",
    fact: "They are the only rabbit breed covered entirely in wool, including their face and ears, requiring daily grooming.",
    stats: { power: 25, speed: 30, friendliness: 80, curiosity: 60, fluffiness: 100 }
  },
  {
    id: "dutch",
    name: "Dutch Rabbit",
    rarity: 3,
    emoji: "🎩",
    blurb: "Balance is your strength today. Keep things split right down the middle.",
    colorA: "#3f3f46",
    colorB: "#71717a",
    imageUrl: "src/assets/bunnyGacha/dutch.jpg",
    type: "Classic",
    personality: "Balanced",
    ability: "Tuxedo Elegance",
    fact: "One of the oldest known rabbit breeds, recognized immediately by their striking two-tone color pattern.",
    stats: { power: 50, speed: 65, friendliness: 85, curiosity: 70, fluffiness: 50 }
  },
  {
    id: "californian",
    name: "Californian",
    rarity: 3,
    emoji: "🌘",
    blurb: "You will leave a striking impression on someone new today.",
    colorA: "#f1f5f9",
    colorB: "#cbd5e1",
    imageUrl: "src/assets/bunnyGacha/californian.jpg",
    type: "Classic",
    personality: "Chill",
    ability: "Thermal Adaptation",
    fact: "Their dark markings on their ears and nose are temperature-sensitive and will get darker in colder weather.",
    stats: { power: 70, speed: 50, friendliness: 75, curiosity: 60, fluffiness: 65 }
  },
  {
    id: "harlequin",
    name: "Harlequin",
    rarity: 4,
    emoji: "🎭",
    blurb: "A sense of humor will get you out of a tricky situation today.",
    colorA: "#fdba74",
    colorB: "#334155",
    imageUrl: "src/assets/bunnyGacha/harlequin.jpg",
    type: "Trickster",
    personality: "Playful",
    ability: "Split Persona",
    fact: "They are sometimes called the 'clown of the rabbits' due to their checkerboard-like coloring.",
    stats: { power: 55, speed: 75, friendliness: 80, curiosity: 90, fluffiness: 55 }
  },
  {
    id: "himalayan",
    name: "Himalayan",
    rarity: 3,
    emoji: "🧘",
    blurb: "Take a deep breath. A calm approach will yield the best results.",
    colorA: "#e5e5e5",
    colorB: "#a3a3a3",
    imageUrl: "src/assets/bunnyGacha/himalayan.jpg",
    type: "Zen",
    personality: "Calm",
    ability: "Cylinder Stretch",
    fact: "They have a unique cylindrical body shape and are one of the calmest rabbit breeds in existence.",
    stats: { power: 30, speed: 40, friendliness: 90, curiosity: 50, fluffiness: 60 }
  },
  {
    id: "polish",
    name: "Polish Rabbit",
    rarity: 2,
    emoji: "✨",
    blurb: "You may magically pull a solution out of thin air today.",
    colorA: "#292524",
    colorB: "#44403c",
    imageUrl: "src/assets/bunnyGacha/polish.jpg",
    type: "Magical",
    personality: "Alert",
    ability: "Hat Trick",
    fact: "Historically popular with magicians, they are small, highly intelligent, and very attentive to their surroundings.",
    stats: { power: 45, speed: 85, friendliness: 70, curiosity: 85, fluffiness: 50 }
  },
  {
    id: "satin",
    name: "Satin",
    rarity: 3,
    emoji: "🌟",
    blurb: "You will outshine the competition today without even trying.",
    colorA: "#fda4af",
    colorB: "#fed7aa",
    imageUrl: "src/assets/bunnyGacha/satin.jpg",
    type: "Radiant",
    personality: "Diva",
    ability: "Light Refraction",
    fact: "A genetic mutation causes their hair shafts to be translucent, making their coat incredibly shiny and reflective.",
    stats: { power: 50, speed: 60, friendliness: 75, curiosity: 65, fluffiness: 85 }
  },
  {
    id: "silver-fox",
    name: "Silver Fox",
    rarity: 5,
    emoji: "🦊",
    blurb: "A rare and unique opportunity is heading your way.",
    colorA: "#64748b",
    colorB: "#334155",
    imageUrl: "src/assets/bunnyGacha/silver-fox.jpg",
    type: "Rare",
    personality: "Mysterious",
    ability: "Stand-Up Fur",
    fact: "They are the only breed whose fur will stand straight up on end when stroked backwards until stroked forwards again.",
    stats: { power: 80, speed: 70, friendliness: 60, curiosity: 75, fluffiness: 95 }
  },
  {
    id: "blanc-de-hotot",
    name: "Blanc de Hotot",
    rarity: 4,
    emoji: "👁️",
    blurb: "Someone will appreciate your quiet kindness (and your style).",
    colorA: "#ffffff",
    colorB: "#e2e8f0",
    imageUrl: "src/assets/bunnyGacha/blanc-de-hotot.jpg",
    type: "Classic",
    personality: "Observer",
    ability: "Eyeliner Gaze",
    fact: "They are completely snow-white except for a distinct, thick black ring around their eyes, resembling eyeliner.",
    stats: { power: 45, speed: 55, friendliness: 85, curiosity: 90, fluffiness: 70 }
  },
  {
    id: "mini-lop",
    name: "Mini Lop",
    rarity: 3,
    emoji: "🏀",
    blurb: "Unexpected snacks may find their way to you today.",
    colorA: "#fde68a",
    colorB: "#fef08a",
    imageUrl: "src/assets/bunnyGacha/mini-lop.jpg",
    type: "Companion",
    personality: "Cuddly",
    ability: "Basketball Roll",
    fact: "Their bodies are described by breeders as resembling a basketball with a head attached.",
    stats: { power: 55, speed: 45, friendliness: 95, curiosity: 80, fluffiness: 80 }
  },
  {
    id: "jersey-wooly",
    name: "Jersey Wooly",
    rarity: 4,
    emoji: "☕",
    blurb: "A peaceful resolution to a small conflict is in your future.",
    colorA: "#dbeafe",
    colorB: "#e0e7ff",
    imageUrl: "src/assets/bunnyGacha/jersey-wooly.jpg",
    type: "Divine",
    personality: "Mug-Sized",
    ability: "No-Kick Zone",
    fact: "Originally bred to be a low-maintenance wool rabbit, they are famously known as 'the no-kick bunny' for their docility.",
    stats: { power: 20, speed: 35, friendliness: 98, curiosity: 65, fluffiness: 95 }
  },
  {
    id: "american-fuzzy-lop",
    name: "American Fuzzy Lop",
    rarity: 4,
    emoji: "🧶",
    blurb: "Your social energy will bring a smile to someone who needs it.",
    colorA: "#d1fae5",
    colorB: "#ccfbf1",
    imageUrl: "src/assets/bunnyGacha/american-fuzzy-lop.jpg",
    type: "Companion",
    personality: "Social",
    ability: "Wool Blanket",
    fact: "They look like a Holland Lop wearing a wool sweater, resulting from a recessive wool gene in their lineage.",
    stats: { power: 35, speed: 50, friendliness: 90, curiosity: 85, fluffiness: 95 }
  },
  {
    id: "checkered-giant",
    name: "Checkered Giant",
    rarity: 4,
    emoji: "🏁",
    blurb: "You'll breeze through your tasks with impressive speed today.",
    colorA: "#d4d4d8",
    colorB: "#a1a1aa",
    imageUrl: "src/assets/bunnyGacha/checkered-giant.jpg",
    type: "Speedster",
    personality: "Active",
    ability: "Racing Stripes",
    fact: "One of the few breeds recognized without a maximum weight limit, known for their distinct butterfly-shaped nose marking.",
    stats: { power: 85, speed: 90, friendliness: 60, curiosity: 75, fluffiness: 50 }
  },
  {
    id: "havana",
    name: "Havana",
    rarity: 3,
    emoji: "🍫",
    blurb: "Sometimes fading into the background allows you to see the most.",
    colorA: "#78350f",
    colorB: "#44403c",
    imageUrl: "src/assets/bunnyGacha/havana.jpg",
    type: "Rare",
    personality: "Smooth",
    ability: "Shadow Blend",
    fact: "Named for their rich, chocolate-colored fur, which was said to resemble the color of Havana cigars.",
    stats: { power: 60, speed: 65, friendliness: 70, curiosity: 80, fluffiness: 75 }
  },
  {
    id: "tan",
    name: "Tan Rabbit",
    rarity: 4,
    emoji: "🐕",
    blurb: "Your sharp instincts will guide you to a clever solution.",
    colorA: "#ea580c",
    colorB: "#1c1917",
    imageUrl: "src/assets/bunnyGacha/tan.jpg",
    type: "Speedster",
    personality: "Alert",
    ability: "Doberman Stance",
    fact: "Often called the 'Doberman of rabbits' due to their arched back, striking black-and-tan color, and high intelligence.",
    stats: { power: 75, speed: 95, friendliness: 55, curiosity: 90, fluffiness: 40 }
  },
];

function pickRandomBunny(): BunnyProfile {
  return BUNNY_DATABASE[Math.floor(Math.random() * BUNNY_DATABASE.length)];
}

/* ============================================================================
 * DROP PATH
 * ==========================================================================*/
function createZigzagDropCurve(): THREE.CatmullRomCurve3 {
  return new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.25, -0.1),
      new THREE.Vector3(-0.22, -0.05, 0.05),
      new THREE.Vector3(0.18, -0.35, 0.15),
      new THREE.Vector3(-0.2, -0.6, 0.3),
      new THREE.Vector3(-0.45, -0.78, 0.5),
      new THREE.Vector3(-0.52, -0.92, 0.58),
    ],
    false,
    "catmullrom",
    0.45
  );
}

/* ===============================================================================
 * DROP ANIMATION PATH
 * ===============================================================================*/
const DROP_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0.5, 0),         // Hidden inside globe mechanism
    new THREE.Vector3(-0.1, 0.1, 0.3),    // Rolling down internal track
    new THREE.Vector3(-0.25, -0.3, 0.7),  // Approaching the smoked flap
    new THREE.Vector3(-0.25, -0.45, 0.95),// Dropping through flap into tray
  ],
  false,
  "catmullrom",
  0.5
);

const TRAY_REST = new THREE.Vector3(-0.25, -0.45, 1.05); // Rolls slightly forward
const FLY_TARGET = new THREE.Vector3(0, 0.4, 3.2);       // Levitates to camera

const CURVE_END = DROP_CURVE.getPointAt(1);

/* ============================================================================
 * GACHA CONTEXT
 * ==========================================================================*/
interface GachaContextValue {
  phase: Step;
  phaseStartTime: number;
  bunny: BunnyProfile | null;
  pull: () => void;
  playSound: (event: SoundEvent) => void;
  resetPhase: () => void;
}

const GachaContext = createContext<GachaContextValue | null>(null);

function now() {
  return performance.now() / 1000;
}

function GachaProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Step>("idle");
  const [bunny, setBunny] = useState<BunnyProfile | null>(null);
  const phaseStartTimeRef = useRef<number>(now());
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const resetPhase = useCallback(() => {
    setPhase("idle");
    setBunny(null);
  }, []);

  const playSound = useCallback((event: SoundEvent) => {
    if (typeof window !== "undefined" && window.location?.hostname === "localhost") {
      console.debug(`[gacha audio hook] ${event}`);
    }
  }, []);

  const clearTimers = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  }, []);

  const goTo = useCallback((next: Step) => {
    phaseStartTimeRef.current = now();
    setPhase(next);
  }, []);

  const pull = useCallback(() => {
    if (phase !== "idle" && phase !== "result") return;

    clearTimers();
    setBunny(pickRandomBunny());
    playSound("coinInsert");

    const sequence: { phase: Step; sound?: SoundEvent }[] = [
      { phase: "cranking", sound: "crankTurn" },
      { phase: "settling", sound: "capsuleShake" },
      { phase: "dropping", sound: "capsuleDrop" },
      { phase: "levitating" },
      { phase: "opening", sound: "capsulePop" },
      { phase: "result", sound: "cardReveal" },
    ];

    goTo("cranking");
    playSound("crankTurn");

    let elapsed = 0;
    sequence.slice(1).forEach((step, i) => {
      elapsed += PHASE_DURATIONS[sequence[i].phase];
      const t = setTimeout(() => {
        goTo(step.phase);
        if (step.sound) playSound(step.sound);
      }, elapsed * 1000);
      timeouts.current.push(t);
    });
  }, [phase, clearTimers, goTo, playSound, resetPhase]);

  const value: GachaContextValue = {
    phase,
    phaseStartTime: phaseStartTimeRef.current,
    bunny,
    pull,
    playSound,
    resetPhase,
  };

  return <GachaContext.Provider value={value}>{children}</GachaContext.Provider>;
}

function useGacha() {
  const ctx = useContext(GachaContext);
  if (!ctx) throw new Error("useGacha must be used within a GachaProvider");
  return ctx;
}

/* ===============================================================================
 * CONSTANTS & COLORS
 * ===============================================================================*/
const COLORS = {
  body: "#F8F6F2",     // Warm ivory glossy plastic
  blue: "#79B8FF",     // Blue Accent
  pink: "#F6B6C8",     // Pink Accent
  mint: "#8DE0C4",     // Mint Accent
  gold: "#FFD46A",     // Golden Accent
  orange: "#FFA95C",   // Orange Accent
  dark: "#4A443F",     // Dark grey/brown for eyes, labels, deep seams
  metal: "#E2E8F0",    // Brushed metal
};

const GLOSSY_PLASTIC = {
  roughness: 0.28,
  clearcoat: 1,
  clearcoatRoughness: 0.2,
  metalness: 0.05,
};

const PASTEL_CAPSULES = [COLORS.pink, COLORS.blue, COLORS.mint, COLORS.gold, "#CDB8EA", COLORS.orange];

/* ============================================================================
 * PALETTE
 * ==========================================================================*/
const PLASTIC_IVORY = "#F8F6F2";
const PLASTIC_DARK = "#2a2622";
const ACCENT_CORAL = "#f2a58a";
const ACCENT_CORAL_DEEP = "#e0805f";
const ACCENT_MINT = "#9fe0d4";

/* ============================================================================
 * RARITY GLOW (used for the hero capsule's inner light + sparkle tint)
 * Common -> soft silver, Rare -> sky blue, Epic -> violet, Legendary -> gold
 * ==========================================================================*/
const RARITY_GLOW: Record<number, string> = {
  1: "#E5E7EB",
  2: "#D9E4EC",
  3: "#79B8FF",
  4: "#C084FC",
  5: "#FFD46A",
};

function getRarityGlow(rarity?: number) {
  return RARITY_GLOW[rarity ?? 3] ?? COLORS.gold;
}

/** Lerp a hex color toward white/black by `amt` (-1..1). Positive lightens. */
function shadeColor(hex: string, amt: number) {
  const c = new THREE.Color(hex);
  if (amt >= 0) c.lerp(new THREE.Color("#ffffff"), amt);
  else c.lerp(new THREE.Color("#000000"), -amt);
  return `#${c.getHexString()}`;
}

/* ============================================================================
 * CHIBI BUNNY HEAD — the tiny mascot that lives inside every capsule.
 * Built entirely out of primitives so it stays cheap to instance across the
 * capsule piles, with a slightly "squished" chibi proportions (oversized
 * ears, low-poly happy face) so it reads instantly even at toy scale.
 * ==========================================================================*/
interface ChibiBunnyHeadProps {
  color?: string;
  earColor?: string;
  blushColor?: string;
  radius?: number; // radius of the capsule this head lives inside
  wiggle?: boolean; // ears wiggle (played while a capsule is opening)
  bounce?: boolean; // gentle idle bob/sway
  segments?: number; // geometry detail — keep low for piled instances
}

function ChibiBunnyHead({
  color = "#fbe6c8",
  earColor,
  blushColor = "#f7b6c2",
  radius = 0.05,
  wiggle = false,
  bounce = false,
  segments = 10,
}: ChibiBunnyHeadProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftEarRef = useRef<THREE.Group>(null);
  const rightEarRef = useRef<THREE.Group>(null);
  const seedPhase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + seedPhase;
    if (bounce && groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 2.4) * radius * 0.06;
      groupRef.current.rotation.z = Math.sin(t * 1.6) * 0.05;
    }
    if (wiggle) {
      if (leftEarRef.current) {
        leftEarRef.current.rotation.z = 0.32 + Math.sin(t * 6) * 0.14;
      }
      if (rightEarRef.current) {
        rightEarRef.current.rotation.z = -0.32 - Math.sin(t * 6 + 0.7) * 0.14;
      }
    }
  });

  const earColorFinal = earColor ?? shadeColor(color, 0.15);
  const headScale = radius * 0.74;

  return (
    <group ref={groupRef} scale={headScale}>
      {/* Head — slightly squished so it reads as "chibi", not a real sphere */}
      <mesh scale={[1, 0.86, 0.92]} castShadow>
        <sphereGeometry args={[1, segments, segments]} />
        <meshPhysicalMaterial color={color} roughness={0.35} clearcoat={0.6} clearcoatRoughness={0.3} />
      </mesh>

      {/* Oversized ears, touching the inner capsule wall */}
      {/* Left ear */}
      <group ref={leftEarRef} position={[-0.42, 0.42, -0.02]} rotation={[0.05, 0, 0.32]}>
        <mesh position={[0, 0.34, 0]} scale={[0.36, 0.68, 0.24]} castShadow>
          <capsuleGeometry args={[0.5, 0.55, 4, segments]} />
          <meshPhysicalMaterial color={earColorFinal} roughness={0.35} clearcoat={0.5} />
        </mesh>
        <mesh position={[0, 0.5, 0.1]} scale={[0.2, 0.68, 0.13]}>
          <capsuleGeometry args={[0.5, 0.55, 4, segments]} />
          <meshStandardMaterial color={blushColor} roughness={0.5} />
        </mesh>
      </group>

      {/* Right ear — mirrored to match left exactly */}
      <group ref={rightEarRef} position={[0.42, 0.42, -0.02]} rotation={[0.05, 0, -0.32]}>
        <mesh position={[0, 0.34, 0]} scale={[0.36, 0.68, 0.24]} castShadow>
          <capsuleGeometry args={[0.5, 0.55, 4, segments]} />
          <meshPhysicalMaterial color={earColorFinal} roughness={0.35} clearcoat={0.5} />
        </mesh>
        <mesh position={[0, 0.5, 0.1]} scale={[0.2, 0.68, 0.13]}>
          <capsuleGeometry args={[0.5, 0.55, 4, segments]} />
          <meshStandardMaterial color={blushColor} roughness={0.5} />
        </mesh>
      </group>

      {/* Happy closed eyes, ">ᴗ<" style */}
      <mesh position={[-0.26, 0.06, 0.9]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.025, 0.13, 2, 6]} />
        <meshStandardMaterial color={COLORS.dark} />
      </mesh>
      <mesh position={[0.26, 0.06, 0.9]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.025, 0.13, 2, 6]} />
        <meshStandardMaterial color={COLORS.dark} />
      </mesh>

      {/* Tiny nose */}
      <mesh position={[0, -0.1, 0.96]} scale={[0.08, 0.06, 0.04]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial color={blushColor} />
      </mesh>

      {/* Blush cheeks */}
      <mesh position={[-0.52, -0.1, 0.72]} scale={[0.15, 0.1, 0.02]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial color={blushColor} transparent opacity={0.75} />
      </mesh>
      <mesh position={[0.52, -0.1, 0.72]} scale={[0.15, 0.1, 0.02]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial color={blushColor} transparent opacity={0.75} />
      </mesh>
    </group>
  );
}

/* ============================================================================
 * GLOBE CAPSULE PILE (REAL PHYSICS)
 * Sits as a sibling inside PresentationControls (NOT inside the animated
 * `machineRef` group), so it rotates correctly when the user drags the
 * machine, but doesn't fight the tiny idle-bob/crank-tilt animation applied
 * to the machine body mesh (that mismatch is sub-millimeter and invisible).
 *
 * CHAMBER GEOMETRY (from the colliders below — this is the ground truth
 * every ball spawn position must stay inside):
 *   floor   y ≈ 0.44   ceiling y ≈ 1.48   →  usable y: 0.46 → 1.40
 *   x walls at ±0.62   →  usable x: -0.55 → 0.55
 *   z walls at ±0.32   →  usable z: -0.28 → 0.28
 * ==========================================================================*/
const GLOBE_CAPSULE_COUNT = 34; // enough to look full without overcrowding

const GLOBE_HIDE_POS: [number, number, number] = [0, -25, 0];

// Interior bounds of the acrylic globe chamber (kept in one place so the
// wall colliders and the ball spawn positions can never drift apart again).
const GLOBE_BOUNDS = {
  xHalf: 0.5,
  zHalf: 0.26,
  yMin: 0.5,
  yMax: 1.3,
};

function GlobePhysics() {
  const { phase } = useGacha();
  // Every RigidBody below stays mounted for the component's entire lifetime —
  // count and keys never change. "Removing" a ball on pull disables its
  // collider and teleports it out of view instead of unmounting it, which
  // avoids the mount/unmount race that crashes Rapier's wasm world.
  const bodiesRef = useRef<(RapierRigidBody | null)[]>([]);
  const removedIndexRef = useRef<number | null>(null);

  // Balls start scattered INSIDE the chamber bounds (not above/outside it)
  // and gently fall + collide into a resting pile.
  const seeds = useMemo(() => {
    const arr: { pos: [number, number, number]; color: string; scale: number }[] = [];
    for (let i = 0; i < GLOBE_CAPSULE_COUNT; i++) {
      arr.push({
        pos: [
          THREE.MathUtils.randFloatSpread(GLOBE_BOUNDS.xHalf * 1.6),
          THREE.MathUtils.lerp(GLOBE_BOUNDS.yMin, GLOBE_BOUNDS.yMax, Math.random()),
          THREE.MathUtils.randFloatSpread(GLOBE_BOUNDS.zHalf * 1.6),
        ],
        color: PASTEL_CAPSULES[i % PASTEL_CAPSULES.length],
        scale: 0.9 + Math.random() * 0.2,
      });
    }
    return arr;
  }, []);

  // On a pull, hide ONE ball (disable + teleport away). Because gravity and
  // collisions are still real for everyone else, the remaining balls
  // roll/settle into the gap instead of the whole pile shifting uniformly.
  useEffect(() => {
    if (phase === "cranking" && removedIndexRef.current === null) {
      const idx = Math.floor(Math.random() * GLOBE_CAPSULE_COUNT);
      removedIndexRef.current = idx;
      const body = bodiesRef.current[idx];
      if (body) {
        body.setLinvel({ x: 0, y: 0, z: 0 }, true);
        body.setAngvel({ x: 0, y: 0, z: 0 }, true);
        body.setTranslation({ x: GLOBE_HIDE_POS[0], y: GLOBE_HIDE_POS[1], z: GLOBE_HIDE_POS[2] }, true);
        body.setEnabled(false);
      }
    }
    if (phase === "idle" && removedIndexRef.current !== null) {
      const idx = removedIndexRef.current;
      const body = bodiesRef.current[idx];
      const seed = seeds[idx];
      if (body && seed) {
        body.setEnabled(true);
        body.setLinvel({ x: 0, y: 0, z: 0 }, true);
        body.setAngvel({ x: 0, y: 0, z: 0 }, true);
        body.setTranslation({ x: seed.pos[0], y: seed.pos[1], z: seed.pos[2] }, true);
      }
      removedIndexRef.current = null;
    }
  }, [phase, seeds]);

  // Shake = tiny random impulses applied per-ball, not a manual position hack.
  useFrame(() => {
    if (phase !== "cranking") return;
    bodiesRef.current.forEach((body, idx) => {
      if (!body || idx === removedIndexRef.current) return;
      body.applyImpulse(
        {
          x: (Math.random() - 0.5) * 0.002,
          y: Math.random() * 0.0012,
          z: (Math.random() - 0.5) * 0.002,
        },
        true
      );
    });
  });

  // Safety net every frame: if a ball ever ends up outside the chamber
  // (shouldn't happen now that spawn + walls agree, but this guarantees it
  // can never look like it "fell into oblivion" again), snap it back inside.
  useFrame(() => {
    bodiesRef.current.forEach((body, idx) => {
      if (!body || idx === removedIndexRef.current) return;
      const p = body.translation();
      const outOfBounds =
        p.y < 0.2 ||
        p.y > 1.6 ||
        Math.abs(p.x) > GLOBE_BOUNDS.xHalf + 0.2 ||
        Math.abs(p.z) > GLOBE_BOUNDS.zHalf + 0.2;
      if (outOfBounds) {
        const seed = seeds[idx];
        body.setTranslation({ x: seed.pos[0] * 0.5, y: GLOBE_BOUNDS.yMax, z: seed.pos[2] * 0.5 }, true);
        body.setLinvel({ x: 0, y: 0, z: 0 }, true);
        body.setAngvel({ x: 0, y: 0, z: 0 }, true);
      }
    });
  });

  return (
    <group>
      {/* Invisible chamber matching the flattened acrylic globe interior.
          Walls padded slightly at the corners so they always overlap —
          no seams for a ball to slip through. */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[0.6, 0.02, 0.32]} position={[0, 0.42, 0]} />       {/* floor */}
        <CuboidCollider args={[0.02, 0.55, 0.36]} position={[-0.62, 0.95, 0]} />  {/* -x wall */}
        <CuboidCollider args={[0.02, 0.55, 0.36]} position={[0.62, 0.95, 0]} />   {/* +x wall */}
        <CuboidCollider args={[0.64, 0.55, 0.02]} position={[0, 0.95, -0.34]} />  {/* -z wall */}
        <CuboidCollider args={[0.64, 0.55, 0.02]} position={[0, 0.95, 0.34]} />   {/* +z wall */}
        <CuboidCollider args={[0.6, 0.02, 0.32]} position={[0, 1.5, 0]} />        {/* ceiling */}
      </RigidBody>

      {seeds.map((s, i) => (
        <RigidBody
          key={i}
          ref={(el) => { bodiesRef.current[i] = el; }}
          colliders={false}
          position={s.pos}
          restitution={0.2}
          friction={0.55}
          angularDamping={0.6}
          linearDamping={0.3}
          ccd={true}
        >
          <BallCollider args={[0.12 * s.scale]} />
          <group scale={s.scale}>
            {/* Top Solid Shell */}
            <mesh>
              <sphereGeometry args={[0.12, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshPhysicalMaterial color={s.color} {...GLOSSY_PLASTIC} />
            </mesh>
            {/* Bottom Translucent Shell */}
            <mesh position={[0, -0.002, 0]}>
              <sphereGeometry args={[0.121, 16, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
              <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.3} thickness={0.1} transparent opacity={0.9} />
            </mesh>
            {/* Seam Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.12, 0.005, 8, 24]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
            {/* Chibi bunny mascot riding inside the capsule */}
            <ChibiBunnyHead
              color={s.color}
              earColor={shadeColor(s.color, 0.25)}
              radius={0.12}
              segments={7}
            />
          </group>
        </RigidBody>
      ))}
    </group>
  );
}

/* ============================================================================
 * 3D COMPONENTS
 * ==========================================================================*/
export function MachineBody() {
  const { phase, phaseStartTime, bunny } = useGacha();
  
  // Animation Refs
  const machineRef = useRef<THREE.Group>(null);
  const knobRef = useRef<THREE.Group>(null);
  const flapRef = useRef<THREE.Group>(null);
  const ledRef = useRef<THREE.PointLight>(null);
  
  // Hero Capsule Refs
  const heroWrapperRef = useRef<THREE.Group>(null);
  const heroShellRef = useRef<THREE.Group>(null);
  const heroTopRef = useRef<THREE.Group>(null);

  const [flapOpen, setFlapOpen] = useState(false);

  // Trigger flap state based on drop phase window
  useEffect(() => {
    if (phase !== "dropping") {
      setFlapOpen(false);
      return;
    }
    const openTimer = setTimeout(() => setFlapOpen(true), DURATIONS.dropping * 0.35 * 1000);
    const closeTimer = setTimeout(() => setFlapOpen(false), DURATIONS.dropping * 0.7 * 1000);
    return () => { clearTimeout(openTimer); clearTimeout(closeTimer); };
  }, [phase]);

  // MASTER ANIMATION LOOP
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const elapsed = performance.now() / 1000 - phaseStartTime;

    // 1. Idle Breathing & LED Pulse
    if (machineRef.current && (phase === "idle" || phase === "result")) {
      // Subtle float
      machineRef.current.position.y = THREE.MathUtils.damp(machineRef.current.position.y, Math.sin(t * 2) * 0.009, 4, delta);
      // Settle tilt
      machineRef.current.rotation.x = THREE.MathUtils.damp(machineRef.current.rotation.x, 0, 4, delta);
    }
    if (ledRef.current) {
      ledRef.current.intensity = 0.5 + Math.sin(t * 4) * 0.5; // Soft pulsing
    }

    // 2. Gacha Pull Sequence
    if (phase === "cranking" && knobRef.current && machineRef.current) {
      // Knob turns ~270 degrees (Math.PI * 1.5)
      const p = clamp01(elapsed / DURATIONS.cranking);
      const turnSteps = 6; // Ratcheting effect
      const stepT = p * turnSteps;
      const stepIdx = Math.floor(stepT);
      const stepProg = stepT - stepIdx;
      const ratchet = (stepIdx + easeOutBack(stepProg)) / turnSteps;
      
      knobRef.current.rotation.z = -ratchet * (Math.PI * 1.5);
      
      // Machine physically leans back slightly (~2 degrees) from the force
      machineRef.current.rotation.x = THREE.MathUtils.damp(machineRef.current.rotation.x, -0.035, 8, delta);
    } else if (knobRef.current) {
      // Reset knob when not cranking
      knobRef.current.rotation.z = THREE.MathUtils.damp(knobRef.current.rotation.z, 0, 8, delta);
    }

    // 3. Exit Flap Hinge
    if (flapRef.current) {
      const targetFlapRot = flapOpen ? -Math.PI / 2.2 : 0;
      flapRef.current.rotation.x = THREE.MathUtils.damp(flapRef.current.rotation.x, targetFlapRot, 15, delta);
    }

    if (heroWrapperRef.current && heroShellRef.current && heroTopRef.current) {
      if (phase === "dropping") {
        heroWrapperRef.current.visible = true;
        const travelWindow = DURATIONS.dropping * 0.65;

        if (elapsed < travelWindow) {
          const pathT = Math.min(1, easeInOutCubic(elapsed / travelWindow));
          heroWrapperRef.current.position.copy(DROP_CURVE.getPointAt(pathT));

          const ROLL_TOTAL = -Math.PI * 1.4;
          heroShellRef.current.rotation.x = ROLL_TOTAL * pathT;   // shell only
          heroWrapperRef.current.scale.setScalar(1);
        } else {
          const bt = clamp01((elapsed - travelWindow) / (DURATIONS.dropping - travelWindow));
          const bounceHeight = Math.sin(Math.PI * Math.min(1, bt * 1.5)) * 0.12 * (1 - bt * 0.5);
          heroWrapperRef.current.position.set(
            THREE.MathUtils.lerp(DROP_CURVE.getPointAt(1).x, TRAY_REST.x, easeOutCubic(bt)),
            DROP_CURVE.getPointAt(1).y + bounceHeight,
            THREE.MathUtils.lerp(DROP_CURVE.getPointAt(1).z, TRAY_REST.z, easeOutCubic(bt))
          );
          heroShellRef.current.rotation.x -= 0.05 * (1 - bt);     // shell only
        }
      }
      else if (phase === "levitating") {
        heroWrapperRef.current.visible = true;
        const p = clamp01(elapsed / DURATIONS.levitating);
        const eased = easeOutCubic(p);

        heroWrapperRef.current.position.lerpVectors(TRAY_REST, FLY_TARGET, eased);

        const SPIN_TOTAL = Math.PI * 2;
        heroShellRef.current.rotation.y = SPIN_TOTAL * eased;                                   // shell only
        heroShellRef.current.rotation.x = THREE.MathUtils.damp(heroShellRef.current.rotation.x, 0, 5, delta); // shell only
        heroWrapperRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 2.5, eased));

        if (p > 0.85) {
          const wobbleP = (p - 0.85) / 0.15;
          heroWrapperRef.current.position.x += Math.sin(elapsed * 60) * 0.01 * (1 - wobbleP);
        }
      }
      else if (phase === "opening" || phase === "result") {
        heroWrapperRef.current.visible = true;
        heroWrapperRef.current.position.copy(FLY_TARGET);
        heroWrapperRef.current.scale.setScalar(2.5);

        if (phase === "opening") {
          const p = clamp01(elapsed / DURATIONS.opening);
          let liftP: number;
          if (p < 0.15) {
            // brief anticipation: lid dips down very slightly first
            liftP = -0.08 * (p / 0.15);
          } else {
            const risePhase = clamp01((p - 0.15) / 0.85);
            liftP = -0.08 * (1 - risePhase) + easeOutBack(risePhase) * 1.0;
          }
          heroTopRef.current.position.y = liftP * 0.42;
        } else {
          heroTopRef.current.position.y = 0.42;
        }

        heroShellRef.current.rotation.y = THREE.MathUtils.damp(heroShellRef.current.rotation.y, 0, 5, delta);
      }
      else {
        heroWrapperRef.current.visible = false;
        heroShellRef.current.rotation.set(0, 0, 0);
        heroTopRef.current.position.y = 0;
      }
    }
  });

  const heroColor = bunny?.colorA ?? COLORS.gold;
  const heroEarColor = bunny?.colorB ?? COLORS.pink;
  const heroGlow = getRarityGlow(bunny?.rarity);
  const heroRevealed = phase === "opening" || phase === "result";

  return (
    <>
      <group ref={machineRef}>
        
        {/* ===============================================================================
          * BODY
          * ===============================================================================*/}
        {/* Main Base Block */}
        <RoundedBox args={[1.7, 1.2, 1.4]} position={[0, -0.4, 0]} radius={0.15} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial color={COLORS.body} {...GLOSSY_PLASTIC} />
        </RoundedBox>
        
        {/* Upper Molded Rim (Creates an overhang before the globe) */}
        <RoundedBox args={[1.8, 0.15, 1.5]} position={[0, 0.25, 0]} radius={0.05} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial color={COLORS.body} {...GLOSSY_PLASTIC} />
        </RoundedBox>

        {/* Base Plinth (Bottom Overhang) */}
        <RoundedBox args={[1.75, 0.15, 1.45]} position={[0, -1.05, 0]} radius={0.05} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial color={COLORS.pink} {...GLOSSY_PLASTIC} />
        </RoundedBox>

        {/* 4 Rubber Feet */}
        {[
          [-0.7, -1.15, 0.6], [0.7, -1.15, 0.6],
          [-0.7, -1.15, -0.6], [0.7, -1.15, -0.6]
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={COLORS.dark} roughness={0.9} />
          </mesh>
        ))}

        {/* ===============================================================================
          * ACRYLIC GLOBE
          * ===============================================================================*/}
        {/* Flattened Acrylic Chamber */}
        <RoundedBox args={[1.45, 1.25, 1.0]} position={[0, 0.95, 0]} radius={0.4} smoothness={6} castShadow receiveShadow>
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={1} 
            roughness={0.05} 
            thickness={0.2} 
            ior={1.4} 
            clearcoat={1} 
            transparent 
          />
        </RoundedBox>

        {/* Globe Base Plate (Internal floor of globe) */}
        <RoundedBox args={[1.3, 0.05, 0.8]} position={[0, 0.35, 0]} radius={0.02} smoothness={2}>
          <meshPhysicalMaterial color={COLORS.blue} {...GLOSSY_PLASTIC} />
        </RoundedBox>

        {/* Top Machine Cap */}
        <RoundedBox args={[1.1, 0.1, 0.8]} position={[0, 1.6, 0]} radius={0.05} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial color={COLORS.body} {...GLOSSY_PLASTIC} />
        </RoundedBox>

        {/* ===============================================================================
          * BUNNY EARS
          * ===============================================================================*/}
        {/* Left Ear */}
        <group position={[-0.4, 1.65, -0.2]} rotation={[0.1, 0, 0.2]}>
          <RoundedBox args={[0.3, 0.8, 0.15]} position={[0, 0.4, 0]} radius={0.07} smoothness={4} castShadow>
            <meshPhysicalMaterial color={COLORS.body} {...GLOSSY_PLASTIC} />
          </RoundedBox>
          {/* Inner Pink Mold */}
          <RoundedBox args={[0.15, 0.6, 0.05]} position={[0, 0.4, 0.06]} radius={0.05} smoothness={4}>
            <meshPhysicalMaterial color={COLORS.pink} {...GLOSSY_PLASTIC} />
          </RoundedBox>
        </group>

        {/* Right Ear */}
        <group position={[0.4, 1.65, -0.2]} rotation={[0.1, 0, -0.2]}>
          <RoundedBox args={[0.3, 0.8, 0.15]} position={[0, 0.4, 0]} radius={0.07} smoothness={4} castShadow>
            <meshPhysicalMaterial color={COLORS.body} {...GLOSSY_PLASTIC} />
          </RoundedBox>
          {/* Inner Pink Mold */}
          <RoundedBox args={[0.15, 0.6, 0.05]} position={[0, 0.4, 0.06]} radius={0.05} smoothness={4}>
            <meshPhysicalMaterial color={COLORS.pink} {...GLOSSY_PLASTIC} />
          </RoundedBox>
        </group>

        {/* ===============================================================================
          * CONTROL PANEL & DETAILS
          * ===============================================================================*/}
        {/* Bulging Front Control Panel */}
        <RoundedBox args={[1.5, 0.8, 0.2]} position={[0, -0.4, 0.65]} radius={0.1} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial color={COLORS.body} {...GLOSSY_PLASTIC} />
        </RoundedBox>

        <mesh position={[0, -0.4, 0.751]}>
          <boxGeometry args={[1.35, 0.65, 0.005]} />
          <meshStandardMaterial color={COLORS.body} roughness={0.4} />
        </mesh>
        
        {/* Tiny Decorative Screws on Panel Corners */}
        {[
          [-0.65, -0.1], [0.65, -0.1],
          [-0.65, -0.7], [0.65, -0.7]
        ].map((pos, i) => (
          <mesh key={`screw-${i}`} position={[pos[0], pos[1], 0.752]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.01, 16]} />
            <meshStandardMaterial color={COLORS.metal} metalness={0.8} roughness={0.2} />
          </mesh>
        ))}

        {/* Status LED */}
        <mesh position={[0.6, -0.15, 0.76]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color={COLORS.mint} emissive={COLORS.mint} emissiveIntensity={0.2} />
        </mesh>
        <pointLight ref={ledRef} position={[0.6, -0.15, 0.8]} color={COLORS.mint} distance={0.07} />

        {/* ===============================================================================
          * KNOB (Highly Detailed)
          * ===============================================================================*/}
        <group position={[0.35, -0.4, 0.75]}>
          {/* Outer Cream Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.25, 0.04, 32]} />
            <meshPhysicalMaterial color={COLORS.body} {...GLOSSY_PLASTIC} />
          </mesh>
          {/* Inner Blue Ring */}
          <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.03, 32]} />
            <meshPhysicalMaterial color={COLORS.blue} {...GLOSSY_PLASTIC} />
          </mesh>
          
          {/* Rotating Mechanism */}
          <group ref={knobRef}>
            {/* Raised Center Disk */}
            <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.15, 0.16, 0.04, 32]} />
              <meshPhysicalMaterial color={COLORS.pink} {...GLOSSY_PLASTIC} />
            </mesh>
            {/* Gold Center Cap */}
            <mesh position={[0, 0, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.02, 32]} />
              <meshStandardMaterial color={COLORS.gold} metalness={0.7} roughness={0.2} />
            </mesh>
            {/* Handle Bar */}
            <RoundedBox args={[0.06, 0.28, 0.08]} position={[0, 0, 0.08]} radius={0.02} smoothness={2} castShadow>
              <meshPhysicalMaterial color={COLORS.body} {...GLOSSY_PLASTIC} />
            </RoundedBox>
            {/* Protruding Grip Spheres */}
            <mesh position={[0, 0.12, 0.1]} castShadow>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshPhysicalMaterial color={COLORS.mint} {...GLOSSY_PLASTIC} />
            </mesh>
            <mesh position={[0, -0.12, 0.1]} castShadow>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshPhysicalMaterial color={COLORS.mint} {...GLOSSY_PLASTIC} />
            </mesh>
          </group>

          {/* Footprints around the knob (Embossed direction indicators) */}
          {[Math.PI*0.2, Math.PI*0.4, Math.PI*0.6, Math.PI*0.8].map((angle, i) => (
            <group key={`kf-${i}`} position={[Math.cos(angle)*0.28, Math.sin(angle)*0.28, 0.01]} rotation={[0, 0, angle - Math.PI/2]}>
              {/* Main Pad */}
              <mesh position={[0, 0, 0]}><sphereGeometry args={[0.015, 8, 8]}/><meshStandardMaterial color={COLORS.dark}/></mesh>
              {/* 3 Toes */}
              <mesh position={[-0.015, 0.02, 0]}><sphereGeometry args={[0.008, 8, 8]}/><meshStandardMaterial color={COLORS.dark}/></mesh>
              <mesh position={[0, 0.025, 0]}><sphereGeometry args={[0.008, 8, 8]}/><meshStandardMaterial color={COLORS.dark}/></mesh>
              <mesh position={[0.015, 0.02, 0]}><sphereGeometry args={[0.008, 8, 8]}/><meshStandardMaterial color={COLORS.dark}/></mesh>
            </group>
          ))}
        </group>

        {/* ===============================================================================
          * COIN SLOT
          * ===============================================================================*/}
        <group position={[0.55, -0.6, 0.751]}>
          {/* Metal Plate */}
          <RoundedBox args={[0.15, 0.25, 0.02]} radius={0.02} smoothness={2} castShadow>
            <meshStandardMaterial color={COLORS.metal} metalness={0.8} roughness={0.3} />
          </RoundedBox>
          {/* Vertical Hole */}
          <mesh position={[0, 0.02, 0.01]}>
            <boxGeometry args={[0.02, 0.12, 0.02]} />
            <meshStandardMaterial color={COLORS.dark} />
          </mesh>
          {/* Tiny Japanese text below slot */}
          <Text position={[0, -0.08, 0.015]} fontSize={0.02} color={COLORS.dark} anchorX="center" anchorY="middle">
            ¥ 500
          </Text>
        </group>

        {/* ===============================================================================
          * CAPSULE EXIT
          * ===============================================================================*/}
        <group position={[-0.25, -0.5, 0.75]}>
          
          {/* Tunnel Cutout */}
          <RoundedBox args={[0.40, 0.40, 0.15]} position={[0, 0, -0.05]} radius={0.05} smoothness={2}>
            <meshStandardMaterial color={COLORS.dark} roughness={0.9} />
          </RoundedBox>
          
          {/* Smoked Acrylic Flap */}
          <group ref={flapRef} position={[0, 0.18, 0.08]}>
            <RoundedBox 
              args={[0.38, 0.38, 0.02]} 
              position={[0, -0.18, 0]}
              radius={0.02} 
              smoothness={2} 
              castShadow
            >
              <meshPhysicalMaterial 
                color="#111111" 
                transmission={0.8} 
                roughness={0.1} 
                transparent 
                opacity={0.8} 
                side={THREE.DoubleSide}
              />
            </RoundedBox>
          </group>

          {/* Protruding Rounded Tray */}
          <RoundedBox args={[0.55, 0.15, 0.35]} position={[0, -0.22, 0.15]} radius={0.05} smoothness={4} castShadow receiveShadow>
            <meshPhysicalMaterial color={COLORS.mint} {...GLOSSY_PLASTIC} />
          </RoundedBox>
          {/* Tray Hollow */}
          <RoundedBox args={[0.45, 0.16, 0.25]} position={[0, -0.18, 0.15]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color={COLORS.dark} roughness={0.6} />
          </RoundedBox>

        </group>

        {/* ===============================================================================
          * BUNNY DECORATIONS (Embossed & Tasteful)
          * ===============================================================================*/}
        {/* Miffy-Style Face engraved on Upper Left Panel */}
        <group position={[-0.45, -0.15, 0.75]}>
          {/* Left Eye */}
          <mesh position={[-0.05, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.01, 0.03, 8, 8]} />
            <meshStandardMaterial color={COLORS.dark} />
          </mesh>
          {/* Right Eye */}
          <mesh position={[0.05, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.01, 0.03, 8, 8]} />
            <meshStandardMaterial color={COLORS.dark} />
          </mesh>
          {/* X Mouth / Nose */}
          <group position={[0, -0.03, 0]}>
            <mesh rotation={[0, 0, Math.PI / 4]}><capsuleGeometry args={[0.008, 0.02, 4, 4]}/><meshStandardMaterial color={COLORS.dark}/></mesh>
            <mesh rotation={[0, 0, -Math.PI / 4]}><capsuleGeometry args={[0.008, 0.02, 4, 4]}/><meshStandardMaterial color={COLORS.dark}/></mesh>
          </group>
        </group>

        {/* Tiny Embossed Carrots */}
        <group position={[-0.5, 0.1, 0.75]} rotation={[0, 0, -0.2]}>
          <mesh position={[0, 0, 0]}><coneGeometry args={[0.02, 0.08, 16]}/><meshPhysicalMaterial color={COLORS.orange} {...GLOSSY_PLASTIC}/></mesh>
          <mesh position={[-0.01, 0.05, 0]}><sphereGeometry args={[0.01, 8, 8]}/><meshPhysicalMaterial color={COLORS.mint} {...GLOSSY_PLASTIC}/></mesh>
          <mesh position={[0.01, 0.05, 0]}><sphereGeometry args={[0.01, 8, 8]}/><meshPhysicalMaterial color={COLORS.mint} {...GLOSSY_PLASTIC}/></mesh>
        </group>
        <group position={[0.5, 0.1, 0.75]} rotation={[0, 0, 0.3]}>
          <mesh position={[0, 0, 0]}><coneGeometry args={[0.02, 0.08, 16]}/><meshPhysicalMaterial color={COLORS.orange} {...GLOSSY_PLASTIC}/></mesh>
          <mesh position={[-0.01, 0.05, 0]}><sphereGeometry args={[0.01, 8, 8]}/><meshPhysicalMaterial color={COLORS.mint} {...GLOSSY_PLASTIC}/></mesh>
          <mesh position={[0.01, 0.05, 0]}><sphereGeometry args={[0.01, 8, 8]}/><meshPhysicalMaterial color={COLORS.mint} {...GLOSSY_PLASTIC}/></mesh>
        </group>

        {/* Scattered Footprints around the base */}
        {[
          [-0.6, -0.6, 0.75, 0.2],
          [-0.5, -0.7, 0.75, 0.5],
          [0.6, -0.7, 0.75, -0.3],
        ].map((data, i) => (
          <group key={`scat-${i}`} position={[data[0], data[1], data[2]]} rotation={[0, 0, data[3]]}>
            <mesh position={[0, 0, 0]}><sphereGeometry args={[0.015, 8, 8]}/><meshStandardMaterial color={COLORS.dark}/></mesh>
            <mesh position={[-0.015, 0.02, 0]}><sphereGeometry args={[0.008, 8, 8]}/><meshStandardMaterial color={COLORS.dark}/></mesh>
            <mesh position={[0, 0.025, 0]}><sphereGeometry args={[0.008, 8, 8]}/><meshStandardMaterial color={COLORS.dark}/></mesh>
            <mesh position={[0.015, 0.02, 0]}><sphereGeometry args={[0.008, 8, 8]}/><meshStandardMaterial color={COLORS.dark}/></mesh>
          </group>
        ))}

        {/* Decorative Stars */}
        <Text position={[0, -0.7, 0.76]} fontSize={0.06} color={COLORS.gold} anchorX="center" anchorY="middle">
          ★ ★ ★
        </Text>

      </group> 
      {/* END OF MACHINE BODY GROUP */}

      {/* ===============================================================================
        * DISPENSED HERO CAPSULE (Animations: Drop, Roll, Levitate, Pop Open)
        * ===============================================================================*/}
      <group ref={heroWrapperRef} visible={false}>
        <group ref={heroShellRef}>
          <group ref={heroTopRef}>
            <mesh castShadow>
              <sphereGeometry args={[0.16, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshPhysicalMaterial color={heroColor} {...GLOSSY_PLASTIC} />
            </mesh>
          </group>

          <mesh position={[0, -0.004, 0]} castShadow>
            <sphereGeometry args={[0.162, 24, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
            <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.3} thickness={0.15} transparent opacity={0.9} />
          </mesh>

          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.16, 0.008, 8, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
        </group>

        {/* Bunny head is a SIBLING of the shell, not a child — it never rotates,
            so it's always facing the camera regardless of how the shell rolls */}
        <group position={[0, 0.16 * 0.18, 0]}>
          <ChibiBunnyHead
            color={heroColor}
            earColor={heroEarColor}
            radius={0.16}
            wiggle={heroRevealed}
            bounce={heroRevealed}
            segments={14}
          />
        </group>

        {(phase === "opening" || phase === "result") && (
          <>
            <Sparkles count={40} scale={1.2} size={4} speed={0.8} color={heroGlow} />
            <Sparkles count={25} scale={1.5} size={2.5} speed={0.5} color={COLORS.pink} />
            <Sparkles count={15} scale={2.0} size={1.5} speed={0.3} color={COLORS.mint} />
            <pointLight position={[0, 0, 0]} color={heroGlow} intensity={1.5} distance={1.0} decay={2} />
          </>
        )}
      </group>

    </>
  );
}

function usePOPTexture(colorA: string, colorB: string) {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 384;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(1, colorB);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255,255,255,0.55)";
    for (let i = 0; i < 40; i++) {
      const r = 4 + Math.random() * 10;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [colorA, colorB]);
}

function UpperHopper() {
  const popTexture = usePOPTexture("#ffd9ec", "#c9f0ea");

  return (
    <group position={[0, 0.75, 0]}>
      {/* Fully transparent acrylic display box */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.1, 1.2]} />
        <meshPhysicalMaterial 
          transmission={0.95} 
          roughness={0.05} 
          thickness={0.1} 
          ior={1.45} 
          transparent 
          opacity={1} 
          color="#e6f2f5" 
        />
      </mesh>

      {/* 4 Corner Pillars */}
      {[-0.75, 0.75].map((x) =>
        [-0.6, 0.6].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0, z]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 1.1, 16]} />
            <meshStandardMaterial color={PLASTIC_IVORY} roughness={0.3} />
          </mesh>
        ))
      )}

      {/* Top Lid */}
      <mesh position={[0, 0.57, 0]} castShadow>
        <boxGeometry args={[1.6, 0.04, 1.3]} />
        <meshStandardMaterial color={PLASTIC_IVORY} />
      </mesh>

      {/* POP Backdrop */}
      <mesh position={[0, 0, -0.58]}>
        <planeGeometry args={[1.4, 1.0]} />
        {popTexture ? (
          <meshBasicMaterial map={popTexture} toneMapped={false} />
        ) : (
          <meshBasicMaterial color="#fbe0ec" />
        )}
      </mesh>

      <HopperPhysics />
    </group>
  );
}

interface CapsuleProps {
  topColor: string;
  radius?: number;
  lidOpen?: boolean;
  headColor?: string;
  earColor?: string;
  showHead?: boolean;
}

function Capsule({ topColor, radius = 0.16, lidOpen, headColor, earColor, showHead = true }: CapsuleProps) {
  const topLidRef = useRef<THREE.Group>(null);

  // Lid simply lifts straight up and off — no hinge rotation, so it never
  // swings through the shell or ends up pointing somewhere unexpected.
  useFrame((_, delta) => {
    if (!topLidRef.current || lidOpen === undefined) return;
    const targetY = lidOpen ? radius * 2.6 : 0;
    topLidRef.current.position.y = THREE.MathUtils.damp(topLidRef.current.position.y, targetY, 8, delta);
  });

  const topMesh = (
    <mesh castShadow>
      <sphereGeometry args={[radius, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshPhysicalMaterial color={topColor} roughness={0.25} clearcoat={0.8} clearcoatRoughness={0.15} />
    </mesh>
  );

  return (
    <group>
      {lidOpen === undefined ? (
        topMesh
      ) : (
        <group ref={topLidRef}>{topMesh}</group>
      )}

      <mesh position={[0, -0.004, 0]} castShadow>
        <sphereGeometry args={[radius * 1.03, 24, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.4} thickness={0.3} transparent opacity={0.95} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.01, 0.006, 8, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>

      {showHead && (
        <group position={[0, radius * 0.18, 0]}>
          <ChibiBunnyHead
            color={headColor ?? topColor}
            earColor={earColor}
            radius={radius}
            wiggle={!!lidOpen}
            bounce={lidOpen === true}
            segments={10}
          />
        </group>
      )}
    </group>
  );
}

const CAPSULE_TOP_COLORS = ["#f7b8d2", "#b9e4b0", "#cdb8ea", "#f5e79c"];

/* ============================================================================
 * HOPPER CAPSULE PILE (REAL PHYSICS)
 * Nested inside UpperHopper, which is a static (never-animated) group, so
 * RigidBodies can safely live directly under it without desyncing.
 *
 * CHAMBER GEOMETRY (from the colliders below — ground truth for spawns):
 *   floor   y ≈ -0.51   ceiling y ≈ 0.51   →  usable y: -0.45 → 0.40
 *   x walls at ±0.73   →  usable x: -0.65 → 0.65
 *   z walls at ±0.58   →  usable z: -0.50 → 0.50
 * ==========================================================================*/
const CLUSTER_COUNT = 30; // enough to look like a pile, not overstuffed

const HOPPER_HIDE_POS: [number, number, number] = [0, -25, 0];

const HOPPER_BOUNDS = {
  xHalf: 0.6,
  zHalf: 0.45,
  yMin: -0.35,
  yMax: 0.25,
};

function HopperPhysics() {
  const { phase } = useGacha();
  // Same stable-mount pattern as GlobePhysics: never unmount a RigidBody at
  // runtime. Disable + teleport instead, to avoid crashing Rapier's wasm
  // world with a body-destroyed-mid-step race.
  const bodiesRef = useRef<(RapierRigidBody | null)[]>([]);
  const removedIndexRef = useRef<number | null>(null);

  // Balls spawn INSIDE the hopper's real interior bounds (was previously
  // spawning up to y=2.2, far above the ceiling — that's why they looked
  // like they were falling in from outside the box).
  const seeds = useMemo(() => {
    const arr: { pos: [number, number, number]; color: string; scale: number }[] = [];
    for (let i = 0; i < CLUSTER_COUNT; i++) {
      arr.push({
        pos: [
          THREE.MathUtils.randFloatSpread(HOPPER_BOUNDS.xHalf * 1.6),
          THREE.MathUtils.lerp(HOPPER_BOUNDS.yMin, HOPPER_BOUNDS.yMax, Math.random()),
          THREE.MathUtils.randFloatSpread(HOPPER_BOUNDS.zHalf * 1.6),
        ],
        color: CAPSULE_TOP_COLORS[i % CAPSULE_TOP_COLORS.length],
        scale: 0.85 + Math.random() * 0.28,
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    if (phase === "cranking" && removedIndexRef.current === null) {
      const idx = Math.floor(Math.random() * CLUSTER_COUNT);
      removedIndexRef.current = idx;
      const body = bodiesRef.current[idx];
      if (body) {
        body.setLinvel({ x: 0, y: 0, z: 0 }, true);
        body.setAngvel({ x: 0, y: 0, z: 0 }, true);
        body.setTranslation({ x: HOPPER_HIDE_POS[0], y: HOPPER_HIDE_POS[1], z: HOPPER_HIDE_POS[2] }, true);
        body.setEnabled(false);
      }
    }
    if (phase === "idle" && removedIndexRef.current !== null) {
      const idx = removedIndexRef.current;
      const body = bodiesRef.current[idx];
      const seed = seeds[idx];
      if (body && seed) {
        body.setEnabled(true);
        body.setLinvel({ x: 0, y: 0, z: 0 }, true);
        body.setAngvel({ x: 0, y: 0, z: 0 }, true);
        body.setTranslation({ x: seed.pos[0], y: seed.pos[1], z: seed.pos[2] }, true);
      }
      removedIndexRef.current = null;
    }
  }, [phase, seeds]);

  useFrame(() => {
    if (phase !== "cranking") return;
    bodiesRef.current.forEach((body, idx) => {
      if (!body || idx === removedIndexRef.current) return;
      body.applyImpulse(
        {
          x: (Math.random() - 0.5) * 0.0018,
          y: Math.random() * 0.001,
          z: (Math.random() - 0.5) * 0.0018,
        },
        true
      );
    });
  });

  // Safety net: snap any escapee back inside the box instead of letting it
  // fall forever.
  useFrame(() => {
    bodiesRef.current.forEach((body, idx) => {
      if (!body || idx === removedIndexRef.current) return;
      const p = body.translation();
      const outOfBounds =
        p.y < -0.7 ||
        p.y > 0.7 ||
        Math.abs(p.x) > HOPPER_BOUNDS.xHalf + 0.3 ||
        Math.abs(p.z) > HOPPER_BOUNDS.zHalf + 0.3;
      if (outOfBounds) {
        const seed = seeds[idx];
        body.setTranslation({ x: seed.pos[0] * 0.5, y: HOPPER_BOUNDS.yMax, z: seed.pos[2] * 0.5 }, true);
        body.setLinvel({ x: 0, y: 0, z: 0 }, true);
        body.setAngvel({ x: 0, y: 0, z: 0 }, true);
      }
    });
  });

  return (
    <group>
      {/* Invisible container matching the glass hopper box (1.5 x 1.1 x 1.2),
          now WITH a ceiling so balls can never spawn or bounce above it. */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[0.73, 0.02, 0.58]} position={[0, -0.53, 0]} /> {/* floor */}
        <CuboidCollider args={[0.02, 0.55, 0.6]} position={[-0.73, 0, 0]} />  {/* -x wall */}
        <CuboidCollider args={[0.02, 0.55, 0.6]} position={[0.73, 0, 0]} />   {/* +x wall */}
        <CuboidCollider args={[0.75, 0.55, 0.02]} position={[0, 0, -0.58]} /> {/* -z wall */}
        <CuboidCollider args={[0.75, 0.55, 0.02]} position={[0, 0, 0.58]} />  {/* +z wall */}
        <CuboidCollider args={[0.73, 0.02, 0.58]} position={[0, 0.53, 0]} />  {/* ceiling */}
      </RigidBody>

      {seeds.map((s, i) => (
        <RigidBody
          key={i}
          ref={(el) => { bodiesRef.current[i] = el; }}
          colliders={false}
          position={s.pos}
          restitution={0.15}
          friction={0.6}
          angularDamping={0.65}
          linearDamping={0.35}
          ccd={true}
        >
          <BallCollider args={[0.13 * s.scale]} />
          <group scale={s.scale}>
            <Capsule
              topColor={s.color}
              radius={0.13}
              headColor={s.color}
              earColor={shadeColor(s.color, 0.28)}
            />
          </group>
        </RigidBody>
      ))}
    </group>
  );
}

function Dial() {
  const spinRef = useRef<THREE.Group>(null);
  const { phase, phaseStartTime } = useGacha();

  useFrame(() => {
    if (!spinRef.current) return;
    if (phase === "cranking") {
      const elapsed = performance.now() / 1000 - phaseStartTime;
      const t = easeRatchet(elapsed / PHASE_DURATIONS.cranking, 8);
      spinRef.current.rotation.y = -t * Math.PI * 2;
    } else if (phase === "idle" || phase === "result") {
      spinRef.current.rotation.y = 0;
    }
  });

  return (
    <group position={[0.42, -0.35, 0.68]} rotation={[Math.PI / 2, 0, 0]}>
      <group ref={spinRef}>
        <mesh castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.06, 32]} />
          <meshPhysicalMaterial color={ACCENT_CORAL} roughness={0.3} clearcoat={0.8} />
        </mesh>

        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.09, 0.05, 20]} />
          <meshPhysicalMaterial color={ACCENT_CORAL_DEEP} roughness={0.35} clearcoat={0.6} />
        </mesh>

        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.19, 0.035, Math.sin(a) * 0.19]} castShadow>
              <boxGeometry args={[0.03, 0.02, 0.05]} />
              <meshStandardMaterial color="#f4ede0" roughness={0.5} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function ChuteTray() {
  return (
    <group position={[-0.5, -0.95, 0.5]}>
      <mesh receiveShadow>
        <boxGeometry args={[0.5, 0.05, 0.35]} />
        <meshStandardMaterial color={PLASTIC_DARK} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.1, -0.15]} receiveShadow>
        <boxGeometry args={[0.5, 0.25, 0.02]} />
        <meshStandardMaterial color={PLASTIC_DARK} roughness={0.55} />
      </mesh>
      {[-0.24, 0.24].map((x) => (
        <mesh key={x} position={[x, 0.1, 0]} receiveShadow>
          <boxGeometry args={[0.02, 0.25, 0.35]} />
          <meshStandardMaterial color={PLASTIC_DARK} roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function ExitFlap() {
  const flapRef = useRef<THREE.Group>(null);
  const { phase } = useGacha();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (phase !== "dropping") {
      setOpen(false);
      return;
    }
    const openTimer = setTimeout(() => setOpen(true), PHASE_DURATIONS.dropping * 0.35 * 1000);
    const closeTimer = setTimeout(() => setOpen(false), PHASE_DURATIONS.dropping * 0.7 * 1000);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, [phase]);

  useFrame((_, delta) => {
    if (!flapRef.current) return;
    const targetRotX = open ? -Math.PI / 2.1 : 0;
    flapRef.current.rotation.x = THREE.MathUtils.damp(flapRef.current.rotation.x, targetRotX, 15, delta);
  });

  return (
    <group position={[-0.5, -0.8, 0.68]}>
      <group ref={flapRef}>
        <mesh position={[0, -0.11, 0]} castShadow>
          <boxGeometry args={[0.42, 0.22, 0.02]} />
          <meshPhysicalMaterial color="#333333" transmission={0.8} roughness={0.25} thickness={0.15} transparent opacity={0.85} />
        </mesh>
      </group>
    </group>
  );
}

function DispensedCapsule() {
  const { phase, phaseStartTime, bunny } = useGacha();
  const outerRef = useRef<THREE.Group>(null);
  const [lidOpen, setLidOpen] = useState(false);

  const topColor = bunny?.colorA ?? "#f7b8d2";

  useEffect(() => {
    if (phase === "opening") setLidOpen(true);
    if (phase === "idle" || phase === "cranking") setLidOpen(false);
  }, [phase]);

  useFrame(() => {
    const group = outerRef.current;
    if (!group) return;
    const elapsed = performance.now() / 1000 - phaseStartTime;

    if (phase === "dropping") {
      group.visible = true;
      const travelWindow = PHASE_DURATIONS.dropping * 0.65;

      if (elapsed < travelWindow) {
        const pathT = easeInOutCubic(elapsed / travelWindow);
        group.position.copy(DROP_CURVE.getPointAt(pathT));
        group.rotation.z += 0.3;
        group.scale.setScalar(1);
      } else {
        const bt = clamp01((elapsed - travelWindow) / (PHASE_DURATIONS.dropping - travelWindow));
        const bounceHeight = Math.sin(Math.PI * Math.min(1, bt * 1.4)) * 0.09 * (1 - bt * 0.4);
        group.position.set(
          THREE.MathUtils.lerp(CURVE_END.x, TRAY_REST.x, easeOutCubic(bt)),
          CURVE_END.y + bounceHeight,
          THREE.MathUtils.lerp(CURVE_END.z, TRAY_REST.z, easeOutCubic(bt))
        );
        group.rotation.z += 0.12 * (1 - bt);
      }
      return;
    }

    if (phase === "levitating") {
      group.visible = true;
      const t = clamp01(elapsed / PHASE_DURATIONS.levitating);
      const eased = easeOutCubic(t);
      group.position.lerpVectors(TRAY_REST, FLY_TARGET, eased);
      group.rotation.y += 0.02;
      group.scale.setScalar(THREE.MathUtils.lerp(1, 2.2, eased));

      if (t > 0.85) {
        const settle = (t - 0.85) / 0.15;
        group.position.x += Math.sin(elapsed * 50) * 0.012 * (1 - settle);
      }
      return;
    }

    if (phase === "opening") {
      group.visible = true;
      group.position.copy(FLY_TARGET);
      group.scale.setScalar(2.2);
      return;
    }

    group.visible = false;
  });

  return (
    <group ref={outerRef} visible={false}>
      <Capsule
        topColor={topColor}
        radius={0.16}
        lidOpen={lidOpen}
        headColor={topColor}
        earColor={bunny?.colorB}
      />
      {phase === "opening" && (
        <>
          <Sparkles count={30} scale={1.1} size={3} speed={0.5} color="#ffe29a" />
          <Sparkles count={20} scale={1.3} size={2.5} speed={0.4} color="#f7c6e0" />
        </>
      )}
    </group>
  );
}

const IDLE_POS = new THREE.Vector3(0, 0.5, 6.8);
const CLOSE_POS = new THREE.Vector3(0.3, 0.3, 6.0);
const LOOK_TARGET = new THREE.Vector3(0, 0.4, 0);

function CameraRig() {
  const { camera } = useThree();
  const { phase, phaseStartTime } = useGacha();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const elapsed = performance.now() / 1000 - phaseStartTime;
    const breathe = new THREE.Vector3(Math.sin(t * 0.25) * 0.05, Math.cos(t * 0.2) * 0.03, 0);

    let targetPos = IDLE_POS;
    if (phase === "cranking") {
      const p = clamp01(elapsed / PHASE_DURATIONS.cranking);
      targetPos = IDLE_POS.clone().lerp(CLOSE_POS, p * 0.4);
    } else if (phase === "settling" || phase === "dropping") {
      targetPos = IDLE_POS.clone().lerp(CLOSE_POS, 0.4);
    } else if (phase === "levitating" || phase === "opening") {
      targetPos = CLOSE_POS;
    }

    camera.position.lerp(targetPos.clone().add(breathe), 0.05);
    camera.lookAt(LOOK_TARGET);
  });

  return null;
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#fff2df" />
      <directionalLight
        position={[3, 5, 2.5]}
        intensity={1.2}
        color="#ffe3b0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />
    </>
  );
}

function StudioBackdrop() {
  return (
    <mesh position={[0, 0.5, -3]} receiveShadow>
      <planeGeometry args={[14, 8]} />
      <meshStandardMaterial color="#efe6da" roughness={1} />
    </mesh>
  );
}

function SceneContents() {
  const { phase } = useGacha();
  const dofActive = phase === "levitating";

  return (
    <>
      <PerspectiveCamera makeDefault fov={40} position={[0, 0.5, 6.8]} />
      <CameraRig />
      <Lighting />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <StudioBackdrop />

      <PresentationControls
        global
        snap={true}
        rotation={[0, 0, 0]}
        polar={[-0.05, 0.1]} 
        azimuth={[-Math.PI, Math.PI]} 
      >
        {/* Real physics world for both capsule piles. Gravity is tuned down
            from real-world 9.81 because these capsules are ~0.12 units
            (toy-scale), and full gravity makes them jitter/tunnel. */}
        <Physics gravity={[0, -5, 0]}>
          <MachineBody />
          <UpperHopper />
        </Physics>
      </PresentationControls>

      <Sparkles count={20} scale={6} size={1.4} speed={0.12} opacity={0.2} color="#fff6df" />

      <ContactShadows position={[0, -1.85, 0]} opacity={0.45} scale={6} blur={2.2} far={3} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.65} luminanceSmoothing={0.4} intensity={0.35} mipmapBlur />
        <DepthOfField focusDistance={dofActive ? 0.02 : 0} focalLength={0.03} bokehScale={dofActive ? 4 : 0} />
        <Vignette eskil={false} offset={0.15} darkness={0.5} />
      </EffectComposer>
    </>
  );
}

function BunnyGachaScene() {
  const { phase } = useGacha();
  const hideCanvas = phase === "result";

  return (
    <div
      className="absolute inset-0 transition-all duration-700 ease-out cursor-grab active:cursor-grabbing"
      style={{
        opacity: hideCanvas ? 0 : 1,
        filter: hideCanvas ? "blur(18px)" : "blur(0px)",
        pointerEvents: hideCanvas ? "none" : "auto",
      }}
    >
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <color attach="background" args={["#efe6da"]} />
        <fog attach="fog" args={["#efe6da", 7, 15]} />
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}


/* ============================================================================
 * Helper: "holland-lop" -> "hollandLop"  (khớp key trong bunnyGacha.i18n.en.ts)
 * ==========================================================================*/
function toCamelCase(id: string) {
  return id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}
/* ============================================================================
 * TRADING CARD UI (LANDSCAPE / HORIZONTAL LAYOUT - MOBILE SCROLLABLE)
 * ==========================================================================*/
type BunnyCopy = {
  name: string;
  blurb: string;
  type: string;
  personality: string;
  ability: string;
  fact: string;
};

export function TradingCardPopup() {
  const { phase, bunny, resetPhase } = useGacha();
  const { t } = useLocale();
  const visible = phase === "result" && !!bunny;
  if (!bunny) return null;

  const bunniesMap = t.personal.bunnyGacha.bunnies as Record<string, BunnyCopy | undefined>;
  const bunnyT = bunniesMap[toCamelCase(bunny.id)];

  const name = bunnyT?.name ?? bunny.name;
  const type = bunnyT?.type ?? bunny.type;
  const personality = bunnyT?.personality ?? bunny.personality;
  const ability = bunnyT?.ability ?? bunny.ability;
  const fact = bunnyT?.fact ?? bunny.fact;
  const blurb = bunnyT?.blurb ?? bunny.blurb;
  const close = () => resetPhase();


  const getRank = (val: number) => val >= 95 ? 'S' : val >= 85 ? 'A' : val >= 70 ? 'B' : 'C';
  const getStars = (val: number) => '★'.repeat(Math.min(5, Math.ceil(val / 20)));

  return createDomPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-y-auto bg-[#2c2421]/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <div className="flex min-h-full items-center justify-center p-4 py-16">
            <motion.div
              className="relative w-full max-w-[850px]"
              initial={{ scale: 0.8, y: 50, rotate: -1 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                className="absolute -right-3 -top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[#4a3b32] bg-[#e87a5d] font-sans text-xl font-black text-white shadow-[0_4px_0_#4a3b32] active:translate-y-[4px] active:shadow-none"
              >
                ✕
              </button>

              <div className="absolute inset-0 translate-x-3 translate-y-4 rounded-[28px] bg-[#4a3b32]/20" />
              <div className="relative flex flex-col overflow-hidden rounded-[24px] border-[3px] border-[#4a3b32] bg-[#fdfbf7] p-2.5 shadow-[inset_0_0_20px_rgba(210,196,180,0.3)]">
                <div className="relative flex w-full flex-col gap-6 rounded-[16px] border-[2px] border-dashed border-[#d2c4b4] p-6 pb-7 md:flex-row md:p-8">

                  <div className="absolute -left-[2px] -top-[2px] rounded-br-xl bg-[#4a3b32] px-3 py-1 font-mono text-[10px] font-bold text-[#fdfbf7]">
                    NO. {String(bunny.rarity).padStart(3, '0')}
                  </div>

                  <div className="absolute top-[2px] left-[30%] md:left-[60%] md:top-[5%] px-3 py-1 text-base tracking-widest text-[#e8b923]">
                    <span className="text-[#e8b923] font-bold">{t.personal.bunnyGacha.rarityLabel} </span>
                    {"★".repeat(bunny.rarity)}<span className="opacity-30">{"★".repeat(5 - bunny.rarity)}</span>
                  </div>

                  {/* =======================================================
                      CỘT TRÁI: ẢNH CHÂN DUNG & TÊN
                  ======================================================== */}
                  <div className="mt-4 flex w-full shrink-0 flex-col items-center md:mt-2 md:w-[280px]">
                    <div className="text-center">
                      <p className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#8c7a6b]">
                        {type.toUpperCase()}
                      </p>
                      <h2 className="mt-1 font-serif text-4xl font-bold leading-none text-[#4a3b32] md:text-5xl">
                        {name}
                      </h2>
                    </div>

                    <div className="relative mt-5 flex h-[240px] w-[210px] flex-col items-center justify-center overflow-hidden rounded-t-full rounded-b-[2.5rem] border-[4px] border-[#4a3b32] bg-[#f4ece1] shadow-[inset_0_8px_16px_rgba(74,59,50,0.1)]">
                      <div
                        className="absolute inset-0 opacity-[0.25]"
                        style={{ backgroundImage: `repeating-conic-gradient(from 0deg, transparent 0deg 15deg, ${bunny.colorA || '#e87a5d'} 15deg 30deg)` }}
                      />

                      <div className="relative z-10 flex h-full w-full items-center justify-center drop-shadow-[0_4px_8px_rgba(74,59,50,0.3)]">
                        {bunny.imageUrl ? (
                          <img
                            src={bunny.imageUrl}
                            alt={name}
                            className="absolute inset-0 h-full w-full object-cover object-center"
                          />
                        ) : (
                          <span className="text-[5.5rem]">{bunny.emoji}</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 rounded-lg border-[2px] border-[#4a3b32] bg-[#8db596] px-4 py-[3px] font-sans text-[13px] font-bold uppercase text-white shadow-[0_2px_0_#4a3b32]">
                      {personality} {t.personal.bunnyGacha.natureSuffix}
                    </div>
                  </div>

                  <div className="hidden w-px border-r border-dashed border-[#d2c4b4] md:block" />

                  {/* =======================================================
                      CỘT PHẢI: CHỈ SỐ, FORTUNE, ABILITY & FACT
                  ======================================================== */}
                  <div className="flex flex-1 flex-col justify-center gap-5 md:pt-4">

                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 font-sans text-[11px] font-bold text-[#4a3b32] md:text-xs">

                      <div className="flex items-end justify-between border-b border-dashed border-[#d2c4b4] pb-1">
                        <span className="text-[#8c7a6b]">{t.personal.bunnyGacha.stats.curiosity}</span>
                        <span className="text-sm text-[#e87a5d] md:text-[15px]">Rank {getRank(bunny.stats.curiosity)}</span>
                      </div>

                      <div className="flex items-end justify-between border-b border-dashed border-[#d2c4b4] pb-1">
                        <span className="text-[#8c7a6b]">{t.personal.bunnyGacha.stats.fluffiness}</span>
                        <span className="text-[13px] tracking-widest text-[#e8b923] md:text-sm">{getStars(bunny.stats.fluffiness)}</span>
                      </div>

                      <div className="flex items-end justify-between border-b border-dashed border-[#d2c4b4] pb-1">
                        <span className="text-[#8c7a6b]">{t.personal.bunnyGacha.stats.energy}</span>
                        <div className="flex gap-[3px] mb-[3px]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className={`h-2.5 w-2.5 rounded-full border-[1.5px] border-[#8db596] ${i < Math.ceil(bunny.stats.power / 20) ? 'bg-[#8db596]' : 'bg-transparent'}`} />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-end justify-between border-b border-dashed border-[#d2c4b4] pb-1">
                        <span className="text-[#8c7a6b]">{t.personal.bunnyGacha.stats.speed}</span>
                        <div className="flex gap-[3px] mb-[3px]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className={`h-2.5 w-2.5 border-[1.5px] border-[#6d8a96] ${i < Math.ceil(bunny.stats.speed / 20) ? 'bg-[#6d8a96]' : 'bg-transparent'}`} />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-end justify-between border-b border-dashed border-[#d2c4b4] pb-1">
                        <span className="text-[#8c7a6b]">{t.personal.bunnyGacha.stats.friendliness}</span>
                        <div className="flex gap-[2px] mb-[2px]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={`text-[15px] leading-none ${i < Math.ceil(bunny.stats.friendliness / 20) ? 'text-[#e8a5b1]' : 'text-[#d2c4b4]'}`}>♥</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-end justify-between border-b border-dashed border-[#d2c4b4] pb-1">
                        <span className="text-[#8c7a6b]">{t.personal.bunnyGacha.stats.totalPower}</span>
                        <span className="text-sm font-black text-[#4a3b32] md:text-[15px]">
                          {bunny.stats.power + bunny.stats.speed + bunny.stats.friendliness + bunny.stats.curiosity + bunny.stats.fluffiness}
                        </span>
                      </div>

                    </div>

                    {/* OMIKUJI FORTUNE */}
                    <div className="relative mt-2 w-full rounded-lg border-[2px] border-[#e8a5b1] bg-[#fcf2f4] p-4 shadow-sm md:p-5">
                      <p className="font-mono text-[9px] font-bold tracking-widest text-[#a85c6b] md:text-[10px]">
                        {t.personal.bunnyGacha.blurbPrefix}
                      </p>
                      <p className="mt-1 font-serif text-sm italic leading-relaxed text-[#4a3b32] md:mt-1.5 md:text-[15px]">
                        "{blurb}"
                      </p>
                    </div>

                    {/* SPECIAL ABILITY RIBBON & FACT */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-5">
                      <div className="flex items-center gap-2 rounded-full bg-[#4a3b32] px-4 py-1.5 font-sans text-[11px] font-bold tracking-wide text-[#fdfbf7] shadow-[0_3px_0_#d2c4b4] md:px-5 md:py-2 md:text-xs">
                        <span className="text-[#e8b923]">✦</span>
                        {ability}
                        <span className="text-[#e8b923]">✦</span>
                      </div>

                      <div className="relative flex-1 -rotate-[1deg] border border-[#565049] bg-[#fffae6] p-3 shadow-[2px_2px_5px_rgba(74,59,50,0.05)] md:p-4">
                        <div className="absolute -top-2 left-1/2 h-3 w-12 -translate-x-1/2 rotate-[-5deg] bg-[#cd5959] shadow-sm backdrop-blur-sm md:-top-2.5 md:h-3.5 md:w-14" />
                        <p className="font-sans text-[11px] leading-relaxed text-[#4a3b32] md:text-[12.5px]">
                          <span className="font-bold text-[#8db596]">{t.personal.bunnyGacha.factLabel}: </span>
                          {fact}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="mt-2 flex w-full items-center justify-between border-t-[3px] border-double border-[#d2c4b4] px-4 pt-2 opacity-60">
                  <div className="font-mono text-[9px] tracking-widest text-[#4a3b32] md:text-[10px]">
                    ID: {bunny.id.toUpperCase()}-2026
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>, document.body
  );
}

function GachaUI() {
  const { phase, pull } = useGacha();
  const canPull = phase === "idle" || phase === "result";
  const { t } = useLocale();
  const ui = t.personal.bunnyGacha.ui;

  return (
    <div className="min-h-[900px] w-full bg-[#F4F0E6] font-sans text-[#1E1E1E] overflow-hidden flex items-center justify-center selection:bg-[#C21807] selection:text-[#F4F0E6]">
      
      {/* Editorial / Physical Machine Wrapper */}
      <div className="relative w-full bg-[#F4F0E6] border-[4px] border-[#1E1E1E] p-6 md:p-10">
        
        {/* Corner Printer Marks */}
        <div className="absolute -top-[4px] -left-[4px] w-6 h-6 border-t-[4px] border-l-[4px] border-[#1E1E1E]" />
        <div className="absolute -top-[4px] -right-[4px] w-6 h-6 border-t-[4px] border-r-[4px] border-[#1E1E1E]" />
        <div className="absolute -bottom-[4px] -left-[4px] w-6 h-6 border-b-[4px] border-l-[4px] border-[#1E1E1E]" />
        <div className="absolute -bottom-[4px] -right-[4px] w-6 h-6 border-b-[4px] border-r-[4px] border-[#1E1E1E]" />

        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-[4px] border-[#1E1E1E] pb-6 mb-8 gap-6">
          <div className="flex flex-col">
            <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-[#1E1E1E]">
              {ui.title}
            </h1>
            <p className="font-serif italic text-lg md:text-2xl mt-3 font-semibold text-[#1E1E1E]">
              {ui.subtitle}
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end w-full md:w-auto">
            <div className="text-left md:text-right">
              <p className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#1E1E1E]">
                {ui.machineNo}
              </p>
              <p className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#1E1E1E] opacity-70 mt-1">
                {ui.dept}
              </p>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT SIDEBAR: Specs & Warnings */}
          <aside className="lg:col-span-3 flex flex-col gap-8 order-2 lg:order-1">
            
            {/* Machine Specs Box */}
            <div className="border-[2px] border-[#1E1E1E] bg-[#F4F0E6] p-4">
              <h2 className="font-mono text-sm font-bold tracking-widest uppercase border-b-[2px] border-[#1E1E1E] pb-2 mb-4">
                {ui.specs.heading}
              </h2>
              <ul className="flex flex-col gap-3 font-sans text-xs font-semibold uppercase tracking-wide">
                <li className="flex justify-between items-center border-b border-[#1E1E1E]/20 pb-1">
                  <span className="opacity-60">{ui.specs.dailyLimitLabel}</span>
                  <span>{ui.specs.dailyLimitValue}</span>
                </li>
                <li className="flex justify-between items-center border-b border-[#1E1E1E]/20 pb-1">
                  <span className="opacity-60">{ui.specs.capsuleRateLabel}</span>
                  <span>{ui.specs.capsuleRateValue}</span>
                </li>
                <li className="flex justify-between items-center border-b border-[#1E1E1E]/20 pb-1">
                  <span className="opacity-60">{ui.specs.visualOutputLabel}</span>
                  <span>{ui.specs.visualOutputValue}</span>
                </li>
                <li className="flex justify-between items-center border-b border-[#1E1E1E]/20 pb-1">
                  <span className="opacity-60">{ui.specs.powerSourceLabel}</span>
                  <span>{ui.specs.powerSourceValue}</span>
                </li>
              </ul>
            </div>

            {/* Warning Label */}
            <div className="border-[3px] border-[#C21807] p-3 relative overflow-hidden bg-[#F4F0E6]">
              {/* Hazard Stripes */}
              <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,#C21807,#C21807_5px,#F4F0E6_5px,#F4F0E6_10px)]" />
              <div className="mt-4 flex items-start gap-3">
                <div className="bg-[#C21807] text-[#F4F0E6] font-black w-6 h-6 flex items-center justify-center flex-shrink-0">
                  !
                </div>
                <div>
                  <h3 className="font-sans text-xs font-black uppercase tracking-wider text-[#C21807] mb-1">
                    {ui.warning.heading}
                  </h3>
                  <p className="font-serif text-[11px] leading-tight text-[#1E1E1E]/80 font-medium">
                    {ui.warning.body}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Footprints */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 opacity-20 pointer-events-none hidden lg:flex">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex rotate-[-15deg] flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-[#1E1E1E]" />
                    <div className="h-2 w-2 rounded-full bg-[#1E1E1E]" />
                  </div>
                  <div className="h-3 w-4 rounded-full bg-[#1E1E1E]" />
                </div>
              ))}
            </div>
          </aside>

          {/* CENTER: The Machine Centric View */}
          <main className="lg:col-span-6 order-1 lg:order-2 flex flex-col relative">
            
            {/* The Hardware Casing */}
            <div className="border-[4px] border-[#1E1E1E] bg-[#C6B89E] p-4 md:p-6 shadow-[12px_12px_0_#1E1E1E] relative z-10">
              
              {/* Inner Hardware Header */}
              <div className="flex justify-between items-center border-b-[3px] border-[#1E1E1E] pb-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#6cd3a8] rounded-full border-[2px] border-[#1E1E1E]" />
                  <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#1E1E1E]">
                    {ui.machineActive}
                  </span>
                </div>
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase bg-[#1E1E1E] text-[#F4F0E6] px-2 py-1">
                  {ui.machineCode}
                </span>
              </div>

              {/* 3D Canvas Screen */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden border-[4px] border-[#1E1E1E] bg-[#F4F0E6] shadow-inner">
                {/* Printed Grid Texture on Screen Background */}
                <div className="absolute inset-0 bg-[radial-gradient(#1E1E1E_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
                
                <BunnyGachaScene />
                <TradingCardPopup/>

                {/* Screen Registration Marks */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-[2px] border-l-[2px] border-[#1E1E1E]/30 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-[2px] border-r-[2px] border-[#1E1E1E]/30 pointer-events-none" />
              </div>

              {/* The Physical Button Area */}
              <div className="mt-8 flex flex-col items-center relative">
                
                {/* Pointing Arrows */}
                <div className="flex items-center gap-4 mb-3 opacity-80">
                  <span className="font-mono text-[10px] font-black text-[#1E1E1E] tracking-widest">▼</span>
                  <span className="font-mono text-xs font-black text-[#1E1E1E] tracking-widest uppercase border-b border-[#1E1E1E]">
                    {ui.turnHandle}
                  </span>
                  <span className="font-mono text-[10px] font-black text-[#1E1E1E] tracking-widest">▼</span>
                </div>

                <button
                  onClick={pull}
                  disabled={!canPull}
                  className="w-full relative group border-[4px] border-[#1E1E1E] bg-[#C21807] py-5 px-6 font-sans text-xl md:text-2xl font-black uppercase tracking-[0.15em] text-[#F4F0E6] transition-all active:translate-x-[6px] active:translate-y-[6px] active:shadow-none shadow-[8px_8px_0_#1E1E1E] disabled:bg-[#1E1E1E] disabled:text-[#F4F0E6]/50 disabled:shadow-[4px_4px_0_#1E1E1E] disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:cursor-not-allowed overflow-hidden"
                >
                  {/* Diagonal decorative scanlines on button */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_4px,rgba(0,0,0,0.1)_4px,rgba(0,0,0,0.1)_8px)] pointer-events-none" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {phase === "idle" && ui.pullIdle}
                    {phase !== "idle" && phase !== "result" && ui.pullProcessing}
                    {phase === "result" && ui.pullAgain}
                  </span>
                </button>
              </div>

            </div>
          </main>

          {/* RIGHT SIDEBAR: Info & Stamps */}
          <aside className="lg:col-span-3 flex flex-col gap-8 order-3">
            
            {/* Contents Ticket */}
            <div className="border-[2px] border-dashed border-[#1E1E1E] bg-[#F4F0E6] p-4 relative">
              {/* Ticket cutouts */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-4 bg-[#F4F0E6] border-y-[2px] border-r-[2px] border-[#1E1E1E] rounded-r-full" />
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-4 bg-[#F4F0E6] border-y-[2px] border-l-[2px] border-[#1E1E1E] rounded-l-full" />
              
              <h2 className="font-serif italic text-lg font-bold text-center border-b-[2px] border-dashed border-[#1E1E1E] pb-3 mb-4">
                {ui.contentsTicket.heading}
              </h2>
              <ul className="flex flex-col gap-3 font-sans text-xs font-bold uppercase tracking-wide">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#1E1E1E]" />
                  {ui.contentsTicket.species}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#1E1E1E]" />
                  {ui.contentsTicket.fortune}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#1E1E1E]" />
                  {ui.contentsTicket.personality}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#1E1E1E]" />
                  {ui.contentsTicket.fact}
                </li>
              </ul>
            </div>

            {/* Quality Stamp */}
            <div className="flex-1 flex flex-col items-center justify-center py-6">
              <div className="relative flex items-center justify-center w-32 h-32 rotate-[12deg]">
                <div className="absolute inset-0 rounded-full border-[4px] border-[#C21807] opacity-90" />
                <div className="absolute inset-1 rounded-full border-[2px] border-[#C21807] opacity-90" />
                <div className="text-center">
                  <p className="font-mono text-[10px] font-black text-[#C21807] tracking-widest uppercase">
                    {ui.stamp.inspected}
                  </p>
                  <p className="font-sans text-xl font-black text-[#C21807] uppercase tracking-tighter mt-1 border-y-2 border-[#C21807] py-1">
                    {ui.stamp.passed}
                  </p>
                  <p className="font-mono text-[8px] font-black text-[#C21807] tracking-widest uppercase mt-1">
                    {ui.stamp.dept}
                  </p>
                </div>
              </div>
            </div>

            {/* Extra Editorial Info */}
            <div className="text-right border-t-[4px] border-[#1E1E1E] pt-3">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#1E1E1E]">
                {ui.collectAll}
              </p>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * WILDLIFE FOCUS — COVER STORY SPREAD
 * Pop-art field-guide aesthetic: halftone print texture, torn-edge cutouts,
 * screen-print misregistration type, magazine masthead conventions.
 *
 * Cutouts are NOT mounted in cards, circles, or photo-mount frames. Each
 * bunny is torn straight out of its source photo (irregular clip-path,
 * drop shadow, hand-set rotation) and dropped directly onto the page like
 * a real scrapbook clipping — floated into paragraphs, tossed in a loose
 * pile, pinned across a section seam, or repeated small in the credits
 * strip. The page is built dense on purpose: every band carries color,
 * a stat, a list, or a photo so nothing reads as empty cream space.
 *
 * 8 source images, used across the spread (some repeated, small, as
 * photo-credit thumbnails — real mastheads do this constantly):
 *   1. lily-bunny.png    — hero, pinned over the headline/subhead seam
 *   2. kiwi-bunny.png    — floated into ¶1
 *   3. sitting-bunny.png — floated into ¶2
 *   4. carrot-cutout.png — small floated accent, same paragraph
 *   5-7. bunny-hop / knife-bunny / lettuce-bunny — tossed-photo pile
 *   8. glasses-bunny.png — torn blob, pinned across the pull-quote seam
 * ==========================================================================*/
const TORN_A =
  "polygon(2% 4%, 12% 0%, 30% 3%, 48% 0%, 68% 2%, 85% 0%, 98% 5%, 100% 22%, 97% 45%, 100% 68%, 96% 88%, 100% 98%, 80% 100%, 60% 97%, 40% 100%, 20% 96%, 3% 100%, 0% 78%, 4% 55%, 0% 30%)";
const TORN_B =
  "polygon(0% 6%, 18% 1%, 34% 5%, 52% 0%, 72% 4%, 90% 0%, 100% 9%, 95% 28%, 100% 48%, 93% 66%, 100% 86%, 100% 100%, 78% 96%, 58% 100%, 38% 95%, 18% 100%, 2% 94%, 6% 74%, 0% 54%, 5% 32%, 0% 16%)";
const TORN_C =
  "polygon(4% 0%, 22% 4%, 40% 0%, 58% 5%, 76% 1%, 94% 6%, 100% 24%, 95% 44%, 100% 64%, 96% 84%, 100% 100%, 82% 95%, 64% 100%, 46% 96%, 28% 100%, 10% 94%, 0% 100%, 3% 78%, 0% 58%, 4% 38%, 0% 18%)";
const TORN_BLOB =
  "polygon(48% 0%, 64% 3%, 80% 0%, 92% 10%, 100% 26%, 95% 42%, 100% 58%, 92% 74%, 100% 90%, 84% 100%, 66% 95%, 50% 100%, 34% 94%, 16% 100%, 4% 88%, 0% 70%, 6% 52%, 0% 34%, 8% 16%, 24% 4%, 38% 8%)";

// Part II — jagged "metallic" circle for the predator collage, and a soft
// scalloped circle for the prey collage (Section 03: The Blueprint).
const JAGGED_CIRCLE =
  "polygon(50% 0%, 68% 8%, 88% 12%, 92% 32%, 100% 50%, 92% 68%, 88% 88%, 68% 92%, 50% 100%, 32% 92%, 12% 88%, 8% 68%, 0% 50%, 8% 32%, 12% 12%, 32% 8%)";
const SCALLOP_CIRCLE =
  "polygon(50% 0%, 72% 12%, 93% 25%, 94% 50%, 93% 75%, 72% 88%, 50% 100%, 28% 88%, 7% 75%, 6% 50%, 7% 25%, 28% 12%)";

const SPECIMEN_SRCS = [
  "lily-bunny.png",
  "kiwi-bunny.png",
  "sitting-bunny.png",
  "bunny-hop.png",
  "knife-bunny.png",
  "lettuce-bunny.png",
  "glasses-bunny.png",
];
const TORNS = [TORN_A, TORN_B, TORN_C];

export function ScrapbookCanvas({ t }: { t: any }) {
  // Thêm 2 state này vào đầu component của bạn
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeZone, setActiveZone] = useState<{title: string, desc: string, color: string} | null>(null);

  const sb = t.personal.scrapbook;

  const SPECIMENS = SPECIMEN_SRCS.map((src, i) => ({
    src,
    label: sb.credits.specimens[i],
  }));

  // Hàm xử lý di chuyển chuột
  const handleMouseMove = (e: React.MouseEvent, title: string, desc: string, color: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setActiveZone({ title, desc, color });
  };
  return (
    <div className="w-full bg-[#141414] flex justify-center">
      <div className="relative w-full h-full bg-[#f4f0e6] shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden font-serif text-[#1b1b1b]">

        {/* PAPER GRAIN */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-multiply z-0"
          style={{ backgroundImage: "url('src/assets/bunnyMagazine/paper-texture.jpg')", backgroundSize: "cover" }}
        />
        {/* HALFTONE PRINT DOTS */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1] z-0"
          style={{
            backgroundImage: "radial-gradient(#c21807 1px, transparent 1.4px)",
            backgroundSize: "6px 6px",
          }}
        />
        <div className="relative z-10">

          {/* spine text — runs the full height of the spread, fills the
              dead margin instead of leaving it blank */}
          <div
            className="hidden xl:block absolute left-2 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
            style={{ writingMode: "vertical-rl" }}
          >
            <span className="font-sans font-black text-[9px] tracking-[0.35em] uppercase text-[#1b1b1b]/25">
              {sb.spine}
            </span>
          </div>


          {/* =========================================
              HERO — headline, subhead, quick-stat row, 
              and an absolute explosion of scattered bunny 
              photos to showcase an undeniable obsession.
          ========================================== */}
          <div className="relative px-4 sm:px-8 pt-8 sm:pt-12 pb-10 sm:pb-14 overflow-visible">

            {/* --- SCATTERED BUNNY PHOTO EXPLOSION ---
                Hidden on phones: at spread-scale sizing (150–300px tiles)
                these tiles would blanket a ~375px viewport and sit on
                top of the headline/body copy. The mobile hero photo
                below already carries the "obsession" visual on phones. */}
            
            {/* Image 1: Bóng đổ sâu chân thực (Deep 3D Shadow) */}
            <div className="hidden sm:block absolute top-[-2%] right-[40%] w-[160px] h-[200px] sm:w-[200px] sm:h-[260px] rotate-[8deg] z-20 cursor-pointer">
              <img 
                src="src/assets/bunnyMagazine/sitting-bunny.png" 
                className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform" 
                alt="Wild Bunny" 
              />
            </div>

            {/* Image 2: Bóng đổ gắt màu đỏ phong cách Pop-Art */}
            <div className="hidden sm:block absolute top-[40%] right-[30%] w-[220px] h-[180px] rotate-[-6deg] z-10 cursor-pointer">
              <img 
                src="src/assets/bunnyMagazine/gasp-bunny.png" 
                className="w-full h-full object-contain grayscale-[15%] drop-shadow-[6px_6px_0_#c21807] hover:-translate-y-2 transition-transform" 
                alt="Macro Bunny" 
              />
            </div>

            {/* Image 3: Hiệu ứng hình dán (Sticker) với viền trắng + bóng mờ */}
            <div className="hidden sm:block absolute bottom-[1%] right-[1%] w-[150px] h-[150px] rotate-[8deg] z-30 cursor-pointer">
              <img 
                src="src/assets/bunnyMagazine/bed-bunny.png" 
                className="w-full h-full object-contain drop-shadow-[0_0_3px_#fff] drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] hover:rotate-0 transition-transform" 
                alt="Cute Bunny" 
              />
            </div>

            {/* Image 4: Hiệu ứng đường viền đen sắc nét như truyện tranh */}
            <div className="hidden sm:block absolute bottom-[1%] left-[45%] w-[150px] h-[140px] z-20 cursor-pointer">
              <img 
                src="src/assets/bunnyMagazine/glasses-bunny.png" 
                className="w-full h-full object-contain drop-shadow-[0_0_2px_#1b1b1b] drop-shadow-[4px_4px_0_#1b1b1b] hover:scale-110 transition-transform" 
                alt="Curious Bunny" 
              />
            </div>

            {/* Image 5: Bóng đổ gắt màu Vàng Nghệ (rất hợp với tạp chí hoang dã) */}
            <div className="hidden sm:block absolute top-[-5%] right-[22%] w-[300px] h-[300px] z-30 cursor-pointer">
              <img 
                src="src/assets/bunnyMagazine/2-bunnies.png" 
                className="w-full h-full object-contain drop-shadow-[8px_8px_0_#e0d28b] drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-transform" 
                alt="Curious Bunny" 
              />
            </div>
            
            {/* Image 6: Hiệu ứng viền phát sáng (Glow) nhẹ nhàng */}
            <div className="hidden sm:block absolute bottom-[-2%] right-[28%] w-[180px] h-[180px] z-20 cursor-pointer">
              <img 
                src="src/assets/bunnyMagazine/sleeping-holland.png" 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform" 
                alt="Curious Bunny" 
              />
            </div>
            {/* -------------------------------------- */}

            <div className="pointer-events-none select-none absolute top-2 right-2 sm:right-8 font-serif font-black text-[clamp(5rem,14vw,10rem)] leading-none text-[#1b1b1b]/[0.05] z-0">
              兎
            </div>

            <p className="relative z-10 via-fontFamily-display-0 font-bold uppercase tracking-wide text-[20px] sm:text-[30px] text-[#1b4332] mb-1">
              {sb.heroEyebrow}
            </p>

            <div className="relative z-10">
              <h1
                aria-hidden="true"
                className="absolute top-[3px] left-[3px] font-sans font-black text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.85] uppercase tracking-tighter text-[#c21807] select-none"
              >
                {sb.heroTitleLine1}<br />{sb.heroTitleLine2}
              </h1>
              <h1 className="relative font-sans font-black text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.85] uppercase tracking-tighter text-[#1b1b1b]">
                {sb.heroTitleLine1}<br />{sb.heroTitleLine2}
              </h1>
            </div>

            <div className="relative z-10 mt-6 font-serif text-[13.5px] sm:text-[18px] leading-[1.6] text-[#2c2421] max-w-full sm:max-w-[55%] text-justify border-l-4 border-[#c21807] px-4 bg-[#f4f0e6]/60 backdrop-blur-[2px] py-1">
              <span className="font-sans font-black uppercase tracking-widest text-[#c21807] text-[15px] block mb-1">
                {sb.heroBoldLead}
              </span>
              {sb.heroBody}
            </div>

            <div className="relative z-10 mt-8 flex max-w-full sm:max-w-[58%] items-center gap-4 font-sans text-[10px] uppercase tracking-[0.28em] text-[#4d433b] sm:text-[13px]">

            {/* left rule */}
            <span className="h-px w-10 bg-[#8b8178]" />


            <span className="font-semibold">{sb.essayLabel}</span>


            <span className="text-[#9b9086]">•</span>

            <span className="sm:text-[13px]  tracking-normal text-[#302c29]">
              {sb.essayAuthor}
            </span>

            {/* right rule */}
            <span className="h-px flex-1 bg-[#8b8178]" />
          </div>

            {/* hero cutout — pinned to the hero section, overlapping the
                lower headline corner. The one place a bunny sits on top
                of running type. Paired with two stat stickers, not one. */}
            <div
              className="hidden sm:block absolute top-[14%] right-6 sm:right-[6%] w-[30%] max-w-[320px] rotate-[-3deg] z-20"
              style={{ clipPath: TORN_A }}
            >
              <img
                src="src/assets/bunnyMagazine/lily-bunny.png"
                alt="Hero Bunny"
                className="w-full h-auto object-contain drop-shadow-[10px_16px_16px_rgba(0,0,0,0.4)] bg-[#e8e4d8]"
              />
            </div>

            {/* mobile: same photo, dropped below the subhead — still
                frameless, just no room to bleed over type at this width */}
            <div className="sm:hidden relative mt-8 w-[68%] mx-auto rotate-[-2deg]" style={{ clipPath: TORN_A }}>
              <img
                src="src/assets/bunnyMagazine/lily-bunny.png"
                alt="Hero Bunny"
                className="w-full h-auto object-contain drop-shadow-[8px_12px_14px_rgba(0,0,0,0.4)] bg-[#e8e4d8]"
              />
            </div>
          </div>
          {/* =========================================
              ARTICLE — DYNAMIC SPREAD: Breaking the grid, 
              passionate & natural copy, massive drop-shadows 
              on cutouts, and editorial pop-art vibes.
          ========================================== */}
          <div className="relative border-t-[4px] border-[#1b1b1b] pt-12 pb-24 px-6 sm:px-12 bg-[#f4f0e6] overflow-hidden">
            
            {/* GIANT BACKGROUND TYPOGRAPHY (Adds depth, non-AI feel) */}
            <div className="absolute top-[-2%] left-[-2%] font-sans font-black text-[clamp(8rem,15vw,16rem)] text-[#1b1b1b]/[0.1] select-none leading-none tracking-tighter pointer-events-none z-0">
              UNSTOPPABLE
            </div>

              {/* TOP SECTION: The Hook & The Action Bunny */}
              <div className="relative z-10 flex flex-col md:flex-row items-start justify-between w-full mt-4">
                
                {/* Text Block */}
                <div className="max-w-[600px] w-full md:w-[60%]">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-[3px] w-[62%] bg-[#c21807]" />
                    <span className="font-sans text-[13px] font-black uppercase tracking-[0.25em] text-[#c21807]">
                      {sb.article.kicker}
                    </span>
                  </div>

                  <p className="font-serif text-[16px] sm:text-[18px] leading-[1.7] text-[#2c2421]">
                    
                    {/* FAIRYTALE DROP CAP (Illuminated Manuscript Style) */}
                    <div className="relative float-left mr-5 mb-2 mt-1 p-4 bg-[#fdfbf7] border-[2px] border-[#b5965a] shadow-[6px_6px_0_#1b4332]">
                      
                      {/* Inner dashed border for vintage feel */}
                      <div className="absolute inset-1 border border-dashed border-[#b5965a]/60"></div>
                      
                      {/* Corner flourishes (Góc trang trí cổ tích) */}
                      <span className="absolute top-1 left-1 text-[#b5965a] text-[10px] leading-none">✦</span>
                      <span className="absolute top-1 right-1 text-[#b5965a] text-[10px] leading-none">✦</span>
                      <span className="absolute bottom-1 left-1 text-[#b5965a] text-[10px] leading-none">✦</span>
                      <span className="absolute bottom-1 right-1 text-[#b5965a] text-[10px] leading-none">✦</span>

                      {/* The Magical Letter 'F' */}
                      <span
                        className="relative block uppercase top-[-0.5rem] text-[4.8rem] leading-[0.75] text-[#c21807]"
                        style={{
                          // Ưu tiên các font Gothic/Old English có sẵn trên hệ điều hành, fallback về serif
                          fontFamily: '"Old English Text MT", "Cloister Black", "Times New Roman", serif',
                          textShadow: '2px 2px 0 #b5965a, 4px 4px 0 rgba(0,0,0,0.1)'
                        }}
                      >
                        {sb.article.dropCapLetter}
                      </span>
                    </div>
                    {sb.article.paragraph1Pre} <span className="font-bold text-[#c21807]">{sb.article.paragraph1Bold}</span>{sb.article.paragraph1Post}
                  </p>
                  
                  <p className="font-serif text-[16px] sm:text-[18px] leading-[1.7] text-[#2c2421] mt-4">
                    {sb.article.paragraph2Pre} <span className="inline-block bg-[#fadb5f] font-sans font-black text-[#1b1b1b] px-2 py-0.5 transform border border-[#1b1b1b] shadow-[2px_2px_0_#1b1b1b]">{sb.article.paragraph2Highlight}</span>. {sb.article.paragraph2Post}
                  </p>
                </div>
                <div className="mt-10 flex flex-row items-center justify-center gap-8 md:mt-0 md:flex-row md:items-end md:gap-12">

                  {/* Action Bunny - Floating */}
                  <div className="relative w-[180px] sm:w-[320px] lg:w-[380px] rotate-[8deg] z-20 group">

                    <img
                      src="src/assets/bunnyMagazine/bunny-hop.png"
                      alt="Bunny mid-hop"
                      className="w-full h-auto object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute bottom-4 right-0 rotate-[8deg] border-[2px] border-[#1b1b1b] bg-white px-3 py-1 font-sans text-[10px] font-black uppercase tracking-wider shadow-[4px_4px_0_#1b1b1b]">
                      {sb.article.airborne}
                    </div>
                  </div>

                  {/* Action Bunny - Binky */}
                  <div className="relative w-[160px] sm:w-[320px] lg:w-[380px] z-20 group">

                    {/* Washi Tape */}
                    <div className="absolute -top-4 left-1/2 z-30 h-6 w-20 -translate-x-1/2 -rotate-3 bg-[#c21807]/80" />

                    <img
                      src="src/assets/bunnyMagazine/binky.jpg"
                      alt="Bunny Binky"
                      className="w-full h-auto object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute bottom-4 right-0 rotate-[8deg] border-[2px] border-[#1b1b1b] bg-white px-3 py-1 font-sans text-[10px] font-black uppercase tracking-wider shadow-[4px_4px_0_#1b1b1b]">
                      {sb.article.binky}
                    </div>
                  </div>

                </div>
            </div>


            {/* MIDDLE SECTION: Giant Pull Quote & Radar Ears */}
            <div className="relative z-10 mt-6 sm:mt-8 w-full flex flex-col md:flex-row items-center justify-center gap-10">
              
              {/* Radar Bunny - Absolute/Overlapping left */}
              <div className="relative w-[220px] sm:w-[280px] rotate-[6deg] z-20 md:-ml-12 cursor-pointer">
                <img
                  src="src/assets/bunnyMagazine/kiwi-bunny.png"
                  alt="Bunny radar ears"
                  className="w-full h-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.35)] hover:-translate-y-2 transition-transform"
                />
                {/* Tech Pointer */}
                <div className="absolute top-[20%] -right-14 sm:-right-10 flex items-center gap-1">
                  <span className="w-12 h-[2px] bg-[#1b1b1b]" />
                  <span className="font-sans font-black text-[9px] uppercase tracking-widest text-[#1b1b1b] bg-[#fadb5f] px-1">
                    {sb.article.radarLabel}
                  </span>
                </div>
              </div>

              {/* Editorial Quote */}
              <div className="ml-0 md:ml-10 max-w-[700px] text-center md:text-left z-10">
                <p className="font-sans font-black uppercase text-[24px] sm:text-[36px] leading-[1.1] text-[#1b4332] tracking-tighter">
                  {sb.article.quoteLine1} <br className="hidden sm:block"/>
                  <span className="text-[#c21807]">{sb.article.quoteHighlight}</span> {sb.article.quoteLine2}
                </p>
              </div>
            </div>


            {/* BOTTOM SECTION: The World Domination & Scrapbook Photo Cluster */}
            <div className="relative z-10 mt-20 sm:mt-12 w-full flex flex-col-reverse lg:flex-row items-end justify-between gap-12">
              
              {/* Scrapbook Photo Cluster (Left/Center) - Zero boxes, just overlapping cutouts */}
              <div className="relative w-full lg:w-[50%] h-[300px] sm:h-[400px] flex items-center justify-center mt-10 lg:mt-0">
                
                {/* Carrot Background Decor */}
                <div className="absolute top-0 left-0 w-[180px] rotate-[15deg] opacity-40 z-0">
                  <img src="src/assets/bunnyMagazine/carrot-cutout.png" alt="Carrot" className="w-full h-auto object-contain" />
                </div>

                {/* Bunny 1: Alert Stance */}
                <div className="absolute bottom-[2%] left-[2%] w-[200px] sm:w-[300px] rotate-[-5deg] z-20 cursor-pointer">
                  <img
                    src="src/assets/bunnyMagazine/knife-bunny.png"
                    alt="Bunny alert"
                    className="w-full h-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform"
                  />
                </div>

                {/* Bunny 2: Foraging (Overlapping Bunny 1) */}
                <div className="absolute top-[15%] right-[5%] w-[180px] sm:w-[280px] rotate-[8deg] z-30 cursor-pointer">
                  <img
                    src="src/assets/bunnyMagazine/lettuce-bunny.png"
                    alt="Bunny foraging"
                    className="w-full h-auto object-contain drop-shadow-[-10px_15px_15px_rgba(0,0,0,0.4)] hover:-translate-y-3 transition-transform"
                  />
                </div>

                {/* Bunny 3: Sitting calmly (Peeking from behind) */}
                <div className="absolute top-[5%] left-[25%] w-[160px] sm:w-[200px] rotate-[-12deg] z-10 opacity-90 cursor-pointer">
                  <img
                    src="src/assets/bunnyMagazine/sitting-bunny.png"
                    alt="Sitting bunny"
                    className="w-full h-auto object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
                  />
                </div>
              </div>


              {/* Text & Quick Facts (Right) */}
              <div className="w-full lg:w-[45%]">
                <h3 className="font-sans font-black uppercase text-2xl text-[#1b1b1b] mb-4 border-b-[3px] border-[#1b1b1b] pb-2 inline-block">
                  {sb.article.globalDominationHeading}
                </h3>
                <p className="font-serif text-[15px] sm:text-[16px] leading-relaxed text-[#2c2421] text-justify mb-8">
                  {sb.article.globalDominationBody}
                </p>

                {/* Field Notes (Styled like ripped tape notes) */}
                <div className="flex flex-col gap-3 font-sans text-[14px] sm:text-[14px] font-bold text-[#1b1b1b]">
                  <div className="bg-[#fadb5f] p-3 shadow-[4px_4px_0_#1b1b1b] border-[2px] border-[#1b1b1b] transform ">
                    <span className="text-[#c21807] text-lg mr-2 leading-none">✦</span> 
                    {sb.article.fact1}
                  </div>
                  <div className="bg-[#e0f2fe] p-3 shadow-[4px_4px_0_#1b1b1b] border-[2px] border-[#1b1b1b] transform  ml-4">
                    <span className="text-[#c21807] text-lg mr-2 leading-none">✦</span> 
                    {sb.article.fact2}
                  </div>
                  <div className="bg-white p-3 shadow-[4px_4px_0_#1b1b1b] border-[2px] border-[#1b1b1b] transform ">
                    <span className="text-[#c21807] text-lg mr-2 leading-none">✦</span> 
                    {sb.article.fact3}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* =========================================
              BY THE NUMBERS — full-width color band, pure
              typography, fills the transition to the quote.
          ========================================== */}
          <div className="relative border-t-[3px] border-[#1b1b1b] bg-[#fadb5f] px-4 sm:px-8 py-8 sm:py-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-8 bg-[#1b1b1b]" />
              <span className="font-sans text-[15px] font-black uppercase tracking-[0.2em] text-[#1b1b1b]">
                {sb.stats.heading}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 sm:divide-x-2 sm:divide-[#1b1b1b]/15">
              
              <div className="text-center sm:px-4">
                <span className="block font-sans font-black text-[clamp(2.5rem,6vw,3.5rem)] leading-none text-[#c21807]">{sb.stats.sprintValue}</span>
                <span className="block mt-2 font-sans font-bold text-[9px] sm:text-[10px] uppercase tracking-widest text-[#1b1b1b]">{sb.stats.sprintLabel}</span>
              </div>
              
              <div className="text-center sm:px-4">
                <span className="block font-sans font-black text-[clamp(2.5rem,6vw,3.5rem)] leading-none text-[#1b4332]">{sb.stats.hearingValue}</span>
                <span className="block mt-2 font-sans font-bold text-[9px] sm:text-[10px] uppercase tracking-widest text-[#1b1b1b]">{sb.stats.hearingLabel}</span>
              </div>
              
              <div className="text-center sm:px-4">
                <span className="block font-sans font-black text-[clamp(2.5rem,6vw,3.5rem)] leading-none text-[#c21807]">{sb.stats.speciesValue}</span>
                <span className="block mt-2 font-sans font-bold text-[9px] sm:text-[10px] uppercase tracking-widest text-[#1b1b1b]">{sb.stats.speciesLabel}</span>
              </div>
              
              <div className="text-center sm:px-4">
                <span className="block font-sans font-black text-[clamp(2.5rem,6vw,3.5rem)] leading-none text-[#1b4332]">{sb.stats.populationValue}</span>
                <span className="block mt-2 font-sans font-bold text-[9px] sm:text-[10px] uppercase tracking-widest text-[#1b1b1b]">{sb.stats.populationLabel}</span>
              </div>

            </div>
          </div>

          {/* =========================================
              PULL QUOTE — glasses-bunny torn into a rough blob,
              pinned across the seam at the top of this band.
          ========================================== */}
          <div className="relative border-t-[3px] border-[#1b1b1b] px-4 sm:px-8 pt-10 sm:pt-8 pb-8 sm:pb-9 bg-[#c21807] overflow-visible">
            <div className="relative max-w-[640px] mx-auto text-center">
              <span className="absolute -top-4 -left-3 sm:-left-6 font-sans font-black text-[40px] sm:text-[56px] leading-none text-white/25 select-none">"</span>
              <p className="font-serif italic text-[15px] sm:text-lg font-bold text-white px-4">
                {sb.pullQuote.text}
              </p>
              <span className="absolute -bottom-6 -right-3 sm:-right-6 font-sans font-black text-[40px] sm:text-[56px] leading-none text-white/25 select-none">"</span>
              <p className="mt-4 font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                {sb.pullQuote.attribution}
              </p>
            </div>

            <div
              className="hidden sm:block absolute -top-8 right-10 sm:right-16 w-24 h-24 sm:w-28 sm:h-28 rotate-[9deg] z-20"
              style={{ clipPath: TORN_BLOB }}
            >
              <img
                src="src/assets/bunnyMagazine/glasses-bunny.png"
                alt="Specimen bunny"
                className="w-full h-full object-cover contrast-125 drop-shadow-[6px_10px_12px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>

          {/* =========================================
              SPECIMEN CREDITS — Infinite Marquee Slider
              Bigger thumbnails, continuous loop, NO pause on hover.
          ========================================== */}
          <div className="relative border-t-[3px] border-[#1b1b1b] bg-[#1b1b1b] px-4 sm:px-8 py-6 sm:py-10 overflow-hidden">
            
            {/* Inline CSS for the infinite scroll animation ONLY (removed the hover pause) */}
            <style>{`
              @keyframes scroll-marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-scroll-marquee {
                /* Adjust 30s to make it faster or slower */
                animation: scroll-marquee 30s linear infinite;
                width: max-content;
              }
            `}</style>

            <div className="flex items-center gap-2 mb-2">
              <span className="h-[2px] w-8 bg-[#fadb5f]" />
              <span className="font-sans text-[11px] sm:text-[14px] font-black uppercase tracking-[0.25em] text-[#fadb5f]">
                {sb.credits.label}
              </span>
            </div>

            {/* Slider Wrapper */}
            <div className="relative flex items-center w-full">
              {/* The Scrolling Track */}
              <div className="flex items-center gap-6 sm:gap-10">
                
                {/* 
                  We duplicate the array 4 times to ensure it's long enough to cover 
                  ultra-wide screens and loop perfectly at 50% translation.
                */}
                {[...SPECIMENS, ...SPECIMENS, ...SPECIMENS, ...SPECIMENS].map((b, i) => (
                  <div
                    key={`${b.src}-${i}`}
                    className={`relative w-20 h-20 sm:w-32 sm:h-32 shrink-0 cursor-pointer ${
                      i % 2 === 0 ? "rotate-[-5deg]" : "rotate-[5deg]"
                    } ${i % 3 === 0 ? "mt-4" : "-mt-2"}`}
                    style={{ clipPath: TORNS[i % TORNS.length] }}
                  >
                    <img
                      src={`src/assets/bunnyMagazine/${b.src}`}
                      alt={b.label}
                      className="w-full h-full object-cover drop-shadow-[4px_6px_8px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                ))}
                
              </div>
            </div>
          </div>


          {/* =========================================================
              PART II — THE SENSES ISSUE
              Everything below is new. The hero subject (the rabbit)
              stays in torn photography, same as above. Everything that
              ISN'T the rabbit — predators, comparison species, diagrams —
              drops into a flat faceted/geometric icon language instead,
              so the diagrams read as schematic field-guide notation
              rather than competing with the photo collage above.
          ========================================================== */}

          {/* PAGE BREAK — perforated divider into Part II */}
          <div className="relative border-t-[3px] border-[#1b1b1b] bg-[#f4f0e6] px-4 sm:px-8 py-3 flex items-center gap-3">
            <div className="flex-1 border-t-2 border-dashed border-[#1b1b1b]/30" />
            <span className="font-sans font-black text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#1b1b1b]/50 whitespace-nowrap">
              {sb.foldHere}
            </span>
            <div className="flex-1 border-t-2 border-dashed border-[#1b1b1b]/30" />
          </div>

          {/* PART II MASTHEAD — mirrors the opening masthead */}
          <div className="flex items-center justify-between border-b-[3px] border-[#1b1b1b]">
            <div className="flex items-center gap-2 sm:gap-3">
            </div>
          </div>

          {/* =========================================
              01 — THE SONIC RADAR (Distance Infographic)
              Features vertical Burj reference and a full 
              horizontal "Field Scene" with grass z-indexing.
          ========================================== */}
          <div className="relative border-b-[4px] border-[#1b1b1b] bg-[#f4f0e6] px-4 sm:px-12 pt-12 pb-20 overflow-hidden">
            
            {/* --- TOP SECTION: Text & Vertical Burj Ruler --- */}
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
              
              {/* Text Content */}
              <div className="flex-1 max-w-[700px]">
                <h2 className="font-sans font-black uppercase text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] tracking-tighter text-[#1b1b1b] mb-6">
                  {sb.sonicRadar.heading1}<br />{sb.sonicRadar.heading2}
                </h2>
                
                <p className="font-serif text-[15px] sm:text-[18px] leading-relaxed text-[#2c2421] text-justify">
                  {sb.sonicRadar.paragraph1Pre} <span className="font-bold text-[#c21807]">{sb.sonicRadar.paragraph1Bold1}</span> {sb.sonicRadar.paragraph1Mid} <span className="font-bold text-[#1b4332]">{sb.sonicRadar.paragraph1Bold2}</span>. 
                </p>
                <p className="font-serif text-[15px] sm:text-[18px] leading-relaxed text-[#2c2421] text-justify mt-4">
                  {sb.sonicRadar.paragraph2Pre} <span className="font-bold text-[#1b4332]">{sb.sonicRadar.paragraph2Bold}</span> {sb.sonicRadar.paragraph2Post}
                </p>
              </div>

              {/* Vertical Height Reference Component */}
              <div className="sm:w-[450px] shrink-0 bg-white border-[3px] border-[#1b1b1b] shadow-[6px_6px_0_#1b1b1b] p-3 flex flex-col items-center z-20 mx-auto md:mx-0">
                <div className="w-full text-center border-b-[2px] border-[#1b1b1b] pb-2 mb-2 font-sans font-black text-[10px] uppercase tracking-widest text-[#1b1b1b]">
                  {sb.sonicRadar.heightReferenceLabel}
                </div>
                
                <div className="flex h-[300px] w-full">
                  {/* The Ruler */}{/* The Precise Scientific Ruler */}
                  <div className="relative w-[50px] border-r-[2px] border-[#1b1b1b] font-mono text-[9px] font-bold text-[#1b1b1b]">
                    
                    {/* Top exact mark (830m) */}
                    <div className="absolute top-0 right-0 w-3 border-t-[2px] border-[#1b1b1b]">
                      <span className="absolute right-4 -translate-y-[60%] text-[#c21807]">830m</span>
                    </div>
                    
                    {/* 100m Intervals */}
                    {[100, 200, 300, 400, 500, 600, 700, 800].map(h => (
                      <div 
                        key={h} 
                        className="absolute right-0 border-t-[2px] border-[#1b1b1b]" 
                        style={{ 
                          bottom: `${(h / 830) * 100}%`, 
                          width: h === 400 ? '12px' : '8px' 
                        }}
                      >
                        <span className={`absolute right-4 -translate-y-1/2 ${h === 400 ? 'text-[#c21807]' : 'text-[#1b1b1b]/50'}`}>
                          {h}{h === 400 ? 'm' : ''}
                        </span>
                      </div>
                    ))}
                    
                    {/* 50m Sub-ticks for extra detail */}
                    {[50, 150, 250, 350, 450, 550, 650, 750].map(h => (
                      <div 
                        key={`sub-${h}`} 
                        className="absolute right-0 border-t-[1.5px] border-[#1b1b1b]/40 w-1.5" 
                        style={{ bottom: `${(h / 830) * 100}%` }}
                      />
                    ))}

                    {/* Bottom mark (0m) */}
                    <div className="absolute bottom-0 right-0 w-3 border-t-[2px] border-[#1b1b1b]">
                      <span className="absolute right-4 -translate-y-[40%] text-[#c21807]">0m</span>
                    </div>
                  </div>
                  
                  {/* The Photo Cutouts - Aligned to the bottom ground line */}
                  <div className="flex-1 relative flex items-end justify-evenly">
                    
                    {/* 1. Burj Khalifa (~830m = 100% height) */}
                    <div className="h-full relative flex flex-col items-center justify-end group cursor-pointer z-10">
                      <span className="bg-green-600 rounded-lg p-1 border-stone-600 border-2 absolute -top-6 font-mono text-[14px] font-bold text-[#1b1b1b] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {sb.sonicRadar.burjLabel}
                      </span>
                      <img 
                        src="src/assets/bunnyMagazine/burj-khalifa.png" 
                        alt="Burj Khalifa" 
                        className="h-full w-auto object-contain drop-shadow-[4px_4px_0_rgba(0,0,0,0.15)]"
                      />
                    </div>

                    {/* 2. Eiffel Tower (~330m = 40% height) */}
                    <div className="h-[40%] relative flex flex-col items-center justify-end group cursor-pointer z-20">
                      <span className="bg-green-600 rounded-lg p-1 border-stone-600 border-2 absolute -top-6 font-mono text-[14px] font-bold text-[#1b1b1b] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {sb.sonicRadar.eiffelLabel}
                      </span>
                      <img 
                        src="src/assets/bunnyMagazine/eiffel-tower.png" 
                        alt="Eiffel Tower" 
                        className="h-full w-auto object-contain drop-shadow-[2px_2px_0_rgba(0,0,0,0.15)]"
                      />
                    </div>

                    {/* 3. Statue of Liberty (~93m = 11% height) - ADDED ZOOM ON HOVER */}
                    <div className="h-[11%] relative flex flex-col items-center justify-end group cursor-pointer z-30">
                      <span className="bg-green-600 rounded-lg p-1 border-stone-600 border-2 absolute -top-6 font-mono text-[14px] font-bold text-[#1b1b1b] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {sb.sonicRadar.libertyLabel}
                      </span>
                      <img 
                        src="src/assets/bunnyMagazine/statue-of-liberty.png" 
                        alt="Statue of Liberty" 
                        className="h-full w-auto object-contain drop-shadow-[1px_1px_0_rgba(0,0,0,0.15)]"
                      />
                    </div>

                  </div>
                </div>
              </div>

            </div>

            {/* --- BOTTOM SECTION: The Meadow Field Diagram --- */}
            <div className="relative w-full h-[200px] sm:h-[450px] md:h-[450px] mt-16 bg-[#e0f2fe] border-[4px] border-[#1b1b1b] overflow-hidden rounded-sm shadow-xl group">
              
              {/* Sky Grid lines (Blueprint feel) */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b1b1b15_1px,transparent_1px),linear-gradient(to_bottom,#1b1b1b15_1px,transparent_1px)] bg-[size:40px_40px]" />
              {/* 1. Grass Base (Z-index 10) - Natural image border, no rigid frame */}
              <div className="absolute bottom-0 left-0 right-0 pointer-events-none md:translate-y-[120px]">
                <img 
                  src="src/assets/bunnyMagazine/grass-texture.png" 
                  alt="Grass Texture" 
                  className="w-full h-auto object-contain object-bottom drop-shadow-[0_-4px_10px_rgba(0,0,0,0.15)]"
                />
              </div>

              {/* 2. The Listener: Bunny on the left (Z-index 20, stands ON grass) */}
              <img
                src="src/assets/bunnyMagazine/hare-cutout.png"
                alt="Listening bunny"
                className="absolute left-[3%] sm:left-[8%] bottom-[60px] sm:bottom-[80px] w-[80px] md:w-[110px] sm:w-[100px] h-auto object-contain drop-shadow-[0_20px_15px_rgba(255,255,255,0.8)] z-20 hover:scale-105 transition-transform"
              />
              {/* Bunny Label */}
              <div className="absolute left-[3%] sm:left-[8%] bottom-[20px] z-30 font-sans font-black text-[10px] sm:text-[12px] uppercase text-orange-200 tracking-widest drop-shadow-[0_2px_2px_#000]">
                {sb.sonicRadar.bunnyLabel}
              </div>

              {/* 3. The Threat: Wolf & Twig on the right (Z-index 20, stands ON grass) */}
              <div className="absolute right-[3%] sm:right-[8%] bottom-[50px] sm:bottom-[70px] z-20 flex flex-col items-center">
                
                {/* Wolf Image (Flipped horizontally to face the bunny) */}
                <img
                  src="src/assets/bunnyMagazine/wolf-cutout.png"
                  alt="Hungry wolf"
                  className="w-[100px] md:w-[160px] sm:w-[120px] h-auto object-contain drop-shadow-[0_20px_15px_rgba(255,255,255,0.8)] hover:scale-105 transition-transform"
                />
                
                {/* The Snap Action (Right under the wolf paw) */}
                <div className="absolute bottom-[-5px] sm:bottom-[-20px] flex items-center justify-center">
                  <div className="absolute w-[60px] h-[60px] bg-[#fadb5f] rotate-[15deg] z-10" style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />
                  <div className="absolute font-sans font-black text-[14px] sm:text-[18px] uppercase tracking-tighter text-[#c21807] z-20 transform -rotate-[10deg] drop-shadow-[2px_2px_0_#fff]">
                    {sb.sonicRadar.snap}
                  </div>
                </div>
              </div>
              {/* Wolf Label */}
              <div className="absolute right-[3%] sm:right-[8%] bottom-[20px] z-30 font-sans font-black text-[10px] sm:text-[12px] uppercase text-emerald-400 tracking-widest drop-shadow-[0_2px_2px_#000]">
                {sb.sonicRadar.wolfLabel}
              </div>


              {/* 4. The Scale: Horizontal stacked Burj Khalifas (Z-index 15, floating in sky) */}
              <div className="absolute top-[15%] sm:top-[5%] left-[18%] sm:left-[15%] right-[22%] sm:right-[15%] z-[15] flex flex-col items-center">
                
                <div className="bg-white border-[2px] border-[#1b1b1b] px-3 py-1 mb-2 sm:mb-4 shadow-[4px_4px_0_#c21807]">
                  <span className="font-sans font-black text-[11px] sm:text-[14px] uppercase tracking-widest text-[#1b1b1b]">
                    {sb.sonicRadar.scaleCaptionPre} <span className="text-[#c21807]">{sb.sonicRadar.scaleCaptionHighlight}</span>
                  </span>
                </div>

                {/* The Graphic Track - Tháp nằm trên, mũi tên nằm dưới */}
                <div className="relative w-full flex flex-col items-center">
                  
                  {/* The 3.5 Burjs Container (Nằm trên) */}
                  <div className="relative w-full flex items-center z-20 pb-2">
                    
                    {/* 3 Full Horizontal Burjs */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="relative w-[28.57%] aspect-square flex items-center justify-center">
                        <img 
                          src="src/assets/bunnyMagazine/burj-khalifa.png" 
                          alt="Burj unit" 
                          className="absolute w-full h-full object-contain rotate-90 opacity-80 drop-shadow-[0_6px_6px_rgba(0,0,0,0.4)]" 
                        />
                      </div>
                    ))}

                    {/* 1 Half Burj */}
                    <div className="relative w-[14.28%] aspect-[1/2] overflow-hidden flex items-center">
                       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[200%] aspect-square flex items-center justify-center">
                          <img 
                            src="src/assets/bunnyMagazine/burj-khalifa.png" 
                            alt="Half Burj unit" 
                            className="absolute w-full h-full object-contain rotate-90 opacity-80 drop-shadow-[0_6px_6px_rgba(0,0,0,0.4)]" 
                          />
                       </div>
                    </div>

                  </div>

                  {/* The Dashed Ruler Line (Nằm song song bên dưới) */}
                  <div className="relative w-full h-[4px] flex items-center z-10 mt-1">
                    {/* Đường đứt nét */}
                    <div className="absolute inset-x-0 border-t-[3px] border-dashed border-[#000000]" />
                    
                    {/* Arrow Left */}
                    <div className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[15px] border-[#000000]" />
                    
                    {/* Arrow Right */}
                    <div className="absolute right-[-15px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[15px] border-[#000000]" />
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* =========================================
              02 — THE GOLDEN RULE (Split-screen with Eye Overlays)
          ========================================== */}
          <div className="relative border-b-[3px] border-[#1b1b1b] overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              
              {/* HUNTS half (Hunter Eye Background) */}
              <div className="relative bg-[#1b1b1b] px-6 sm:px-10 py-14 sm:py-20 overflow-hidden">
                {/* Hunter Eye Overlay */}
                <div 
                  className="absolute inset-0 opacity-20 mix-blend-screen bg-no-repeat bg-center bg-cover"
                  style={{ backgroundImage: "url('src/assets/bunnyMagazine/hunter-eyes.jpg')" }}
                />
                
                <div className="pointer-events-none select-none absolute -right-6 -top-10 font-sans font-black text-[9rem] sm:text-[13rem] leading-none text-[#c21807]/30">
                  02
                </div>
                <p className="relative mt-6 font-sans font-black uppercase text-[clamp(1.9rem,6vw,3.4rem)] leading-[0.92] tracking-tight text-[#f4f0e6]">
                  {sb.goldenRule.huntsLine1}<br />{sb.goldenRule.huntsLine2}<br /><span className="text-[#c21807]">{sb.goldenRule.huntsHighlight}</span><br />{sb.goldenRule.huntsLine3}
                </p>
              </div>

              {/* HIDES half (Prey Eye Background) */}
              <div className="relative bg-[#eef1e6] px-6 sm:px-10 py-14 sm:py-20 overflow-hidden">
                {/* Prey Eye Overlay */}
                <div 
                  className="absolute inset-0 opacity-50 mix-blend-multiply bg-no-repeat bg-center bg-cover"
                  style={{ backgroundImage: "url('src/assets/bunnyMagazine/prey-eyes.jpg')" }}
                />
                
                <div className="pointer-events-none select-none absolute -left-6 -bottom-10 font-serif italic text-[9rem] sm:text-[13rem] leading-none text-[#1b4332]/40">
                  02
                </div>
                <p className="relative mt-6 font-serif italic text-[clamp(1.9rem,6vw,3.4rem)] leading-[0.98] text-[#1b4332]">
                  {sb.goldenRule.hidesLine1}<br />{sb.goldenRule.hidesLine2}<br /><span className="text-[#257d4c]">{sb.goldenRule.hidesHighlight}</span><br />{sb.goldenRule.hidesLine3}
                </p>
              </div>
            </div>
          </div>

          {/* =========================================
              03 — PREDATOR VS PREY BLUEPRINT (50/50 split)
              Enhanced with editorial typography, data specs,
              and tactical/radar graphic overlays.
          ========================================== */}
          <div className="relative border-b-[3px] border-[#1b1b1b] overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* ================= PREDATOR SIDE ================= */}
              <div className="relative bg-[#1b1b1b] px-6 sm:px-12 pt-10 sm:pt-6 pb-12 sm:pb-6 flex flex-col items-center overflow-hidden">
                
                {/* Tactical Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                <div className="relative w-full max-w-[350px]">
                  <h3 className="font-sans font-black uppercase text-[clamp(1.8rem,5vw,2.8rem)] leading-[0.95] text-[#f4f0e6] mb-8">
                    {sb.blueprint.predatorHeading1}<br /><span className="text-[#c21807]">{sb.blueprint.predatorHeading2}</span>
                  </h3>

                  {/* The Hunter Picture Frame */}
                  <div className="relative mx-auto w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] group">
                    
                    {/* Crosshair Graphic Overlay (Floats behind the image) */}
                    <div className="absolute inset-[-20px] border border-[#c21807]/30 rounded-full flex items-center justify-center">
                      <div className="w-full h-[1px] bg-[#c21807]/30" />
                      <div className="absolute h-full w-[1px] bg-[#c21807]/30" />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-[#c21807] to-[#3a2323] shadow-[0_0_0_2px_rgba(244,240,230,0.15)]" style={{ clipPath: JAGGED_CIRCLE }} />
                    <div className="absolute inset-[4px] bg-[#1b1b1b] overflow-hidden flex items-center justify-center" style={{ clipPath: JAGGED_CIRCLE }}>
                      <img 
                        src="src/assets/bunnyMagazine/hunter-animals.png" 
                        alt="The Hunter"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Specs & Description */}
                  <div className="mt-12 relative z-10">
                    <div className="grid grid-cols-2 gap-4 border-t border-b border-[#f4f0e6]/20 py-3 mb-4">
                      <div>
                        <span className="block font-mono text-[8px] text-[#f4f0e6]/50 uppercase tracking-widest mb-1">{sb.blueprint.fovLabel}</span>
                        <span className="font-sans font-black text-lg text-[#f4f0e6]">{sb.blueprint.predatorFovValue}</span>
                      </div>
                      <div>
                        <span className="block font-mono text-[8px] text-[#f4f0e6]/50 uppercase tracking-widest mb-1">{sb.blueprint.blindLabel}</span>
                        <span className="font-sans font-black text-lg text-[#c21807]">{sb.blueprint.predatorBlindValue}</span>
                      </div>
                    </div>
                    
                    <p className="font-serif text-[13px] sm:text-[14px] leading-relaxed text-[#f4f0e6]/80 text-justify">
                      {sb.blueprint.predatorBody}
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= PREY SIDE ================= */}
              <div className="relative bg-[#eef1e6] px-6 sm:px-12 pt-10 sm:pt-6 pb-12 sm:pb-6 flex flex-col items-center overflow-hidden">
                
                {/* Dot Pattern Background */}
                <div className="absolute inset-0 bg-[radial-gradient(#1b1b1b20_1.5px,transparent_1px)] bg-[size:16px_16px]" />
                
                <div className="relative w-full max-w-[350px]">
                  <h3 className="font-sans font-black uppercase text-[clamp(1.8rem,5vw,2.8rem)] leading-[0.95] text-[#1b1b1b] mb-8 text-right">
                    {sb.blueprint.preyHeading1}<br /><span className="text-[#87e738] drop-shadow-[1px_1px_0_#1b1b1b]">{sb.blueprint.preyHeading2}</span>
                  </h3>

                  {/* The Prey Picture Frame */}
                  <div className="relative mx-auto w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] group">
                    
                    {/* Radar Graphic Overlay */}
                    <div className="absolute inset-[-30px] rounded-full border-[#87e738] border-dashed border-2 flex items-center justify-center">
                      <div className="w-[80%] h-[80%] rounded-full border border-[#1b4332]/30" />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-[#87e738] to-[#1b4332] shadow-[0_0_0_2px_rgba(27,27,27,0.15)]" style={{ clipPath: SCALLOP_CIRCLE }} />
                    <div className="absolute inset-[4px] bg-[#1b1b1b] overflow-hidden flex items-center justify-center" style={{ clipPath: SCALLOP_CIRCLE }}>
                      <img 
                        src="src/assets/bunnyMagazine/prey-animals.png" 
                        alt="The Prey"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Specs & Description */}
                  <div className="mt-12 relative z-10">
                    <div className="grid grid-cols-2 gap-4 border-t border-b border-[#1b1b1b]/20 py-3 mb-4">
                      <div>
                        <span className="block font-mono text-[8px] text-[#1b1b1b] uppercase tracking-widest mb-1">{sb.blueprint.fovLabel}</span>
                        <span className="font-sans font-black text-lg text-[#1b1b1b]">{sb.blueprint.preyFovValue}</span>
                      </div>
                      <div>
                        <span className="block font-mono text-[8px] text-[#1b1b1b] uppercase tracking-widest mb-1">{sb.blueprint.blindLabel}</span>
                        <span className="font-sans font-black text-lg text-[#1b4332]">{sb.blueprint.preyBlindValue}</span>
                      </div>
                    </div>
                    
                    <p className="font-serif text-[13px] sm:text-[14px] leading-relaxed text-[#1b1b1b]/80 text-justify">
                      {sb.blueprint.preyBody}
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* =========================================
              04 — THE 360° SUPERPOWER (Scientific Diagram)
              Transitions from the predator/prey concept 
              specifically into the rabbit's optical anatomy.
          ========================================== */}
          <div className="relative border-b-[4px] border-[#1b1b1b] bg-[#f4f0e6] px-6 sm:px-12 pt-12 pb-16 overflow-hidden">
            
            {/* Subtle background blueprint grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b1b1b08_1.5px,transparent_1px),linear-gradient(to_bottom,#1b1b1b08_1px,transparent_1px)] bg-[size:30px_30px]" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
              
              {/* --- LEFT: Text & Transition --- */}
              <div className="w-full lg:w-[45%]"> 
                <h2 className="font-sans font-black uppercase text-[clamp(2.2rem,5vw,3.5rem)] leading-[0.9] tracking-tighter text-[#1b1b1b] mb-6">
                  {sb.bunnyLens.heading1}<br />{sb.bunnyLens.heading2}
                </h2>
                
                <div className="space-y-4 font-serif text-[15px] sm:text-[16px] leading-relaxed text-[#2c2421] text-justify">
                  <p>
                    {sb.bunnyLens.paragraph1}
                  </p>
                  <p>
                    {sb.bunnyLens.paragraph2Pre} <span className="font-bold text-[#1b4332]">{sb.bunnyLens.paragraph2Bold}</span>{sb.bunnyLens.paragraph2Post}
                  </p>
                  <p>
                    {sb.bunnyLens.paragraph3}
                  </p>
                </div>
              </div>

              {/* --- RIGHT: The Scientific Diagram (Interactive Edition) --- */}
              <div className="w-full lg:w-[50%] bg-white border-[3px] border-[#1b1b1b] shadow-[8px_8px_0_#1b1b1b] p-4 sm:p-8 relative overflow-hidden">
                
                {/* Corner accents for blueprint feel */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-[2px] border-l-[2px] border-[#1b1b1b]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-[2px] border-r-[2px] border-[#1b1b1b]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-[2px] border-l-[2px] border-[#1b1b1b]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-[2px] border-r-[2px] border-[#1b1b1b]" />

                {/* Main Diagram Container - Expanded & Interactive */}
                <div className="relative m-auto w-full max-w-[300px] aspect-square flex items-center justify-center">
                  
                  {/* SINGLE SVG CANVAS (Handles Z-index natively: Zones -> Bunny -> Tooltips) */}
                  <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                    
                    {/* --- SVG DEFINITIONS (Gradients & Patterns) --- */}
                    <defs>
                      <radialGradient id="monoGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="60%" stopColor="#fadb5f" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
                      </radialGradient>
                      <linearGradient id="binoGradientFront" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#c21807" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="binoGradientRear" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#c21807" stopOpacity="0.9" />
                      </linearGradient>
                      <pattern id="hatchPattern" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="0" y2="8" stroke="#1b1b1b" strokeWidth="1.5" strokeOpacity="0.15" />
                      </pattern>
                    </defs>

                    {/* LAYER 1: Background Rings & Crosshairs */}
                    <circle cx="250" cy="250" r="240" fill="none" stroke="#1b1b1b" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
                    <circle cx="250" cy="250" r="160" fill="none" stroke="#1b1b1b" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
                    <line x1="250" y1="10" x2="250" y2="490" stroke="#1b1b1b" strokeWidth="1" opacity="0.1" />
                    <line x1="10" y1="250" x2="490" y2="250" stroke="#1b1b1b" strokeWidth="1" opacity="0.1" />

                    {/* LAYER 2: INTERACTIVE ZONES (Hover catchers defined as Tailwind Peers) */}
                    
                    {/* Monocular Field (Yellow) */}
                    <circle cx="250" cy="250" r="230" fill="url(#monoGradient)" className="peer/mono opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-crosshair" />

                    {/* Front Blindspot */}
                    <g className="peer/blindF cursor-help">
                      <polygon points="190,230 310,230 250,70" fill="url(#hatchPattern)" stroke="#9b1b1b" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.9" className="transition-all duration-200 hover:fill-[#1b1b1b]/80" />
                      <polygon points="190,230 310,230 250,70" fill="#ffffff" opacity="0.7" className="pointer-events-none" />
                    </g>

                    {/* Rear Blindspot */}
                    <g className="peer/blindR cursor-help">
                      <polygon points="190,270 310,270 250,430" fill="url(#hatchPattern)" stroke="#9b1b1b" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.9" className="transition-all duration-200 hover:fill-[#1b1b1b]/80" />
                      <polygon points="190,270 310,270 250,430" fill="#ffffff" opacity="0.7" className="pointer-events-none" />
                    </g>

                    {/* Front Binocular Overlap (Now rounded using Arc 'A' command) */}
                    <path d="M 250 70 L 140 10 A 250 250 0 0 1 360 10 Z" fill="url(#binoGradientFront)" className="peer/binoF opacity-80 hover:opacity-100 hover:scale-105 origin-[250px_70px] transition-all duration-100 cursor-crosshair" />

                    {/* Rear Binocular Overlap (Now rounded using Arc 'A' command) */}
                    <path d="M 250 430 L 140 490 A 250 250 0 0 0 360 490 Z" fill="url(#binoGradientRear)" className="peer/binoR opacity-80 hover:opacity-100 hover:scale-105 origin-[250px_430px] transition-all duration-100 cursor-crosshair" />


                    {/* LAYER 3: THE REAL BUNNY (Embedded inside SVG to fix Z-index) */}
                    <image 
                      href="src/assets/bunnyMagazine/bunny-top.png" 
                      x="60" y="70" width="400" height="400" 
                      className="pointer-events-none drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)]"
                      style={{ transformOrigin: '250px 250px', transform: 'rotate(-95deg) translate(15px, -10px)' }}
                    />


                    {/* LAYER 4: FLOATING POPUP TOOLTIPS (Highest Z-index, perfectly positioned) */}
                    {/* By placing them after the <image> tag, they render ABOVE the bunny! */}
                    
                    {/* Mono Tooltip */}
                    <foreignObject x="10" y="220" width="220" height="200" className="opacity-0 peer-hover/mono:opacity-100 peer-focus/mono:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                      <div className="bg-white/95 backdrop-blur-sm border-[2px] border-[#1b1b1b] rounded-xl p-3 shadow-[4px_4px_0_#1b1b1b]">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#fadb5f] to-[#f59e0b] border border-[#1b1b1b]" />
                          <span className="font-sans font-black text-[20px] text-[#1b1b1b] uppercase tracking-wider">{sb.bunnyLens.tooltipMonoTitle}</span>
                        </div>
                        <p className="font-serif text-[20px] text-[#1b1b1b]/80 leading-tight">{sb.bunnyLens.tooltipMonoBody}</p>
                      </div>
                    </foreignObject>

                    {/* Front Bino Tooltip */}
                    <foreignObject x="290" y="30" width="210" height="200" className="opacity-0 peer-hover/binoF:opacity-100 peer-focus/binoF:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                      <div className="bg-white/95 backdrop-blur-sm border-[2px] border-[#1b1b1b] rounded-xl p-3 shadow-[4px_4px_0_#1b1b1b]">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#c21807] border border-[#1b1b1b]" />
                          <span className="font-sans font-black text-[20px] text-[#1b1b1b] uppercase tracking-wider">{sb.bunnyLens.tooltipBinoFrontTitle}</span>
                        </div>
                        <p className="font-serif text-[20px] text-[#1b1b1b]/80 leading-tight">{sb.bunnyLens.tooltipBinoFrontBody}</p>
                      </div>
                    </foreignObject>

                    {/* Rear Bino Tooltip */}
                    <foreignObject x="0" y="380" width="300" height="200" className="opacity-0 peer-hover/binoR:opacity-100 peer-focus/binoR:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                      <div className="bg-white/95 backdrop-blur-sm border-[2px] border-[#1b1b1b] rounded-xl p-3 shadow-[4px_4px_0_#1b1b1b]">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#c21807] border border-[#1b1b1b]" />
                          <span className="font-sans font-black text-[20px] text-[#1b1b1b] uppercase tracking-wider">{sb.bunnyLens.tooltipBinoRearTitle}</span>
                        </div>
                        <p className="font-serif text-[20px] text-[#1b1b1b]/80 leading-tight">{sb.bunnyLens.tooltipBinoRearBody}</p>
                      </div>
                    </foreignObject>

                    {/* Front Blind Spot Tooltip */}
                    <foreignObject x="30" y="50" width="300" height="200" className="opacity-0 peer-hover/blindF:opacity-100 peer-focus/blindF:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                      <div className="bg-white/95 backdrop-blur-sm border-[2px] border-[#1b1b1b] rounded-xl p-3 shadow-[4px_4px_0_#1b1b1b]">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-3 h-3 rounded-sm bg-[#e5e5e5] border-[1.5px] border-dashed border-[#1b1b1b]" />
                          <span className="font-sans font-black text-[20px] text-[#1b1b1b] uppercase tracking-wider">{sb.bunnyLens.tooltipBlindFrontTitle}</span>
                        </div>
                        <p className="font-serif text-[20px] text-[#1b1b1b]/80 leading-tight">{sb.bunnyLens.tooltipBlindFrontBody}</p>
                      </div>
                    </foreignObject>

                    {/* Rear Blind Spot Tooltip */}
                    <foreignObject x="30" y="380" width="300" height="200" className="opacity-0 peer-hover/blindR:opacity-100 peer-focus/blindR:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                      <div className="bg-white/95 backdrop-blur-sm border-[2px] border-[#1b1b1b] rounded-xl p-3 shadow-[4px_4px_0_#1b1b1b]">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-3 h-3 rounded-sm bg-[#e5e5e5] border-[1.5px] border-dashed border-[#1b1b1b]" />
                          <span className="font-sans font-black text-[20px] text-[#1b1b1b] uppercase tracking-wider">{sb.bunnyLens.tooltipBlindRearTitle}</span>
                        </div>
                        <p className="font-serif text-[20px] text-[#1b1b1b]/80 leading-tight">{sb.bunnyLens.tooltipBlindRearBody}</p>
                      </div>
                    </foreignObject>
                  </svg>

                </div>

                {/* Technical Legend */}
                <div className="mt-8 pt-4 border-t-[2px] border-dashed border-[#1b1b1b]/30 grid grid-cols-3 gap-y-3 font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#1b1b1b]">
                  <span className="flex items-center gap-3">
                    <span className="w-5 h-4 bg-gradient-to-r from-[#fadb5f] to-[#f59e0b] border border-[#1b1b1b]" /> 
                    {sb.bunnyLens.legendMono}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="w-5 h-4 bg-gradient-to-r from-[#f59e0b] to-[#c21807] border border-[#1b1b1b]" /> 
                    {sb.bunnyLens.legendBino}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="relative w-5 h-4 border-[2px] border-dashed border-[#1b1b1b] bg-white overflow-hidden">
                       <span className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#1b1b1b_2px,#1b1b1b_4px)]" />
                    </span>
                    {sb.bunnyLens.legendBlind}
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* =========================================
              FOOTER — page folio (Part II)
          ========================================== */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-2.5 font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#1b1b1b] border-t border-[#1b1b1b]/30 bg-[#f4f0e6]">
            <span>{sb.footer}</span>
          </div>

        </div>
      </div>
    </div>
  );
}


/* ============================================================================
 * MAIN EXPORT
 * ==========================================================================*/
export default function BunnyShrineSection() {
  const { t } = useLocale();

  return (
    <div className="flex w-full flex-col bg-[#fdf6e3]">
      <ScrapbookCanvas t={t} />
      <GachaProvider>
        <GachaUI />
      </GachaProvider>
    </div>
  );
}