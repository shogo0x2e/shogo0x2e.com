# shogo0x2e.com Agent Guide

## Scope

This repository contains Shogo Kitada's public personal portfolio. It is a
static Astro site with English and Japanese content stored locally as Markdown.
Treat every committed file as public information.

## Start Here

Before making changes:

1. Read `README.md` for local commands and the content layout.
2. Read `src/content.config.ts` before adding or changing frontmatter fields.
3. Read the matching English and Japanese entries for any content being edited.
4. Inspect `src/styles/global.css` and reuse existing layout and component styles
   before introducing new visual patterns.

## Commands

```bash
npm install
make dev
make build
make preview
```

The development server normally runs at `http://127.0.0.1:4321`.
Run `npm run build` after implementation work. The production output is `dist/`
and must not be committed.

## Site Structure

- English pages: `/`, `/work/`, `/cv/`, `/contact/`
- Japanese pages: `/ja/`, `/ja/work/`, `/ja/cv/`, `/ja/contact/`
- Projects: `src/content/projects/<slug>/en.md` and `ja.md`
- Writing: `src/content/writing/<slug>/en.md` and `ja.md`
- Current Work selection: `src/data/currentWork.ts`
- Shared layout: `src/layouts/BaseLayout.astro`
- Shared components: `src/components/`
- Global design rules: `src/styles/global.css`
- Public images and videos: `public/images/` and `public/videos/`
- Historical design references and HTML mockups: `docs/`

## Content Rules

- Maintain an `en.md` and `ja.md` pair for every Work item.
- Keep shared facts aligned across locales: `slug`, date, type, image, video,
  repository URL, paper URL, and other external links.
- Projects use `tags: [Project]`; writing uses `tags: [Writing]`.
- Writing cards link directly to their external publication source. Projects use
  internal detail pages.
- Project search must continue to match title, description, keywords, and query
  parameters such as `/work/?q=livetoon`.
- Do not publish private employment, client, research-participant, credential,
  or unpublished product information, even behind a `draft` flag.
- Japanese prose uses `，` and `．` for punctuation unless reproducing an
  official title or quotation.
- Prefer concrete descriptions of the work and contribution over promotional
  language.

## Design and Interaction

- Preserve the editorial visual direction: off-white background, near-black
  typography, blue accents, precise grids, and generous whitespace.
- Reuse `ProjectCard.astro` and `WorkCard.astro` rather than duplicating card
  markup.
- Keep Project and Writing cards aligned at the same visual height.
- Preserve responsive behavior and verify desktop and mobile layouts after
  structural CSS changes.
- Do not hide required information behind hover-only interactions.
- Keep keyboard navigation, visible focus states, semantic headings, and useful
  image alternative text.
- Respect `prefers-reduced-motion` for new animation.

## Locale Behavior

- The root page detects the browser's preferred language: Japanese visitors are
  sent to `/ja/`; all other visitors remain on English.
- A manual EN/JA selection is saved in session storage and overrides automatic
  detection.
- Do not force redirects on deep links or explicit locale URLs.
- Keep canonical and `hreflang` links correct when adding routes.

## Assets and Public Safety

- Copy only assets that are approved for public display into `public/`.
- Strip GPS, device-owner, author, and other unnecessary metadata from new
  photographs before committing them.
- Do not commit source files from private storage, private PDFs, `.env` files,
  credentials, tokens, or machine-specific paths such as `/Users/...`.
- Optimize large images for web delivery and keep videos small enough for GitHub
  and static hosting.
- Do not replace the favicon or header avatar when changing the About-page hero;
  they intentionally use different source images.

## Analytics and Deployment

- The site is intended for Cloudflare Pages as a static Astro build.
- Build command: `npm run build`
- Output directory: `dist`
- Cloudflare Pages is connected directly to GitHub; pushes to `production` deploy to
  production and other branches may receive preview deployments.
- `predev` and `prebuild` generate `src/generated/buildMetadata.ts`. Do not edit
  or commit this ignored file.
- The footer's `Last updated` value is the deployed commit timestamp. On Pages,
  the generator pins it with `CF_PAGES_COMMIT_SHA`; locally it uses Git HEAD and
  falls back to build time only when Git metadata is unavailable.
- Cloudflare build and deployment troubleshooting should start with read-only
  inspection through the Builds or Observability MCP server, or the Pages
  deployment logs in the dashboard. A static build does not require runtime
  application logs.
- Google Analytics is enabled only in production when
  `PUBLIC_GA_MEASUREMENT_ID` contains a valid `G-...` value.
- Never hard-code deployment-specific environment values into source files.

## Git

- Keep generated directories (`dist/`, `.astro/`, and `node_modules/`) out of
  commits.
- Review staged files for secrets, local filesystem paths, image metadata, and
  unintended personal information before pushing to this public repository.
- Make focused commits with concise messages and do not overwrite unrelated
  user changes.
