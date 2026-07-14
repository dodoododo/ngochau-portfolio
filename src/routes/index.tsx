import { PageShell } from "@/components/PageShell";
import { useLocale } from "@/content/i18n";
import portrait1 from "@/assets/hung-bien.jpg";
import portrait2 from "@/assets/cho-dalat.jpg";
import portrait3 from "@/assets/khoa-hau.jpg";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Introduction() {
  const { t } = useLocale();
  const photos = [portrait1, portrait2, portrait3]; 
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically cycle through photos every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [photos.length]);
  return (
    <PageShell scrollable={false}>
      {/* 
        Added `overflow-y-auto` here. It will only show a scrollbar on mobile 
        if the stacked content exceeds the viewport height. On desktop, it fits exactly. 
      */}
      <div className="flex h-full w-full flex-col md:flex-row overflow-y-auto z-0">
        
        {/* 
          Mobile Fix: Added `h-[50vh] min-h-[350px] shrink-0` to ensure the image 
          takes up appropriate space before scrolling to the text. Reverts to `h-full` on desktop. 
        */}
        {/* Left Side: Photo Slideshow */}
        <div className="relative w-full h-[50vh] min-h-[350px] shrink-0 overflow-hidden bg-muted md:h-full md:w-1/2">
          
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentIndex}
              src={photos[currentIndex]}
              alt={t.intro.portraitAlt}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>

          
          <div className="absolute bottom-6 left-4 z-20 flex items-center gap-2 rounded-sm bg-black/40 px-3 py-1.5 text-sm md:text-[20px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur md:left-6">
            <span className="fi fi-vn"></span>
            <span>{t.meta.location}</span>
          </div>
        </div>

        {/* 
          Responsive padding (p-6 to lg:p-20) and gap adjustments to ensure it looks 
          great on a tight mobile screen without getting cut off.
        */}
        <div className="flex w-full shrink-0 flex-col justify-center gap-6 p-6 sm:p-10 md:w-1/2 md:gap-6 md:p-16 lg:p-20">
          <div className="flex flex-col items-start">
            <h1
              className="font-serif text-[3rem] md:text-[3rem] leading-none tracking-[-0.06em] text-[#191919]"
              style={{ fontFamily: '"Bodoni Moda", serif' }}
            >
              TĂNG NGỌC HẬU
            </h1>
            <p
              className="mt-1 text-[1.5rem] tracking-[0.45em] text-[#3e3b37]"
              style={{ fontFamily: '"Shippori Mincho", "Noto Serif JP", serif' }}
            >
              タン・ゴック・ハウ
            </p>
          </div>

          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display text-xl font-light uppercase tracking-[0.1em] text-accent md:text-2xl"
          >
            {t.intro.kicker}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="font-display text-4xl sm:text-5xl font-extrabold leading-[0.98] tracking-tight text-ink md:text-6xl lg:text-6xl"
          >
            {t.intro.headline.map((line: string, i: number) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="max-w-xl text-base leading-relaxed text-ink/70 md:text-lg"
          >
            {t.intro.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 flex items-center gap-3 md:mt-4"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] text-ink/70">
              {t.meta.availability}
            </span>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}