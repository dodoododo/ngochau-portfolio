import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { useLocale } from "@/content/i18n";
import portrait from "@/assets/pig.jpg";

export default function Contact() {
  const { t } = useLocale();
  const links = [
    { key: "Email", value: t.contact.links.email, href: `mailto:${t.contact.links.email}` },
    { key: "LinkedIn", value: t.contact.links.linkedin, href: `https://${t.contact.links.linkedin}` },
    { key: "Instagram", value: t.contact.links.instagram, href: `https://${t.contact.links.instagram}` },
    { key: "Facebook", value: t.contact.links.facebook, href: `https://${t.contact.links.facebook}` },
    { key: "GitHub", value: t.contact.links.github, href: `https://${t.contact.links.github}` },
  ];

  return (
    <PageShell>
      <div className="mx-auto grid min-h-full max-w-7xl grid-cols-1 gap-16 px-6 py-16 md:grid-cols-12 md:px-12 md:py-12">
        <div className="md:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-card-border">
            <img
              src={portrait}
              alt="Hau portrait"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center md:col-span-7">
          <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t.contact.eyebrow}
          </p>
          <h1 className="mb-8 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            {t.contact.heading}
          </h1>
          <p className="mb-12 max-w-md text-lg text-ink/70">{t.contact.body}</p>

          <ul className="flex flex-col divide-y divide-card-border border-y border-card-border">
            {links.map((l, i) => (
              <motion.li
                key={l.key}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="group flex items-baseline justify-between gap-6 py-5 transition-colors hover:text-accent"
                >
                  <span className="font-mono text-lg md:text-xl uppercase tracking-[0.3em] text-ink/20 group-hover:text-accent">
                    {l.key}
                  </span>
                  <span className="font-display text-lg font-medium tracking-tight md:text-xl">
                    {l.value}
                    <span className="ml-2 inline-block translate-x-0 transition-transform group-hover:translate-x-1">
                      {"↗\uFE0E"}
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}