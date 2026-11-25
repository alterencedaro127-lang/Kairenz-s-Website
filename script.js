
const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
} catch (e) {}

updateThemeIcon();

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
  updateThemeIcon();
});

function updateThemeIcon() {
  themeBtn.textContent = root.getAttribute("data-theme") === "dark" ? "🌙" : "☀️";
}

const menuBtn = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuBtn.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let current = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}

const backTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 400);
  setActiveLink();
});

backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
setActiveLink();

document.querySelectorAll(".img-box img").forEach((img) => {
  img.addEventListener("error", () => img.classList.add("missing"));
});

document.getElementById("year").textContent = new Date().getFullYear();
