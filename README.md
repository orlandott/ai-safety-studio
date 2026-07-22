# AI Safety Studios

> [!IMPORTANT]
> **This is a design mockup — not a real organization.** "AI Safety Studios" is a
> fictional film-collective concept used to demonstrate a website design. There is
> no grant program, the application form submits nothing, and nothing on the site
> is a genuine funding offer.

A small, static marketing site (three content pages) for a fictional microbudget
film collective. It's built with [Vite](https://vitejs.dev/) and deployed to
GitHub Pages. The theme: short films that make abstract AI risks concrete, then
point toward real defenses.

## Pages

| File              | Purpose                                                         |
| ----------------- | --------------------------------------------------------------- |
| `index.html`      | Home — hero, featured film, what the program offers, FAQ.       |
| `stories.html`    | The development slate — 30 short-film concepts in 5 categories. |
| `apply.html`      | The (illustrative) grant application form.                      |
| `thanks.html`     | Confirmation shown after the form is "submitted".               |
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
  apply.js           # apply page: pre-fill concept, intercept submit (mockup)
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

The form is a **mockup**: on submit it shows a sample confirmation in place of the
form and **transmits nothing**. If JavaScript is disabled, it falls back to a plain
navigation to `thanks.html`. To make it a working application, point the form at
your own backend in `apply.html` and handle the submission server-side.

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
