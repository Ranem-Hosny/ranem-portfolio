# Nova — Futuristic Developer Portfolio

A premium, cinematic personal portfolio for a frontend developer. Dark-by-default
retro-futuristic aesthetic with neon glow, animated grid, motion-driven reveals
and a full light/dark theme.

## Tech Stack

- **React 18** + **Vite** — fast, modern build
- **Tailwind CSS** — utility-first styling with a CSS-variable theme system
- **Framer Motion** — page reveals, parallax, micro-interactions
- **Cairo** typography + **JetBrains Mono** for code accents

## Getting Started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build → /dist
npm run preview  # preview the production build
```

## Make It Yours

Everything personal lives in `src/data/` — no need to touch components:

| File          | What to edit                                          |
| ------------- | ----------------------------------------------------- |
| `profile.js`  | Name, roles, tagline, email, social links, stats      |
| `skills.js`   | Skill list, expertise levels, icons, colors           |
| `projects.js` | Projects — title, description, tech, links, gradients |

To add a project, copy any object in `projects.js` and update its fields.
Drop a screenshot path into `image` to use a real preview instead of the
generated artwork.

## Project Structure

```
src/
├─ components/        section + global components
│  └─ ui/             small reusable building blocks
├─ context/           theme provider (dark / light)
├─ data/              ← edit these to personalise the site
├─ hooks/             typewriter + scroll-spy hooks
├─ App.jsx            layout orchestration
└─ index.css          theme tokens, utilities, keyframes
```

## Features

- Cinematic loading screen with a live progress counter
- Animated hero — moving grid, drifting glow blobs, parallax code chips, typing effect
- Interactive skill cards with 3D tilt and SVG progress rings
- Glassmorphism project cards with generated preview artwork
- Custom cursor, scroll progress bar, smooth-scroll navigation
- Animated dark / light theme switch (saved to `localStorage`)
- Fully responsive · accessible · respects `prefers-reduced-motion`
