# AI design brief

This document is a paste-ready starting point for design generation tools. Update links and attached resources as the repository grows.

## Company name and blurb

**shogo0x2e.com — the lifelong personal portfolio of Shogo Kitada**

shogo0x2e.com is a personal technical portfolio and a living record of Shogo Kitada's work, research, writing, and changing interests. Shogo is an engineer and researcher who is energized by entering unfamiliar domains, working with thoughtful people, and turning ambiguous questions into working systems, evaluated experiences, and reusable knowledge.

The site should not define him permanently through a single field such as HCI, embodiment, physical AI, or software engineering. Those are current and past areas of exploration. The more durable idea is curiosity: seeking experiences, technologies, cultures, people, and questions that reveal parts of the world he did not yet know existed.

Although this philosophy is important, the product should remain a clear, conventional technical portfolio. Recruiters, engineers, researchers, and potential collaborators must be able to find projects, technical decisions, publications, writing, and experience without learning an unusual navigation system.

## Code

- Repository root: `.`
- GitHub repository: TBD

## Existing design and content resources

- Previous portfolio PDF: private reference material（not included in this repository）
- Projects page concept: `docs/assets/projects-page-concept-v1.png`
- Research paper: https://ipsj.ixsq.nii.ac.jp/records/2007519
- Lab publications: https://sites.google.com/shibaura-it.ac.jp/iml/publication
- Technical article about Unity as a Library and Expo Modules: https://zenn.dev/livetoon/articles/expo-uaal-prep
- Technical summary of Next.js Conf 2024: https://zenn.dev/shogo0x2e/articles/770146f4f89ae2

## Information architecture

Use conventional top-level navigation:

```text
Home / Projects / Writing / About / CV
```

Combine research, products, prototypes, hackathons, and creative technical work under `Projects`. Distinguish them with visible type labels instead of separate top-level pages.

The Projects page should center on a searchable and sortable card grid:

- Search by title, summary, and tags
- Filter by type, technology, topic, and year
- Sort by newest, oldest, and optionally featured
- Show an authentic image, title, year, one-line summary, type, and two to four tags on each card

Keep `Writing` separate because visitors use it with a different intent: reading knowledge and reflections rather than browsing completed work.

## Visual direction

The visual language should be:

- Clear, contemporary, and technically grounded
- Human rather than corporate
- Editorial, with precise grids, strong typography, and generous whitespace
- Curious without becoming visually theatrical
- Suitable for authentic photographs of experiments, products, installations, teams, and travel

Start with a warm off-white background, near-black text, and a vivid cyan-to-blue accent that carries some continuity from the previous portfolio. Small warm accents may be used sparingly. Treat this palette as provisional rather than a fixed brand system.

Avoid:

- Space, galaxy, or sci-fi imagery as a literal metaphor for the unknown
- Cyberpunk aesthetics
- Glassmorphism and excessive gradients
- Giant decorative typography that delays access to the work
- Abstract navigation labels such as Encounters, Artifacts, or Changes
- Skill-logo walls without evidence from projects
- A design that makes Shogo look permanently committed to one research field

## Content and tone

Lead with evidence. Project pages should explain the question or problem, Shogo's role, the system, technical decisions, trade-offs, outcome, limitations, and what changed in his thinking.

The voice should be curious, direct, reflective, and technically precise. It should be comfortable acknowledging failed approaches and unresolved questions. Avoid inflated claims and generic phrases such as “passionate engineer” unless supported by a concrete example.

Possible copy directions, not finalized slogans:

```text
Exploring what I don't yet know exists.
```

```text
Drawn to the unknown unknowns.
```

```text
A lifelong record of encountering the unknown.
```

## Product constraints

- Responsive and usable on mobile, tablet, and desktop
- Accessible color contrast and keyboard navigation
- Search and filter state should be shareable through the URL
- Content should be stored as Markdown
- The public site should remain available if the self-hosted build environment is offline
- The design should support Japanese and English content, although the initial language strategy is still TBD

## Still unresolved

- Final hero copy
- Japanese-first, English-first, or bilingual presentation
- Final color and typography system
- Number of historical projects to publish
- Exact CMS and deployment implementation
- Whether the homepage uses the same project cards or a more editorial featured-work layout
