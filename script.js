// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// Close menu when clicking a link (mobile)
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
  });
});

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();
