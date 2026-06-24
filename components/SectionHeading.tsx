export default function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber">
        / {eyebrow}
      </p>
      <h2 className="font-display mt-4 max-w-xl text-3xl font-semibold leading-tight text-paper text-balance md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
