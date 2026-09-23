# Justice for PUBG VN timeline

A bilingual Next.js timeline of the PUBG Asia Stars case. It follows the incident and official responses from September 17 through September 23, 2026. The original single-file page is retained in `legacy/index.html`.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. `pnpm build` checks the production build and TypeScript.

## Free Vercel setup

1. Import this project into a [Vercel Hobby](https://vercel.com/docs/plans/hobby) account. Hobby is free for personal, non-commercial projects.
2. In the Vercel Marketplace, connect [Neon Postgres](https://vercel.com/marketplace/neon/neon) to the project and choose its **Free** plan.
3. Confirm the project has `DATABASE_URL` in its environment variables, then redeploy after connecting the database. For local development, set the same variable in `.env.local` using a Neon connection string.

The support counter uses one row in Postgres across Vercel functions. Neon Free has usage limits; when they are exhausted, counter requests may fail until the allowance resets. Existing counts in a local JSON file or Redis are not automatically migrated to Postgres.

## Content and files

- `data/timeline.ts` contains the dated events, what happened, attributed responses, explanations, and source IDs in Vietnamese and English.
- `components/timeline-experience.tsx` renders a pinned, four-slide opening that advances with page scroll, then releases into the timeline. A skip control jumps directly to the timeline. Reduced-motion preferences disable the motion effects.
- The hero support button uses `/api/support` to keep a shared count in Postgres. Each browser is counted once using a one-year cookie. `DATABASE_URL` is required in local development and on Vercel.
- `/sources` lists original URLs and downloadable local copies. It distinguishes official PUBG pages, a public rulebook mirror, the two user-supplied screenshots, and the user-supplied campaign visual.
- `/players` links to individual bilingual profiles for Himass and TanVuu. Their locally stored portraits come from PUBG Esports player pages; each profile links to the original portrait, career sources, and a player YouTube channel listed in PUBG's PNC 2026 POV directory.
- `/legal` explains the site's independence, sourcing, image rights, corrections, and the support button's cookie and aggregate count.
- `public/attachments/manifest.json` records retrieval timestamps, capture methods, and SHA-256 hashes for archived documents. `evidence-manifest.json` and `visual-manifest.json` record the user-supplied images separately.
- `scripts/archive_sources.py` refreshes the directly accessible PUBG documents and image manifests. The Kakao pages returned HTTP 403 to direct downloads, so their visible article text was captured separately and labeled as such. The Liquipedia mirror could not be archived.

Raw saved HTML is served with a `.html.txt` extension so it cannot execute third-party scripts under this site's origin. The official web-event rules PDF is identified separately from the tournament rulebook.
