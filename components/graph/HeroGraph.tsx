"use client";

import { useMemo } from "react";
import { buildLayout } from "./layout";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * HERO NODE-GRAPH — ambient background
 * ----------------------------------------------------------------
 * Generalizes the real Delhivery hub-graph (1,601 hubs, edge color
 * = delay severity) into the site's own connective tissue. This
 * instance is decorative/ambient: it sits behind the hero copy,
 * slowly drifting, never competing with the text for attention.
 *
 * The "data" it encodes here is the site's own domain spread —
 * Analytics / Finance / Product / Strategy — clustered the same
 * way hubs cluster by region in the real chart. So even the
 * background is structurally true, not decoration for its own sake.
 * ----------------------------------------------------------------
 */

const DOMAINS = [
  { id: "logistics", label: "Logistics", group: "Analytics" },
  { id: "pricing", label: "Pricing", group: "Analytics" },
  { id: "churn", label: "Churn", group: "Analytics" },
  { id: "forecasting", label: "Forecasting", group: "Analytics" },
  { id: "yield-curve", label: "Yield Curve", group: "Finance" },
  { id: "lending", label: "Lending", group: "Finance" },
  { id: "gtm", label: "GTM", group: "Strategy" },
  { id: "procurement", label: "Procurement", group: "Strategy" },
  { id: "revenue", label: "Revenue", group: "Strategy" },
  { id: "companion-ai", label: "Companion AI", group: "Product" },
  { id: "energy", label: "Energy", group: "Strategy" },
  { id: "macro", label: "Macro", group: "Finance" },
];

export default function HeroGraph() {
  const { nodes, edges } = useMemo(() => buildLayout(DOMAINS, 11), []);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="fade-mask" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="vignette">
          <rect width="100" height="100" fill="url(#fade-mask)" />
        </mask>
      </defs>

      <g mask="url(#vignette)">
        {edges.map((e, i) => {
          const a = nodes.find((n) => n.id === e.source)!;
          const b = nodes.find((n) => n.id === e.target)!;
          const color = e.severity > 0.55 ? "var(--color-coral)" : "var(--color-amber)";
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={color}
              strokeWidth={0.08 + e.severity * 0.1}
              strokeOpacity={0.22 + e.severity * 0.18}
            >
              {!reducedMotion && (
                <animate
                  attributeName="stroke-opacity"
                  values={`${0.15 + e.severity * 0.15};${0.35 + e.severity * 0.25};${0.15 + e.severity * 0.15}`}
                  dur={`${6 + (i % 5)}s`}
                  repeatCount="indefinite"
                />
              )}
            </line>
          );
        })}

        {nodes.map((n, i) => (
          <circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            r={0.5 + n.weight * 0.9}
            fill="var(--color-amber)"
            opacity={0.5 + n.weight * 0.3}
          >
            {!reducedMotion && (
              <animate
                attributeName="cy"
                values={`${n.y};${n.y - 1.2};${n.y}`}
                dur={`${10 + (i % 6)}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
      </g>
    </svg>
  );
}
