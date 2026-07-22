/* AI Safety Studios — shared site behavior
   Loaded on every page (apply.js imports this module). */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- Reveal on scroll ---------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // Stagger siblings within a shared container for a gentle cascade.
        const group = el.parentElement
          ? Array.from(el.parentElement.querySelectorAll(":scope > [data-reveal]"))
          : [el];
        const index = Math.max(0, group.indexOf(el));
        el.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 0.07}s`);
        el.classList.add("is-visible");
        obs.unobserve(el);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  items.forEach((el) => observer.observe(el));
}

/* ---- Sticky header shadow on scroll -------------------------------------- */
function initHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 4);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---- Mobile navigation --------------------------------------------------- */
function initNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  const open = () => {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? close() : open();
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) close();
  });

  // Reset state if the viewport grows past the mobile breakpoint.
  window.matchMedia("(min-width: 769px)").addEventListener("change", close);
}

/* ---- Dismissible mockup notice ------------------------------------------- */
const PROMO_KEY = "mockupNoticeDismissed";

function initPromo() {
  const dismiss = document.querySelector("[data-promo-dismiss]");
  if (!dismiss) return;

  dismiss.addEventListener("click", () => {
    document.documentElement.classList.add("promo-hidden");
    try {
      localStorage.setItem(PROMO_KEY, "1");
    } catch (e) {
      /* storage unavailable — fine, it just won't persist */
    }
  });
}

/* ---- Dynamic year -------------------------------------------------------- */
function initYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

function init() {
  initReveal();
  initHeader();
  initNav();
  initPromo();
  initYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
