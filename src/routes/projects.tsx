import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { useLocale } from "@/content/i18n";
import proj1 from "@/assets/project-1.jpg";
import proj2 from "@/assets/project-2.png";
import proj3 from "@/assets/project-3.png";
import proj4 from "@/assets/project-4.png";
import proj5 from "@/assets/project-5.png";
import proj6 from "@/assets/project-6.jpg";
import proj7 from "@/assets/project-7.jpg";
import proj8 from "@/assets/project-8.jpg";

const IMAGES: Record<string, string> = {
  "project-1": proj1,
  "project-2": proj2,
  "project-3": proj3,
  "project-4": proj4,
  "project-5": proj5,
  "project-6": proj6,
  "project-7": proj7,
  "project-8": proj8,
};

export default function Projects() {
  const { t } = useLocale();
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 py-6 md:px-12 md:py-10">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-card-border pb-6">
          <div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              {t.projects.heading}
            </h1>
          </div>
          {/* <p className="max-w-sm text-sm text-ink/60">{t.projects.subheading}</p> */}
        </header>

        <div className="flex flex-col gap-24">
          {/* @ts-ignore - Ignore type error if github prop is not yet added to i18n type */}
          {t.projects.items.map((p: any, i: number) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex flex-col gap-8 md:flex-row md:items-start"
            >
              <div className="relative w-full overflow-hidden rounded-xl border border-stone-700 border-card-border bg-muted md:w-3/5">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* Blurred backdrop fills the letterbox/pillarbox space */}
                  <img
                    src={IMAGES[p.image]}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full scale-110 object-cover blur-sm opacity-80"
                  />
                  <div className="absolute inset-0 bg-stone-900/20" />

                  {/* Foreground */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={IMAGES[p.image]}
                      alt={`${p.title} screenshot`}
                      className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                
                {/* Lớp mờ khi hover */}
                <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
                
                {/* 2 NÚT LỰA CHỌN KHI HOVER */}
                {/* Lưu ý: Đã bỏ pointer-events-none để có thể click được */}
                <div className="absolute right-5 top-5 z-10 flex translate-y-2 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink shadow-md transition-transform hover:scale-105"
                    >
                      {t.projects.openSite || "Open Site"} <span>{"↗\uFE0E"}</span>
                    </a>
                  )}
                  
                  {/* Sẽ hiển thị nút GitHub nếu bạn thêm thuộc tính `github` vào data */}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white shadow-md transition-transform hover:scale-105"
                    >
                      GitHub <span>{"↗\uFE0E"}</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-col justify-between md:w-2/5 md:py-2">
                <div>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-ink/40">
                    {String(i + 1).padStart(2, "0")} / {String(t.projects.items.length).padStart(2, "0")}
                  </p>
                  <h2 className="mb-4 font-display text-3xl font-extrabold tracking-tight">
                    {/* Bọc thêm thẻ a cho tiêu đề để vẫn có thể click trực tiếp từ text */}
                    <a href={p.url || p.github} target="_blank" rel="noreferrer noopener" className="hover:underline decoration-2 underline-offset-4">
                      {p.title}
                    </a>
                  </h2>
                  <p className="max-w-md text-ink/70">{p.description}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {p.stack.map((s: string) => (
                    <span
                      key={s}
                      className="rounded-sm border border-card-border border-slate-600 bg-bg-base px-3 py-1 font-mono font-normal text-[14px] uppercase tracking-widest text-ink/70"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}