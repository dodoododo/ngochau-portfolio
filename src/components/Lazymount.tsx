import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazyMountProps {
  children: ReactNode;
  /** Reserve this height so the page doesn't jump when the section mounts */
  minHeight?: number | string;
  /** How far before entering viewport to start mounting (like preload distance) */
  rootMargin?: string;
  /** Optional custom placeholder instead of a blank space */
  placeholder?: ReactNode;
  className?: string;
}

/**
 * Defers *mounting* of expensive children (WebGL canvases, heavy widgets, etc.)
 * until the wrapper scrolls near the viewport. Unlike React.lazy()/Suspense,
 * which only defers the import(), this defers the actual DOM mount + any
 * side effects (like creating a WebGLRenderer) that happen on mount.
 *
 * Once mounted, it stays mounted (the observer disconnects) so scrolling
 * back and forth doesn't repeatedly create/destroy WebGL contexts.
 */
export function LazyMount({
  children,
  minHeight = 400,
  rootMargin = "200px",
  placeholder,
  className,
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return;
    const el = ref.current;
    if (!el) return;

    // Safety net: if IntersectionObserver isn't supported, just mount immediately.
    if (typeof IntersectionObserver === "undefined") {
      setShouldMount(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMount, rootMargin]);

  return (
    <div ref={ref} className={className} style={!shouldMount ? { minHeight } : undefined}>
      {shouldMount ? children : placeholder ?? null}
    </div>
  );
}