# Justice for PUBG VN timeline

A Next.js timeline of the PUBG Asia Stars case in Vietnamese, Thai, English, and Korean. It follows the incident and official responses from September 17 through September 23, 2026. The original single-file page is retained in `legacy/index.html`.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. `pnpm build` checks the production build and TypeScript.

## Deployment

Each push to `main` runs `.github/workflows/deploy.yml`. GitHub Actions builds a standalone Next.js image, pushes `ghcr.io/monokaijs/justiceforpubgvn:main` and a commit-tagged image, then uses SSH to update the Compose stack at `/opt/justiceforpubgvn` on `sv.xomnghien.com`. The server runs a private PostgreSQL container with a persistent Docker volume. Its existing Nginx container routes `justiceforpubgvn.com` to the web container on the shared Docker network.

The workflow needs the repository secret `DEPLOY_SSH_KEY_B64`. The server keeps its database password in `/opt/justiceforpubgvn/.env` (`POSTGRES_PASSWORD`). Neither credential belongs in Git. `deploy/compose.yaml` is copied to the server on every deployment. For local development, set `DATABASE_URL` to a PostgreSQL connection string in `.env.local`.

## Content and files

- `data/timeline.ts` contains the dated events, what happened, attributed responses, explanations, and source IDs in Vietnamese and English. Reviewed Thai and Korean UI copy is in `data/ui-translations.ts`.
- `components/timeline-experience.tsx` renders a pinned, four-slide opening that advances with page scroll, then releases into the timeline. A skip control jumps directly to the timeline. Reduced-motion preferences disable the motion effects.
- The hero support button uses `/api/support` to keep a shared count in Postgres. Each browser is counted once using a one-year cookie. `DATABASE_URL` is required locally and in the web container.
- `/sources` lists original URLs and downloadable local copies. It distinguishes official PUBG pages, a public rulebook mirror, the two user-supplied screenshots, and the user-supplied campaign visual.
- `/players` links to individual bilingual profiles for Himass and TanVuu. Their locally stored portraits come from PUBG Esports player pages; each profile links to the original portrait, career sources, and a player YouTube channel listed in PUBG's PNC 2026 POV directory.
- `/legal` explains the site's independence, sourcing, image rights, corrections, and the support button's cookie and aggregate count.
- `public/attachments/manifest.json` records retrieval timestamps, capture methods, and SHA-256 hashes for archived documents. `evidence-manifest.json` and `visual-manifest.json` record the user-supplied images separately.
- `scripts/archive_sources.py` refreshes the directly accessible PUBG documents and image manifests. The Kakao pages returned HTTP 403 to direct downloads, so their visible article text was captured separately and labeled as such. The Liquipedia mirror could not be archived.

Raw saved HTML is served with a `.html.txt` extension so it cannot execute third-party scripts under this site's origin. The official web-event rules PDF is identified separately from the tournament rulebook.
