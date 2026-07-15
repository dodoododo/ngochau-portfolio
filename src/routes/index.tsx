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
        Container chính: Cuộn dọc trên mobile, ẩn cuộn tổng trên desktop (để chia đôi màn hình)
      */}
      <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden bg-bg-base md:flex-row md:overflow-hidden">
        
        {/* Nửa Trái: Ảnh (Cố định chiều cao tối thiểu để không bị bóp méo khi zoom) */}
        <div className="relative w-full shrink-0 h-[50vh] min-h-[400px] overflow-hidden bg-muted md:h-full md:w-1/2">
          
          <AnimatePresence>
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

          <div className="absolute bottom-6 left-4 z-20 flex items-center gap-2 rounded-sm bg-black/40 px-3 py-1.5 text-sm font-medium uppercase tracking-[0.2em] text-white backdrop-blur md:left-6 md:text-[14px]">
            <span className="fi fi-vn"></span>
            <span>{t.meta.location}</span>
          </div>
        </div>

        {/* Nửa Phải: Lớp bọc ngoài cùng của text */}
        <div className="flex w-full flex-1 flex-col md:w-1/2 md:overflow-y-auto">
          
          {/* 
            Lớp chứa nội dung: 
            - Dùng my-auto để căn giữa dọc, thả lỏng chiều ngang.
            - px linh hoạt theo màn hình để hai bên không bị bó hẹp.
            - py-16 md:py-24 là khoảng cách hoàn hảo: an toàn với header nhưng không làm hẫng trên/dưới.
          */}
          <div className="my-auto flex w-full flex-col gap-5 px-6 py-8 sm:px-12 md:gap-6 md:px-16 md:py-8 lg:px-12">
            <div className="flex flex-col items-start">
              <h1
                className="font-serif text-[2.5rem] leading-[1.1] tracking-[-0.04em] text-[#191919] sm:text-[3rem] md:text-[3rem] lg:text-[4rem]"
                style={{ fontFamily: '"Bodoni Moda", serif' }}
              >
                TĂNG NGỌC HẬU
              </h1>
              <p
                className="mt-1 text-[1.2rem] tracking-[0.3em] text-[#3e3b37] sm:text-[1.5rem] sm:tracking-[0.45em]"
                style={{ fontFamily: '"Shippori Mincho", "Noto Serif JP", serif' }}
              >
                タン・ゴック・ハウ
              </p>
            </div>

            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-display text-lg font-light uppercase tracking-[0.1em] text-accent md:text-2xl"
            >
              {t.intro.kicker}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl"
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
              className="max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg lg:text-xl"
            >
              {t.intro.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 flex items-center gap-3 md:mt-6"
            >
              <span className="relative flex size-2.5 sm:size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500 sm:size-3" />
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink/70 md:text-[11px]">
                {t.meta.availability}
              </span>
            </motion.div>
          </div>
          
        </div>
      </div>
    </PageShell>
  );
}