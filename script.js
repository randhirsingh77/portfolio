// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();

// ---- Mobile menu ----
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// ---- Typewriter ----
const roles = [
  "web & mobile apps.",
  "MERN stack products.",
  "React Native apps.",
  "REST APIs in Node.js.",
];
const typedEl = document.getElementById("typed");
let roleIndex = 0, charIndex = 0, deleting = false;

function tick() {
  const word = roles[roleIndex];
  typedEl.textContent = word.slice(0, charIndex);
  let delay = deleting ? 38 : 78;
  if (!deleting && charIndex === word.length) { delay = 1600; deleting = true; }
  else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 350;
  }
  charIndex += deleting ? -1 : 1;
  setTimeout(tick, delay);
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) tick();
else typedEl.textContent = roles[0];

// ---- Scroll reveal ----
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll("section[id]");
const linkById = {};
document.querySelectorAll(".nav-links a").forEach((a) => {
  const id = a.getAttribute("href");
  if (id && id.startsWith("#")) linkById[id.slice(1)] = a;
});
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-links a").forEach((a) => a.classList.remove("active"));
        const link = linkById[entry.target.id];
        if (link) link.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => navObserver.observe(s));
