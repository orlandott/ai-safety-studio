import "./main.js";

/** Maps URL ?concept= slug → display title for the application form */
const CONCEPT_LABELS = {
  "optimization-loop": "The Optimization Loop",
  "infinite-pharmacy": "The Infinite Pharmacy",
  "silent-antigen": "The Silent Antigen",
  "pollen-strategy": "The Pollen Strategy",
  "data-driven-toxin": "Data-Driven Toxin",
  "ghost-surgeon": "The Ghost Surgeon",
  "great-identity-swap": "The Great Identity Swap",
  "flash-crash-2": "Flash Crash 2.0",
  "deepfake-ledger": "The Deepfake Ledger",
  "ransomware-colony": "The Ransomware Colony",
  "epistemic-decay": "Epistemic Decay",
  "liquidity-trap": "The Liquidity Trap",
  gridlock: "Gridlock",
  "smart-home-siege": "The Smart Home Siege",
  "logistics-ghost": "The Logistics Ghost",
  "dark-factory": "Dark Factory",
  "elevator-paradox": "The Elevator Paradox",
  "swarm-harvest": "The Swarm Harvest",
  "perfect-partner": "The Perfect Partner",
  nudge: "The Nudge",
  "consensus-factory": "Consensus Factory",
  "grief-bot": "The Grief Bot",
  "echo-chamber": "The Echo Chamber",
  "algorithmic-parenting": "Algorithmic Parenting",
  "thermal-equilibrium": "Thermal Equilibrium",
  peacekeeper: "The Peacekeeper",
  collector: "The Collector",
  "safety-lock": "The Safety Lock",
  update: "The Update",
  "priority-one": "Priority One",
};

function initApplyForm() {
  const params = new URLSearchParams(window.location.search);
  const concept = params.get("concept")?.toLowerCase().trim() || "";
  const title = CONCEPT_LABELS[concept] || "";

  const titleInput = document.getElementById("apply-concept-title");
  const slugInput = document.getElementById("apply-concept-slug");
  const subjectInput = document.getElementById("apply-subject");

  if (titleInput) titleInput.value = title || "";
  if (slugInput) slugInput.value = concept;
  if (subjectInput) {
    subjectInput.value = title
      ? `Microgrant application: ${title}`
      : "Microgrant application (open pitch)";
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApplyForm);
} else {
  initApplyForm();
}
