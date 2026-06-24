/**
 * HOW I THINK — redesign notes
 * ----------------------------------------------------------------
 * Replaces the entire Skills page section. The original showed
 * six tag categories (Analytics & Data Science, Consulting &
 * Strategy, Product, Tools) as ~25 individual pills. That's
 * resume-keyword density, not a signal about how you think — and
 * it duplicates the "Tools & methods" sidebar that already exists
 * on every project detail page, so nothing is lost by cutting it.
 *
 * What replaces it: one short paragraph stating your actual
 * working method, plus three numbered steps. Numbering is
 * justified here (per the "structure is information" principle)
 * because this genuinely is a sequence — frame, then model, then
 * make actionable is the real order you work in, not a decorative
 * 01/02/03.
 *
 * Each step folds in 2-3 concrete tools/techniques inline, in
 * prose, so the tool names still appear (ATS/skim-friendly) but
 * are doing narrative work instead of sitting in a disconnected
 * tag cloud.
 * ----------------------------------------------------------------
 */

const methodSteps = [
  {
    n: "01",
    title: "Frame the decision",
    body: "Before touching data, I name the action my output needs to unlock — flag a bottleneck, justify a price, explain a churn signal. Most of my early project time goes into customer segmentation and competitive framing, not modeling.",
  },
  {
    n: "02",
    title: "Model the mechanism",
    body: "I pick the smallest model that actually explains the mechanism — graph embeddings for network effects, time-series forecasting for demand, SHAP when the output needs to be explainable to a non-technical reader.",
  },
  {
    n: "03",
    title: "Make it actionable",
    body: "A notebook isn't a deliverable. Every project ends as a dashboard, a pricing rule, or a one-page memo — something built in Streamlit, Excel, or plain language that someone else can act on this week.",
  },
];

export default function HowIThink() {
  return (
    <section id="how-i-think" className="border-t border-line bg-ink">
      <div className="container-page py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber">
          / How I think
        </p>
        <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold leading-tight text-paper text-balance md:text-4xl">
          I start from a business question, not a dataset.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Most of my work follows the same loop: find where a metric is
          breaking — delay, churn, margin — build the smallest model that
          explains it, and hand back something a non-technical operator
          can use immediately.
        </p>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {methodSteps.map((step) => (
            <li key={step.n} className="border-t border-line pt-6">
              <span className="font-mono text-sm text-amber">{step.n}</span>
              <h3 className="font-display mt-3 text-xl font-medium text-paper">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
