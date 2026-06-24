import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * PROJECT DETAIL PAGE — redesign notes
 * ----------------------------------------------------------------
 * Key changes from the original:
 *
 * 1. Artifact image now leads, directly under the one-line business
 *    question — before any prose. This is the single biggest
 *    credibility upgrade available: proof before claims.
 *
 * 2. Metrics moved inline under the artifact as a single row,
 *    not scattered across a header block — and should be
 *    comparative ("+14% vs baseline") not absolute claims you
 *    can't defend ("₹2.45 Cr identified").
 *
 * 3. Added a required "whatINextTried" / "limitations" section.
 *    This is the highest-signal addition for consulting/PM
 *    interviewers — it shows you can distinguish a simulated
 *    result from a validated one.
 *
 * 4. Removed the standalone "Key Insight" callout box — it was
 *    restating the Results bullets in different words. Folded
 *    the genuine insight into the problem/approach copy instead.
 *
 * 5. "Verified by X club" demoted from a sentence in the header
 *    metadata to small caption text near the tools list — it's
 *    real but shouldn't carry visual weight equal to your own
 *    metrics.
 *
 * Add to your data/projects.ts schema:
 *   artifactSrc: string;       // required — see FeaturedProject notes
 *   artifactAlt: string;
 *   metrics: { value: string; label: string }[];
 *   whatsNext: string;         // the honesty/limitations paragraph
 * ----------------------------------------------------------------
 */

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Arya Suryawanshi`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ink">
        <article className="container-page py-16 md:py-24">
          <Link
            href="/#work"
            className="font-mono text-xs uppercase tracking-[0.12em] text-amber hover:underline"
          >
            ← All projects
          </Link>

          <header className="mt-8 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-amber">
              {project.domain} · {project.subdomain}
            </p>
            <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-paper text-balance md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              {project.businessQuestion ?? project.summary}
            </p>
          </header>

          <div className="mt-6 max-w-5xl">
                    <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-5">
                              <div>
                                        <dd className="font-mono text-lg text-paper">
                                                  {project.stat.value}
                                        </dd>
                                        <dt className="text-[13px] text-muted">
                                                  {project.stat.label}
                                        </dt>
                              </div>

                              <div>
                                        <dd className="font-mono text-lg text-paper">
                                                  {project.mode}
                                        </dd>
                                        <dt className="text-[13px] text-muted">
                                                  project type
                                        </dt>
                              </div>
                    </dl>
          </div>                    
          
          <div className="mt-14 grid gap-12 md:grid-cols-[1fr_280px] md:gap-16">
            <div className="space-y-12">
              <Block title="Problem">
                <p className="text-[15px] leading-relaxed text-muted">
                  {project.problem}
                </p>
              </Block>

              <Block title="Approach">
                <ol className="space-y-3">
                  {project.approach.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-mono text-sm text-amber">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] leading-relaxed text-muted">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </Block>

              <Block title="Results">
                <ul className="space-y-3">
                  {project.results.map((r, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" />
                      <span className="text-[15px] leading-relaxed text-muted">
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>
              </Block>

              {/* NEW — the single highest-signal addition for
                  consulting/PM interviewers. Distinguishes a
                  simulated result from a validated one. */}
              {project.whatsNext && (
                <Block title="What I'd do next">
                  <p className="text-[15px] leading-relaxed text-muted">
                    {project.whatsNext}
                  </p>
                </Block>
              )}
            </div>

            <aside className="space-y-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  Tools &amp; methods
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full bg-ink-soft px-2.5 py-1 text-[11px] text-muted"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                {project.verifiedBy && (
                  <p className="mt-3 text-[12px] text-muted">
                    Reviewed by {project.verifiedBy}
                  </p>
                )}
              </div>

              {(project.links.github ||
                project.links.deck ||
                project.links.dashboard ||
                project.links.colab ||                
                project.links.demo ||
                project.links.report) && (
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    Links
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {project.links.github && (
                      <LinkRow href={project.links.github} label="GitHub repository" />
                    )}
                    {project.links.dashboard && (
                      <LinkRow href={project.links.dashboard} label="Dashboard" />
                    )}
                    {project.links.colab && (
                      <LinkRow href={project.links.colab} label="Colab Notebook" />
                    )}
                    {project.links.report && (
                      <LinkRow href={project.links.report} label="Technical report" />
                    )}
                    {project.links.deck && (
                      <LinkRow href={project.links.deck} label="Deck" />
                    )}
                    {project.links.demo && (
                      <LinkRow href={project.links.demo} label="Demo / app" />
                    )}
                  </div>
                </div>
              )}

              <div className="rounded-[4px] border border-line bg-ink-soft p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-amber">
                  Up next
                </p>
                <Link
                  href={`/projects/${next.slug}`}
                  className="font-display mt-2 block text-base font-medium text-paper hover:text-muted"
                >
                  {next.title} →
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-medium text-paper md:text-2xl">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function LinkRow({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-[4px] border border-line bg-ink-soft px-3.5 py-2.5 text-sm text-muted transition-colors hover:border-amber/50 hover:text-paper"
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

/**
 * Finds sibling projects for the relationship-graph fallback. Tries
 * an exact first-domain-token match first (e.g. "Consulting" with
 * "Consulting"). If that yields nothing — true for divaine-gtm-
 * strategy, whose domain "Strategy, Consulting" has no other project
 * sharing "Strategy" as its first token — widens to anything sharing
 * any comma-separated domain token, then finally falls back to the
 * nearest 4 projects in array order so the graph never renders a
 * single isolated node.
 */
function getRelatedProjects(
  project: { slug: string; domain: string },
  all: { slug: string; title: string; domain: string }[]
) {
  const tokens = (d: string) => d.split(",").map((t) => t.trim());
  const primaryToken = tokens(project.domain)[0];

  let related = all.filter(
    (p) => p.slug !== project.slug && tokens(p.domain)[0] === primaryToken
  );

  if (related.length === 0) {
    const myTokens = new Set(tokens(project.domain));
    related = all.filter(
      (p) =>
        p.slug !== project.slug &&
        tokens(p.domain).some((t) => myTokens.has(t))
    );
  }

  if (related.length === 0) {
    related = all.filter((p) => p.slug !== project.slug).slice(0, 4);
  }

  return related.slice(0, 5).map((p) => ({
    slug: p.slug,
    title: p.title,
    domain: tokens(p.domain)[0],
  }));
}
