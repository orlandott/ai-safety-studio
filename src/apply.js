import "./main.js";
import { conceptLabels } from "./stories-data.js";

/* ---- Pre-fill the concept from ?concept=<slug> --------------------------- */
function initApplyForm() {
  const params = new URLSearchParams(window.location.search);
  const concept = params.get("concept")?.toLowerCase().trim() || "";
  const title = conceptLabels[concept] || "";

  const titleInput = document.getElementById("apply-concept-title");
  const slugInput = document.getElementById("apply-concept-slug");

  if (titleInput) titleInput.value = title;
  if (slugInput) slugInput.value = concept;
}

/* ---- Preview submit: confirm locally, transmit nothing -------------------- */
function initApplyDemo() {
  const form = document.querySelector(".apply-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    // Applications aren't open yet — never send applicant data anywhere.
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("Name") || "").trim();
    const conceptTitle = String(data.get("Concept title") || "").trim();

    const panel = document.createElement("section");
    panel.className = "apply-success";
    panel.setAttribute("role", "status");
    panel.setAttribute("aria-live", "polite");
    panel.tabIndex = -1;

    const forLine = conceptTitle
      ? `your application for <strong class="apply-success__concept"></strong> would land`
      : `your open pitch would land`;

    panel.innerHTML = `
      <span class="apply-success__badge">Preview</span>
      <h2 class="apply-success__title">Thanks${name ? ", " : ""}<span class="apply-success__name"></span>!</h2>
      <p class="apply-success__lede">Applications aren't open yet, so <strong>nothing was submitted or sent anywhere</strong> — but once the program launches, this is where ${forLine}. Want to hear when applications open? Email <a href="mailto:contact@orlandotorres.org">contact@orlandotorres.org</a>.</p>
      <button class="btn btn--primary" type="button" data-apply-reset>Walk through it again</button>
    `;

    // Assign untrusted user input as text, never as HTML.
    panel.querySelector(".apply-success__name").textContent = name;
    const conceptEl = panel.querySelector(".apply-success__concept");
    if (conceptEl) conceptEl.textContent = conceptTitle;

    form.replaceWith(panel);
    panel.focus();

    panel.querySelector("[data-apply-reset]").addEventListener("click", () => {
      window.location.href = "./apply.html";
    });
  });
}

function init() {
  initApplyForm();
  initApplyDemo();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
