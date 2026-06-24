/**
 * BACKGROUND — redesign notes
 * ----------------------------------------------------------------
 * Merges the original Education page and Achievements page into
 * a single section. Neither was a decision-making section on its
 * own — a recruiter wants "is this person credible" answered in
 * one glance, not two separate scroll-stops.
 *
 * Structure: two columns at md+.
 *   Left  — the one real academic credential, kept exactly as
 *           substantive as before (program, school, coursework).
 *   Right — credibility signals compressed to a tight list:
 *           competition rank + one line on what judges noted,
 *           and a single "12 projects" line that now reads as
 *           a footnote (since the real proof already lives in
 *           the Work section) rather than its own headline claim.
 *
 * What was cut:
 *  - The standalone "Recognition & verification" page-section
 *    framing ("Where possible, project work has been reviewed or
 *    competed externally rather than self-assessed.") — this
 *    sentence was doing defensive work, pre-justifying weak
 *    evidence. Once the Work section carries real artifacts, it's
 *    unnecessary and slightly undermines confidence by raising the
 *    question before anyone asked it.
 *  - The full-width "12 Independent & Team Projects" card with its
 *    own description — redundant with the hero stat strip and the
 *    Work section itself.
 *  - "Verified by [Club], IIT Roorkee (OP'26)" as a bordered card
 *    field — demoted to small caption text, consistent with how
 *    it now appears on project detail pages.
 * ----------------------------------------------------------------
 */

export default function Background() {
  return (
    <section id="background" className="border-t border-line bg-ink-soft">
      <div className="container-page py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber">
          / Background
        </p>
        <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold leading-tight text-paper text-balance md:text-4xl">
          Economics training, with self-directed proof of work on top.
        </h2>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Education */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              2024 — 2029 (Expected)
            </p>
            <h3 className="font-display mt-3 text-2xl font-medium text-paper">
              Integrated BS-MS, Economics
            </h3>
            <p className="mt-1 text-sm text-muted">
              Indian Institute of Technology Roorkee
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
              Core coursework in microeconomics, macroeconomics, and
              econometrics, paired with self-directed project work in
              applied analytics, machine learning, and consulting case
              strategy.
            </p>
          </div>

          {/* Credibility signals */}
          <div className="space-y-8 md:border-l md:border-line md:pl-16">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                Competition
              </p>
              <p className="font-display mt-2 text-xl font-medium text-paper">
                3rd / 30+ — Smart Campus Intelligence Challenge
              </p>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">
                Judges specifically noted product thinking and real-world
                implementation feasibility, not just model accuracy.
              </p>
            </div>

            <div className="border-t border-line pt-6">
              <p className="text-[14px] text-muted">
                12 projects shipped across logistics, pricing, customer
                intelligence, and strategy — three covered in depth above,
                the rest in the project list.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
