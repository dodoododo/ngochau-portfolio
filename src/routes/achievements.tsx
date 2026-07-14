import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { useLocale } from "@/content/i18n";

export default function Achievements() {
  const { t } = useLocale();
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-12 md:py-16">
        <header className="mb-20">
          <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            {t.achievements.heading}
          </h1>
        </header>

        <div className="flex flex-col gap-20">
          {t.achievements.items.map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative border-l-2 border-card-border pl-8 transition-colors hover:border-accent"
            >
              <span className="absolute -left-[7px] top-2 size-3 rounded-full border-2 border-bg-base bg-card-border transition-colors group-hover:bg-accent" />
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-ink/50">
                {a.tag}
              </p>
              <h2 className="mb-4 font-display text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
                {a.title}
              </h2>
              <p className="max-w-xl text-ink/70">{a.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}