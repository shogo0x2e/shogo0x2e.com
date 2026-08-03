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

## Publishing

Production deployments are triggered by stable semantic-version tags. To run
the checks, create the next tag, and push it with `main`:

```bash
make publish
```

The first automatically generated tag is `v1.0.0`; later releases increment
the patch version. To choose a version explicitly or validate without creating
a tag:

```bash
make publish VERSION=1.2.0
make publish-dry-run
```

Publishing requires a clean `main` that exactly matches `origin/main`. The tag
starts `.github/workflows/publish.yml`, which builds the site and uploads
`dist/` to Cloudflare Pages.

Create the Direct Upload Pages project `shogo0x2e-com` in Cloudflare first, or
set the GitHub Actions variable `CLOUDFLARE_PAGES_PROJECT` to another project
name. Configure the `production` GitHub environment with:

- Secret `CLOUDFLARE_API_TOKEN`: a least-privilege token with Account →
  Cloudflare Pages → Edit
- Secret `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID
- Variable `PUBLIC_GA_MEASUREMENT_ID`: the existing GA4 `G-...` measurement ID

Repository and environment secrets remain encrypted in GitHub and are not
committed to this public repository.
