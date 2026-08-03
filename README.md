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
