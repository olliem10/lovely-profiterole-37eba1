# New Balance Shoe Finder

An in-store, iPad-optimized quiz experience that recommends a New Balance running shoe based on a runner's habits and preferences. This is a standalone concept project — it is not the New Balance ecommerce site or stockroom tool.

## How it works

1. **Landing** — a premium intro screen with a "Start Quiz" call to action.
2. **Quiz** — eight touch-friendly questions, one at a time, with a progress bar and the ability to go back and change answers.
3. **Results** — a scoring engine combines every answer into weighted targets, ranks the shoe catalog, and shows the best match with a match percentage, reasons, key stats, and an alternative recommendation.

## Tech stack

- React 19 + TanStack Start (file-based routing) + TanStack Router
- TypeScript
- Tailwind CSS 4
- Motion (Framer Motion successor) for transitions
- Vite 7, deployed on Netlify

## Project structure

- `src/data/shoes.ts` — the shoe catalog (attributes like cushioning, stability, weight, responsiveness, suitable distances/surfaces/purposes). Replace the placeholder shoes with the real New Balance range whenever needed — nothing else in the app needs to change.
- `src/data/questions.ts` — the quiz question bank. Each answer nudges numeric shoe attributes and/or tags a categorical preference, with a per-question `weight` to control influence on the final result.
- `src/lib/recommendation.ts` — the scoring engine. Pure functions that turn quiz answers into a ranked list of shoe matches with percentages and reasons.
- `src/components/` — `Landing`, `Quiz`, `QuestionCard`, `ProgressBar`, `Results`, `ShoeCard` — all presentation-only, with no scoring logic baked in.

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL. For the full Netlify emulation (functions, redirects, etc.) use:

```bash
netlify dev
```

## Customizing

- **Add/update shoes**: edit `src/data/shoes.ts`. Add real product photography by replacing the `imageUrl` placeholders in `public/shoes/`.
- **Add/change questions**: edit `src/data/questions.ts`. Keep `weight` and `attributeEffects`/`tags` consistent with the shoe attributes they should influence.
- **Tune the scoring**: adjust question weights in `questions.ts`, or the scoring constants (`TAG_MATCH_POINTS`, `ATTRIBUTE_MATCH_POINTS`) in `src/lib/recommendation.ts`.
