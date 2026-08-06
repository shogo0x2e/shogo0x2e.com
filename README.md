# shogo0x2e portfolio

Static personal portfolio built with Astro and local Markdown content.

## Local development

```bash
npm install
npm run dev
```

Astro prints the local preview URL, normally `http://localhost:4321`.
Edits to `.astro`, CSS, or Markdown files are reflected automatically.

To inspect the production build locally:

```bash
npm run build
npm run preview
```

The same commands are available through Make:

```bash
make dev
make build
make preview
```

## Local performance evaluation

```bash
npm run lighthouse
# or: make lighthouse
```

`npm run lighthouse` builds the production site, serves `dist/` with
`astro preview`, and runs Lighthouse CI (mobile conditions) three times each on
`/`, `/ja/`, `/work/`, and `/ja/work/`. Reports are written to `.lighthouseci/`
(git-ignored) together with a machine-readable summary:

```bash
npm run lighthouse:summary
```

Baseline runs are kept in `.lighthouseci/baseline/`. Thresholds and evaluated
URLs live in `.lighthouserc.cjs`; the approach is documented in
`docs/adr/0001-local-lighthouse-and-image-performance.md`.

`npm run generate:images` derives responsive WebP versions of every image in
`public/images/` into `public/images/responsive/` (part of `predev` and
`prebuild`). The pages serve them through `src/components/ResponsiveImage.astro`
with `srcset`/`sizes`; the originals remain the fallback and are never replaced.

## Content

- Projects: `src/content/projects/<slug>/en.md` and `ja.md`
- Writing: `src/content/writing/<slug>/en.md` and `ja.md`
- Collection schemas: `src/content.config.ts`

English is served from `/`; Japanese is served from `/ja/`. Each translated
Markdown pair shares the same `slug`, dates, tags, images, and external links.
Set `locale: en` or `locale: ja` in frontmatter. The language switch keeps the
visitor on the equivalent page.

All Markdown in this repository must be safe for public release. Do not store
private employment, client, or product information behind a `draft` or
`private` frontmatter flag.

The previous static HTML prototype is preserved in `docs/mock/`.

## Deployment

Cloudflare Pages is connected directly to this GitHub repository. A push to
`production` triggers the production build and deployment.

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `production`
- Environment variable: `PUBLIC_GA_MEASUREMENT_ID`

Before development and production builds, `scripts/generate-build-metadata.mjs`
generates the footer's `Last updated` value. Cloudflare Pages builds use the
commit identified by `CF_PAGES_COMMIT_SHA`; local builds use the current Git
HEAD. The generated TypeScript file is ignored and must not be edited or
committed.

Use Cloudflare Pages preview deployments for non-production branches. Do not
commit generated `dist/` files or deployment credentials.
