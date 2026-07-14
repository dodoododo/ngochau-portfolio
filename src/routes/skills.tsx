import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { useLocale } from "@/content/i18n";
import viPhoto from "@/assets/lang-vi.jpg";
import enPhoto from "@/assets/lang-en.jpg";
import jaPhoto from "@/assets/lang-ja.jpg";

export default function Skills() {
  const { t } = useLocale();

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-6 py-6 md:px-12 md:py-12">
        <header className="mb-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            {t.skills.heading}
          </h1>
        </header>

        {/* UPGRADE 1: Categorized Tech Stack */}
        <section className="mb-24">
          <h2 className="mb-8 font-mono text-xl font-semibold uppercase tracking-[0.3em] text-ink/50">
            {t.skills.techHeading}
          </h2>
          
          <div className="flex flex-col gap-12">
            {/* Map through categories instead of a flat list (Update your i18n JSON to match this structure) */}
            {t.skills.categories.map((category : any, catIndex : any) => (
              <div key={category.name}>
                <h3 className="mb-4 font-display text-lg font-bold text-ink">
                  {category.name} {/* e.g., "Full-Stack Development", "IoT & Hardware", "Tools & Workflow" */}
                </h3>
                
                {/* Đổi border-t thành border-t-2 để đường gạch ngang của nhóm dày hơn */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t-2 border-card-border pt-3 md:grid-cols-4">
                  {category.items.map((s : any, i : any) => (
                    <motion.div
                      key={s}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (catIndex * 0.1) + (i * 0.03) }}
                      className="flex items-baseline justify-between border-b-2 border-card-border pb-3 font-display text-lg font-medium tracking-tight"
                    >
                      <span>{s}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* UPGRADE 2: Language Cards with Certification Badges */}
        <section>
          <h2 className="mb-6 font-mono text-xl font-semibold uppercase tracking-[0.3em] text-ink/50">
            {t.skills.languagesHeading}
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { key: "vi" as const, photo: viPhoto, flag: "vn", cert: "Native" },
              { key: "en" as const, photo: enPhoto, flag: "gb", cert: "IELTS 7.5" },
              { key: "ja" as const, photo: jaPhoto, flag: "jp", cert: "JLPT N3" },
            ].map((card, i) => (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
              >
                <img
                  src={card.photo}
                  alt={t.skills.languages[card.key].name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                
                {/* Certification Badge */}
                <div className="absolute right-4 top-4 rounded-sm bg-white/40 px-3 py-1 font-mono text-xl font-bold tracking-widest text-white backdrop-blur-md">
                  {card.cert}
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <span className={`fi fi-${card.flag} text-5xl mb-2`}></span>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight">
                    {t.skills.languages[card.key].name}
                  </h3>
                  <p className="mt-1 font-mono text-[15px] font-semibold uppercase tracking-[0.2em] text-white/80">
                    {t.skills.languages[card.key].proficiency}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}