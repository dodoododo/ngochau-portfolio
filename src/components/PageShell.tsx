import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Card-draw page transition.
 * Each page mounts as a "card" — a rounded surface that slides up from the
 * bottom of the deck and settles into place. On exit the previous card lifts
 * up and off. AnimatePresence lives in __root.tsx and keys off the pathname.
 */
export function PageShell({
  children,
  scrollable = true,
  bare = false,
}: {
  children: ReactNode;
  scrollable?: boolean;
  bare?: boolean;
}) {
  return (
    <motion.article
      initial={{ y: "12%", opacity: 0, scale: 0.985 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: "-8%", opacity: 0, scale: 0.99 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 32,
        mass: 0.9,
      }}
      className={
        bare
          ? "relative h-full w-full"
          : `card-stack-shadow relative h-full w-full overflow-hidden rounded-2xl border border-card-border bg-white ${
              scrollable ? "overflow-y-auto" : ""
            }`
      }
    >
      {children}
    </motion.article>
  );
}
