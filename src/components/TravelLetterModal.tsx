import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/content/i18n";

export interface TravelLetterModalProps {
  open: boolean;
  countryKey: string;
  city: string;
  image: string;
  onClose: () => void;
}

export function TravelLetterModal({
  open,
  countryKey,
  city,
  image,
  onClose,
}: TravelLetterModalProps) {
  const { t } = useLocale();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const letterData = (t.countries as any)[countryKey]?.letters?.[city] || {
    title: `Letter from ${city}`,
    body: `We wandered through the streets of ${city}, getting lost in its timeless rhythm.\nEvery corner held a new story, every sunset painted a different memory.\nI hope to return here someday.`,
    signature: "A wandering soul",
  };

  const bodyLines = letterData.body.split("\n");

  // Premium paper texture background
  const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 sm:p-6 md:p-12"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="letter-title"
        >
          <motion.div
            initial={{ scale: 0.95, y: 40, rotateX: -8, opacity: 0 }}
            animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 250, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-[1100px] flex-col overflow-y-auto overflow-x-hidden rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] md:flex-row md:overflow-hidden"
            style={{
              backgroundColor: "#Fcfaf5", // Warmer, creamier luxury paper
              maxHeight: "90vh",
            }}
          >
            {/* Overlay Texture Layer */}
            <div 
              className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-20 z-0" 
              style={{ backgroundImage: paperTexture }}
            />
            
            {/* Paper lighting gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-black/5 z-0" />


            {/* Premium Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="group absolute right-6 top-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-stone-200/50 text-stone-600 backdrop-blur-md transition-all duration-300 hover:scale-95 hover:bg-stone-300/80 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-500 group-hover:rotate-90"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* LEFT COLUMN: Polaroid */}
            <div className="relative z-10 flex w-full flex-col items-center justify-center p-10 pt-16 md:w-[45%] md:p-14">
              <motion.div
                initial={{ opacity: 0, x: -40, rotate: -6, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, rotate: -2, scale: 1 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 180, damping: 22 }}
                whileHover={{ scale: 1.02, rotate: -1, y: -5 }}
                className="relative bg-[#FAFAF8] p-3 pb-16 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] ring-1 ring-black/5 md:p-4 md:pb-20"
              >
                {/* Masking Tape */}
                <div className="absolute -top-3 left-1/2 h-9 w-28 -translate-x-1/2 rotate-[2deg] bg-orange-300/70 shadow-sm backdrop-blur-sm border border-white/30 rounded-sm z-20" />
                
                <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden bg-stone-200 sm:max-w-[340px]">
                  {/* Inner shadow overlay for depth */}
                  <div className="absolute inset-0 shadow-[inset_0_3px_10px_rgba(0,0,0,0.15)] z-10 pointer-events-none" />
                  <img
                    src={image}
                    alt={city}
                    className="h-full w-full object-cover grayscale-[15%] contrast-[1.05]"
                  />
                </div>
                
                <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center justify-center opacity-80 md:bottom-6">
                  <p className="font-['Brush_Script_MT',cursive,serif] text-2xl tracking-wide text-stone-800 antialiased">
                    {city}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-400 mt-1">
                    {countryKey}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Letter Body */}
            <div className="relative z-10 flex w-full flex-col p-10 pt-0 md:w-[55%] md:p-14 md:pl-0">
              
              {/* STAMPS LAYER */}
              {/* Air Mail Stamp */}
              <motion.div 
                initial={{ scale: 1.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 0.65, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 15 }}
                className="pointer-events-none absolute -top-2 right-16 z-0 mix-blend-multiply md:-left-8 md:top-12"
              >
                <svg width="140" height="65" viewBox="0 0 140 65" className="text-red-700">
                  <rect x="2" y="2" width="136" height="61" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8 4" />
                  <rect x="8" y="8" width="124" height="49" fill="none" stroke="currentColor" strokeWidth="1" />
                  <text x="70" y="40" fontFamily="sans-serif" fontSize="18" fontWeight="800" textAnchor="middle" fill="currentColor" letterSpacing="3">AIR MAIL</text>
                </svg>
              </motion.div>

              {/* Passport Stamp */}
              <motion.div 
                initial={{ scale: 1.8, opacity: 0, rotate: 20 }}
                animate={{ scale: 1, opacity: 0.45, rotate: 12 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 12 }}
                className="pointer-events-none absolute right-6 top-32 z-0 mix-blend-multiply md:right-16 md:top-20"
              >
                <svg width="110" height="110" viewBox="0 0 110 110" className="text-sky-800">
                  <circle cx="55" cy="55" r="50" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="55" cy="55" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
                  <circle cx="55" cy="55" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                  <text x="55" y="42" fontFamily="serif" fontSize="10" textAnchor="middle" fill="currentColor" className="uppercase tracking-[0.2em]">{countryKey}</text>
                  <text x="55" y="65" fontFamily="sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle" fill="currentColor">{new Date().getFullYear()}</text>
                  <path d="M 35 75 Q 55 65 75 75" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
              </motion.div>

              {/* TEXT CONTENT */}
              <div className="relative z-10 mt-6 flex h-full flex-col md:mt-16">
                <motion.h2
                  id="letter-title"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, ease: "easeOut" }}
                  className="mb-8 font-serif text-3xl font-medium tracking-wide text-stone-800 md:text-4xl"
                >
                  {letterData.title}
                </motion.h2>

                {/* Elegant Notebook Lines wrapper */}
                <div 
                  className="relative flex-grow font-serif text-[17px] text-stone-700 antialiased md:text-[19px]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 35px, rgba(168, 162, 158, 0.3) 35px, rgba(168, 162, 158, 0.3) 36px)",
                    backgroundAttachment: "local",
                    lineHeight: "36px",
                  }}
                >
                  {bodyLines.map((line: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: "easeOut" }}
                      className="min-h-[36px]"
                    >
                      {line || "\u00A0"}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + bodyLines.length * 0.1, duration: 0.8 }}
                  className="mt-14 flex justify-end pb-8 pr-12"
                >
                  <p className="font-['Brush_Script_MT',cursive,serif] text-3xl text-stone-800 opacity-90 drop-shadow-sm md:text-4xl" style={{ transform: "rotate(-4deg)" }}>
                    - Ngoc Hau
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}