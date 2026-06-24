import Image from "next/image";
import Link from "next/link";

/**
 * FEATURED PROJECT — redesign notes
 * ----------------------------------------------------------------
 * This is the highest-leverage component in the whole redesign.
 * Used for exactly 3 projects on the homepage. Everything else
 * lives in the compressed list (see ProjectListCompressed.tsx).
 *
 * Rules this component enforces:
 *  1. An artifact image is REQUIRED (artifactSrc), not optional.
 *     If a project has no real screenshot/chart/diagram, it does
 *     not belong in this component — demote it to the compressed
 *     list instead. This is intentional friction.
 *  2. Metrics must be comparative or counted, not absolute claims
 *     about money/scale you can't defend under questioning
 *     ("+14% vs. baseline" instead of "₹2.45 Cr identified").
 *  3. Image and content alternate sides (reversed prop) to break
 *     monotony across 3 stacked instances without adding motion.
 * ----------------------------------------------------------------
 */

export type FeaturedProjectData = {
  slug: string;
  domain: string;
  question: string; // the business question, one sentence
  description: string; // what you built, one to two sentences
  artifactAlt: string;
  metrics: { value: string; label: string }[]; // 2 max, comparative not absolute
};

export function FeaturedProject({
  project,
  reversed = false,
}: {
  project: FeaturedProjectData;
  reversed?: boolean;
}) {
  return (
    <article className="grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
      <div className={reversed ? "md:order-2" : ""}>
        <button
          type="button"
          className="group relative aspect-[4/3] w-full overflow-hidden rounded-[6px] border border-line bg-ink-soft"
        >
      
          <span className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-paper opacity-0 transition-opacity group-hover:opacity-100">
            Expand
          </span>
        </button>
      </div>

      <div className={reversed ? "md:order-1" : ""}>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber">
          {project.domain}
        </p>

        <h3 className="font-display mt-4 text-2xl font-medium leading-snug text-paper md:text-3xl">
          {project.question}
        </h3>

        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          {project.description}
        </p>

        <dl className="mt-6 flex gap-8 border-t border-line pt-5">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dd className="font-mono text-xl text-paper">{m.value}</dd>
              <dt className="mt-1 text-[13px] text-muted">{m.label}</dt>
            </div>
          ))}
        </dl>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-paper hover:text-amber"
        >
          Read the full case
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

/* Example usage in app/page.tsx or components/Projects.tsx:

const featured: FeaturedProjectData[] = [
  {
    slug: "delhivery-network-intelligence",
    domain: "Logistics · Graph ML",
    question:
      "Why do delivery delays cascade across hubs that aren't even congested?",
    description:
      "Modeled Delhivery's network as a graph instead of independent routes — Node2Vec and GraphSAGE embeddings surfaced 20+ corridors a distance-based ETA model couldn't see.",
    artifactSrc: "/projects/delhivery/dashboard.png",
    artifactAlt: "Streamlit dashboard showing network graph and bottleneck risk scores",
    metrics: [
      { value: "20+", label: "corridors flagged" },
      { value: "+14%", label: "ETA accuracy vs. baseline" },
    ],
  },
  {
    slug: "spotify-pochimu",
    domain: "Product · GenAI",
    question:
      "What if a music app optimized for how you feel, not what you'll click?",
    description:
      "A working prototype reimagining Spotify around emotional companionship — three intelligence layers (context, memory, recommendation) instead of pure click-through optimization.",
    artifactSrc: "/projects/pochimu/ui-frames.png",
    artifactAlt: "Three UI mockup frames of the Pochimu prototype",
    metrics: [
      { value: "3", label: "intelligence layers" },
      { value: "1", label: "working prototype" },
    ],
  },
  {
    slug: "cir-yield-curve-modeling",
    domain: "Finance · Quant",
    question:
      "Can you reconstruct the entire Treasury yield curve from one observed rate?",
    description:
      "Implemented the Cox-Ingersoll-Ross short-rate model from scratch and reconstructed the full yield curve from a single 3-month yield input.",
    artifactSrc: "/projects/cir/yield-curve-chart.png",
    artifactAlt: "Chart comparing reconstructed vs. observed Treasury yield curve",
    metrics: [
      { value: "AR(1) ≈ 0.998", label: "short-rate persistence" },
      { value: "1", label: "input rate required" },
    ],
  },
];

<div id="work">
  {featured.map((p, i) => (
    <FeaturedProject key={p.slug} project={p} reversed={i % 2 === 1} />
  ))}
</div>
*/
