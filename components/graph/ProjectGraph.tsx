"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

/* ----------------------------------------------------------------
 * GRAPH PROJECT DATA MODEL
 * All metadata for the interactive graph lives here — separate from
 * data/projects.ts which is the content source of truth. These are
 * presentation concerns: importance tier, semantic edges, preview
 * card content. Importance drives node radius; edges are explicit
 * pairs with a label describing the actual relationship.
 * ---------------------------------------------------------------- */

export type Importance = "flagship" | "strong" | "supporting";

export type GraphProject = {
  slug: string;
  title: string;
  shortTitle: string; // tooltip label — fits inside the graph
  domain: string;
  tags: string;
  importance: Importance;
  description: string;
  metrics: string[];
  tools: string[];
};

// Semantic edges — explicit pairs with a relationship label.
// These replace the random same-group ring that produced meaningless
// topology. Each edge now has a reason: shared method, shared problem
// type, or shared domain. The label is shown on edge hover (future)
// and encoded in the edge weight for visual prominence.
const SEMANTIC_EDGES: { a: string; b: string; weight: number }[] = [
  // Graph ML / network methods
  { a: "smart-campus-intelligence",      b: "delhivery-network-intelligence", weight: 0.9 },
  // Forecasting / time-series
  { a: "smart-campus-intelligence",      b: "dynamic-tariff-optimization",    weight: 0.8 },
  { a: "dynamic-tariff-optimization",    b: "digital-lending-intelligence",   weight: 0.6 },
  // Pricing / revenue optimization
  { a: "dynamic-tariff-optimization",    b: "urban-food-court-revenue",       weight: 0.7 },
  { a: "urban-food-court-revenue",       b: "roastery-expansion-strategy",    weight: 0.8 },
  // Explainability / customer intelligence
  { a: "loyalty-intelligence-platform",  b: "digital-lending-intelligence",   weight: 0.75 },
  { a: "loyalty-intelligence-platform",  b: "smart-campus-intelligence",      weight: 0.5 },
  // Quant / finance methods
  { a: "cir-yield-curve-modeling",       b: "digital-lending-intelligence",   weight: 0.7 },
  // Product / GenAI
  { a: "spotify-pochimu",                b: "divaine-gtm-strategy",           weight: 0.65 },
  // Strategy / consulting cluster
  { a: "divaine-gtm-strategy",           b: "roastery-expansion-strategy",    weight: 0.55 },
  // Energy / macro — case study cluster
  { a: "vietnam-energy-landscape",       b: "oil-crisis-india-impact",        weight: 0.85 },
  { a: "vietnam-energy-landscape",       b: "divaine-gtm-strategy",           weight: 0.4 },
  // Long-haul bridge: analytics ↔ product
  { a: "delhivery-network-intelligence", b: "spotify-pochimu",                weight: 0.3 },
];

// Deterministic node positions — laid out by hand for this specific
// set of 9 projects so that semantic clusters are visually readable.
// (Programmatic layouts can't guarantee the flagship node lands in
// a prominent visual position; hand-tuned positions can.)
const POSITIONS: Record<string, { x: number; y: number }> = {
  // Analytics cluster — upper-left quadrant
  "smart-campus-intelligence":      { x: 28, y: 26 },
  "delhivery-network-intelligence": { x: 18, y: 46 },
  "dynamic-tariff-optimization":    { x: 38, y: 42 },
  "loyalty-intelligence-platform":  { x: 26, y: 62 },
  "digital-lending-intelligence":   { x: 48, y: 60 },
  // Finance — right
  "cir-yield-curve-modeling":       { x: 68, y: 34 },
  // Product / GenAI — upper-right
  "spotify-pochimu":                { x: 72, y: 58 },
  "divaine-gtm-strategy":           { x: 82, y: 72 },
  // Consulting / case studies — lower
  "roastery-expansion-strategy":    { x: 52, y: 78 },
  "urban-food-court-revenue":       { x: 36, y: 82 },
  "vietnam-energy-landscape":       { x: 76, y: 20 },
  "oil-crisis-india-impact":        { x: 88, y: 36 },
};

// Node radius in px by importance tier — rendered at 16:9 canvas
const RADIUS: Record<Importance, number> = {
  flagship:   16,
  strong:     11,
  supporting: 8,
};

const DOMAIN_COLOR: Record<string, string> = {
  Analytics:  "#D4A03A",
  Finance:    "#D97757",
  Product:    "#4F9CF9",
  Strategy:   "#A78BFA",
  Consulting: "#34D399",
  "Case Study": "#B0B7C3",
};

// Default preview: Smart Campus (a flagship with real public metrics)
const DEFAULT_PREVIEW = "smart-campus-intelligence";

export default function ProjectGraph({
  projects,
}: {
  projects: GraphProject[];
}) {
  const router = useRouter();
  const [active, setActive] = useState<string>(DEFAULT_PREVIEW);
  const [tooltip, setTooltip] = useState<{
    id: string; x: number; y: number; flipLeft: boolean;
  } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const activeProject = projects.find((p) => p.slug === active)!;

  const handleEnter = useCallback(
    (slug: string, e: React.MouseEvent | React.FocusEvent) => {
      setActive(slug);
      if ("clientX" in e && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const flipLeft = (x / rect.width) * 100 > 65;
        setTooltip({ id: slug, x, y, flipLeft });
      }
    },
    []
  );

  const handleMouseMove = useCallback(
    (slug: string, e: React.MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const flipLeft = (x / rect.width) * 100 > 65;
      setTooltip({ id: slug, x, y, flipLeft });
    },
    []
  );

  const handleLeave = useCallback(() => {
    setTooltip(null);
    // Keep active = last hovered so preview card doesn't blank out
  }, []);

  const domainColor = (d: string) => DOMAIN_COLOR[d] ?? "var(--color-amber)";
  const activeEdges = SEMANTIC_EDGES.filter(
    (e) => e.a === active || e.b === active
  );

  return (
    <div>
      {/* ── Section header ─────────────────────────────────────── */}
      <div className="mb-8">
        <h3 className="font-display text-2xl font-semibold text-paper md:text-3xl">
          12 Projects Across Analytics, Consulting &amp; Product
        </h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-muted">
          3rd Place Smart Campus Challenge&nbsp;·&nbsp;
          113k+ Records Processed&nbsp;·&nbsp;
          5 Domains Explored
        </p>
      </div>

      {/* ── Domain legend ──────────────────────────────────────── */}
      <div className="mb-5 flex flex-wrap gap-x-6 gap-y-2">
        {Array.from(new Set(projects.map((p) => p.domain))).map((d) => (
          <div key={d} className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: domainColor(d) }}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              {d}
            </span>
          </div>
        ))}
        <div className="ml-auto hidden items-center gap-4 md:flex">
          <NodeSizeLegend />
        </div>
      </div>

      {/* ── Main layout: graph 65% | preview card 35% ─────────── */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">

        {/* Graph canvas */}
        <div
          ref={canvasRef}
          className="relative overflow-hidden rounded-[6px] border border-line bg-ink-soft/60"
          style={{ height: "clamp(320px, 50vw, 540px)" }}
        >
          {/* SVG edges */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            style={{ width: "100%", height: "100%" }}
          >
            {SEMANTIC_EDGES.map((e, i) => {
              const ap = POSITIONS[e.a];
              const bp = POSITIONS[e.b];
              if (!ap || !bp) return null;
              const isActive = e.a === active || e.b === active;
              const dimmed = active && !isActive;
              return (
                <line
                  key={i}
                  x1={ap.x} y1={ap.y}
                  x2={bp.x} y2={bp.y}
                  stroke={isActive ? "var(--color-amber)" : "var(--color-amber)"}
                  strokeWidth={isActive ? e.weight * 0.35 : 0.12}
                  strokeOpacity={
                    dimmed ? 0.05
                    : isActive ? 0.55 + e.weight * 0.3
                    : 0.18
                  }
                  style={{ transition: "stroke-opacity 180ms ease, stroke-width 180ms ease" }}
                />
              );
            })}
          </svg>

          {/* HTML node buttons */}
          {projects.map((p) => {
            const pos = POSITIONS[p.slug];
            if (!pos) return null;
            const isActive = active === p.slug;
            const isDimmed = active && active !== p.slug &&
              !activeEdges.some((e) => e.a === p.slug || e.b === p.slug);
            const r = RADIUS[p.importance];
            const color = domainColor(p.domain);

            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => router.push(`/projects/${p.slug}`)}
                onMouseEnter={(e) => handleEnter(p.slug, e)}
                onMouseMove={(e) => handleMouseMove(p.slug, e)}
                onMouseLeave={handleLeave}
                onFocus={(e) => handleEnter(p.slug, e)}
                onBlur={handleLeave}
                aria-label={`Open project: ${p.title}`}
                className="absolute flex touch-manipulation items-center justify-center cursor-pointer"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  // hit area always ≥ 44px for touch
                  width:  Math.max(44, r * 3.2),
                  height: Math.max(44, r * 3.2),
                  transform: "translate(-50%, -50%)",
                  zIndex: isActive ? 10 : 1,
                }}
              >
                <span
                  className="block rounded-full"
                  style={{
                    width: r * 2,
                    height: r * 2,
                    background: color,
                    opacity: isDimmed ? 0.3 : 1,
                    transform: isActive ? "scale(1.2)" : "scale(1)",
                    boxShadow: isActive ? `0 0 ${r * 1.6}px ${color}` : "none",
                    transition: "transform 180ms ease, opacity 180ms ease, box-shadow 180ms ease",
                    flexShrink: 0,
                  }}
                />
              </button>
            );
          })}

          {/* Floating tooltip */}
          {tooltip && (() => {
            const p = projects.find((pr) => pr.slug === tooltip.id);
            if (!p) return null;
            const { flipLeft } = tooltip;
            return (
              <div
                className="pointer-events-none absolute z-20 rounded-[4px] border border-line bg-ink px-3 py-1.5"
                style={{
                  left: flipLeft ? tooltip.x - 12 : tooltip.x + 16,
                  top: tooltip.y - 16,
                  transform: flipLeft ? "translateX(-100%)" : "none",
                  animation: "fadeIn 150ms ease forwards",
                }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-amber">
                  {p.domain}
                </p>
                <p className="mt-0.5 whitespace-nowrap text-sm font-medium text-paper">
                  {p.shortTitle}
                </p>
                <style>{`@keyframes fadeIn{from{opacity:0;transform:${flipLeft ? "translateX(-100%) " : ""}translateY(4px)}to{opacity:1;transform:${flipLeft ? "translateX(-100%) " : ""}translateY(0)}}`}</style>
              </div>
            );
          })()}
        </div>

        {/* Preview card */}
        <div
          aria-live="polite"
          className="flex flex-col rounded-[6px] border border-line bg-ink-soft p-5"
          style={{ minHeight: 0 }}
        >
          {activeProject ? (
            <>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-amber">
                  {activeProject.domain}
                </p>
                <h4 className="font-display mt-2 text-lg font-semibold leading-snug text-paper">
                  {activeProject.title}
                </h4>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">
                  {activeProject.description}
                </p>
              </div>

              {/* Key metrics */}
              <div className="mt-4 space-y-1.5">
                {activeProject.metrics.map((m) => (
                  <div key={m} className="flex items-baseline gap-2">
                    <span
                      className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full"
                      style={{ background: domainColor(activeProject.domain) }}
                    />
                    <span className="font-mono text-[12px] text-paper">{m}</span>
                  </div>
                ))}
              </div>

              {/* Tool chips */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {activeProject.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-ink px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-5">
                <a
                  href={`/projects/${activeProject.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-amber px-4 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-opacity hover:opacity-90"
                >
                  Open Case Study
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </>
          ) : (
            <p className="font-mono text-xs text-muted">
              Hover a node to preview the project.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function NodeSizeLegend() {
  return (
    <div className="flex items-center gap-5">
      {(
        [
          ["flagship", 16, "Flagship"],
          ["strong", 11, "Strong"],
          ["supporting", 8, "Supporting"],
        ] as const
      ).map(([, r, label]) => (
        <div key={label} className="flex items-center gap-1.5">
          <span
            className="block rounded-full bg-muted opacity-60"
            style={{ width: r * 1.5, height: r * 1.5 }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
