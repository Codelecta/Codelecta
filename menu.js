const savedTheme = localStorage.getItem("theme") || "dark";
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    root.removeAttribute("data-theme");
  }

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    const isLight = theme === "light";
    themeToggle.innerHTML = isLight
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
    themeToggle.setAttribute(
      "title",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
  }
}

applyTheme(savedTheme);

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  let themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) {
    themeToggle = document.createElement("button");
    themeToggle.type = "button";
    themeToggle.id = "theme-toggle";
    themeToggle.className = "theme-toggle";

    const nav = document.querySelector("nav");
    if (navLinks) {
      navLinks.appendChild(themeToggle);
    } else if (nav) {
      nav.appendChild(themeToggle);
    } else {
      themeToggle.classList.add("floating-theme-toggle");
      document.body.appendChild(themeToggle);
    }
  }

  applyTheme(localStorage.getItem("theme") || "dark");

  themeToggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
});
