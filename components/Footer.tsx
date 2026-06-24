import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-page flex flex-col items-center gap-3 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js &amp;
          Tailwind CSS.
        </p>
        <p className="font-mono text-xs text-muted">
          {profile.institute}
        </p>
      </div>
    </footer>
  );
}
