# AI Safety Studios

> [!NOTE]
> **Status: early-stage project.** This site is the public pitch for AI Safety
> Studios — a microbudget film program we're working to get off the ground. The
> grant program it describes is not yet funded or accepting applications: the
> application form is a preview that transmits nothing, and nothing on the site
> is a live funding offer yet.

The pitch site for a proposed microbudget film collective: short films that make
abstract AI risks concrete, then point toward real defenses. A small, static site
(three content pages) built with [Vite](https://vitejs.dev/) and deployed to
GitHub Pages.

## Pages

| File              | Purpose                                                         |
| ----------------- | --------------------------------------------------------------- |
| `index.html`      | Home — hero, featured film, what the program offers, FAQ.       |
| `stories.html`    | The development slate — 30 short-film concepts in 5 categories. |
| `apply.html`      | Preview of the planned grant application form.                  |
| `thanks.html`     | No-JS fallback confirmation for the form preview.               |
| `public/404.html` | Self-contained not-found page served by GitHub Pages.           |

## Getting started

Requires Node 20+.

```bash
npm install      # install dependencies
npm run dev      # start the Vite dev server
npm run build    # generate the slate, then build to dist/
npm run preview  # serve the production build locally
```

## Project layout

```
index.html, stories.html, apply.html, thanks.html   # page entry points
src/
  style.css          # design system + all component styles (plain CSS)
  main.js            # shared behavior: reveal-on-scroll, nav, sticky header, notice
  apply.js           # apply page: pre-fill concept, intercept submit (preview)
  stories-data.js    # single source of truth for the 30 concepts
  fonts/             # self-hosted Inter + Fraunces (woff2, latin subset)
scripts/
  render-stories.mjs # regenerates the story grid in stories.html from the data
public/              # copied to the site root as-is (og image, favicons, 404)
```

## The story slate is generated

The 30 concepts live in **one place**: `src/stories-data.js`. Two things consume it:

- `apply.html` uses it (via `src/apply.js`) to map a `?concept=<slug>` URL to a
  title and pre-fill the form.
- `stories.html`'s card grid is **generated** from it by
  `scripts/render-stories.mjs`, which rewrites the region between the
  `<!-- @generated:stories ... -->` markers.

So edit the concepts in `src/stories-data.js` — not the HTML — and run:

```bash
npm run generate:stories
```

This also runs automatically before every `npm run build` (via the `prebuild`
hook), and CI fails if the committed `stories.html` is out of date.

## The application form

Applications aren't open yet, so the form is a **preview**: on submit it shows a
sample confirmation in place of the form and **transmits nothing**. If JavaScript
is disabled, it falls back to a plain navigation to `thanks.html`. When the
program launches, point the form at a real backend in `apply.html` and handle the
submission server-side.

## Formatting & CI

Code style is enforced with [Prettier](https://prettier.io/):

```bash
npm run format        # format everything in place
npm run format:check  # verify formatting (used by CI)
```

`.github/workflows/ci.yml` runs on pull requests: it checks formatting, verifies
the generated `stories.html` is current, and builds the site.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub
Pages on every push to `main`. The Vite config uses a relative `base` (`./`), so
the build works under a project subpath (e.g. `user.github.io/ai-safety-studio/`)
as well as at a domain root.

## Credits

Reference stills are stock photography from [Unsplash](https://unsplash.com). The
embedded featured film is _Artificial Escalation_ by the Future of Life Institute,
shown as a tonal reference and not produced for this concept. Typefaces are
[Inter](https://rsms.me/inter/) and [Fraunces](https://fraunces.undercase.xyz/),
both under the SIL Open Font License.
