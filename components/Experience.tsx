/**
 * EXPERIENCE — two professional roles
 * ----------------------------------------------------------------
 * Sits between Background (education) and Contact, so the page
 * reads: work → method → education → experience → contact.
 * The roles are structurally different enough to warrant distinct
 * treatments: a technical internship and a leadership/ops role.
 * Both use the same card pattern so they read as one section, but
 * the tech-stack pill row only appears on the internship (it would
 * be misleading on the Cognizance role).
 * ----------------------------------------------------------------
 */

const roles = [
  {
    title: "AI-ML Intern",
    org: "Raymond Private Limited",
    orgDetail: "Large-scale textile manufacturing industry",
    period: "June 2026 - July 2026",
    domain: "Analytics · ML",
    bullets: [
      "Analyzed manufacturing operations data to uncover resource-utilization inefficiencies.",
      "Built forecasting models for departmental demand planning.",
      "Performed EDA and data cleaning using Python, Pandas and NumPy.",
      "Delivered analytical reports for operational decision-making."
    ],
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "SQL", "Excel"],
  },
  {
    title: "Marketing & CSR Executive",
    org: "Cognizance, IIT Roorkee",
    orgDetail: "Annual technical festival (75k footfall)",
    period: "September 2024 - Present",
    domain: "Strategy · Operations",
    bullets: [
      "Led partnership outreach to 50+ organizations",
      "Secured multiple sponsorship and brand collaborations.",
      "Coordinated stakeholder delivery for a 75,000+ attendee festival.",
      "Managed and mentored junior outreach members.",
    ],
    stack: [ "leadership", "communication", "negotiation", "event operations", "strategy" ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line bg-ink">
      <div className="container-page py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber">
          / Experience
        </p>
        <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold leading-tight text-paper text-balance md:text-4xl">
          Where the work went beyond the classroom.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {roles.map((role) => (
            <article
              key={role.title + role.org}
              className="flex flex-col rounded-[6px] border border-line bg-ink-soft p-6 md:p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-amber">
                    {role.domain}
                  </p>
                  <h3 className="font-display mt-2 text-xl font-medium text-paper md:text-2xl">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-sm text-paper/80">{role.org}</p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                    {role.orgDetail}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                  {role.period}
                </span>
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-line" />

              {/* Bullets */}
              <ul className="flex flex-col gap-3">
                {role.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-amber"
                    />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Tech stack — only on the technical role */}
              {role.stack && (
                <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                  {role.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-ink px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
