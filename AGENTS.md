# AGENTS.md

## Project overview

An in-store, iPad-first quiz that recommends a New Balance running shoe based on a runner's habits and priorities. Not affiliated with or a copy of the New Balance ecommerce site — a standalone recommendation tool intended for retail staff to hand to customers.

### Tech stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (utility classes + CSS variables in `src/styles.css`) |
| Animation | `motion` (Framer Motion) |
| Language | TypeScript 5 |
| Deployment | Netlify |

## Directory structure

```
src/
├── data/
│   ├── shoes.ts       # Shoe catalog — the single source of truth for products. No quiz/scoring logic here.
│   └── questions.ts   # Quiz question bank — prompts, options, per-answer effects, per-question weight.
├── lib/
│   ├── recommendation.ts  # Pure scoring engine: answers + questions + shoes -> ranked matches.
│   └── types.ts           # Shared app-level types (AppStage).
├── components/
│   ├── Landing.tsx     # Intro screen with "Start Quiz" CTA.
│   ├── Quiz.tsx         # Orchestrates question flow, back navigation, progress.
│   ├── QuestionCard.tsx # Renders one question's tappable answer options.
│   ├── ProgressBar.tsx  # "Question X of Y" + progress bar.
│   ├── Results.tsx      # Best match + why + alternative match.
│   └── ShoeCard.tsx     # Reusable shoe display (large for best match, compact for alternative).
└── routes/
    ├── __root.tsx  # HTML shell, meta tags, global styles import.
    └── index.tsx   # Top-level state machine: landing -> quiz -> results.
```

## Key concepts

### Separation of concerns (important — keep this intact)

The app is intentionally split into three independent layers so any one can change without touching the others:

1. **Shoe data** (`data/shoes.ts`) — attributes only, no logic.
2. **Quiz data** (`data/questions.ts`) — prompts and how each answer maps to shoe attributes/tags, no UI.
3. **Scoring engine** (`lib/recommendation.ts`) — pure functions, no React, no data definitions.

UI components (`components/`) never contain scoring logic — they only render what `recommendation.ts` returns.

### Recommendation engine

Every question has a `weight`. Every answer can set `attributeEffects` (target values for `cushioning`, `stability`, `weightClass`, `responsiveness`, each 1–5) and/or `tags` (categorical preferences: `runnerType`, `distance`, `surface`, `purpose`). The engine:

1. Averages weighted attribute targets across all answered questions.
2. Scores each shoe by how close its attributes are to those targets, plus bonus points for matching categorical tags against the shoe's `suitable*`/`idealPurposes` arrays.
3. Ranks shoes by total score and returns the top match plus one alternative.

All answers are combined — no single question can determine the result on its own.

### Routing

File-based routing via TanStack Router. Currently a single route (`/`) that runs a local state machine (`landing` / `quiz` / `results`) rather than separate URLs, since this is a kiosk-style flow with an obvious restart action rather than a multi-page site.

## Conventions

- Components: PascalCase, one per file, presentation-only.
- Data/logic modules: camelCase file names under `data/` and `lib/`.
- Styling: Tailwind utility classes; shared design tokens (colors) as CSS variables in `src/styles.css` (`--nb-*`).
- TypeScript strict mode; type-only imports use the `type` keyword.

## Future extension points (by design)

- **More shoes**: append objects to `SHOES` in `data/shoes.ts`.
- **Real images/product links**: replace `imageUrl`/`productUrl` placeholders per shoe.
- **Different/more questions**: edit `QUESTIONS` in `data/questions.ts` — no changes needed elsewhere.
- **More sophisticated scoring**: extend `lib/recommendation.ts` (e.g. add new attribute keys, change weighting formula) — UI components don't need to change.
- **Staff/admin mode, analytics, QR codes, compare-shoes, staff explanation view**: all can be added as new routes/components that import `data/shoes.ts` and `lib/recommendation.ts` without modifying the quiz flow.
- **Persisting quiz results or shoe data via a CMS/API**: swap the static imports in `data/` for fetched data — the scoring engine's function signature (`questions`, `shoes`, `answers`) stays the same.

## Development commands

```bash
npm run dev      # Start dev server (port 3000, or via `netlify dev` on 8888)
npm run build    # Production build
```
