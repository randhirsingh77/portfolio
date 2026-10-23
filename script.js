// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Highlight the side-nav link for the section currently in view
const sideLinks = document.querySelectorAll(".side-link");
const linkById = {};
sideLinks.forEach((a) => {
  const href = a.getAttribute("href");
  if (href && href.startsWith("#")) linkById[href.slice(1)] = a;
});
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sideLinks.forEach((a) => a.classList.remove("active"));
        const link = linkById[entry.target.id];
        if (link) link.classList.add("active");
      }
    });
  },
  { rootMargin: "-30% 0px -60% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => navObserver.observe(s));

// Contact form — send via FormSubmit AJAX so visitors stay on the page
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "";
  status.className = "form-status";
  sendBtn.disabled = true;
  sendBtn.textContent = "Sending…";

  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("send failed");
    form.reset();
    status.textContent = "Thanks — your message has been sent. I'll get back to you soon.";
    status.classList.add("ok");
  } catch (err) {
    status.textContent =
      "That didn't go through. Please email me directly using the address above.";
    status.classList.add("err");
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Send message";
  }
});

// Cursor spotlight (desktop pointers only)
const spotlight = document.getElementById("spotlight");
if (spotlight && window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let ticking = false;
  window.addEventListener("mousemove", (e) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      spotlight.style.setProperty("--mx", e.clientX + "px");
      spotlight.style.setProperty("--my", e.clientY + "px");
      ticking = false;
    });
  });
} else if (spotlight) {
  spotlight.remove();
}

// Gentle reveal as sections scroll into view
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
