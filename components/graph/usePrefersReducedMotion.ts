"use client";

import { useEffect, useState } from "react";

/**
 * usePrefersReducedMotion
 * ----------------------------------------------------------------
 * The global `@media (prefers-reduced-motion: reduce)` block in
 * globals.css only disables CSS animations/transitions — it has no
 * effect on SVG SMIL <animate> elements, which the graph components
 * use for the ambient drift/pulse effects. This hook lets those
 * components conditionally skip rendering <animate> children
 * entirely when the user has requested reduced motion, which is the
 * only reliable way to stop SMIL.
 *
 * We read `mq.matches` in the useState initializer rather than
 * calling setState inside useEffect — this avoids a one-render flash
 * where SMIL briefly starts before the effect fires, and also
 * satisfies the react-hooks/set-state-in-effect lint rule.
 * ----------------------------------------------------------------
 */
function getInitialMotionPreference(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(getInitialMotionPreference);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
