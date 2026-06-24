import Link from "next/link";
import HeroGraph from "./graph/HeroGraph";

/**
 * HERO — v2 redesign notes
 * ----------------------------------------------------------------
 * Brings back a signature visual, but a meaningful one: the same
 * node-graph language as the real Delhivery case study, generalized
 * into ambient background. It encodes the site's own domain spread
 * (Analytics/Finance/Product/Strategy clusters) rather than being
 * pure decoration — satisfies "structure is information" while
 * giving the hero the visual presence a static type-only hero lacks.
 *
 * One emphasized word per headline via Fraunces variable italic
 * (.em utility) — "act on" — rather than a second display font.
 * ----------------------------------------------------------------
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-ink">
      <div className="pointer-events-none absolute inset-0 opacity-60 md:opacity-100">
        <HeroGraph />
      </div>

      <div className="container-page relative py-20 md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-amber">
          Analytics · Strategy · IIT Roorkee Economics
        </p>

        <h1 className="font-display mt-6 max-w-3xl text-[2.25rem] font-semibold leading-[1.12] text-paper text-balance sm:text-4xl md:text-6xl">
          I turn operational data into decisions people actually{" "}
          <span className="em">act on</span>.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Three shipped systems — logistics, pricing, and customer
          intelligence — built on graph ML, simulation, and explainable
          models. Each validated end-to-end, with the dashboard or memo
          someone could actually act on.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/#work"
            className="rounded-full bg-amber px-6 py-3 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-transform hover:-translate-y-0.5 hover:bg-amber-soft"
          >
            View the work
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.1em] text-paper transition-colors hover:border-amber/60 hover:text-amber"
          >
            Résumé
          </a>
        </div>

        {/* Proof strip — only real, externally-checkable numbers.
            2 cols below sm (360px+ safe), 3 cols from sm up — three
            equal thirds get tight with "Shipped projects" + "Featured
            deep-dives" labels on very narrow phones otherwise. */}
        <dl className="mt-16 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              Best rank
            </dt>
            <dd className="font-display mt-1 text-2xl text-paper">3rd / 30+</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              Shipped projects
            </dt>
            <dd className="font-display mt-1 text-2xl text-paper">12</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              Featured deep-dives
            </dt>
            <dd className="font-display mt-1 text-2xl text-paper">3</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
