# Sunaina Imran — Portfolio

A single-page personal portfolio built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion. Built following a JSON-first architecture: every piece of content lives in one file, and components never hardcode copy.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS (custom design tokens: navy background, magenta/violet/orange signature gradient)
- Framer Motion (scroll reveals, hero sequence, hover interactions)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev       # starts local dev server, usually http://localhost:5173
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Type-checks (`tsc -b`) then builds production bundle to `/dist` |
| `npm run lint` | Runs ESLint across the project |
| `npm run preview` | Serves the production build locally to sanity-check before deploying |

## Editing content — the one file that matters

**`src/data/portfolio.json`** is the single source of truth. Update your profile, skills, experience, projects, certifications, education, or testimonials here — no component needs to change.

```
src/data/portfolio.json
  ├─ profile        → name, tagline, bio, social links, resume path, avatar image
  ├─ skills          → categories[] each with items[]
  ├─ experience      → company/role/period/highlights[]
  ├─ projects        → title/description/stack[]/link/highlight (highlight:true sorts first)
  ├─ certifications  → name/issuer/status
  ├─ education       → institution/degree/period/grade
  └─ testimonials    → currently empty; the section auto-hides until you add real ones
```

Everything is typed in `src/types/portfolio.ts` and read through the `usePortfolio()` hook in `src/hooks/usePortfolio.ts` — TypeScript will flag it immediately if the JSON shape ever drifts from what components expect.

### Adding a project link

Project cards only show a "View Repo" button when `link` is non-empty in the JSON. To wire up a project, set `"link": "https://github.com/Sunaina-Imran/your-repo"`.

### Swapping the photo

Replace `src/assets/img/profile.jpg` and keep the same filename, or update `profile.avatarImage` in the JSON and the `src` in `HeroSection.tsx`.

### Updating the resume

Replace `public/resume.pdf` with your latest export — the "Download Resume" buttons in the navbar and hero point straight at that file.

## Project structure

```
src/
├── assets/img/         → profile photo (optimized)
├── data/portfolio.json → all content
├── types/portfolio.ts  → TypeScript interfaces for the data shape
├── hooks/
│   ├── usePortfolio.ts     → typed data accessor
│   ├── useScrollProgress.ts
│   └── useCustomCursor.ts
├── components/
│   ├── Navbar.tsx, Footer.tsx, SocialLinks.tsx
│   ├── LoadingScreen.tsx, ScrollProgress.tsx, CustomCursor.tsx, BackToTop.tsx
│   ├── sections/    → one component per page section
│   └── ui/          → ProjectCard, FilterPills, StatCounter, NodeGraphBackground
├── styles/index.css
├── App.tsx
└── main.tsx
public/
├── resume.pdf, og-image.jpg, favicon.svg, robots.txt, sitemap.xml
```

## Before deploying

1. Update the canonical domain — it's currently a placeholder (`sunainaimran.dev`) in `index.html`, `public/robots.txt`, and `public/sitemap.xml`. Swap in your real domain once you have one.
2. Update the JSON-LD structured data block in `index.html` if any profile details change.
3. Run `npm run build` and `npm run preview` to confirm the production build before pushing live.

## Deploying

Any static host works — Vercel, Netlify, GitHub Pages, Cloudflare Pages. Build command: `npm run build`. Output directory: `dist`.

## Notes on what was intentionally left out

- **Live project links**: none of the current projects have public repo URLs on record, so "View Repo" buttons are hidden rather than pointing anywhere fake. Add real URLs to `projects[].link` in the JSON to activate them.
- **Testimonials section**: hidden because the array is empty — add real ones and it reappears automatically.
- **Theme toggle**: intentionally not built. The dark navy + magenta identity is the whole visual signature; a light mode would work against it rather than for it.
