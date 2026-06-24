"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#how-i-think", label: "How I Think" },
  { href: "/#background", label: "Background" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between md:h-20">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-paper"
        >
          A. Suryawanshi
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-amber"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="hidden rounded-full border border-paper/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:border-amber hover:text-amber md:inline-block"
        >
          Get in touch
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`h-px w-5 bg-paper transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-paper transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-ink md:hidden">
          <ul className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 font-mono text-sm uppercase tracking-[0.1em] text-muted"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setOpen(false)}
                className="inline-block rounded-full border border-paper/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-paper"
              >
                Get in touch
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
