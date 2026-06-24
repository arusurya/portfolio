# Arya Suryawanshi — Portfolio

A personal portfolio site built with Next.js (App Router) and Tailwind CSS v4, showcasing 12 projects across analytics, quantitative finance, AI/ML, and management consulting.

## Design

- **Display font:** Fraunces (serif, used for headings — gives an editorial/research-note feel)
- **Body font:** Inter
- **Mono font:** JetBrains Mono (used for labels, tags, and pulled-out project metrics)
- **Palette:** deep navy ink (`#0B1E3D`), warm paper background (`#F7F4EC`), muted gold accent (`#C9A24B`)
- **Signature element:** an animated yield-curve-style line in the hero, and "research note" style project cards that pull out one headline metric per project (R², revenue figures, competition rank, etc.)

## Getting started locally

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads as you edit files.

### 3. Build for production

```bash
npm run build
npm run start
```

> **Note:** the build step fetches Fraunces, Inter, and JetBrains Mono from Google Fonts at build time, so you'll need an internet connection when running `npm run build` or `npm run dev` for the first time.

## Project structure

```
app/
  layout.tsx              Root layout, fonts, metadata
  page.tsx                Home page — assembles all sections
  globals.css             Design tokens (Tailwind v4 @theme) + base styles
  projects/[slug]/page.tsx  Dynamic case-study page for each project
components/
  Navbar.tsx               Sticky nav with mobile menu
  Hero.tsx                 Landing section with animated yield-curve line
  YieldCurveLine.tsx       The hero's signature SVG element
  About.tsx                Bio section
  Education.tsx            IIT Roorkee education entry
  Skills.tsx                Skill groups (economics, ML, tools, strategy)
  Projects.tsx              Featured grid + compact list of remaining projects
  ProjectCard.tsx            Individual project card (links to /projects/[slug])
  Achievements.tsx           Recognition / competition results
  Contact.tsx                 Contact section
  Footer.tsx                  Site footer
data/
  profile.ts               Your bio, education, skills, achievements, nav links
  projects.ts               All 12 projects: problem, approach, results, links
```

## Personalizing the content

Everything text-based lives in two files — you shouldn't need to touch component code to update content:

1. **`data/profile.ts`** — update your name, bio, email, GitHub/LinkedIn links, résumé link, education entry, skill tags, and achievements.
2. **`data/projects.ts`** — each project has `links: { github, deck, demo, report }`. Replace the `"#"` placeholders with real URLs (or remove keys you don't have — the UI only renders links that exist).

To feature different projects on the homepage grid (vs. the compact list below it), edit the `featuredSlugs` array at the bottom of `data/projects.ts`.

## Adding a profile photo or résumé PDF

- Drop a résumé PDF into the `public/` folder (e.g. `public/resume.pdf`) and update `profile.links.resume` in `data/profile.ts` to `"/resume.pdf"`.
- If you want a profile photo, add it to `public/` and reference it with Next.js's `<Image />` component inside `components/About.tsx` or `components/Hero.tsx`.

## Deploying

This is a standard Next.js app — it deploys cleanly to Vercel (recommended, zero config), Netlify, or any Node hosting environment. For Vercel:

```bash
npx vercel
```

