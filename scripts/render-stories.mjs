/**
 * Regenerates the story-card grid in stories.html from src/stories-data.js.
 *
 * The cards are written into the file (not rendered client-side) so the page
 * stays fully static, crawlable, and readable without JavaScript. Everything
 * between the @generated:stories markers is owned by this script — edit the
 * data in src/stories-data.js, not the HTML.
 *
 * Usage: node scripts/render-stories.mjs  (also runs via `npm run prebuild`)
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import prettier from "prettier";
import { categories } from "../src/stories-data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storiesHtml = path.resolve(__dirname, "../stories.html");

const START = "<!-- @generated:stories start -->";
const END = "<!-- @generated:stories end -->";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function renderCard(story) {
  return `            <li class="story-card reveal" data-reveal>
              <h3 class="story-card__title">${esc(story.title)}</h3>
              <p class="story-card__body">${esc(story.body)}</p>
              <a href="./apply.html?concept=${esc(story.slug)}" class="story-card__apply">Apply to make this short <span class="btn__arrow" aria-hidden="true">&rarr;</span></a>
            </li>`;
}

function renderCategory(cat) {
  const subtitle = cat.subtitle
    ? ` <span class="threat-category__subtitle">${esc(cat.subtitle)}</span>`
    : "";
  const cards = cat.stories.map(renderCard).join("\n");
  return `        <section class="threat-category" id="${cat.id}" aria-labelledby="${cat.id}-title">
          <div class="threat-category__head reveal" data-reveal>
            <span class="threat-category__num">${esc(cat.num)}</span>
            <h2 class="threat-category__title" id="${cat.id}-title">
              ${esc(cat.title)}${subtitle}
            </h2>
            <p class="threat-category__focus"><b>Focus:</b> ${esc(cat.focus)}</p>
          </div>
          <ul class="story-grid">
${cards}
          </ul>
        </section>`;
}

const generated = categories.map(renderCategory).join("\n\n");

const html = await readFile(storiesHtml, "utf8");
const startIdx = html.indexOf(START);
const endIdx = html.indexOf(END);

if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
  throw new Error(`Could not find "${START}" / "${END}" markers in stories.html`);
}

const before = html.slice(0, startIdx + START.length);
const after = html.slice(endIdx);
const raw = `${before}\n${generated}\n        ${after}`;

// Format so the committed file matches `prettier --check` and stays stable
// across regenerations (the CI drift check relies on this being idempotent).
const prettierConfig = await prettier.resolveConfig(storiesHtml);
const next = await prettier.format(raw, { ...prettierConfig, parser: "html" });

if (next !== html) {
  await writeFile(storiesHtml, next, "utf8");
  console.log(`Rendered ${categories.length} categories into stories.html`);
} else {
  console.log("stories.html already up to date");
}
