"use client";

import { useMemo } from "react";
import Link from "next/link";
import { buildLayout } from "./layout";

export type RelatedProject = {
  slug: string;
  title: string;
  domain: string;
};

/**
 * PROJECT RELATIONSHIP GRAPH — fallback artifact
 * ----------------------------------------------------------------
 * 6 of 12 projects (consulting/strategy case work) have no chart or
 * screenshot to lead with — they're decks and frameworks, not
 * dashboards. Rather than leaving a blank gap where the artifact
 * block usually sits (or worse, filling it with a generic stock
 * icon), this shows the current project's actual position in the
 * portfolio: which other shipped work shares its domain.
 *
 * This is real structure, not decoration — the edges mean "same
 * domain," same as the project-index graph on the homepage, just
 * scoped to one node's neighborhood instead of the whole set.
 * ----------------------------------------------------------------
 */
export default function ProjectRelationGraph({
  current,
  related,
}: {
  current: { slug: string; title: string; domain: string };
  related: RelatedProject[];
}) {
  const items = useMemo(
    () => [
      { id: current.slug, label: current.title, group: current.domain },
      ...related.map((r) => ({ id: r.slug, label: r.title, group: r.domain })),
    ],
    [current, related]
  );

  const { nodes, edges } = useMemo(() => buildLayout(items, 41), [items]);
  const currentNode = nodes.find((n) => n.id === current.slug)!;

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[6px] border border-line bg-ink-soft sm:aspect-[16/10] md:aspect-[16/9]">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="rel-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-amber)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-amber)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={currentNode.x} cy={currentNode.y} r="22" fill="url(#rel-glow)" />
        {edges.map((e, i) => {
          const a = nodes.find((n) => n.id === e.source)!;
          const b = nodes.find((n) => n.id === e.target)!;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="var(--color-amber)"
              strokeWidth={0.18}
              strokeOpacity={0.3}
            />
          );
        })}
        {nodes.map((n) => {
          const isCurrent = n.id === current.slug;
          return (
            <circle
              key={n.id}
              cx={n.x}
              cy={n.y}
              r={isCurrent ? 2.6 : 1.3 + n.weight * 0.8}
              fill={isCurrent ? "var(--color-coral)" : "var(--color-amber)"}
              opacity={isCurrent ? 1 : 0.7}
            />
          );
        })}
      </svg>

      {/* Overlay labels — HTML for crisp text instead of SVG <text>.
          On narrow mobile, sibling labels are hidden (dots stay
          visible and remain full-size tap targets via padding) to
          avoid 4-5 text pills overlapping in a cramped box; the
          current project's label always shows. */}
      {nodes.map((n) => {
        const isCurrent = n.id === current.slug;
        const project = isCurrent
          ? current
          : related.find((r) => r.slug === n.id)!;
        const content = (
          <span
            className={`pointer-events-none whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] ${
              isCurrent
                ? "bg-coral text-ink"
                : "hidden bg-ink/70 text-muted backdrop-blur-sm sm:block"
            }`}
          >
            {project.title.length > 22
              ? project.title.slice(0, 20) + "…"
              : project.title}
          </span>
        );
        return (
          <div
            key={n.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            {isCurrent ? (
              content
            ) : (
              <Link
                href={`/projects/${n.id}`}
                aria-label={`View related project: ${project.title}`}
                className="pointer-events-auto -m-3 block p-3"
              >
                {content}
              </Link>
            )}
          </div>
        );
      })}

      <p className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        {current.domain} cluster
      </p>
    </div>
  );
}
