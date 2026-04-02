const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function revealOnLoad() {
  if (prefersReducedMotion) {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  requestAnimationFrame(() => {
    document.querySelectorAll("[data-reveal]").forEach((el, i) => {
      el.style.transitionDelay = `${0.06 + i * 0.14}s`;
      el.classList.add("is-visible");
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", revealOnLoad);
} else {
  revealOnLoad();
}
