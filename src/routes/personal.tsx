import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { LazyMount } from "@/components/Lazymount";
import { useLocale } from "@/content/i18n";
import { COUNTRY_META, COUNTRY_ORDER } from "@/content/countries-order";
import bunny1 from "@/assets/bunny-1.jpg";
import bunny2 from "@/assets/bunny-2.jpg";
import bunny3 from "@/assets/bunny-3.jpg";
import bunny4 from "@/assets/bunny-4.jpg";
import outdoor1 from "@/assets/outdoor-1.jpg";
import outdoor2 from "@/assets/outdoor-2.jpg";
import outdoor3 from "@/assets/outdoor-3.jpg";
import outdoor4 from "@/assets/outdoor-4.jpg";

import { TRAVEL_GALLERY } from "@/content/travel-gallery";

// Lazy-loaded: only fetched/rendered once they're actually needed,
// instead of being bundled into the initial page load.
const CountryGlobe = lazy(() =>
  import("@/components/CountryGlobe").then((m) => ({ default: m.CountryGlobe }))
);
const BunnyShrineSection = lazy(() => import("@/components/BunnyShrineSection"));
const VintageMusicPlayer = lazy(() => import("@/components/VintageMusicPlayer"));
const TravelLetterModal = lazy(() =>
  import("@/components/TravelLetterModal").then((m) => ({ default: m.TravelLetterModal }))
);
import OutdoorsChapter from "@/components/OutdoorsChapter";

const OUTDOOR = [outdoor1, outdoor2, outdoor3, outdoor4];
const BUNNIES = [bunny1, bunny2, bunny3, bunny4];

export default function Personal() {
  const { t } = useLocale();
  const [selected, setSelected] = useState<keyof typeof COUNTRY_META>("Turkey");

  // Đổi state này để lưu cả city và image, phục vụ cho TravelLetterModal
  const [selectedLetter, setSelectedLetter] = useState<{ city: string; image: string } | null>(null);

  const country = t.countries[selected];
  // Thêm fallback [] để tránh lỗi map nếu quốc gia chưa có data gallery
  const gallery = TRAVEL_GALLERY[selected] || [];

  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center w-full mx-auto mt-8">
        {/* --- GIANT TYPOGRAPHY --- */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-[7rem] lg:text-[5rem] leading-[0.85] tracking-tighter text-center"
        >
          {t.personal.personalTitle[0]}
          <br />
          <span className="italic text-[#D95A40]">{t.personal.personalTitle[1]}</span>
        </motion.h1>

        {/* --- SUPPORTING TEXT --- */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-[1000px] text-center font-sans text-[16px] leading-[1.8] font-medium text-[#111111]/90 mx-2 md:mt-5 md:text-[20px]"
        >
          {t.personal.personalDescription}
        </motion.p>

        {/* --- SCROLL INDICATOR --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-2 flex flex-col items-center gap-4 md:mt-6"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4"
          >
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#111111]/40 md:text-[10px]">
              {t.personal.personalDrag}
            </span>

            <span className="block h-10 w-px bg-[#111111]/20" />
          </motion.div>
        </motion.div>

      </div>

      {/* Chapter 1 — Globe */}
      <section className="border-b border-card-border px-6 py-4 md:py-6 mx-auto w-full">
        <div className="mx-auto w-full">
          {/* <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t.personal.chapter1.label}
          </p> */}
          <p className="mx-auto mb-3 md:mb-6 max-w-8xl text-center font-display text-xl leading-snug tracking-tight md:text-3xl">
            {t.personal.chapter1.intro}
          </p>

          <div className="rounded-3xl border border-slate-500 border-card-border bg-white p-3 shadow-sm md:p-3">
            <h2 className="mb-3 text-center font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">
              {t.personal.chapter1.moduleHeading}
            </h2>

            {/* Chỉnh lại Grid: Bỏ ép height cứng, dùng min-height và gap lớn hơn để thở */}
            <div className="grid grid-cols-1 gap-6 lg:min-h-[500px] lg:grid-cols-12">
              
              {/* 1. Country list rail (Mobile: Nằm giữa, Desktop: Nằm trái) */}
              <div className="scrollbar-orange order-2 col-span-1 lg:order-1 lg:col-span-3 flex max-h-[220px] lg:max-h-[500px] flex-col gap-1 overflow-y-auto bg-gray-200/70 p-2 border border-card-border/20 rounded-lg scroll-smooth">
                {COUNTRY_ORDER.map((k) => {
                  const c = t.countries[k];
                  const isActive = k === selected;
                  return (
                    <button
                      key={k}
                      onClick={() => setSelected(k)}
                      /* Thêm shrink-0 để nút không bị ép nhỏ gây lỗi overlay, góc bo giảm xuống rounded-md */
                      className={`group flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-left transition-colors duration-200 border ${
                        isActive
                          ? "bg-white border-card-border/30 text-ink shadow-sm" // Active: Nổi khối trắng nhẹ, viền mờ
                          : "bg-transparent border-transparent text-ink/65 hover:bg-black/5 hover:text-ink" // Hover: Xám nhạt
                      }`}
                    >
                      <span className={`fi fi-${c.flag} text-lg`}></span>
                      <span className="font-mono text-[18px] font-semibold uppercase tracking-widest">
                        {c.name}
                      </span>
                      {isActive && (
                        // Đổi dấu chấm sang màu cam cho tone-sur-tone với scrollbar
                        <span className="ml-auto size-1.5 rounded-full bg-orange-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 2. Globe (Mobile: Nằm trên cùng, Desktop: Nằm giữa) */}
              {/* GATED: only mount the globe (and its own internal WebGL renderer)
                  once this section is scrolled near the viewport. minHeight matches
                  the real rendered height so there's no layout jump on mount. */}
              <div className="order-1 col-span-1 lg:order-2 lg:col-span-6 h-[350px] lg:h-[500px] w-full overflow-hidden rounded-2xl border border-card-border/40 bg-gray-50/50">
                <LazyMount minHeight={350} rootMargin="300px" className="h-full w-full">
                  <Suspense
                    fallback={
                      <div className="flex h-full w-full items-center text-2xl justify-center text-ink/40">
                        Loading globe…
                      </div>
                    }
                  >
                    <CountryGlobe selected={selected} onSelect={setSelected} />
                  </Suspense>
                </LazyMount>
              </div>


              {/* 3. Gallery (Mobile: Nằm dưới cùng xếp 2-4 cột, Desktop: Nằm phải 2 cột) */}
              <div className="no-scrollbar order-3 col-span-1 lg:order-3 lg:col-span-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 lg:content-start lg:max-h-[500px] lg:overflow-y-auto pr-1">
                
              <h2 className="col-span-full mb-1 md:mb-3 text-center font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">
                {t.personal.chapter1.cityInteractHint}
              </h2>
                <AnimatePresence mode="popLayout">
                  {gallery.map((g, i) => (
                    <motion.button
                      key={`${selected}-${g.city}`}
                      // THAY ĐỔI Ở ĐÂY: Gọi state của TravelLetterModal
                      onClick={() => setSelectedLetter({ city: g.city, image: g.image })}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-card-border/50 bg-gray-100 shadow-sm"
                    >
                      <img
                        src={g.image}
                        alt={g.city}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient trắng/đen nhẹ để text dễ đọc hơn */}
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-2 pb-2 pt-8 text-left font-mono text-[20px] font-bold uppercase tracking-widest text-white">
                        {g.city}
                      </span>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Caption Area - Tối giản, không viền, căn giữa */}
            <div className="mt-1 w-full px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto flex max-w-xl flex-col items-center justify-center gap-1.5 text-center"
                >
                  <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                    <span className={`fi fi-${country.flag} text-2xl`}></span>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink">
                      {country.name}
                    </h3>
                  </div>
                  <p className="text-[15px] leading-relaxed text-ink/70 sm:text-base">
                    {country.caption}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Centered Header Section — kept eager, it's just text */}
      <div className="mt-6 flex w-full flex-col items-center justify-center px-6">
        <h2 className="text-center font-serif text-4xl font-semibold italic tracking-wide text-[#7a4b5d] dark:text-[#f2d3d9] md:text-5xl lg:text-6xl">
          {/* Replace this with t.personal.chapter1.title if you have a translation key for it! */}
          {t.personal.chapter2.label}
        </h2>
        {/* A subtle decorative line to anchor the header */}
        <div className="mt-4 h-[2px] w-32 rounded-full bg-[#7a4b5d]/30 dark:bg-[#e5b8b7]/50"></div>
      </div>

      {/* Intro Paragraph — kept eager, it's just text */}
      <p className="mx-6 mb-4 mt-4 max-w-8xl text-center font-display text-lg leading-snug tracking-tight md:text-3xl">
        {t.personal.chapter2.body}
      </p>

      {/* GATED: the gramophone canvas (its own @react-three/fiber <Canvas>,
          loading a full HDRI) only mounts once scrolled near. minHeight is a
          rough estimate — replace with the section's real rendered height. */}
      <LazyMount minHeight={600} rootMargin="200px">
        <Suspense fallback={null}>
          <VintageMusicPlayer />
        </Suspense>
      </LazyMount>

      {/* GATED: this is the section that was crashing — EffectComposer.setRenderer
          getting a null renderer because two other WebGL contexts (globe +
          gramophone) had already spun up by the time this mounted. */}
      <LazyMount minHeight={600} rootMargin="150px">
        <Suspense fallback={null}>
          <BunnyShrineSection />
        </Suspense>
      </LazyMount>

      {/* Chapter 3 — Outdoors */}
      {/* <section className="bg-outdoor-bg px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.3em] text-emerald-800">
            {t.personal.chapter3.label}
          </p>
          <h2 className="mb-4 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-emerald-950 md:text-5xl">
            {t.personal.chapter3.heading}
          </h2>
          <p className="mb-14 max-w-xl text-lg text-emerald-950/70">
            {t.personal.chapter3.body}
          </p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {OUTDOOR.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`overflow-hidden rounded-xl bg-white/40 ${
                  i === 1 ? "md:row-span-2 md:aspect-[3/4]" : "aspect-square"
                }`}
              >
                <img
                  src={src}
                  alt="Outdoors"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      
      <LazyMount minHeight={600} rootMargin="150px">
        <Suspense fallback={null}>
          <OutdoorsChapter />
        </Suspense>
      </LazyMount>

      {selectedLetter !== null && (
        <Suspense fallback={null}>
          <TravelLetterModal
            open={selectedLetter !== null}
            countryKey={selected}
            city={selectedLetter?.city || ""}
            image={selectedLetter?.image || ""}
            onClose={() => setSelectedLetter(null)}
          />
        </Suspense>
      )}
    </PageShell>
  );
}