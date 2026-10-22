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
