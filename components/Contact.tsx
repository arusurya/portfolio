import SectionHeading from "./SectionHeading";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-ink py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk about a role, a project, or just the work"
          />

          <div>
            <p className="max-w-xl text-[15px] leading-relaxed text-muted md:text-base">
              I&apos;m currently open to internships and research collaborations in
              quantitative finance, applied analytics, or strategy consulting.
              The fastest way to reach me is email ,I read everything that
              comes in.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-amber px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-0.5 hover:bg-amber-soft"
              >
                {profile.email}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 border-t border-line pt-6">
              <ContactLink href={profile.links.github} label="GitHub" />
              <ContactLink href={profile.links.linkedin} label="LinkedIn" />
              <ContactLink href={profile.links.resume} label="Résumé (PDF)" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-amber"
    >
      {label} ↗
    </a>
  );
}
